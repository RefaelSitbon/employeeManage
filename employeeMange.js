const express = require('express');
const connection = require('./db');
const app = express();
const port = 8080;

const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const EmployeeSchema = new Schema({
    name: String,
    country: String,
    city: String,
    salary: Number
});

const EmployeeList = model("EmployeeList", EmployeeSchema);

connection();

app.use(express.json());
app.listen(port, console.log(`Listening to port ${port}`));

app.get('/', async(req, res) => {
    const list = await EmployeeList.find({}).exec();
    res.send(list);
});

app.get('/:id', async(req, res) => {
    const employee = await EmployeeList.findById(req.params.id);
    res.send(employee);
})

app.post('/', async(req,res) => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeRates = await response.json();
    const rate = exchangeRates.rates.ILS;
    const salaryILS = req.body.salary * rate;

    console.log(req.body.salary)
    const employee = new EmployeeList({
        name: req.body.name,
        country: req.body.country,
        city: req.body.city,
        salary: salaryILS
    });

    await EmployeeList.create(employee, (err, resp) => {
        if(err){ res.send(err) }
        else{ res.send(resp) }
    })
});

app.delete('/:id', async(req, res) => {
    await EmployeeList.findByIdAndDelete(req.params.id).then(
        res.send('Deleted successed')
    );
});

app.put('/:id', async(req, res) => {
    await EmployeeList.findByIdAndUpdate(req.params.id, req.body).then(
        res.send("Updete successed")
    );
});