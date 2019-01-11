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



// function isValidDate(date)
// {
//   // check if format is 'yyyy-mm-dd'
//   if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
//     return false;
//   };
//   // check if not future date
//   if(new Date(date) > new Date()){
//     return false;
//   }
//   // get date parts
//   const splitDate = date.split('-');
//   const day     = parseInt(splitDate[2]);
//   const month   = parseInt(splitDate[1]);
//   const year    = parseInt(splitDate[0]);
//   // 
//   if(month <= 0 || month > 12 || day < 0){
//     return false;
//   }
//   const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
//   // Adjust for leap years
//   if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
//   {
//     monthLength[1] = 29;
//   }
//   if(day <= monthLength[month - 1]){
//     return false;
//   }

//     return true;
// }