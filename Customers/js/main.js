var myTemplate = document.querySelector('.myTemplate');
var compiledTemplate = Handlebars.compile(myTemplate.innerHTML);
var display = document.getElementById('display');
// var radioPointer = document.querySelector("input[name='pointer']");
var searchTypes = document.querySelector('.searchTypes');

var newRec = [];
var customerData = {};
var record = [];
var types = {};

var filterTypes = function(types){
  var filteredData = [];
  for (var i = 0; i < record.length; i++) {
    if (record[i].F0101_AT1 === types.value) {
      newRec = record[i];
      filteredData.push(record[i]);
    }
    else if (types.value === 'All') {
            filteredData.push(record[i]);
    }
  }
  var results = compiledTemplate({customerData: filteredData })
  display.innerHTML = results;
}


var countTypes = function(){
  var numOfOs = 0;
  var numOfCs = 0;
  var numOfWs = 0;
  var numOfVs = 0;
  var numOfPs = 0;
  var numOfDs = 0;

  for (var i = 0; i < record.length; i++) {
    if (record[i].F0101_AT1 === 'O') {
       numOfOs++;
    }
    else if (record[i].F0101_AT1 === 'C') {
        numOfCs++;
    }
    else if (record[i].F0101_AT1 === 'W') {
        numOfWs++;
    }
    else if (record[i].F0101_AT1 === 'V') {
        numOfVs++;
    }
    else if (record[i].F0101_AT1 === 'P') {
        numOfPs++;
    }
    else if (record[i].F0101_AT1 === 'D') {
        numOfDs++;
    }
  }
  return types = {
    opportunity: numOfOs,
    customers: numOfCs,
    warehouse: numOfWs,
    suppliers: numOfVs,
    prospect: numOfPs,
    competitor:numOfDs
  };
}

var draw = function(dataTypes) {
var chart = new CanvasJS.Chart("chartContainer",
{
  title:{
    text: "JDE Relationship Graph",
    verticalAlign: 'top',
    horizontalAlign: 'center'
  },
              animationEnabled: true,
  data: [
  {
    type: "doughnut",
    startAngle:20,
    toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
    indexLabel: "{label} #percent%",
    showInLegend: true,
    dataPoints: [
      {  y: dataTypes.opportunity, label: "Opportunity",legendText: "O: Opportunity"},
      {  y: dataTypes.customers, label: "Customers", legendText: "C: Customers"},
      {  y: dataTypes.warehouse, label: "Warehouse", legendText: "W: Warehouse"},
      {  y: dataTypes.suppliers,  label: "Suppliers", legendText: "V: Suppliers"},
      {  y: dataTypes.prospect,  label: "Prospect", legendText: "P: Prospect"},
      {  y: dataTypes.competitor,  label: "Competitor", legendText: "D: Competitor"},
    ]
  }
  ]
});
chart.render();
}

$(document).ready(function () { // wait for document to be ready

    $.getJSON('js/grid_Data.js').done(function(data) {

      //console.log(data);

      const resultsElem = document.querySelector('.results');  // <<- handle for results
      // resultsElem.textContent = JSON.stringify(data.fs_DATABROWSE_F0101.data.gridData.rowset, null, 3);  // <<-  add data to DOM

      customerData = data.fs_DATABROWSE_F0101.data.gridData.rowset;
      for (var i = 0; i < customerData.length; i++) {
           record.push(customerData[i]);
           newRec.push([record[i].F0101_AT1,record[i].F0101_ALPH]);


      }



      var dataResults = compiledTemplate({
        customerData: record
      })
      display.innerHTML = dataResults;

      draw(countTypes());
      searchTypes.addEventListener('change', function() {
        console.log("radioPointer.value");
        filterTypes(searchTypes);
      });
    })
// drawBoard(countTypes());

});

//
//     var req = {}; // empty object to hold our http request
//     req.deviceName = 'aisTester'; // <<---- here change to a unique name
//     req.username = "demo";
//     req.password = "demo";
//
//     // authenticate with the system by getting a token
//     $.ajax({
//         url: "http://demo.steltix.com/jderest/tokenrequest", // <<- JD Edwards API token service
//         type: 'post', // <<- the method that we using
//         data: JSON.stringify(req), // <<- JSON of our request obj
//         contentType: 'application/json', // <<- telling server how we are going to communicate
//         fail: function (xhr, textStatus, errorThrown) {
//
//             console.log(errorThrown, textStatus, xhr) //  <<- log any http errors to the console
//
//         }
//     }).done(function (data, textStatus, xhr) {
//
//         if (data.hasOwnProperty('userInfo')) {  // <<- see example response below
//
//             var token = data.userInfo.token;
//
//             // build a request obj to fetch data
//             var reqData = {
//                     "deviceName" : "aisTester",
//                     "targetName" : "F0101",
//                     "targetType" : "table",
//                     "outputType":"GRID_DATA",
//                     "dataServiceType" : "BROWSE",
//                     "maxPageSize" : "100",
//                     "query" : {
//                         "autoFind" : true,
//                         "condition" : []
//                         }
//                     }
//
//
//             reqData.token = token;  // <<- add our token from 1st request
//
//             $.ajax({
//                 url: "http://demo.steltix.com/jderest/dataservice", // <<- can also try http://demo.steltix.com/jderest/formservice with example request object below"
//                 type: "post",
//                 contentType: "application/json",
//                 data: JSON.stringify(reqData)
//             }).done(function (data) {
//
//                 console.log(JSON.stringify(data)) // <<- log data to console
//                 const resultsElem = document.querySelector('.results');  // <<- handle for results
//                 resultsElem.textContent = JSON.stringify(data);  // <<-  add data to DOM
//
//
//             })
//
//         }
//
//     })
//
// })
//
//
//
// // Token request response example
// // {
// //   "username": "DEMO",
// //   "environment": "JDV920",
// //   "role": "*ALL",
// //   "jasserver": "http://e1srv:7020",
// //   "userInfo": {
// //     "token": "044v2SEf1SZK9xhb/Say3dkrNzm43TUDkvtVBvPe8X08XQ=MDE4MDA5OTM5NTM0ODA4MTg2MTY3MzY1YWlzVGVzdGVyMTQ5NDk2NTI1OTg0Nw==",
// //     "langPref": "  ",
// //     "locale": "en",
// //     "dateFormat": "MDE",
// //     "dateSeperator": "/",
// //     "simpleDateFormat": "MM/dd/yyyy",
// //     "decimalFormat": ".",
// //     "addressNumber": 0,
// //     "alphaName": "DEMO",
// //     "appsRelease": "E920",
// //     "country": " ",
// //     "username": "DEMO"
// //   },
// //   "userAuthorized": false,
// //   "version": null,
// //   "poStringJSON": null,
// //   "altPoStringJSON": null,
// //   "aisSessionCookie": "negS345IlfkoLIS3aLD2mO4uM35_uX0LzNVTbtemxEy-AhVMLdO1!1643583743!1494965259848",
// //   "adminAuthorized": false,
// //   "deprecated": true
// // }
//
//
//
// //  extra credit to play around with Form Services
// // form service
// //   var reqData = {
// //                 "version": "ZJDE0001",
// //                 "formActions": [],
// //                 "deviceName": "aisTester",
// //                 "formName": "P4101_W4101A"
// //   }
