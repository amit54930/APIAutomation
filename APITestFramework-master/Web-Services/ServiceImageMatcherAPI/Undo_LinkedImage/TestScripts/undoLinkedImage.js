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
var config_Undo_LinkedImageAPI = config.Undo_LinkedImageAPI;

//import test data object
var test_data_path = path.join(__dirname, config.test_data_root_path);
//console.log('test_data_path :'+test_data_path);
var test_data = fs.readFileSync(test_data_path, 'utf8');


//convert test data into json object
var test_data_obj = JSON.parse(test_data);
var test_data_TestCaseWise = test_data_obj.TestCase;


//Web service URL
var root_url = config.service_image_matcher_root_url;

//import query object
var Query = require(path.join(__dirname, config.test_query_root_path));

// Start with test suits

//Event emitter block to wait for before hook and then iterate through test data sets to execute Test case templates

var eventEmitter = new events();

//Subscriber to catch data events and execute test cases accordingly
eventEmitter.on("testCaseData", function (testCaseData) {
  it(execution_group, function () {
    var url = root_url + config_Undo_LinkedImageAPI.call_suffix_toUndoLinkedImage;
    url = url.replace("{documentId}", testCaseData.documentId);
    switch (testCaseData.template) {
      case 1:

        template_POST200(this, testCaseData, url);
        break;

      case 2:

        template_POST404(this, testCaseData, url);
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
function template_POST200(object, testData, url) {

  var options = {
    headers: config.header
  }
  var queries = Query.generateDynamicQuery(testData.documentId);
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

  if(!expected_response1 == undefined){
 /* var options = {
    headers: config.header
  }*/

  expected_response1 = JSON.parse(expected_response1);
  var queue_id = expected_response1[0].queue_id;
  var document_directory_id = expected_response1[0].document_directory_id;
  var document_type_id  =expected_response1[0].document_type_id;
  
  if(document_type_id==2)
  {
    //console.log("Archiving a merchant image");
    addContext(object,"Unlinking a merchant image");
  }
  else if(document_type_id==5)
  {
    //console.log("Archiving a scheme image");
    addContext(object,"Unlinking a scheme image");
  }
  if (queue_id!=63) {
    
    var response = getResponse(url, object, testData, options);

    //addContext(object, "response :" + JSON.stringify(response.body));
    utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);


    //console.log("Status Code Matched");
    var queries = Query.generateDynamicQuery(testData.documentId);
    if (!queries.length == 0) {

      //console.log("dataQuery************ :"+queries);
      var expected_response = Framework.dbValidator(queries,
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
    expected_response = JSON.parse(expected_response);
    var queue_id = expected_response[0].queue_id;
    var document_directory_id = expected_response[0].document_directory_id;
    if (queue_id == 63 && document_directory_id ==19) {
      //console.log("queue_id is updated to " + queue_id+" and scheme image is unlinked successfully");
      addContext(object, "queue_id is updated to " + queue_id+" and scheme image is unlinked successfully");
    }
    else if (queue_id == 63 && document_directory_id ==20) {
     // console.log("queue_id is updated to " + queue_id+" and merchant image is unlinked successfully");
      addContext(object, "queue_id is updated to " + queue_id+" and merchant image is unlinked successfully");
    }
  }

  else if (!queue_id==63){
    console.log("This document is already unlinked");
    addContext(object, "Warning ..." + "This document is already unlinked");

  }
}
else{
  var response = getResponse(url, object, testData, options);
  
  console.log("This document id is not valid");
  addContext(object, "Warning ..." + "This document id is not valid!!");
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
}
}

/**
 *For fail flow i.e 404 response code
 * @param testData : test data need to be passed
 * @param url : API url
 */
function template_POST404(object, testData, url) {
  var options = {
    headers: config.header
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
