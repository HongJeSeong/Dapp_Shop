import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import ProductContract from '../abis/ProductContract.json';
import Navbar from './Navbar';
import Header from "./Header";
import PlantData from "./PlantData";
import Footer from "./Footer";

class Plant extends Component {

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
        const netData = ProductContract.networks[netId];

        if (netData) {
            const productContract = web3.eth.Contract(ProductContract.abi, netData.address);
            this.setState({ productContract });
            const productCount = await productContract.methods.getTotal().call();
            console.log("total Product ",productCount);
            
            this.setState({ productCount });

            // load products
            for (var i = 0; i < productCount; i++) {
                const product = await productContract.methods.getProduct(i).call();
		    product.toString();
                this.setState({
                    products: [...this.state.products, product]
                });
            }

            this.setState({ loading: false });
            console.log(this.state.products);
        } else {
            window.alert("error! Marketplace contract not deployed to detected network");
        }
        
    }

    constructor (props) {
        super (props);
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true,
        };

        this.addProduct = this.addProduct.bind(this);
    }

    addProduct (pname, moduleId, ph, temperature, tds, log) {
        this.setState({ loading: true });
        this.state.productContract.methods.addProduct(pname, moduleId, ph, temperature, tds, log).send({ from: this.state.account }).once('receipt', (receipt) => {
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
                                : <PlantData
                                    addProduct={this.addProduct}
				    products={this.state.products}/>
                            }                  
                        </main>

                </div> 
		<Footer />
            </div>
        );
    }
}

export default Plant;

