const Marketplace = artifacts.require("Marketplace")

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Marketplace', function([deployer, seller, buyer]) {
	 let marketplace

	 before(async () => {
	 	marketplace = await Marketplace.deployed()
	 })

	 describe('deployment', async () => {
	 	it('deploys successfully', async () => {
	 		const address = await marketplace.address;
	 		assert.notEqual(address, 0x0)
	 		assert.notEqual(address, '')
	 		assert.notEqual(address, null)
	 		assert.notEqual(address, undefined)
	 	})

	 	it('has the correct name', async () => {
	 		const name = await marketplace.name()
	 		assert.equal(name, "DuaraCoin Marketplace")
	 	})
	 })

	 describe('products', async () => {
	 	let result, productCount

	 	before(async () => {
	 		result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
	 		productCount = await marketplace.productCount()
	 	})

	 	it('creates products', async () => {
	 		// success
	 		assert.equal(productCount, 1)
	 		const event = result.logs[0].args
	 		assert.equal(event.id.toNumber(), productCount.toNumber(), 'product id is correct')
	 		assert.equal(event.name, 'iPhone X', 'product name is correct')
	 		assert.equal(event.price, '1000000000000000000', 'price is correct')
	 		assert.equal(event.owner, seller, 'owner/seller address is correct')
	 		assert.equal(event.purchased, false, 'purchase status is correct')
	 		console.log(result.logs)

	 		// failure: product should have a valid name
	 		await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected
	 		
	 		// failure: product should have a valid price
	 		await await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected
	 	})

	 	it('lists products', async () => {
	 		const product = await marketplace.products(productCount)
	 		assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
	 		assert.equal(product.name, 'iPhone X', 'product name is correct')
	 		assert.equal(product.price, '1000000000000000000', 'product price is correct')
	 		assert.equal(product.owner, seller, 'owner/seller address is correct')
	 		assert.equal(product.purchased, false, 'purchase status is correct')
	 	})

	 	it('sells products', async() => {
	 		// track the seller's balance before making the purchase
	 		let initialSellerBal
	 		initialSellerBal = await web3.eth.getBalance(seller)
	 		initialSellerBal = new web3.utils.BN(initialSellerBal)


	 		// SUCCESS: 
	 		// buyer makes a purchase
	 		result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') });

	 		// check logs
	 		const event = result.logs[0].args
	 		assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
	 		assert.equal(event.name, 'iPhone X', 'product name is correct')
	 		assert.equal(event.price, '1000000000000000000', 'product price is correct')
	 		assert.equal(event.owner, buyer, "buyer's address is correct")
	 		assert.equal(event.purchased, true, 'product marked as purchased')
	 		console.log(result.logs)

	 		// confirm if the seller received the funds
	 		let newSellerBal
	 		newSellerBal = await web3.eth.getBalance(seller)
	 		newSellerBal = new web3.utils.BN(newSellerBal)

	 		let price
	 		price = await web3.utils.toWei('1', 'Ether')
	 		price = new web3.utils.BN(price)

	 		console.log(initialSellerBal, newSellerBal, price)

	 		const expectedSellerBal = initialSellerBal.add(price)

	 		assert.equal(newSellerBal.toString(), expectedSellerBal.toString())


	 		// FAILURE: 
	 		// try to purchase a product that doesn't exist (with invalid id)
	 		await marketplace.purchaseProduct(3, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected

	 		// try to make purchase with insufficient ether
	 		await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected

	 		// try to purchase product from invalid address (deployer)
	 		await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected

	 		// try to purchase the same product twice
	 		await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected
	 	})
	 })
})