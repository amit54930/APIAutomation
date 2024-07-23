var fs = require('fs');

var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;
var querystring = require('querystring');
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');
var path = require('path');


//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_GetAuthDataAPI = config.GetAuthDataAPI;

//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));


//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;

//expected Response Root path
var expected_response_root_path = config.expected_response_root_path;

//Web service URL


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();
var url = config.reference_root_url + config_GetAuthDataAPI.call_suffix_toGetAuthData;

//console.log("&&&&&&&&&&&&&&&&"+url);
//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {

  it(execution_group, function () {
    
    switch (testCaseData.template) {
      case 1:
      template_GET200(this, testCaseData, url);
        break;
      case 2:

      template_GET404(this, testCaseData, url);
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
        //console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
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
template_GET200 = function (object, testData, url) {

  var options = {headers: config.header, qs: testData.inputs  }
  //console.log(options);
  var response = getResponse(url, object, testData, options);
  //addContext(object, "response :" + JSON.stringify(response.body));
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  //console.log("Status Code Matched");

  //Get the Queries Array
  var queries = null;
  queries = Query.generateDynamicQuery(testData.inputs);
  if (!queries.length == 0) {

    //console.log('dataQuery :'+queries);
    var expected_response = Framework.dbValidator(queries,
      config.BigQueryConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json")
    );
//console.log("expected_response"+JSON.stringify(expected_response));


  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  //If response body has data then verify actual response with expected response
  if (response.statusCode = 200) {
    var actual2 = ((response.body).data.content);
    utils.VerifyResponseBody(object, actual2, JSON.parse(expected_response),['authTime','currencyCode',
    'etlBatchId','posEntryModeDesc', 'cardNumberSk','referenceAuthorizationId','expiryDate','cardHolderNumberMask']);

  } else {

    console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }

}

/**
 *For fail flow i.e 404 response code
 * @param testData : test data need to be passed
 * @param url : API url
 */
template_GET404 = function (object, testData, url) {
  var options = {headers: config.header, qs: testData.inputs  }
  //console.log(testData.inputs);
  //console.log("options"+JSON.stringify(options));
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 //console.log("Status Code Matched");

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
