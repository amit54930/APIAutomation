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
var config_FetchMerchantMessage= config.FetchMerchantMessage;


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

var url;

//expected Response Root path
var expected_response_root_path = config.expected_response_root_path;

var expected_response,expected_response1;
//Web service URL
var root_url = config.servicecasedata_root_url+config_FetchMerchantMessage.call_suffix_toFetchMerchantMessage;

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
url= url.replace("{caseStageId}", testData.caseStageId);
url= url.replace("{languageCode}",testData.languageCode);
//console.log(url);
var options = { headers:config.header };
  var response = getResponse(url, object, testData,options);
  //addContext(object, "response :" + JSON.stringify(response.body));
  //console.log("Test Data response code: " + testData.statusCode);
  console.log("API response code: " + response.statusCode);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
console.log("Status Code Matched");
  //Get the Queries Array
  /*var queries = Query.generateDynamicQuery1(testData.caseStageId);

  if (!queries.length == 0) {
  //console.log('dataQuery :'+queries);

   var expected_response = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure1.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
      var res = JSON.parse(expected_response);
      var len = res.length;
      var i;
      
    
               for (i = 0; i < len; i++) {
        //JSON.parse(expected_response)[i];
        res[i]['englishLanguage'] = res[i].varbiage_text;
        delete res[i]['varbiage_text'];

    
        
               }
               console.log(expected_response);
   

  //console.log("______________databaSE_________________________"+JSON.stringify(result[0]));
}//if
  else {
  //  console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }*/
 /* var queries1 = Query.generateDynamicQuery2(testData.caseStageId, testData.languageCode);
      if (!queries1.length == 0) {
      //console.log('dataQuery :'+queries);
    
       var expected_response1 = Framework.dbValidator(queries1,
        config.SQLConnectionURL,
        config.resultType,
          path.join(__dirname, config.expected_response_root_path, "responseStructure1.json"),
          path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
          config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
          var res1 = JSON.parse(expected_response1);
      var len1 = res1.length;
      var i;
      
    
               for (i = 0; i < len1; i++) {
        //JSON.parse(expected_response)[i];
        res1[i]['preferredLanguage'] = res1[i].varbiage_text;
        delete res1[i]['varbiage_text'];

        
               }
//console.log(res1);
      var result=[];
      result=[res[0],res1[0]];  
      console.log(result);
    }//if
      else {
      //  console.log("Dynamic query generator has not generated any query! Please check configurations");
        addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
      }*/
    
     //console.log("______________databaSE_________________________"+JSON.stringify(o));
  //If response body has data then verify actual response with expected response
  if (response.statusCode = 200) {
    var actual2 = (response.body).data;

 //console.log("~~~~~~~expected DATABASE~~~~~~~~~~~~~~~~~~"+JSON.stringify(ob));
//console.log("*******************actual response+++++++++"+JSON.stringify(actual2));
 //console.log(typeof actual2 );
 
//utils.VerifyResponseBody(object,actual2,result);
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
  var options = { headers:config.header}
  object._runnable.title = testData.TestCaseName;
  url= url.replace("{caseStageId}", testData.caseStageId);
 
  utils.testCaseInfo(object, testData);
  //var options = { qs:{ filterTypeId:testData.filterTypeId} }
  addContext(object, "url :" + url);
//  console.log('testData.type: ' + testData.type);
var options = { header: config.header};
  var response = Framework.hitWebService(testData.type, url, options);
  //response = response[0];
 // console.log("Test Data response code: " + testData.statusCode);
 // console.log("API response code: " + response.statusCode);
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
  var response = Framework.hitWebService(testData.type, url,options);
//console.log("Response in getResponse---------------actual "+JSON.stringify(response));
  return response;
}
