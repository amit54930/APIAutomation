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
var config_ListOfBookMarkCases= config.ListOfBookMarkCases;


//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));

//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;
//console.log("After convert to JSON "+ JSON.stringify(test_data_obj.TestCase));

var testData, url, response, reportID, request_metadata;

//expected Response Root path
var expected_response_root_path = config.expected_response_root_path;

var expected_response,expected_response1;
//Web service URL
var root_url = config.service_queue_manager_url + config_ListOfBookMarkCases.call_suffix_toGetListOfBookMarkCases;

//console.log(root_url);
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
  url=root_url;
  //console.log("testCaseData.TestGroup="+testCaseData.TestGroup);
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
  //  console.log('test case passed: ' + testCaseData.TestCaseName);

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
      //  console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
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
  //console.log(url);
  var options = {headers:config.header};
  var response = getResponse(url, object,testData, options);
  //addContext(object, "response :" + JSON.stringify(response.body));
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  console.log("Status Code Matched");
  //Get the Queries Array
  var queries = Query.generateDynamicQuery();
  if (!queries.length == 0) {
 //console.log('dataQuery :'+queries);

   var expected_response = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

     // console.log("_______Expected Response______"+JSON.stringify(expected_response));
        for(var i=0;i<=expected_response.length;i++)
        {
          var obj = JSON.parse(expected_response)[i];
      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
        obj[a] = obj[key];
        delete obj[key];
      });
      expected_response=obj;
    }
 
var expected=expected_response;
var caseNumber= parseInt(expected.caseNumber);
expected.caseNumber = caseNumber;
var caseStageId= parseInt(expected.caseStageId);
expected.caseStageId = caseStageId;
var disputeAmount= parseFloat(expected.disputeAmount);
expected.disputeAmount = disputeAmount;
//console.log(expected);
var expected=JSON.stringify(expected_response);
expected=expected.replace("cardBrandRespondDueDate","dueDate");
expected=expected.replace("merchantHeirarchyId","hierarchy");
expected=expected.replace("bookmarkedBy","bookmarkedby");

var expected=JSON.parse(expected);
var expected=expected_response;
var hierarchy= parseInt(expected.hierarchy);
expected.hierarchy = hierarchy;
expected_response=expected;
    
 //console.log("______________databaSE_________________________"+JSON.stringify(expected_response));
}//if
  else {
  //  console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }
  //If response body has data then verify actual response with expected response
  if (response.statusCode = 200) {
    var actual2 = (response.body).data[0];
 //console.log(actual2);
 //console.log(result);
utils.VerifyResponseBody(object,actual2,expected_response,['bookmarkedTimestamp','posEntryMode','cardBrandRespondDueDate',
'bookmarkedBy','hierarchy','merchantHeirarchyId','bookmarkedby','dueDate','corporate','region',
'principal','chain','associate','caseAge','daysRemaining','codeDescription']);
  } else {
    //console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }
}//success

/**
 *For fail flow - 400 response code
 * @param testData : test data need to be passed
 */
function template1_failure(object, testData,url) {

  object._runnable.title = testData.TestCaseName;
 
  //console.log("@@@@@@@@failure@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);
  utils.testCaseInfo(object, testData);

  addContext(object, "url :" + url);
//  console.log('testData.type: ' + testData.type);
var options = { headers:config.header };
  var response = Framework.hitWebService(testData.type, url, options);
  //response = response[0];
 // console.log("API response code" + response.statusCode);
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
  //console.log("Response in getResponse---------------actual "+JSON.stringify(response));
  return response;
}
