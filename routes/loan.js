const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');

const LoanDetails = require('../data/loanData');

router.get('/new', (req, res) => {
  res.render('loan/new');
});

router.post('/search/loanId', (req, res) => {
  let loanId = req.body.loanId;
  res.redirect(`/loan/searchbyloanid/${loanId}`);
});

router.post('/search/custId', (req, res) => {
  let custId = req.body.custId;
  res.redirect(`/loan/searchbycustid/${custId}`);
});

router.post('/search/custName', (req, res) => {
  let custName = req.body.custName;
  res.redirect(`/loan/searchbycustname/${encodeURI(custName)}`);
});

module.exports = router;
