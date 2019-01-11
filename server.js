var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/**
* Timestamp API
*/
app.get("/api/timestamp/:date_string?", function (req, res) {
  const params = req.params.date_string;
  let date, timestamp;
  
  // if no parameters provided
  if(!params){
    date = new Date();
    timestamp = {"unix": date.getTime(), "utc" : date.toUTCString() };
    res.json(timestamp);
    return false;
  }
  
  // if a date is provided
  try{
    date = isNaN(params) ? new Date(params) : new Date(params * 1000);
  }catch(e){
    console.log(e);
    res.json({"unix": null, "utc" : "Invalid date" });
  }
  timestamp = {"unix": date.getTime(), "utc" : date.toUTCString() };
  res.json(timestamp);
});



// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
