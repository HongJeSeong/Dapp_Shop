const express = require('express');
const imgRouter = require('./routes/img');
const cors =require('cors');
const app = express();
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect();

app.use(cors());
app.use(express.json());
app.use('/api', imgRouter);

const sqlSelect = "select convert(s_idx, char(10)) as s_idx, s_module_id, convert(s_ph, char(10)) as s_ph, convert(s_temp, char(10)) as s_temp, convert(s_tds, char(10)) as s_tds, s_log, s_check from sensor where s_time between '2020-09-16 00:00:00' and now() and minute(s_time)=00 and (hour(s_time)=0 or hour(s_time)=6 or hour(s_time)=12 or hour(s_time)=18);";

app.get('/sensor', (req, res) => {
  connection.query(sqlSelect, (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.post('/sensorUpdate', (req, res) => {
    var sql = "UPDATE sensor SET s_check=1 WHERE s_idx=?;";
    var idx = req.body.idx;
    connection.query(sql,[idx], (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});



app.listen(4000, () =>{
    console.log('Port 4000 server running');
})

