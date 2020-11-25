import React, { Component } from 'react';
import axios from 'axios';
class PlantData extends Component {
constructor(props) {
    super(props);
    this.state={
	    db:[]
    };
  }
componentDidMount(){
	this._sensorDB();
}

_sensorDB = async() =>{
	const res = await axios.get("http://127.0.0.1:4000/sensor");
	this.setState({db:res.data});
	return res;
}

  render () {
          return (
<div className="PlantData">
    <div className="row">
		  <div className="col-12">
		  <hr/>
		  <h1>생장 정보</h1>
	<div className="table-responsive">
         <table className="table table-striped">
	 <thead>
	   <tr>
	      <th>idx</th>
	      <th>module_id</th>
              <th>ph</th>
              <th>temperature</th>
	      <th>tds</th>
	      <th>time</th>
	      <th>check(temp)</th>
	   </tr>
	 </thead>
	 <tbody>
   {this.state.db.map((d,key)=>{
     return(
       <tr>
       <td>{d.s_idx}</td>
       <td>{d.s_module_id}</td>
       <td>{d.s_ph}</td>
       <td>{d.s_temp}</td>
       <td>{d.s_tds}</td>
       <td>{d.s_log}</td>
       <td>{d.s_check}</td>
       <td>
       <form onSubmit={ async (event) => {
               event.preventDefault();
               const res = await axios.post("http://127.0.0.1:4000/sensorUpdate",{idx:d.s_idx});
	       this.props.addProduct(d.s_idx, d.s_module_id, d.s_ph, d.s_temp, d.s_tds, d.s_log);
	       console.log(res);
           } }>
    {!(d.s_check === 0)
        ? <button type="button" className="btn btn-block btn-outline-secondary" disabled="disabled">등록 완료</button>
	: <button type="submit" className="btn btn-block btn-outline-success">
                   정보등록
    </button>}
        </form>
    </td>
       </tr>
     );})}
	 </tbody>
         </table>
          </div>
        </div>
    </div>
  <div className="row">
    <div className="col-12">
		  <hr/>
		  <h2>데이터 리스트</h2>
		  { this.props.products.map((product,key) =>{
			  let id = product[0];
			  let mod_id = product[1];
			  let ph = product[2];
			  let temp = product[3];
			  let tds = product[4];
			  let time = product[5];
			return(
<div className="card card-floating-custom">
  <div className="card-header bg-light">
  </div>
  <div className="card-body">
    <span className="bg-dark text-light">Id: {id}</span><br />
    <span className="bg-dark text-light">mod_id: {mod_id}</span><br />
    <span className="bg-dark text-light">ph: {ph}</span><br />
    <span className="bg-dark text-light">temp: {temp}</span><br />
    <span className="bg-dark text-light">tds: {tds}</span><br />
    <span className="bg-dark text-light">time: {time}</span>
  </div>
  <div className="card-footer bg-light">
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

export default PlantData;

