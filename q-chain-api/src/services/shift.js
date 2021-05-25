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

}

module.exports = ShiftService;
