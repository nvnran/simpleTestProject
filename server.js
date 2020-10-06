const express = require('express');
const _ = require('underscore');
const path = require('path');
const mongoose = require('mongoose');
const loanRouter = require('./routes/loan');
const loanData = require('./data/loanData');
const app = express();

mongoose.connect(
  'mongodb+srv://nvnran:CrazyDude%40132@nvnran-db.ozqjd.mongodb.net/webdevtuts?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('loan/index', {
    loanData: loanData,
  });
});

app.use('/loan', loanRouter);

app.get('/loan/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  var detail = _.where(loanData, { loanId: id });
  res.render('loan/loanDetails', {
    details: detail,
  });
});
app.get('/loan/searchbyloanid/:loanId', (req, res) => {
  let loanId = parseInt(req.params.loanId);
  var detail = _.where(loanData, { loanId: loanId });
  console.log(loanId);
  console.log(detail);
  res.render('loan/loanSearch', {
    details: detail,
  });
});
app.get('/loan/searchbycustid/:custId', (req, res) => {
  let id = req.params.custId;
  let custId = id.toString().toLowerCase();
  var detail = _.where(loanData, { id: custId });
  res.render('loan/loanSearch', {
    details: detail,
  });
});
app.get('/loan/searchbycustname/:custName', (req, res) => {
  let name = decodeURI(req.params.custName);
  var detail = _.where(loanData, { name: name });
  res.render('loan/loanSearch', {
    details: detail,
  });
});

app.listen(5000);
