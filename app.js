const express = require('express');
const app = express();
const HandleError = require('./errors');

const { frequencyCounter, convertToArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
  if (!req.query.nums) {
    throw new HandleError('Invalid inputs', 400)
  }
  let numsString = req.query.nums.split(',');
  let nums = convertToArray(numsString);
  if (nums instanceof Error) {
    throw new HandleError(nums.message);
  }


  let result = {
    operation: "mean",
    result: findMean(nums)
  }

  return res.send(result);
});

app.get('/median', function(req, res, next) {
  if (!req.query.nums) {
    throw new HandleError('Invalid inputs', 400)
  }
  let numsString = req.query.nums.split(',');
  let nums = convertToArray(numsString);
  if (nums instanceof Error) {
    throw new HandleError(nums.message);
  }

  let result = {
    operation: "median",
    result: findMedian(nums)
  }

  return res.send(result);
  
});

app.get('/mode', function(req, res, next) {
  if (!req.query.nums) {
    throw new HandleError('Invalid inputs', 400)
  }
  let numsString = req.query.nums.split(',');
  let nums = convertToArray(numsString);
  if (nums instanceof Error) {
    throw new HandleError(nums.message);
  }

  let result = {
    operation: "mode",
    result: findMode(nums)
  }

  return res.send(result);

 
});

// Error handlers

app.use(function (req, res, next) {
  const err = new HandleError("Not Found",404);
  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});
