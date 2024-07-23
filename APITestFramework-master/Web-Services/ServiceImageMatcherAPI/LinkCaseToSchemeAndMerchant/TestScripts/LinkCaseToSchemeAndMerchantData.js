var fs = require('fs');
var events = require('events').EventEmitter;
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');
var path = require('path');


//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_LinkCaseToSchemeAndMerchantAPI = config.LinkCaseToSchemeAndMerchantAPI;

//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//import query object
//var Query = require(path.join(__dirname, config.test_query_root_path));



//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;

//expected Response Root path

//Web service URL
var root_url = config.service_image_matcher_root_url;


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates


function chnageKeysAsPerAPI(str) {
  var frags = str.split('_');
  for (i = 1; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('');
}


var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {

  it(execution_group, function () {

    var url = root_url + config_LinkCaseToSchemeAndMerchantAPI.call_suffix_toLinkCaseToSchemeAndMerchant;
    switch (testCaseData.template) {

      case 1:
        template1_success(this, testCaseData, url);
        break;

      case 2:
        template2_failure(this, testCaseData, url);
        break;
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
    // console.log('test case passed: ' + testCaseData.TestCaseName);

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
  url = url.replace("{documentId}", testData.test.documentId);
  url = url.replace("{caseNumber}", testData.test.caseNumber);
  url = url.replace("{stageId}", testData.test.stageId);

  var options = {
    headers: config.header,
    qs: {
      documentId:testData.test.documentId,
      caseNumber:testData.test.caseNumber,
      stageId:testData.test.stageId
    },
    json:testData.test.imageContentsList
  }

  //console.log("URL **** "+url);
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 // console.log("Status Code Matched");
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
function template2_failure(object, testData, url) {
  url = url.replace("{documentId}", testData.test.documentId);
  url = url.replace("{caseNumber}", testData.test.caseNumber);
  url = url.replace("{stageId}", testData.test.stageId);
  var options = {
    headers: config.header,
    qs: {
      documentId:testData.test.documentId,
      caseNumber:testData.test.caseNumber,
      stageId:testData.test.stageId
    },
    json:testData.test.imageContentsList
  }
  var response = getResponse(url, object, testData,options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  // console.log("Status Code Matched");

}