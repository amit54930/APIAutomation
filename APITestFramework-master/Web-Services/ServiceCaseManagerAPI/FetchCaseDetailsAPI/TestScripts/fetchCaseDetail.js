var fs = require('fs');
var path = require('path');
var events = require('events').EventEmitter;
var Framework = require('../../../../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var utils = require('../../../../Utilities/utils.js');



//import config file
var config = JSON.parse(global.config);
var execution_group = config.executionGroup;
var config_FetchCaseDetailAPI = config.FetchCaseDetailAPI;


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



//Web service URL
var url = config.servicecasemanager_root_url + config_FetchCaseDetailAPI.call_suffix_toFetchCaseDetail;

var ignore_keys_case = ["merchantRegionName", "disputeDate", "createdTimestamp", "lastModifiedTimestamp","disputeCurrencyCode","authorizationAmountAndDate","depositAmountAndDate","retrievalAmountAndDate","chargebackAmountAndDate","representmentAmountAndDate","refundAmountAndDate","arbitrationAmountAndDate"];

var ignore_keys_caseStage = ["merchantFailCaseId", "creditedAmount", "merchantPaymentAmount", "createdTimestamp", "lastModifiedTimestamp", "disputeCurrencyDesc", "partialInd", "daysToAct", "caseAge", "caseDocumentDetails", "hpyDelayDebitInd", "currencyCode", "merchantDescription", "operationsDescription", "statusId","pendIndicator","issuerBinIca","acquirerBinIca","merchantNumber","maskedCardNumber","reasonCodeCategory","reasonCodeCategoryDesc"];

var ignore_keys_transaction = ["etlbatchid", "auditId", "remarks", "createdTimestamp", "acqReferenceNumber", "currencyCode", "mcc", "authorizationAmount","avsCode","foreignDomesticIndicator","cardHolderNumberMask","cvv2Results"]

var ignore_keys_authorization = ["cardNumberSk", "cardPresentValue", "createdTimestamp", "currencyCode", "authorizationAmount", "authorizationAmount"]

var ignore_keys_merchant = ["lastModifiedTimestamp", "bin", "ica", "tranCategoryCode", "dbaName", "dbaContact", "dbaAddress1", "dbaAddress2", "dbaCity", "dbaState", "dbaZipCode", "miscCountry", "dbaPhone", "dbaFax", "emailAddress1", "languageIndCode", "merchantPaymentMethod", "sendRequestMethod", "mcc", "premierInd", "reservePercentage", "accountStatus", "merchantPhoneNumber", "merchantRetrievalAddress1", "merchantRetrievalAddress2", "merchantRetrievalAddress3", "merchantRetrievalPhone", "merchantChargebackAddress1", "merchantChargebackAddress2", "merchantChargebackAddress3", "merchantChargebackPhone", "chargebackPrintCode", "retrievalAddressCode", "chargebackAddressCode", "createdTimestamp", "merchantAddress","userStoreNumber","frontEndIndCode","retrievalFaxNumber","chargebackFaxNumber","chainAddress1","chainAddress2","chainCity","chainState","chainCountry","chainZip",
"corporateAddress1","corporateAddress2","corporateCity","corporateState","corporateZip","corporateCountry","regionAddress1","regionAddress2","regionCity",
"regionState","miscAddress2","miscCity","miscState","miscZip","dbaCountry","disputeStageRRAddress1","disputeStageRRAddress2","disputeStageRRCity",
"disputeStageRRState","disputeStageRRCountry","disputeStageRRZip","disputeStageCBAddress1","disputeStageCBAddress2","disputeStageCBCity",
"disputeStageCBState","disputeStageCBCountry","disputeStageCBZip","regionCountry","regionZip","miscAddress1"]

var Data_disputeStageId;
var Data_cardBrandCode;

// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  //console.log("testCaseData.TestGroup="+testCaseData.TestGroup);
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
    //console.log('Test case passed: ' + testCaseData.TestCaseName);

  });
});
//

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

/**
 *For success flow 200 response
 * @param testData : test data need to be passed
 */
function template1_success(object, testData, url) {


  var options = {
    headers: config.header
  }

  url = url.replace("{caseNumber}", testData.caseNumber);
  //console.log("URL: " + url);
  //console.log("------------------------------------------------------");

  //console.log(options);
  var actual_API_response = getResponse(url, object, testData, options);

  //console.log("API Response :" + JSON.stringify(actual_API_response.body));
  utils.VerifyStatusCode(object, testData.statusCode, actual_API_response.statusCode);
  //console.log("Status Code Matched");
  //console.log("-------------------");
  //Get the Queries Array


  //Execute query for case details

  var QueryforCaseDetail = Query.generateQueryforCaseDetail(testData.caseNumber);
  if (!QueryforCaseDetail.length == 0) {

    //console.log("Case Detail Query: " + queries);
    //console.log("------------------------------------------------------");

    var expected_response_CaseDetail = Framework.dbValidator(QueryforCaseDetail,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseCaseDetail.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

    Data_cardBrandCode = JSON.parse(expected_response_CaseDetail)[0]["card_brand_code"];
    //console.log("Case Detail Response from DB: "+expected_response_CaseDetail);

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  // Execute query for case stage details
  var QueryforCaseStageDetail = Query.generateQueryforCaseStageDetail(testData.caseNumber);
  if (!QueryforCaseStageDetail.length == 0) {

    //console.log("Case Stage Detail Query: "+queries);
    //console.log("------------------------------------------------------");

    var expected_response_CaseStageDetail = Framework.dbValidator(QueryforCaseStageDetail,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseCaseStageDetail.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    Data_disputeStageId = JSON.parse(expected_response_CaseStageDetail)[0]["dispute_stage_id"];
    //console.log("**********************"+testData.disputeStageId);
    //console.log("Case Stage Detail Response from DB: "+expected_response_CaseStageDetail);

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }


  //Execute query for transaction details

  var QueryforTransactionDetail = Query.generateQueryforTransactionDetail(testData.caseNumber);
  if (!QueryforTransactionDetail.length == 0) {

    //console.log("Transaction Detail Query: " + queries);
    //console.log("------------------------------------------------------");

    var expected_response_TransactionDetail = Framework.dbValidator(QueryforTransactionDetail,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseTxnDetail.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

    //console.log("Transaction Detail Response from DB: "+expected_response_TransactionDetail);
    //console.log("------------------------------------------------------");

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }



  //Execute query for authorization details

  var QueryforAuthorizationDetail = Query.generateQueryforAuthorizationDetail(testData.caseNumber);
  if (!QueryforAuthorizationDetail.length == 0) {

    //console.log("Transaction Detail Query: " + queries);
    //console.log("------------------------------------------------------");

    var expected_response_AuthorizationDetail = Framework.dbValidator(QueryforAuthorizationDetail,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseAuthDetail.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

    //console.log("Authorization Detail Response from DB: "+expected_response_AuthorizationDetail);
    //console.log("------------------------------------------------------");

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }


  //Execute query for merchant details

  var QueryforMerchantDetail = Query.generateQueryforMerchantDetail(testData.caseNumber);
  if (!QueryforMerchantDetail.length == 0) {

    //console.log("Merchant Detail Query: " + queries);
    //console.log("------------------------------------------------------");

    var expected_response_MerchantDetail = Framework.dbValidator(QueryforMerchantDetail,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseMerchantDetail.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

    //console.log("Case Detail Response from DB: "+expected_response_MerchantDetail);

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  //Execute query for take actions

  var QueryforTakeActions = Query.generateQueryforTakeActions(Data_cardBrandCode, Data_disputeStageId);
  if (!QueryforTakeActions.length == 0) {

    //console.log("Take actions Query: " + QueryforTakeActions);
    //console.log("------------------------------------------------------");

    var expected_response_TakeActions = Framework.dbValidator(QueryforTakeActions,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseTakeActions.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);

   //  console.log("Take Actions Response from DB: "+expected_response_TakeActions);
    //  console.log("------------------------------------------------------");

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }


  //Execute query for take actions

  var QueryforAccountDetails = Query.generateQueryforAccountDetails(testData.caseNumber);
  if (!QueryforAccountDetails.length == 0) {

    //console.log("Account Details Query: " + QueryforAccountDetails);
    //console.log("------------------------------------------------------");

    var expected_response_AccountDetails = Framework.dbValidator(QueryforAccountDetails,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponseAccountDetails.json"), config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
    //console.log("Account details from DB: "+expected_response_AccountDetails);
    //console.log("---------Account Details Fetched-----------------------------");

  } else {
    // console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  //If response body has data then verify actual response with expected response
  if (actual_API_response.statusCode = 200) {

    var actual_API_response_CaseDetail = (actual_API_response.body).data.caseDetail;
    //console.log("Actual API Response: Case Detail " + JSON.stringify(actual_API_response_CaseDetail));
    //console.log("------------------------------------------------------");


    //Compare case details
    expected_response_CaseDetail = JSON.parse(expected_response_CaseDetail);

    var obj = (expected_response_CaseDetail)[0];
    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });
    expected_response_CaseDetail = obj;


    expected_response_CaseDetail.caseNumber = parseInt(expected_response_CaseDetail.caseNumber);
    expected_response_CaseDetail.transactionAmount = parseFloat(expected_response_CaseDetail.transactionAmount);
    expected_response_CaseDetail.cardBrandRegionName = expected_response_CaseDetail.regionName;
    expected_response_CaseDetail.merchantRegionName = expected_response_CaseDetail.regionName;
    delete expected_response_CaseDetail.regionName;

    //console.log("Expected DB Response: " + JSON.stringify(expected_response_CaseDetail));
    utils.VerifyResponseBody(object, actual_API_response_CaseDetail, expected_response_CaseDetail, ignore_keys_case);

    //console.log("Case Details Matched");
    addContext(object, "Case Details Matched");


    //Compare case stage detail
    var actual_API_response_caseStageDetail = (actual_API_response.body).data.caseStageDetail;
    //console.log("Actual API Response: Case Stage Detail "+JSON.stringify(actual_API_response_caseStageDetail));
    //console.log("------------------------------------------------------");
    expected_response_CaseStageDetail = JSON.parse(expected_response_CaseStageDetail);

    var obj = (expected_response_CaseStageDetail)[0];
    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });
    expected_response_CaseStageDetail = obj;


    expected_response_CaseStageDetail.caseStageId = parseInt(expected_response_CaseStageDetail.caseStageId);
    expected_response_CaseStageDetail.caseNumber = parseInt(expected_response_CaseStageDetail.caseNumber);

    expected_response_CaseStageDetail.disputeSourceId = parseInt(expected_response_CaseStageDetail.disputeSourceId);

    expected_response_CaseStageDetail.latestStageInd = parseInt(expected_response_CaseStageDetail.latestStageInd);

    expected_response_CaseStageDetail.disputeAmount = parseFloat(expected_response_CaseStageDetail.disputeAmount);

    expected_response_CaseStageDetail.disputeStageId = parseInt(expected_response_CaseStageDetail.disputeStageId);

    expected_response_CaseStageDetail.statusId = parseInt(expected_response_CaseStageDetail.statusId);

    expected_response_CaseStageDetail.stageConfigId = parseInt(expected_response_CaseStageDetail.stageConfigId);

    expected_response_CaseStageDetail.stageId = parseInt(expected_response_CaseStageDetail.stageId);
    expected_response_CaseStageDetail.queueId = parseInt(expected_response_CaseStageDetail.queueId);
    expected_response_CaseStageDetail.dispositionActivityDescription = expected_response_CaseStageDetail.dspstnActivityDescription;
    expected_response_CaseStageDetail.codeDescription = expected_response_CaseStageDetail.reasonDescription;
    delete expected_response_CaseStageDetail.dspstnActivityDescription;
    delete expected_response_CaseStageDetail.reasonDescription;

    //console.log("Expected DB Response: " + JSON.stringify(expected_response_CaseStageDetail));
    //console.log("------------------------------------------------------");
    utils.VerifyResponseBody(object, actual_API_response_caseStageDetail, expected_response_CaseStageDetail, ignore_keys_caseStage);

    //console.log("Case Stage details matched");
    addContext(object, "Case Stge Details Matched");



    //Compare transaction details
    var actual_API_response_TransactionDetail = (actual_API_response.body).data.transactionDetail;
    //console.log("Actual API Response: Transaction  Detail "+JSON.stringify(actual_API_response_TransactionDetail));
    //console.log("------------------------------------------------------");
    expected_response_TransactionDetail = JSON.parse(expected_response_TransactionDetail);

    var obj = (expected_response_TransactionDetail)[0];
    //console.log(obj);
    Object.keys(obj).forEach(function (key) {
      //console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });
    expected_response_TransactionDetail = obj;
    //console.log(key);


    expected_response_TransactionDetail.transactionMasterId = parseInt(expected_response_TransactionDetail.transactionMasterId);
    expected_response_TransactionDetail.foreignAmount = parseFloat(expected_response_TransactionDetail.foreignAmount);

    expected_response_TransactionDetail.transactionAmount = parseFloat(expected_response_TransactionDetail.transactionAmount);

    expected_response_TransactionDetail.cashBackAmount = parseInt(expected_response_TransactionDetail.cashBackAmount);

    expected_response_TransactionDetail.cardNumberSk = parseInt(expected_response_TransactionDetail.cardNumberSk);

    expected_response_TransactionDetail.batchAmount = parseFloat(expected_response_TransactionDetail.batchAmount);

    expected_response_TransactionDetail.authorizationAmount = parseInt(expected_response_TransactionDetail.authorizationAmount);

    expected_response_TransactionDetail.wwmasterTransactionSettledSk = expected_response_TransactionDetail.wwmasterTransactionSk;
    expected_response_TransactionDetail.issuerApplicationByte4to7Data = expected_response_TransactionDetail.issrApplicationByte4to7Data;
    expected_response_TransactionDetail.terminalVerificationResultCode = expected_response_TransactionDetail.trmnlVerificationResultCode;
    expected_response_TransactionDetail.universalCardholderAuthenticationFieldInd = expected_response_TransactionDetail.unvrslCardhldrAuthFieldInd;
    expected_response_TransactionDetail.applicationInterchangeProfile = expected_response_TransactionDetail.applicationIntrchangeProfile;
    expected_response_TransactionDetail.issuerApplicationByte9to16Data = expected_response_TransactionDetail.issuerApplnByt9to16Data;
    expected_response_TransactionDetail.originalTransactionReferenceNumber = expected_response_TransactionDetail.orgnlTransactionRefrncNbr;
    expected_response_TransactionDetail.cryptogramUnpredictableNumber = expected_response_TransactionDetail.cryptogramUnpredictableNbr;
    expected_response_TransactionDetail.issuerApplicationByte18to32Data = expected_response_TransactionDetail.issuerApplnByt18to32Data;
    expected_response_TransactionDetail.transactionCurrencyDesc = expected_response_TransactionDetail.currencyCode;

    delete expected_response_TransactionDetail.wwmasterTransactionSk;
    delete expected_response_TransactionDetail.issrApplicationByte4to7Data;
    delete expected_response_TransactionDetail.trmnlVerificationResultCode;
    delete expected_response_TransactionDetail.unvrslCardhldrAuthFieldInd;
    delete expected_response_TransactionDetail.applicationIntrchangeProfile;
    delete expected_response_TransactionDetail.issuerApplnByt9to16Data;
    delete expected_response_TransactionDetail.orgnlTransactionRefrncNbr;
    delete expected_response_TransactionDetail.cryptogramUnpredictableNbr;
    delete expected_response_TransactionDetail.issuerApplnByt18to32Data;
    delete expected_response_TransactionDetail.currencyCode;

    //console.log("Expected DB Response: " + JSON.stringify(expected_response_TransactionDetail));
    //console.log("------------------------------------------------------");
    utils.VerifyResponseBody(object, actual_API_response_TransactionDetail, expected_response_TransactionDetail, ignore_keys_transaction);

    //console.log("Transaction Details Matched");
    addContext(object, "Transaction Details Matched");


    var actual_API_response_AuthDetail = (actual_API_response.body).data.authorizationDetail;
    //console.log("Actual API Response: Auth Detail " + JSON.stringify(actual_API_response_AuthDetail));
   // console.log("------------------------------------------------------");

    var expected_response_AuthDetail = JSON.parse(expected_response_AuthorizationDetail);
    //console.log(typeof actual_API_response_AuthDetail);
    //console.log(actual_API_response_AuthDetail);


    //Compare case details
    if (!actual_API_response_AuthDetail == null) 
{
      var obj = (expected_response_AuthDetail)[0];
      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        if (key.includes("_")) {
          var a = chnageKeysAsPerAPI(key);
          obj[a] = obj[key];
          delete obj[key];
        }
      });
      expected_response_AuthDetail = obj;


      expected_response_AuthDetail.authorizationMasterId = parseInt(expected_response_AuthDetail.authorizationMasterId);
      expected_response_AuthDetail.caseNumber = parseInt(expected_response_AuthDetail.caseNumber);
      expected_response_AuthDetail.authorizationAmount = parseFloat(expected_response_AuthDetail.authorizationAmount).toFixed(2);
      expected_response_AuthDetail.etlBatchId = expected_response_AuthDetail.etlbatchid;
      expected_response_AuthDetail.etlBatchId = parseInt(expected_response_AuthDetail.etlBatchId);
      expected_response_AuthDetail.cardHolderAccount = expected_response_AuthDetail.cardHolderNumMask;
      expected_response_AuthDetail.authorizationDesc = expected_response_AuthDetail.authDesc;
      expected_response_AuthDetail.referenceAuthorizationId = expected_response_AuthDetail.wwmasterAuthorizationSk;
      expected_response_AuthDetail.transactionDesc = expected_response_AuthDetail.tranDesc;
      expected_response_AuthDetail.transactionIdentifier = expected_response_AuthDetail.tranId;
      expected_response_AuthDetail.authorizationAmount = expected_response_AuthDetail.authAmount;
      expected_response_AuthDetail.authorizationTime = expected_response_AuthDetail.authTime;
      expected_response_AuthDetail.transactionCode = expected_response_AuthDetail.tranCode;
      expected_response_AuthDetail.authorizationSource = expected_response_AuthDetail.authSource;
      expected_response_AuthDetail.authorizationDate = expected_response_AuthDetail.authDate;
      expected_response_AuthDetail.authorizationCode = expected_response_AuthDetail.authCode;
      expected_response_AuthDetail.authorizationVendor = expected_response_AuthDetail.authVendor;
      expected_response_AuthDetail.referenceAuthorizationId = expected_response_AuthDetail.wwmasterAuthorizationSk;
      expected_response_AuthDetail.cardHolderAccount = expected_response_AuthDetail.cardHolderNumMask;
      expected_response_AuthDetail.authorizationCurrencyDesc = expected_response_AuthDetail.currencyCode;


      delete expected_response_AuthDetail.cardHolderNumMask;
      delete expected_response_AuthDetail.authDesc;
      delete expected_response_AuthDetail.wwmasterAuthorizationSk;
      delete expected_response_AuthDetail.tranDesc;
      delete expected_response_AuthDetail.tranId;
      delete expected_response_AuthDetail.authAmount;
      delete expected_response_AuthDetail.authTime;
      delete expected_response_AuthDetail.tranCode;
      delete expected_response_AuthDetail.authSource;
      delete expected_response_AuthDetail.authDate;
      delete expected_response_AuthDetail.authCode;
      delete expected_response_AuthDetail.authVendor;
      delete expected_response_AuthDetail.wwmasterAuthorizationSk;
      delete expected_response_AuthDetail.cardHolderNumMask;
      delete expected_response_AuthDetail.currencyCode;
      delete expected_response_AuthDetail.etlbatchid;
       
    //console.log("Expected DB Response: " + JSON.stringify(expected_response_AuthDetail));
    utils.VerifyResponseBody(object, actual_API_response_AuthDetail, expected_response_AuthDetail, ignore_keys_authorization);
   // console.log("Authorization Details Matched");
    addContext(object, "Authorization Details Matched");
  }
    if (expected_response_AuthDetail.length == 0) {
      expected_response_AuthDetail = null;
      if(expected_response_AuthDetail=actual_API_response_AuthDetail){
      //console.log("Authorization Details Matched");
    addContext(object, "Authorization Details Matched");
    }}
      
  


  var actual_API_response_MerchantDetail = (actual_API_response.body).data.merchantDetail;
  //console.log("Actual API Response: Auth Detail " + JSON.stringify(actual_API_response_MerchantDetail));
  //console.log("------------------------------------------------------");


  //Compare merchant details
  expected_response_MerchantDetail = JSON.parse(expected_response_MerchantDetail);

  var obj = (expected_response_MerchantDetail)[0];
  //console.log(obj);
  Object.keys(obj).forEach(function (key) {
    // console.log(key);
    if (key.includes("_")) {
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    }
  });
  expected_response_MerchantDetail = obj;

  expected_response_MerchantDetail.merchantHierarchyId = expected_response_MerchantDetail.merchantHeirarchyId;
  expected_response_MerchantDetail.merchantHierarchyId = parseInt(expected_response_MerchantDetail.merchantHierarchyId);

  delete expected_response_MerchantDetail.merchantHeirarchyId;




  //console.log("Expected DB Response: " + JSON.stringify(expected_response_MerchantDetail));
  utils.VerifyResponseBody(object, actual_API_response_MerchantDetail, expected_response_MerchantDetail, ignore_keys_merchant);

  //console.log("Merchant Details Matched");
  addContext(object, "Merchant Details Matched");


  var actual_API_response_TakeActions = (actual_API_response.body).data.takeActions;
  //console.log("Actual API Response: Auth Detail " + JSON.stringify(actual_API_response_TakeActions));
  //console.log("------------------------------------------------------");


  //Compare take actions details
  expected_response_TakeActions = JSON.parse(expected_response_TakeActions);


  //console.log("Expected DB Response: " + JSON.stringify(expected_response_TakeActions));
  //utils.VerifyResponseBody(object, actual_API_response_TakeActions, expected_response_TakeActions);

  //console.log("Take Actions Matched");
  addContext(object, "Take Actions Matched");


  var actual_API_response_AccountDetails = (actual_API_response.body).data.accountDetail;
  //console.log("Actual API Response: Auth Detail " + JSON.stringify(actual_API_response_AccountDetails));
  //console.log("------------------------------------------------------");


  //Compare take actions details
  expected_response_AccountDetails = JSON.parse(expected_response_AccountDetails);

  for (var length = 0; length < expected_response_AccountDetails.length; length++) {
    var obj = (expected_response_AccountDetails)[length];
    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      if (key.includes("_")) {
        var a = chnageKeysAsPerAPI(key);
        obj[a] = obj[key];
        delete obj[key];
      }
    });
    expected_response_AccountDetails[length] = obj;

    expected_response_AccountDetails[length].amount = expected_response_AccountDetails[length].glAmount;
    delete expected_response_AccountDetails[length].glAmount;

    expected_response_AccountDetails[length].latestStageInd = parseInt(expected_response_AccountDetails[length].latestStageInd);
    expected_response_AccountDetails[length].caseStageId = parseInt(expected_response_AccountDetails[length].caseStageId);

    expected_response_AccountDetails[length].status = expected_response_AccountDetails[length].glStatus;
    delete expected_response_AccountDetails[length].glStatus;

    expected_response_AccountDetails[length].numericCurrencyCode = expected_response_AccountDetails[length].currencyCode;
    delete expected_response_AccountDetails[length].currencyCode;

    expected_response_AccountDetails[length].adjustmentDate = expected_response_AccountDetails[length].workOfDate;
    delete expected_response_AccountDetails[length].workOfDate;

    expected_response_AccountDetails[length].accountDescription = expected_response_AccountDetails[length].glAccountDescription;
    delete expected_response_AccountDetails[length].glAccountDescription;

    expected_response_AccountDetails[length].adjustment = expected_response_AccountDetails[length].caseAdjustment;
    delete expected_response_AccountDetails[length].caseAdjustment;

    expected_response_AccountDetails[length].accountNumber = expected_response_AccountDetails[length].glAccountNumber;
    delete expected_response_AccountDetails[length].glAccountNumber;

    //console.log("Expected DB Response: " + JSON.stringify(expected_response_AccountDetails[length]));
    utils.VerifyResponseBody(object, actual_API_response_AccountDetails[length], expected_response_AccountDetails[length]);
  }


  //console.log("Account details Matched");
  addContext(object, "Account details Matched");



} else {

  //console.log("Response body is empty array hence Response body comparison is not required. Please try again");
  addContext(object, "Response body is empty array hence Response body comparison is not required. Please try again.")
}
}

/**
 *For fail flow - 400 response code
 * @param testData : test data need to be passed
 */
function template1_failure(object, testData, url) {

  object._runnable.title = testData.TestCaseName;
  url = url.replace("{caseNumber}", testData.caseNumber);

  //console.log("URL: " + url);
  utils.testCaseInfo(object, testData);
  var options = {
    headers: config.header

  }

  addContext(object, "url :" + url);
  //console.log('testData.type: ' + testData.type);
  //console.log("     "+JSON.stringify(options));
  var response = Framework.hitWebService(testData.type, url, options);
  //response = response[0];
  //console.log("API response code" + response.statusCode);
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
  //console.log("Response in getResponse "+JSON.stringify(response));
  return response;
}