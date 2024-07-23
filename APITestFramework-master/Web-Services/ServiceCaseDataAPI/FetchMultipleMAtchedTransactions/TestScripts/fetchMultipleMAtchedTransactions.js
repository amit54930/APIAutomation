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
var config_fetchMultipleMAtchedTransactions = config.fetchMultipleMAtchedTransactions;


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
var root_url = config.servicecasedata_manager_url;

function chnageKeysAsPerAPI(string) {
  var frags = string.split('_');
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
  url = root_url + config_fetchMultipleMAtchedTransactions.call_suffix_toMultipleMatchedTransactions;
   

  it(execution_group, function () {

    switch (testCaseData.template) {
      case 1:
        template1_success(this, testCaseData, url);
        break;
      case 2:
        template1_failure(this, testCaseData, url);
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
function template1_success(object, testData, url) {

  var options = {headers: config.header };
  var result =[];
  url=url.replace('{caseNumber}',testData.caseNumber);
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  console.log("Status Code Matched");

  var expected_response;
  var queries = Query.generateDynamicQuery(testData.caseNumber);

  if (!queries.length == 0) {

     expected_response = Framework.dbValidator(queries,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
      var len=JSON.parse(expected_response).length;
      var i;
     
      for(i=0;i<len;i++){
      var obj = JSON.parse(expected_response)[i];
      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
       
        obj[a] = obj[key];
        delete obj[key];
        
      });
      result[i]=obj;
      
      
    }

    //console.log((result)[0].multipleMatchedTransactionId)
     

     for(i=0;i<len;i++)
  {

  result[i].currencyExponent=parseInt(result[i].currencyExponent);
  result[i].multipleMatchedTransactionId=parseInt(result[i].multipleMatchedTransactionId);
  result[i].caseNumber=parseInt(result[i].caseNumber);
  result[i].etlbatchid=parseInt(result[i].etlbatchid);
  result[i].transactionAmount=parseInt(result[i].transactionAmount);
  
  result[i].foreignAmount=parseInt(result[i].foreignAmount);
  
  result[i].batchAmount=parseInt(result[i].batchAmount);
  
  result[i].authorizationAmount=parseInt(result[i].authorizationAmount);
  result[i].cashBackAmount=parseInt(result[i].cashBackAmount);
 // result[i].auditId=parseInt(result[i].auditId);
  result[i].cardNumberSk=parseInt(result[i].cardNumberSk);

  }

}
  
  
else {
 console.log("Dynamic query generator has not generated any query! Please check configurations");
 addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
}


if (response.statusCode = 200) {
  var actualResponse = ((response.body).data);

}


 var actualInvoiceNumber=actualResponse[0].invoiceNumber;
 var resultInvoiceNumber=result[0].invoiceNumber;

 if(actualInvoiceNumber==resultInvoiceNumber)
 {
   console.log("Invoice Numbers are matched")
 }
 else
 {
  console.log("Invoice Numbers are not matched")
 }

 
 
 
 for(i=0;i<len;i++)
 {
  
  
utils.VerifyResponseBody(object,actualResponse[i].depositControlNumber,result[i].depositControlNumber);
 
utils.VerifyResponseBody(object,actualResponse[i].globalToken,result[i].globalToken);
utils.VerifyResponseBody(object,actualResponse[i].batchAmount,result[i].batchAmount);
utils.VerifyResponseBody(object,actualResponse[i].cardholderIdMethod,result[i].cardholderIdMethod);
utils.VerifyResponseBody(object,actualResponse[i].foreignDomesticInd,result[i].foreignDomesticInd);
utils.VerifyResponseBody(object,actualResponse[i].cardNumberSk,result[i].cardNumberSk);

utils.VerifyResponseBody(object,actualResponse[i].cardNumberRk,result[i].cardNumberRk);
utils.VerifyResponseBody(object,actualResponse[i].authorizationCode,result[i].authorizationCode);

utils.VerifyResponseBody(object,actualResponse[i].transactionIdentifier,result[i].transactionIdentifier);
utils.VerifyResponseBody(object,actualResponse[i].currencyCode,result[i].currencyCode);

utils.VerifyResponseBody(object,actualResponse[i].orgnlTransactionRefrncNbr,result[i].orgnlTransactionRefrncNbr);

utils.VerifyResponseBody(object,actualResponse[i].posEntryMode,result[i].posEntryMode);
utils.VerifyResponseBody(object,actualResponse[i].depositControlNumber,result[i].depositControlNumber);
utils.VerifyResponseBody(object,actualResponse[i].transactionTime,result[i].transactionTime);

utils.VerifyResponseBody(object,actualResponse[i].transactionCode,result[i].transactionCode);
utils.VerifyResponseBody(object,actualResponse[i].transactionDate,result[i].transactionDate);
 utils.VerifyResponseBody(object,actualResponse[i].transactionAmount,result[i].transactionAmount);
utils.VerifyResponseBody(object,actualResponse[i].merchantNumber,result[i].merchantNumber);
utils.VerifyResponseBody(object,actualResponse[i].wwmasterTransactionSk,result[i].wwmasterTransactionSk);
utils.VerifyResponseBody(object,actualResponse[i].caseNumber,result[i].caseNumber);
utils.VerifyResponseBody(object,actualResponse[i].multipleMatchedTransactionId,result[i].multipleMatchedTransactionId)
 
 }

 
 
}


/*
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

function template1_failure(object, testData,url) {
  object._runnable.title = testData.TestCaseName;
  utils.testCaseInfo(object, testData);
  addContext(object, "url :" + url);
  var options = {headers: config.header, qs:testData.input };
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}