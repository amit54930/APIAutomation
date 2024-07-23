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
var config_CaseMatchFailQueueAPI = config.CaseMatchFailQueueAPI;


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
var root_url = config.servicecasedata_root_url+config_CaseMatchFailQueueAPI.call_Suffix_toCaseMatchFailQueue;


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
    //    console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
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

//  var url = root_url;
//console.log("@@@@@@@@ inside success @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);
  var options = {headers: config.header, qs:testData.input}
  var response = getResponse(url, object, testData, options);
  //addContext(object, "response :" + JSON.stringify(response.body));
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 //console.log("Status Code Matched");
  //Get the Queries Array
  /*
  var queries = Query.generateDynamicQuery(testData.queueId);

  if (!queries.length == 0) {
  //console.log('dataQuery :'+queries);

   var expected_response = Framework.dbValidator(queries,
    config.SQLConnectionURL,
    config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure1.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

     console.log("+++++++++"+JSON.stringify(expected_response));
      var obj = JSON.parse(expected_response)[0];
      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
        obj[a] = obj[key];
        delete obj[key];
      });
      var result1=obj;

      var obj1 = JSON.parse(expected_response)[1];
      Object.keys(obj1).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
        obj1[a] = obj1[key];
        delete obj1[key];
      });
      var result2=obj1;

      var ob= [];
  ob[0] = result1;
  ob[1] = result2;

var a=parseInt(ob[0].matchedFailCaseId);
  var b=parseInt(ob[1].matchedFailCaseId);
  var tm1=parseInt(ob[0].transactionMasterId);
  var tm2=parseInt(ob[1].transactionMasterId);
  var csi1=parseInt(ob[0].caseStageId);
  var csi2=parseInt(ob[1].caseStageId);
  var ds1=parseInt(ob[0].disputeSourceId);
  var ds2=parseInt(ob[1].disputeSourceId);
  var ni1=parseFloat(ob[0].nextInSequence);
  var ni2=parseFloat(ob[1].nextInSequence);
  var dm1=parseFloat(ob[0].disputeAmount);
  var dm2=parseFloat(ob[1].disputeAmount);
  var q1=parseFloat(ob[0].queueId);
  var q2=parseFloat(ob[1].queueId);
  var sc1=parseFloat(ob[0].stageConfigId);
  var sc2=parseFloat(ob[1].stageConfigId);
  var di1=parseFloat(ob[0].disputeStageId);
  var di2=parseFloat(ob[1].disputeStageId);
  var si1=parseFloat(ob[0].statusId);
  var si2=parseFloat(ob[1].statusId);
  var fm1=parseFloat(ob[0].foreignAmount);
  var fm2=parseFloat(ob[1].foreignAmount);
  var ba1=parseFloat(ob[0].batchAmount);
  var ba2=parseFloat(ob[1].batchAmount);
  var cn1=parseInt(ob[0].caseNumber);
  var cn2=parseInt(ob[1].caseNumber);
  var ca1=parseFloat(ob[0].cashBackAmount);
  var ca2=parseFloat(ob[1].cashBackAmount);
  var cnk1=parseInt(ob[0].cardNumberSk);
  var cnk2=parseInt(ob[1].cardNumberSk)
  var aa1=parseInt(ob[0].authorizationAmount);
  var aa2=parseInt(ob[1].authorizationAmount)
  var o ={};
  
 var key1 ='content';
 o[key1]=[];
 o[key1].push({"caseDetail":{
  "caseNumber":cn1,
  "globalToken": result1.globalToken[0],
  "merchantToken": result1.merchantToken,
  "acqReferenceNumber": result1.acqReferenceNumber,
  "transactionAmount": result1.transactionAmount,
  "transactionDate": result1.transactionDate,
  "authorizationCode": result1.authorizationCode,
  "transactionMasterId":tm1,
  "merchantHierarchyId": result1.merchantHierarchyId,
  "foreignDomesticIndicator": result1.foreignDomesticIndicator,
  "cardBrandCode": result1.cardBrandCode,
  "cardBrandRegionCode": result1.cardBrandRegionCode,
  "merchantRegionCode": result1.merchantRegionCode,
  "acquirerBinIca": result1.acquirerBinIca,
  "issuerBinIca": result1.issuerBinIca,
  "acquirerName": result1.acquirerName,
  "lastModifiedBy": result1.lastModifiedBy,
  "lastModifiedTimestamp": result1.lastModifiedTimestamp,
  "createdBy": result1.createdBy,
  "createdTimestamp": result1.createdTimestamp,
  "maskedCardNumber": result1.maskedCardNumber,
  "merchantName": result1.merchantName
 },"caseStageDetail": {
  "caseStageId": csi1,
  "caseNumber": cn1,
  "disputeSourceId": ds1,
  "matchedFailCaseId":a,
  "disputeReasonCode": result1.disputeReasonCode,
  "nextInSequence": ni1,
  "duplicateInd": result1.duplicateInd,
  "cardBrandCaseNumber": result1.cardBrandCaseNumber,
  "cardBrandMerchantNumber": result1.cardBrandMerchantNumber,
  "retreivalResponseDueDate": result1.retreivalResponseDueDate,
  "caseReceivedDate": result1.caseReceivedDate,
  "disputeCurrencyCode": result1.disputeCurrencyCode,
  "disputeAmount":dm1,
  "merchantStripOffInd": result1.merchantStripOffInd,
  "supportDocumentInd": result1.supportDocumentInd,
  "queueId": q1,
  "stageConfigId": sc1,
  "disputeStageId": di1,
  "disputeStageName":result1.disputeStageName,
  "statusId": si1,
  "lastModifiedBy": result1.lastModifiedBy,
  "lastModifiedTimestamp":result1.lastModifiedTimestamp,
  "createdBy": result1.createdBy,
  "createdTimestamp": result1.createdTimestamp,
  "caseStageName":result1.caseStageName,
  "memberMessageText":result1.memberMessageText
},
"transactionDetail": {
  "transactionMasterId": tm1,
  "wwmasterTransactionSettledSk":result1.wwmasterTransactionSettledSk,
  "etlbatchid": result1.etlbatchid,
  "recordCode": result1.recordCode,
  "acqReferenceNumber": result1.acqReferenceNumber,
  "merchantNumber": result1.merchantNumber,
  "originalTransactionReferenceNumber":result1.originalTransactionReferenceNumber,
  "transactionAmount":result1.transactionAmount,
  "transactionCode": result1.transactionCode,
  "transactionDate": result1.transactionDate,
  "transactionTime": result1.transactionTime,
  "invoiceNumber":result1.invoiceNumber,
  "foreignDomesticInd":result1.foreignDomesticInd,
  "authorizationSourceCode":result1.authorizationSourceCode,
  "cardholderIdMethod": result1.cardholderIdMethod,
  "terminalEntryMode": result1.terminalEntryMode,
  "transactionIdentifier": result1.transactionIdentifier,
  "currencyCode":result1.currencyCode,
  "mcc": result1.mcc,
  "posEntryMode": result1.posEntryMode,
  "currencyExponent": result1.currencyExponent,
  "foreignAmount":fm1,
  "batchDate": result1.batchDate,
  "batchNumber": result1.batchNumber,
  "batchAmount": ba1,
  "recurringPayInd": result1.recurringPayInd,
  "categoryInd": result1.categoryInd,
  "securityProtocol": result1.securityProtocol,
  "cardAuthenticationInd": result1.cardAuthenticationInd,
  "universalCardholderAuthenticationFieldInd":result1.universalCardholderAuthenticationFieldInd,
  "requestedPaymentServiceInd": result1.requestedPaymentServiceInd,
  "terminalTid": result1.terminalTid,
  "motoEcInd":  result1.motoEcInd,
  "terminalCapacityInd": result1.terminalCapacityInd,
  "authorizationResponseCode":  result1.authorizationResponseCode,
  "authorizationInd":  result1.authorizationInd,
  "transactionType":  result1.transactionType,
  "terminalTransactionDate":  result1.terminalTransactionDate,
  "terminalCapabilityProfile":  result1.terminalCapabilityProfile,
  "terminalCountryCode":  result1.terminalCountryCode,
  "cryptogramCode":  result1.cryptogramCode,
  "terminalVerificationResultCode":  result1.terminalVerificationResultCode,
  "cryptogramUnpredictableNumber":  result1.cryptogramUnpredictableNumber,
  "applicationTransactionCount":  result1.applicationTransactionCount,
  "applicationInterchangeProfile":  result1.applicationInterchangeProfile,
  "cryptogramInformation":  result1.cryptogramInformation,
   "issuerApplicationByte2Data":  result1.issuerApplicationByte2Data,
  "issuerApplicationByte3Data":  result1.issuerApplicationByte3Data,
  "issuerApplicationByte4to7Data":  result1.issuerApplicationByte4to7Data,
  "issuerApplicationByte8Data":  result1.issuerApplicationByte8Data,
  "authorizationAmount":  aa1,
  "mcQuickPaymentServiceInd":  result1.mcQuickPaymentServiceInd,
  "authorizationCode":  result1.authorizationCode,
  "depositControlNumber":  result1.depositControlNumber,
  "cashBackAmount":  ca1,
  "auditId":  result1.auditId,
  "remarks":  result1.remarks,
  "cardNumberSk":  cnk1,
  "merchantToken":  result1.merchantToken,
  "cardNumberRk":  result1.cardNumberRk,
  "seqNumberToken":  result1.seqNumberToken,
  "globalToken":  result1.globalToken[0],
  "createdBy":  result1.createdBy,
  "createdTimestamp":  result1.createdTimestamp,
}
}, {"caseDetail":{
  "caseNumber": cn2,
  "globalToken": result2.globalToken[0],
  "merchantToken": result2.merchantToken,
  "acqReferenceNumber": result2.acqReferenceNumber,
  "transactionAmount": result2.transactionAmount,
  "transactionDate": result2.transactionDate,
  "authorizationCode": result2.authorizationCode,
  "transactionMasterId": tm2,
  "merchantHierarchyId": result2.merchantHierarchyId,
  "foreignDomesticIndicator": result2.foreignDomesticIndicator,
  "cardBrandCode": result2.cardBrandCode,
  "cardBrandRegionCode": result2.cardBrandRegionCode,
  "merchantRegionCode": result2.merchantRegionCode,
  "acquirerBinIca": result2.acquirerBinIca,
  "issuerBinIca": result2.issuerBinIca,
  "acquirerName": result2.acquirerName,
  "lastModifiedBy": result2.lastModifiedBy,
  "lastModifiedTimestamp": result2.lastModifiedTimestamp,
  "createdBy": result2.createdBy,
  "createdTimestamp": result2.createdTimestamp,
  "maskedCardNumber": result2.maskedCardNumber,
  "merchantName": result2.merchantName
 },"caseStageDetail": {
  "caseStageId": csi2,
  "caseNumber": cn2,
  "disputeSourceId": ds2,
  "matchedFailCaseId": b,
  "disputeReasonCode": result2.disputeReasonCode,
  "nextInSequence":ni2,
  "duplicateInd": result2.duplicateInd,
  "cardBrandCaseNumber": result2.cardBrandCaseNumber,
  "cardBrandMerchantNumber": result2.cardBrandMerchantNumber,
  "retreivalResponseDueDate": result2.retreivalResponseDueDate,
  "caseReceivedDate": result2.caseReceivedDate,
  "disputeCurrencyCode": result2.disputeCurrencyCode,
  "disputeAmount": dm2,
  "merchantStripOffInd": result2.merchantStripOffInd,
  "supportDocumentInd": result2.supportDocumentInd,
  "queueId":q2,
  "stageConfigId": sc2,
  "disputeStageId": di2,
  "disputeStageName":result2.disputeStageName,
  "statusId": si2,
  "lastModifiedBy": result2.lastModifiedBy,
  "lastModifiedTimestamp":result2.lastModifiedTimestamp,
  "createdBy": result2.createdBy,
  "createdTimestamp": result2.createdTimestamp,
  "caseStageName":result2.caseStageName,
  "memberMessageText":result2.memberMessageText
},
"transactionDetail": {
  "transactionMasterId":tm2,
  "wwmasterTransactionSettledSk":result2.wwmasterTransactionSettledSk,
  "etlbatchid": result2.etlbatchid,
  "recordCode": result2.recordCode,
  "acqReferenceNumber": result2.acqReferenceNumber,
  "merchantNumber": result2.merchantNumber,
  "originalTransactionReferenceNumber":result2.originalTransactionReferenceNumber,
  "transactionAmount":result2.transactionAmount,
  "transactionCode": result2.transactionCode,
  "transactionDate": result2.transactionDate,
  "transactionTime": result2.transactionTime,
  "invoiceNumber":result2.invoiceNumber,
  "foreignDomesticInd":result2.foreignDomesticInd,
  "authorizationSourceCode":result2.authorizationSourceCode,
  "cardholderIdMethod": result2.cardholderIdMethod,
  "terminalEntryMode": result2.terminalEntryMode,
  "transactionIdentifier": result2.transactionIdentifier,
  "currencyCode":result2.currencyCode,
  "mcc": result2.mcc,
  "posEntryMode": result2.posEntryMode,
  "currencyExponent": result2.currencyExponent,
  "foreignAmount": fm2,
  "batchDate": result2.batchDate,
  "batchNumber": result2.batchNumber,
  "batchAmount": ba2,
  "recurringPayInd": result2.recurringPayInd,
  "categoryInd": result2.categoryInd,
  "securityProtocol": result2.securityProtocol,
  "cardAuthenticationInd": result2.cardAuthenticationInd,
  "universalCardholderAuthenticationFieldInd":result2.universalCardholderAuthenticationFieldInd,
  "requestedPaymentServiceInd": result2.requestedPaymentServiceInd,
  "terminalTid": result2.terminalTid,
  "motoEcInd":  result2.motoEcInd,
  "terminalCapacityInd": result2.terminalCapacityInd,
  "authorizationResponseCode":  result2.authorizationResponseCode,
  "authorizationInd":  result2.authorizationInd,
  "transactionType":  result2.transactionType,
  "terminalTransactionDate":  result2.terminalTransactionDate,
  "terminalCapabilityProfile":  result2.terminalCapabilityProfile,
  "terminalCountryCode":  result2.terminalCountryCode,
  "cryptogramCode":  result2.cryptogramCode,
  "terminalVerificationResultCode":  result2.terminalVerificationResultCode,
  "cryptogramUnpredictableNumber":  result2.cryptogramUnpredictableNumber,
  "applicationTransactionCount":  result2.applicationTransactionCount,
  "applicationInterchangeProfile":  result2.applicationInterchangeProfile,
  "cryptogramInformation":  result2.cryptogramInformation,
  "issuerApplicationByte2Data":  result2.issuerApplicationByte2Data,
  "issuerApplicationByte3Data":  result2.issuerApplicationByte3Data,
  "issuerApplicationByte4to7Data":  result2.issuerApplicationByte4to7Data,
  "issuerApplicationByte8Data":  result2.issuerApplicationByte8Data,
  "authorizationAmount":  aa2,
  "mcQuickPaymentServiceInd":  result2.mcQuickPaymentServiceInd,
  "authorizationCode":  result2.authorizationCode,
  "depositControlNumber":  result2.depositControlNumber,
  "cashBackAmount": ca2,
  "auditId":  result2.auditId,
  "remarks":  result2.remarks,
  "cardNumberSk":  cnk2,
  "merchantToken":  result2.merchantToken,
  "cardNumberRk":  result2.cardNumberRk,
  "seqNumberToken":  result2.seqNumberToken,
  "globalToken":  result2.globalToken[0],
  "createdBy":  result2.createdBy,
  "createdTimestamp":  result2.createdTimestamp,
}
});



 //console.log("______________databaSE_________________________"+JSON.stringify(o));
}//if
  else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }
  //If response body has data then verify actual response with expected response
  if (response.statusCode = 200) {
    var actual2 = (response.body).data.content;


 //console.log(typeof actual2 );
 var ox=o.content;
// console.log("~~~~~~~expected DATABASE~~~~~~~~~~~~~~~~~~"+JSON.stringify(ox));
// console.log("*******************actual response+++++++++"+JSON.stringify(actual2));
utils.VerifyResponseBody(object,actual2,ox,['pageable','offset','sort','last','pageSize',
'pageNumber','paged','unpaged','totalPages',
'number','numberOfElements','first','empty','unsorted','sorted',
'totalElements',
'authCode', 'cardBrandName', 'createdTimestamp', 'createdBy',
'lastModifiedBy', 'lastModifiedTimestamp', 'createdBy', 'caseStageName','size',
 'discoverNetworkReferenceId','disputeAmount','transactionAmount','disputeStageName',
'wwmasterTransactionSettledSk','etlbatchid','acqReferenceNumber','originalTransactionReferenceNumber',
'universalCardholderAuthenticationFieldInd','authorizationCode','merchantHierarchyId','merchantToken',
'transactionDate','matchedFailCaseId','statusId','transactionDate','mcc','terminalVerificationResultCode',
'cryptogramUnpredictableNumber','issuerApplicationByte4to7Data',
'issuerApplicationByte9to16Data','issuerApplicationByte18to32Data',
'authorizationAmount','auditId','remarks','applicationInterchangeProfile','cardBrandRegionCode',
'acquirerBinIca','globalToken','merchantCountryCode','merchantRegionCode','merchantCategoryCode',
'merchantCity','transactionTime','networkReferenceId','batchAmount','foreignAmount','cashBackAmount',
'cardNumberSk','issuerApplicationByte17Data','issuerApplicationByte1Data','0.transactionDetail.transactionCurrencyDesc',
'1.transactionDetail.transactionCurrencyDesc']
);
  } else {
    console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }*/
}//success

/**
 *For fail flow - 400 response code
 * @param testData : test data need to be passed
 */
function template1_failure(object, testData,url) {

  object._runnable.title = testData.TestCaseName;
  //var url = root_url;

  //console.log("@@@@@@@@failure@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ "+url);
  var options = { headers: config.header,qs:testData.input}
     utils.testCaseInfo(object, testData);

  addContext(object, "url :" + url);
  //console.log('testData.type: ' + testData.type);

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

