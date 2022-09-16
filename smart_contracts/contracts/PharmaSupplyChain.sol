// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PharmaSupplyChain {
    struct Medicine {
        //manufacturing date
        string manuDate;
        string expDate;
        uint256 serialNo;
        string manufacturedBy;
        string soldBy;
        uint price;
    }
    struct Manufactuer {
        string id;
        uint contactNo;
        string medicineName;
        string sellingRetailer;
    }
    struct Retailer {
        string id;
        string shopName;
        uint contactNo;
        string location;
        string buyingManu;
        string medicineName;
    }
    struct Buyer {
        string id;
        string name;
    }
    struct Order {
        string retailerId;
        uint quantity;
        string manufactuerId;
    }
    Medicine[] private medicines;
    Manufactuer[] private manufactuers;
    Retailer[] private retailers;
    Buyer[] private buyers;
    Order[] private orders;
    //manufactuer makes a particular medicine
    mapping(string => uint256[]) manuNumMed;
    mapping(string => string) retailMed;

    //manufacutuer and retailer r->m
    // mapping(string => string) RetailerToManu;
    function checkIfManufactueredIsValid(string memory _id)
        public
        view
        returns (bool)
    {
        for (uint i = 0; i < manufactuers.length; i++) {
            if (
                keccak256(abi.encodePacked((manufactuers[i].id))) ==
                keccak256(abi.encodePacked((_id)))
            ) return true;
        }
        return false;
    }

    function addManufactuer(
        string memory _id,
        uint _contact,
        string memory _medicineName,
        string memory _sellingRetailer
    ) public {
        manufactuers.push(
            Manufactuer(_id, _contact, _medicineName, _sellingRetailer)
        );
    }

    function addNewMedicine(
        string memory _manuDate,
        string memory _expDate,
        uint256 _serialNo,
        string memory _manufacturedBy,
        string memory _soldBy,
        uint _price
    ) public {
        medicines.push(
            Medicine(
                _manuDate,
                _expDate,
                _serialNo,
                _manufacturedBy,
                _soldBy,
                _price
            )
        );
        manuNumMed[_manufacturedBy].push(_serialNo);
    }

    function addRetailer(
        string memory _id,
        string memory _shopname,
        uint _contact,
        string memory _location,
        string memory _buyingManu,
        string memory _medicineName
    ) public {
        retailers.push(
            Retailer(
                _id,
                _shopname,
                _contact,
                _location,
                _buyingManu,
                _medicineName
            )
        );
    }

    function checkIfMedicineIsValid(uint _serial) public view returns (bool) {
        for (uint i = 0; i < medicines.length; i++) {
            if (
                keccak256(abi.encodePacked((medicines[i].serialNo))) ==
                keccak256(abi.encodePacked((_serial)))
            ) return true;
        }
        return false;
    }

    function getMedicineDetails(uint _serial)
        public
        view
        returns (Medicine memory)
    {
        Medicine memory curr;
        for (uint i = 0; i < medicines.length; i++) {
            if (
                keccak256(abi.encodePacked((medicines[i].serialNo))) ==
                keccak256(abi.encodePacked((_serial)))
            ) curr = medicines[i];
        }
        return curr;
    }

    function placeOrder(string memory _retailerId, uint _quantity) public {
        Retailer memory curr;
        for (uint i = 0; i < retailers.length; i++) {
            if (
                keccak256(abi.encodePacked((retailers[i].id))) ==
                keccak256(abi.encodePacked((_retailerId)))
            ) curr = retailers[i];
        }
        orders.push(Order(_retailerId, _quantity, curr.buyingManu));
    }

    function addBuyer(string memory _id, string memory _name) public {
        buyers.push(Buyer(_id, _name));
    }

    function buyMedicine(address payable to) public payable {
        to.transfer(msg.value);
    }
}
