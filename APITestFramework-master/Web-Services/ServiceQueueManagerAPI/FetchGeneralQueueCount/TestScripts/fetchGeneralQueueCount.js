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
var config_fetchGeneralQueueCount= config.fetchGeneralQueueCount;


//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));

//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;



//Web service URL
var root_url = config.service_queue_manager_url;

/**
 * This function is used to change key names as per key names in API response.
 * @param  str : input key name
 * returns updated key name.
 */
function chnageKeysAsPerAPI(str) {
  var frags = str.split('_');
  for (i = 1; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('');
}


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  url=root_url+config_fetchGeneralQueueCount.call_suffix_toGeneralQueueCount;
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

 // var options={qs:testData.input};

  //url= url.replace("{cardBrandCode}", testData.input.cardBrandCode);
//
//url= url.replace("{disputeStageId}",testData.input.disputeStageId);
var options={headers: config.header};

console.log(url);
  var response = getResponse(url, object,testData,options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  console.log("Status Code Matched");

var result1;
var result2;
var result3;

 var queries = Query.generateDynamicQueryForWorkableCount(testData.input.merchantRegionCode);
 if (!queries.length == 0) {
 
   var expected_response1 = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

      result1=JSON.parse(expected_response1)[0].workableCount;
    
  //Get the Queries Array
 }

 var queries = Query.generateDynamicQueryForNewCount(testData.input.merchantRegionCode);
 if (!queries.length == 0) {
 
   var expected_response2 = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

      result2=JSON.parse(expected_response2)[0].newCount;
    
      
  //Get the Queries Array
 }

 var queries = Query.generateDynamicQueryForCriticalCount(testData.input.merchantRegionCode);
 if (!queries.length == 0) {
 
   var expected_response3 = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

      result3=JSON.parse(expected_response3)[0].criticalCount;
    
     
  //Get the Queries Array
 }

 if (response.statusCode = 200) {
  var actualResponse = ((response.body).data);
 
}



var o ={};
var key1 ='content';
o[key1]=[];

o[key1].push({"workableCount":parseInt(result1),
"newCount":parseInt(result2),
"criticalCount":parseInt(result3)
 })
 
 //console.log(o.replace("[",""))
 var ox=o.content;

 utils.VerifyResponseBody(object,actualResponse,ox[0]);

}
/*
   * Hit the web service through API and get response.
   * @param url : URL to be hit
   * @param testData: required test data
   * @param options : optional fields contains input fields if any or headers
   * @return Response of web service.
  */
function getResponse(url, object,testData,options) {
  addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url,options);
  return response;
}
/*
*checking for 404 - failure response code
*@param url : URL to be hit
* @param testData: required test data
*/ 
function template1_failure(object, testData,url) {
  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}
