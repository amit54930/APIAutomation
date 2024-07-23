var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var chalk = require("Chalk");
var isArray = require('isarray');
var events = require('events').EventEmitter;

var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');

//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_MerchantCategoryLookupAPI = config.MerchantCategoryLookupAPI;

//import test data objectconfig_FileConfigAPI
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');

//var readTestPath = JSON.parse(test_data);
//console.log("After stringify "+JSON.stringify(readTestPath));

//import query object
//var Query = require(path.join(__dirname,config_merchantCategoryLookupAPI.test_query_root_path));


//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;
//console.log("After convert to JSON "+ JSON.stringify(test_data_obj.TestCase));

var testData, url, response;

//expected Response Root path
//var expected_response_root_path = config_MerchantLatestAPI.expected_response_root_path;


//Web service URL
var root_url =config.service_merchant_category_root_url+config_MerchantCategoryLookupAPI.call_Suffix_tofetchmerchantnumber;


// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();


//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  url=root_url;
  //console.log("testCaseData.TestGroup="+testCaseData.TestGroup);
  it(execution_group, function () {
    if (testCaseData.template == 1) {
      template1_success(this, testCaseData,url);
    } else if (testCaseData.template == 2) {
      template1_failure(this, testCaseData,url);
    } else {
      template2_failure(this, testCaseData,url);
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
//console.log('test case passed: ' + testCaseData.TestCaseName);
  });
});


describe(test_data_obj.TestSuite, function () {

    for (var eachTestData in test_data_TestCaseWise) {
    //  console.log(eachTestData + " : " + test_data_TestCaseWise[eachTestData]);
      if (null != eachTestData) {
        if ((test_data_TestCaseWise[eachTestData].TestCaseName.includes(execution_group))) {
      //    console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
          eventEmitter.emit("testCaseData", test_data_TestCaseWise[eachTestData]);
        }
      }
    }
  });


  function template1_success(object, testData,url) {

    url= url.replace("{merchantNumber}", testData.merchantNumber);
    url= url.replace("{merchantType}", testData.merchantType);

  // console.log("@@@@@@@@success@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);

    var options = {headers:config.header,
    qs:{merchantNumber:testData.merchantNumber,merchantType:testData.merchantType}}


 //console.log("********************************"+qs);
    var response = getResponse(url, object, testData, options);

    utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  }//success

  function template1_failure(object, testData,url) {

    object._runnable.title = testData.TestCaseName;

    url = root_url;
    url= url.replace("{merchantNumber}", testData.merchantNumber);
    url= url.replace("{merchantType}", testData.merchantType);
    utils.testCaseInfo(object, testData);

    var options = {headers:config.header,
      qs:{merchantNumber:testData.merchantNumber,merchantType:testData.merchantType}}
    addContext(object, "url :" + url);
 //   console.log('testData.type: ' + testData.type);

 //   console.log('options: '+JSON.stringify(options));
    var response = Framework.hitWebService(testData.type, url, options);
    //console.log('response: '+JSON.stringify(response));
    utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  }

  function template2_failure(object, testData,url){

      object._runnable.title = testData.TestCaseName;
      url = root_url;
      url= url.replace("{merchantNumber}", testData.merchantNumber);
      url= url.replace("{merchantType}", testData.merchantType);
     // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);
      utils.testCaseInfo(object, testData);
      var options = {headers:config.header,
        qs:{merchantNumber:testData.merchantNumber,merchantType:testData.merchantType}}
      addContext(object, "url :"+ url);
      //console.log('testData.type: '+testData.type);
      //console.log('url: '+url);
     // console.log('options: '+JSON.stringify(options));

      //Get the response and verify status code for failure (400)
      var response = Framework.hitWebService(testData.type, url, options);
    //  console.log('response: '+JSON.stringify(response));
      utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  }



  function getResponse(url, object, testData, options) {
      utils.testCaseInfo(object, testData);
  //  addContext(object, "url :" + url);
  //  console.log("+++++++++++++++++++++++++"+url);
    var response = Framework.hitWebService(testData.type, url, options);
   // console.log("Response in getResponse "+JSON.stringify(response));
    return response;
  }
