var fs = require('fs');

var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;
var querystring = require('querystring');
var Framework = require('C:/API_Test_Scripts_Dims/API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('C:/API_Test_Scripts_Dims/Utilities/utils.js');
var path = require('path');


//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_ManualCloseCaseAPI = config.ManualCloseCaseAPI;

//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;

//expected Response Root path
var expected_response_root_path = config.expected_response_root_path;

//Web service URL
var root_url = config.servicecasedata_root_url + config_ManualCloseCaseAPI.call_Suffix_toCloseCase;


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {

  it(execution_group, function () {

    var url = root_url;
    //console.log(url);
    switch (testCaseData.template) {

      case 1:
        template1_success(this, testCaseData, url);
        break;

      case 2:
        template1_failure(this, testCaseData, url);
        break;
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
    //console.log('test case passed: ' + testCaseData.TestCaseName);

  });
});



/**
* To select every test case from test data
@param test_data_obj.TestSuite : test suite to be executed
*
*/
describe(test_data_obj.TestSuite, function () {

  for (var eachTestData in test_data_TestCaseWise) {
    //console.log(eachTestData + " : " + test_data_TestCaseWise[eachTestData]);
    if (null != eachTestData) {
      if ((test_data_TestCaseWise[eachTestData].TestCaseName.includes(execution_group))) {
        // console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
        eventEmitter.emit("testCaseData", test_data_TestCaseWise[eachTestData]);
      }
    }
  }
});

/**
*For success flow i.e. 200 response
* @param testData : test data need to be passed
* @param url : API url
*/
function template1_success(object, testData, url) {

  url = url.replace("{caseNumber}", testData.caseNumber);
console.log(url);
  var options = {
    headers: config.header,
    json: testData.closeCase,
    qs: {
      caseNumber: testData.caseNumber
    }
  }
  var response = getResponse(url, object, testData, options);

  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  if (response.statusCode = 200) {
    var actual2 = (response.body).data;


  } else {

    //console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }
}








function template1_failure(object, testData, url) {

  url = url.replace("{caseNumber}", testData.caseNumber);

  var options = {
    headers: config.header,
    json: testData.input,
    qs: {
      caseNumber: testData.caseNumber
    }
  }

  object._runnable.title = testData.TestCaseName;

  //console.log("URL: " + url);
  utils.testCaseInfo(object, testData);

  addContext(object, "url :" + url);

  var response = Framework.hitWebService(testData.type, url, options);

  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}


/**
   * Hit the web service through API and get response.
   * @param url : URL to be hit
   * @param testData: required test data
   * @param options : optional fields contains input fields if any or headers
   * @return Response of web service.
   */
function getResponse(url, object, testData, options) {


  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url, options);
  return response;
}

/**
 *For fail flow i.e 404 response code
 * @param testData : test data need to be passed
 * @param url : API url
 */

