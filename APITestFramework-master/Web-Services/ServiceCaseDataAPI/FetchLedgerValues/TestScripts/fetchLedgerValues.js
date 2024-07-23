var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;
var querystring = require('querystring');
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require("mochawesome/addContext");
var utils = require('../../../../Utilities/utils.js');


//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_fetchLegderValuesAPI= config.FetchLegderValuesAPI;


//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));

//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;



//Web service URL
var root_url = config.servicecasedata_root_url

//console.log(root_url);
/**
 * This function is used to change key names as per key names in API response.
 * @param  str : input key name
 * returns updated key name.
 */


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  url=root_url+config_fetchLegderValuesAPI.call_suffix_toLedgerValues;
  //console.log("URL****"+url);
  it(execution_group, function () {

    switch (testCaseData.template) {
      case 1:
        template1_success(this, testCaseData,url);
        break;
      case 2:
        template1_failure(this, testCaseData,url);
        break;
    }
   this._runnable.title = "Test case " + testCaseData.TestCaseName;

  });
});

/**
* To select every test case from test data
@param test_data_obj.TestSuite : test suite to be executed
*
*/
describe(test_data_obj.TestSuite, function () {

  for (var eachTestData in test_data_TestCaseWise) {
    
    if (null != eachTestData) {
      if ((test_data_TestCaseWise[eachTestData].TestCaseName.includes(execution_group))) {
      
        eventEmitter.emit("testCaseData", test_data_TestCaseWise[eachTestData]);
      }
    }
  }
});


/**
 *For success flow 200 response
 * @param testData : test data need to be passed
 */
function template1_success(object, testData,url) {
  var options={headers: config.header,qs:testData.input};
  var response = getResponse(url, object,testData,options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  console.log("Status Code Matched");


  //Get the Queries Array
  var queries = Query.generateDynamicQuery(testData.input.merchantRegionCode);
 if (!queries.length == 0) {
 
   var expected_response = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


   var result = JSON.parse(expected_response);
    var len = result.length;

      var i;
         for (i = 0; i < len; i++) {
       
        result[i]["glAccountNumber"] = result[i]["gl_account_number"];
        delete result[i]['gl_account_number'];

    
        result[i]['acquirerCode'] = result[i]["acquirer_code"];
        delete result[i]['acquirer_code'];

        result[i]['glAccountDescription'] = result[i]["gl_account_description"];
        delete result[i]['gl_account_description'];

      
      }

      var expectedResponse=result;

     // console.log(expectedResponse);

    }
    else {
     console.log("Dynamic query generator has not generated any query! Please check configurations");
     addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
   }
   
   
   if (response.statusCode = 200) {
     var actualResponse = ((response.body).data);
    utils.VerifyResponseBody(object,actualResponse,expectedResponse);
   }}

/*
   * Hit the web service through API and get response.
   * @param url : URL to be hit
   * @param testData: required test data
   * @param options : optional fields contains input fields if any or headers
   * @return Response of web service.
  */
function getResponse(url, object,testData,options) {
  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  //console.log("URL"+url);
   var response = Framework.hitWebService(testData.type, url,options);
  return response;
}
function template1_failure(object, testData,url) {

  object._runnable.title = testData.TestCaseName;
 
  //console.log("@@@@@@@@failure@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);
  utils.testCaseInfo(object, testData);

  addContext(object, "url :" + url);
//  console.log('testData.type: ' + testData.type);
var options={headers: config.header,qs:testData.input};
  var response = Framework.hitWebService(testData.type, url, options);
  //response = response[0];
 // console.log("API response code" + response.statusCode);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}