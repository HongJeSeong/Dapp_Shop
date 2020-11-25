import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    render () {
      return (
<nav className="navbar navbar-expand-lg navbar-light border-bottom-5-custom">
  <Link to={"/"} className="navbar-brand">Smart <span className="text-success">Farm</span></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item active">
        <Link to={"/"} className="nav-link">홈<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link to={"/admin"} className="nav-link" >설정</Link>
      </li>
      <li className="nav-item">
	<Link to={"/plant"} className="nav-link">생장정보</Link>
      </li>
      <li className="nav-item">
        <Link to={"#"}className="nav-link disabled"><span id="account">ID:{ this.props.account }</span></Link>
      </li>
    </ul>
   </div>
   </nav>

        );
    }
}

export default Navbar;
