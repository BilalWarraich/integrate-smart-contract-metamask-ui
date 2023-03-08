// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {
    uint256 number1;
    uint256 number2;
    /**
     * @dev Store values in variables
     * @param num1,num2 value to store
     */
    function store(uint256 num1, uint256 num2) public {
        number1 = num1;
        number2 = num2;
    }
    /**
     * @dev Add two numbers and return the result
     * @return sum of number1 and number2
     */
    function add() public view returns (uint256) {
        return number1 + number2;
    }
}
