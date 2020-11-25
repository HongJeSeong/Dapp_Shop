pragma solidity >=0.4.21 <0.6.0;

contract ProductContract {
     uint total;
    struct myStruct {
        string productName;
        string moduleID;
        string ph;
        string temperature;
        string tds;
        string log;
        uint timestamp;
    }

    event product (
        string productName,
        string moduleID,
        string ph,
        string temperature,
        string tds,
        string log,
        uint timestamp
    );

    myStruct[] public products;

    function addProduct (string memory _productName, string memory _moduleID, string memory _ph, string memory _temperature, string memory _tds, string memory _log) public {
        products.push(myStruct(_productName, _moduleID, _ph, _temperature, _tds, _log, block.timestamp));
        total++;
        emit product(_productName, _moduleID, _ph, _temperature, _tds, _log, block.timestamp);
    }

    function getProduct(uint _idx) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, uint) {
        return (products[_idx].productName, products[_idx].moduleID, products[_idx].ph, products[_idx].temperature, products[_idx].tds, products[_idx].log, products[_idx].timestamp);
    }

    function getTotal() public view returns (uint) {
        return total;
    }
}
