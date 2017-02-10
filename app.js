'use strict';

var express = require('express');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/src/'));

app.listen(process.env.PORT || 5000, function() {
  console.log("The frontend server is running on port 5000!");
});

app.get('/', function(request, response) {
  response.render('layout');
});

app.get('/approved', function(request, response) {
  console.log(response.req.query);
  var status = response.req.query.UMstatus;
  var query = response.req.query;
  var result = query.UMresult;
  if (result == 'A') {
    if (query.UMauthAmount == '') { 
      response.render('check', {query: query});
    } else {
      response.render('approved', {query: query});
    }
  }
  else if (result == 'D') {
    response.render('declined', {query: query});
  }
  else if (result == 'E') {
    response.render('error', {query: query});
  }
  else {
    response.render('approved', {query: query});
  }
});