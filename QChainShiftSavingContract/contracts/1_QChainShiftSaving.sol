// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.8.0;

contract QChainShiftSaving{
    string jsonData;
    string[] Shifts;
    int count;
    mapping(address => Shifts) private userShifts;
    address[] private userAdresses;

    event LogNewShift(address indexed userAddress, string jsonData);
    event LogUpdateShift(address indexed userAddress, string jsonData);
    
    function isUser(address userAddress)
        public 
        returns(bool isIndeed) 
      {
        if(userIndex.length == 0) return false;
        return (userAdresses[userAddress] == userAddress);
      }
    
      function insertShiftData(
        address userAddress, 
        string jsonData) 
        public
        returns(uint index)
      {
       // if(isUser(userAddress)) throw; 
        uint newIndex = getShiftCount() + 1;
        if(isUser(userAddress)){
            (userShifts[userAddress]).push(jsonData); //get Shifts and push jsonData
        }else{
            userAddresses.push(userStructs);
            (userShifts[userAddress]).push(jsonData); 
        }
        
        
        userStructs[newIndex].idUser = userAddress;
        userStructs[newIndex].jsonData   = jsonData;
        userStructs[newIndex].index     = userIndex.push(userAddress)-1;
        LogNewShift(
            userAddress, 
            userStructs[userAddress].index, 
            jsonData);
        return userIndex.length-1;
      }
      
      function getUser(address userAddress)
        public 
        returns(string idUser, string jsonData, uint index)
      {
        if(!isUser(userAddress)) throw; 
        return(
          userStructs[userAddress].jsonData,
          userStructs[userAddress].index);
      } 
      
      function updateJsonData(address userAddress, string jsonData) 
        public
        returns(bool success) 
      {
        if(!isUser(userAddress)) throw; 
        userStructs[userAddress].jsonData = jsonData;
        LogUpdateShift(
          userAddress, 
          userStructs[userAddress].index,
          jsonData);
        return true;
      }
      
    
      function getShiftCount() 
        public
        returns(uint count)
      {
        return userStructs.length;
      }
    
      function getUserAtIndex(uint index)
        public
        returns(address userAddress)
      {
        return userIndex[index];
      }

}