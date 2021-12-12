// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VXLToken  is ERC20PresetFixedSupply, Ownable {
   string public VNetwork = "VNetwork";
   string public VDex = "VDex";
   constructor() ERC20PresetFixedSupply("Voxel X Network", "VXL", 500000000 ether, msg.sender) {}

   function SetVNetwork(string memory _name1) public onlyOwner {
      VNetwork = _name1;
   }

   function SetVDex(string memory _name2) public onlyOwner {
      VDex = _name2;
   }
}