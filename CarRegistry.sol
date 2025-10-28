// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CarRegistry
 * @dev A simple smart contract to register car details on the blockchain.
 * Each wallet address can register only one car.
 */
contract CarRegistry {
    // Struct to hold car details
    struct Car {
        string name;
        string model;
        bool isRegistered;
    }

    // Mapping from owner address to their car
    mapping(address => Car) public cars;

    // Event to be emitted when a new car is registered
    event CarRegistered(address indexed owner, string name, string model);

    /**
     * @dev Registers a new car for the caller.
     * Reverts if the address has already registered a car.
     * @param _name The name of the car.
     * @param _model The model of the car.
     */
    function registerCar(string memory _name, string memory _model) public {
        require(!cars[msg.sender].isRegistered, "Car already registered for this address.");

        cars[msg.sender] = Car(_name, _model, true);
        emit CarRegistered(msg.sender, _name, _model);
    }

    /**
     * @dev Retrieves the car details for a given owner address.
     * @param _owner The address of the car owner.
     * @return The car's name and model.
     */
    function getCar(address _owner) public view returns (string memory, string memory) {
        require(cars[_owner].isRegistered, "No car registered for this address.");
        return (cars[_owner].name, cars[_owner].model);
    }
}
