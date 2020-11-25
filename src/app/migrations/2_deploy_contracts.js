var Marketplace = artifacts.require("./Marketplace.sol");
var PlantDB = artifacts.require("./ProductContract.sol");
module.exports = function(deployer) {
  	deployer.deploy(Marketplace);
	deployer.deploy(PlantDB);
};
