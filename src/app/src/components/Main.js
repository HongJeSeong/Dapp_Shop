import React, { Component } from 'react';
class Main extends Component {


    render () {
        return (
<div className="container">
	<h2 id="productList" className="text-center">상품 리스트</h2>
		<hr/>
  <div className="row">
	{ this.props.products.map((product, key) => {
        	                    return (

    <div className="col-sm-3">
      <div className="card">
        <img className="card-img-top" src={product.img} alt="이미지"></img>
        <div className="card-body">
          <h5 className="card-title">#{product.id.toString()}</h5>
	  <h4 className="card-title">{product.name}</h4>
          <p className="card-text .font-weight-bold">가격 :{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</p>
          <p className="card-text text-right text-secondary blockquote"><small>owner: <span className="ellipsis">{product.owner}</span></small></p>
          <div className="card-footer">{ !product.purchased
                                        ?   <button type="button" className="btn btn-block btn-outline-success" 
                                                name={product.id}
                                                value={product.price}
                                                onClick={ (event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                                } }
                                            >
                                            구매하기
                                            </button>
                                        : <button type="button" className="btn btn-block btn-outline-secondary" disabled="disabled">품 절</button>
                                    }</div>
        </div>
      </div>
    </div>
	)
                        }) }

  </div>
</div>

        );
    }

}

export default Main;
