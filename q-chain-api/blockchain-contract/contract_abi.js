const ethEnabled = () => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

if (!ethEnabled()) {
    alert("Please install MetaMask to use this dApp!");
}


//var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));


// contractAddress and abi are setted after contract deploy

var contractAddress = '0xFBe0Bd313a278079f8155Ee86f8be008E881fFFc';  //'0x73ec81da0c72dd112e06c09a6ec03b5544d26f05';
var abi = JSON.parse('[{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"tuple[]","name":"_currentShifts","internalType":"struct QChain.Shift[]","components":[{"type":"uint256","name":"index","internalType":"uint256"},{"type":"string","name":"date","internalType":"string"},{"type":"string","name":"jsonData","internalType":"string"},{"type":"string","name":"user","internalType":"string"},{"type":"bool","name":"status","internalType":"bool"}]}],"name":"getShift","inputs":[{"type":"address","name":"userAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"insertShift","inputs":[{"type":"address","name":"userAddress","internalType":"address"},{"type":"uint256","name":"_index","internalType":"uint256"},{"type":"string","name":"_date","internalType":"string"},{"type":"string","name":"_jsonData","internalType":"string"},{"type":"string","name":"_user","internalType":"string"},{"type":"bool","name":"_status","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"shiftAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"index","internalType":"uint256"},{"type":"string","name":"date","internalType":"string"},{"type":"string","name":"jsonData","internalType":"string"},{"type":"string","name":"user","internalType":"string"},{"type":"bool","name":"status","internalType":"bool"}],"name":"shifts","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"index","internalType":"uint256"},{"type":"string","name":"date","internalType":"string"},{"type":"string","name":"jsonData","internalType":"string"},{"type":"string","name":"user","internalType":"string"},{"type":"bool","name":"status","internalType":"bool"}],"name":"shiftsAddresses","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}]}]');
//contract instance
const contract = new window.web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    console.log(err);
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

/*

        address userAddress,
        uint _index,
        string memory _date,
        string memory _jsonData,
        string memory _user,
        bool _status
*/

//Smart contract functions
function ShiftSetInfo() {
  info = $("#newInfo").val();
    console.log("contract: ", contract);
    contract.methods.insertShift(account, 1, Date.now(), info, 'javier', true).send( {from: account}).then( function(tx) { 
    console.log("Transaction: ", tx); 
  });
  $("#newInfo").val('');
}

function ShiftGetInfo() {
  contract.methods.getShift(account).call().then( function( info ) { 
    console.log("info: ", info);
    document.getElementById('lastInfo').innerHTML = info;
  });    
}