import React, { Component } from 'react';
class Footer extends Component{
render () {
      return (
<div className="container-fluid bg-success">
        <div className="footer-lower">
            <div className="media-container-row">
                <div className="col-md-12">
                    <hr/>
                </div>
            </div>
            <div className="media-container-row mbr-white">
                <div className="col-md-6 copyright">
                    <p className="mbr-text mbr-fonts-style display-7">
                        &copy; Copyright 2020 SELab Smart Farm - All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    </div>
      );
}

}
export default Footer;

