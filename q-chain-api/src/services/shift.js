const { 
    Shift,
    ShiftTracking,
    Branch,
    CompanyEmployee,
    CompanySector,
    Company,
    User
} = include('models');
const CrudService = require('./crud');

const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');

const crypto = require('crypto');
const Web3 = require('web3');
const {
    abi
} = include('enums');

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = 'javii';


// LZW-compress a string
const lzw_encode = s => {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
const lzw_decode = s => {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

class ShiftService extends CrudService {
    constructor() {
        super(Shift);
    }

    async findCompanyAndBranch(reqBody) {
        try {
            const {
                branch_id,
                ce_id
            } = reqBody;

            let companyEmployee = null;

            if(!isEmpty(ce_id)) {
                companyEmployee = await CompanyEmployee.findOne({user_id: ce_id}).lean().exec();
            }

            const branch = await Branch.findOne({_id: branch_id}).lean().exec();

            let companyId = null;

            if(companyEmployee) {
                
                companyId = get(companyEmployee, 'company_id');

                const company = await Company.findOne({_id: companyId}).lean().exec();

                if(get(company, 'company_save_blockchain')) {
                    return {
                        company,
                        branch
                    };
                }
            }
            return null;
        } catch(err) {
            console.log('err', err);
        }
    }


    async generateBlockchainData(shift) {
        try {
            const result = await this.findCompanyAndBranch(shift);
            const company = get(result, 'company');
            const branch = get(result, 'branch');

            const blockChainData = {
                company,
                branch,
                sector: await CompanySector.findOne({company_id: company._id}).lean().exec(),
                employee: await User.findOne({_id: shift.ce_id}).lean().exec(),
                user: await User.findOne({_id: shift.user_id}).lean().exec(),
                shift,
                shift_tracking: await ShiftTracking.findOne({shift_id: shift.shift_id}).lean().exec()
            };

            const cipher = crypto.createCipher(algorithm, key);  
            const encrypted = cipher.update(JSON.stringify(blockChainData), 'utf8', 'hex') + cipher.final('hex');
            return lzw_encode(encrypted);
        } catch(err) {
            console.log('err', err);
        }

    }

    async decryptBlockchainData(hash, password) {
        try {

            const decodedLZW = lzw_decode(hash);
            const decipher = crypto.createDecipher(algorithm, password);
            const result = decipher.update(decodedLZW, 'hex', 'utf8') + decipher.final('utf8');
            if(result) {
                return JSON.parse(result);
            }
        } catch(err) {
            console.log('err', err);
        }
    }

    async saveBlockChainData(blockchainData, account='0xB8f34ae04a57CfD45f0AD362e9A21Fa7CEE0f377') {

        const web3 = new Web3('wss://mainnet.infura.io/ws')

        const account1 = '' // Your account address 1
       /* const account2 = '' // Your account address 2

        const privateKey1 = Buffer.from('YOUR_PRIVATE_KEY_1', 'hex')
        const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')*/

        const contractAddress = '0xFBe0Bd313a278079f8155Ee86f8be008E881fFFc';

        const contract = new web3.eth.Contract(abi, contractAddress);

        contract.methods.insertShift(
            account,
            1,
            Date.now(),
            blockchainData,
            'javier',
            true).send( {from: account}).then( function(tx) { 
            console.log("Transaction: ", tx); 
        });

        /*const tx = new Tx(txObject)
        tx.sign(privateKey1)
      
        const serializedTx = tx.serialize()
        const raw = '0x' + serializedTx.toString('hex')
      
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          console.log('err:', err, 'txHash:', txHash)
        })*/
    }

}

module.exports = ShiftService;
