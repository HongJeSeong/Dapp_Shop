import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import Header from "./Header";
import Settings from "./Settings";
import Footer from "./Footer";

class Admin extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        // legacy dapp browsers
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        // non-dapp browsers ...
        else {
            window.alert("non-ethereum browser detected. consider trying metamask");
        }
    }
    
    async loadBlockchainData() {

        const web3 = window.web3;

        // load account
        const accounts =  await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const netId = await web3.eth.net.getId();
        const netData = Marketplace.networks[netId];

	const blocks = await this.loadTxList(web3,accounts[0]);
        this.setState({blocks:blocks});

        if (netData) {
            const marketplace = web3.eth.Contract(Marketplace.abi, netData.address);
            this.setState({ marketplace });
            const productCount = await marketplace.methods.productCount().call();
            console.log(productCount);
            
            this.setState({ productCount });

            // load products
            for (var i = 1; i <= productCount; i++) {
                const product = await marketplace.methods.products(i).call();
                this.setState({
                    products: [...this.state.products, product]
                });
            }

            this.setState({ loading: false });
            console.log(this.state.products);
            console.log(marketplace);
        } else {
            window.alert("error! Marketplace contract not deployed to detected network");
        }
        
    }

    async loadTxList(web3,addr){
        var currentBlock = await web3.eth.getBlockNumber();
	Promise.blocks=[];
	Promise.i = 0;
        for (var i=currentBlock; i >= 0; --i) {
            try {
                web3.eth.getBlock(i, true)
			    .then(function(result){
				    Promise.blocks[Promise.i]=result;
				    Promise.i++;
			    });
        
    } catch (e) { console.error("Error in block " + i, e); }
} console.log(Promise.blocks);
        return Promise.blocks;
    }

    constructor (props) {
        super (props);
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true,
	    blocks:null
        };

        this.createProduct = this.createProduct.bind(this);
    }

    createProduct (name, price, img) {
        this.setState({ loading: true });
        this.state.marketplace.methods.createProduct(name, price, img).send({ from: this.state.account }).once('receipt', (receipt) => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
            <div>
                <Navbar account={ this.state.account } />
		<Header />
                <div className="container-fluid mt-5">
                        <main role="main">
                            { this.state.loading
                                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                                : <Settings
                                    createProduct={this.createProduct}
				    blocks={this.state.blocks}/>
                            }                  
                        </main>

                </div> 
		<Footer />
            </div>
        );
    }
}

export default Admin;

