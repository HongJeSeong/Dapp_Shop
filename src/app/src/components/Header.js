import React, { Component } from 'react';
import backimg from '../back1.jpg';

class Header extends Component {

    render () {
      return (
  <header>
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light img-fluid bg-custom" style={{ 
	    background: `url(${backimg})`,
	    backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '50vh'
    }}>
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal text-white">Smart <span className="text-success">Farm</span></h1>
        <p className="lead font-weight-normal text-light">Ecommerce App, Data Chaining</p>
        <a className="btn btn-outline-light" href="#productList">상품보기</a>
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  </header>
        );
    }
}

export default Header;
