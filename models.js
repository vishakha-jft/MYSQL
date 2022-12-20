const mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database    : 'employee'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
}); 
function findall(){
    return new Promise((resolve,reject)=>{
        connection.query('SELECT * from employee', (err, rows) => {
        resolve(rows)})
    })
} 

function findbyid(id){
    return new Promise((resolve,reject)=>{
        connection.query('SELECT * from employee where id=?', [id],(err, row) => {
        const emp={
            id:row[0].id,
            name:row[0].name,
            job:row[0].job,
            salary:row[0].salary        }
        resolve(emp)})
    })
}
function create(emp){
    return new Promise((resolve,reject)=>{
        connection.query(`INSERT into employee (name,job,salary) values (?,?,?)`, [emp.name,emp.job,emp.salary],(err,row) => {
        resolve()})
    })
}
function update(id,emp){
    return new Promise((resolve,reject)=>{
        connection.query('Update employee set name =?,job=?,salary=? where id=?',[emp.name,emp.job,emp.salary,id], (err, rows) => {  
        resolve()})
    })
}
 
function remove(id){
    return new Promise((resolve,reject)=>{
        connection.query('DELETE from employee WHERE id=?',[id], (err, rows) => {
        resolve()})
    })
}
module.exports={
      findall,findbyid,create,update,remove
}