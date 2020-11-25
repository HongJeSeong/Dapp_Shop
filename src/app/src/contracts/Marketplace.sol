pragma solidity >=0.4.21 <0.6.0;


contract Marketplace {
	string public name;
	uint public productCount = 0;

	mapping(uint => Product) public products;

	struct Product {
		uint id;
		string name;
		uint price;
		string img;
		address payable owner;
		bool purchased;
	}

	event ProductCreated(
		uint id,
		string name,
		uint price,
		string img,
		address payable owner,
		bool purchased
	);

	event ProductPurchased(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool purchased
	);
	
	

	constructor() public {
		name = "selab";
	}

	function createProduct (string memory _name, uint _price, string memory _img) public {
		// 이름 길이 체크
		require (bytes(_name).length > 1);
		
		// 가격 > 0 체크
		require (_price > 0);		
		
		// product count 증가
		productCount ++;

		// product 생성
		products[productCount] = Product(productCount, _name, _price, _img, msg.sender, false);

		// 이벤트 트리거 : 생성
		emit ProductCreated(productCount, _name, _price, _img, msg.sender, false);
	}
	
	function purchaseProduct (uint _id) payable public {
		Product memory _product = products[_id];
		address payable _seller = _product.owner;
    
		require (_product.id > 0 && _product.id <= productCount);
		require (msg.value >= _product.price);
		require (!_product.purchased);
		require (_seller != msg.sender);
    
		_product.owner = msg.sender;
		_product.purchased = true;
    
		// product 매핑
		products[_id] = _product;

		// 이더 전송
		address(_seller).transfer(msg.value);

		// 이벤트 트리거 : 구매
		emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
	}
	
}


