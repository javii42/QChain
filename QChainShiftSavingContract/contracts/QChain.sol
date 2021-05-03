// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/// @title Voting with delegation.
contract QChain {

    struct Shift {
        uint index;
        uint16 date;
        string jsonData;
        string user;
        bool status;
    }

    address public shiftAddress;

    Shift[] public shifts;


    mapping(address => Shift[]) public shiftsAddresses;

    constructor(bytes32[] memory _) {
    }

    function insertShift(
        address userAddress,
        uint _index,
        uint16 _date,
        string memory _jsonData,
        string memory _user,
        bool _status
    ) public {
        shiftsAddresses[userAddress].push(Shift({
            index: _index,
            date: _date,
            jsonData: _jsonData,
            user: _user,
            status: _status
        }));
    }

    function getShiftByIndex(
        address _userAddress,
        uint _index
    ) public view
            returns (Shift memory _currentShifts)
    {
        for (uint i = 0; i < shiftsAddresses[_userAddress].length; i++) {
            if (shiftsAddresses[_userAddress][i].index == _index) {
                return shiftsAddresses[_userAddress][i];
            }
        }
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getShiftsByUser(
        address _userAddress,
        string memory _user
    ) public view
            returns (Shift[] memory _currentShifts)
    {
        Shift[] storage aux;
        string memory userAux;
        for (uint i = 0; i < shiftsAddresses[_userAddress].length; i++) {
            userAux = shiftsAddresses[_userAddress][i].user;
            if (compareStrings(userAux, _user)) {
                aux.push(shiftsAddresses[_userAddress][i]);
            }
        }
        return aux;
    }

    function getShiftBetweenDates(
        address _userAddress,
        uint16 _since,
        uint16 _to
    ) public view
            returns (Shift[] memory _currentShifts)
    {
        Shift[] storage aux;
        for (uint i = 0; i < shiftsAddresses[_userAddress].length; i++) {
            uint16 currentDate = shiftsAddresses[_userAddress][i].date;
            if (_since <= currentDate && _to >= currentDate) {
                aux.push(shiftsAddresses[_userAddress][i]);
            }
        }
        return aux;
    }

    function getShift(
        address _userAddress
    ) public view
            returns (Shift[] memory _currentShifts)
    {
        return shiftsAddresses[_userAddress];
    }
}