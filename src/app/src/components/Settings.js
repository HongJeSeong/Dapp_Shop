import React, { Component } from 'react';
import axios from 'axios';
import DisplayImage from "./DisplayImage";
class Settings extends Component {
constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.path = this.path.bind(this);

  }
  async path(data){
    await this.setState({
        image: data
      });
  }

  render () {
          return (
<div className="Settings">
<div className="row">
    <div className="col-6">
		  <hr/>
	<h2>상품 등록 </h2>
		  <div className="card">
		  <div className="card-body">
                <form onSubmit={ async (event) => {
                    event.preventDefault();
                    const name = this.productName.value;
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether');
		    const img = this.state.image;
		    const formData = new FormData();
		    formData.append('file',img);
		    const res = await axios.post("http://127.0.0.1:4000/api/upload", formData);
	            const imagePath =(res["data"]["imgPath"]).toString();
                    this.props.createProduct(name, price, imagePath);
                } }>

		    <div className="form-group mr-sm-2">
			<DisplayImage
			imagePath={ this.path }/>
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            ref={(input) => { this.productName = input }}
                            type="text"
                            className="form-control"
                            placeholder="product name"
                            required />
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            ref={(input) => { this.productPrice = input }}
                            className="form-control"
                            placeholder="product price (in ether)"
                            required />
                    </div>
		    <div className="card-footer">
                    <button type="submit" className="btn btn-block btn-outline-success">
                        상품 등록
                    </button>
		    </div>
                </form>
	      </div>
	     </div>
     </div>
    <div className="col-6">
		  <hr/>
		  <h2>트랜잭션 리스트</h2>
		  { this.props.blocks.map((block,key) =>{
			var transaction = block.transactions;
			var tx = Object(transaction[0]);
			var t = new Date(block.timestamp*1000);
			var date= t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate() + " " + t.getHours() + "시" + t.getMinutes() + "분";
			  if(!tx.value){
				  tx.value=0;
			  }
			return(
<div className="card card-floating-custom">
  <div className="card-header bg-light">
    #. {tx.blockNumber}<br />
    Block Hash: <span className="ellipsis text-dark">{tx.blockHash}</span><br />
    Parent Hash: <span className="ellipsis text-dark">{block.parentHash}</span><br />
    Hash: <span className="ellipsis">{tx.hash}</span><br />
  </div>
  <div className="card-body">
    <span className="bg-dark text-light">From: <span className="ellipsis bg-dark">{tx.from}</span></span><br />
    <span className="bg-dark text-light">To: <span className="ellipsis bg-dark">{tx.to}</span></span><br />
    <span className="bg-light">Value: {window.web3.utils.fromWei(tx.value.toString(), 'Ether')} ETH</span><br />

  </div>
  <div className="card-footer bg-light">
    Gas: {tx.gas}<br />
    Gas Price: {tx.gasPrice}<br />
    {date}
  </div>
</div>
				
			);
		 	 }
		  )}
    </div>

</div>
</div>
);
    }

}

export default Settings;

