var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;
var querystring = require('querystring');
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');

//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_PendUnpendCaseAPI = config.PendUnpendCaseAPI;

//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');


//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;


//Web service URL
var root_url = config.servicecasedata_root_url;

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));

// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  it(execution_group, function () {
    var url = root_url + config_PendUnpendCaseAPI.call_suffix_topendCase;
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
function template1_success(object, testData, url) {

  var queries = Query.generateDynamicQuery(testData.test1.caseStageId);
  if (!queries.length == 0) {

    //console.log("dataQuery************ :"+queries);
    var expected_response1 = Framework.dbValidator(queries,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"), config.SQLuserName,
      config.SQLpassWord,
      config.SQLmysqlDriver);
  }
  else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  var options = {
    headers: config.header ,json: testData.test1
  }
  expected_response1 = JSON.parse(expected_response1);
  var queue_id = expected_response1[0].queue_id;
   

  if (queue_id==23) {
    
    var response = getResponse(url, object, testData, options);
    addContext(object, "queue_id is updated to " + queue_id+" and case is pended successfully");
    //addContext(object, "response :" + JSON.stringify(response.body));
    utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  }
    else if (queue_id == 65 ) {
     // console.log("queue_id is updated to " + queue_id+" and merchant image is unlinked successfully");
      addContext(object, "queue_id is updated to " + queue_id+" and case is unpended successfully");
    }
  }


/**
 *For fail flow i.e 404 response code
 * @param testData : test data need to be passed
 * @param url : API url
 */
function template1_failure(object, testData, url) {
  var options = {
    headers: config.header, json:testData.test1
  }

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
  //console.log(url);
  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  var response = Framework.hitWebService(testData.type, url, options);
  return response;
}
