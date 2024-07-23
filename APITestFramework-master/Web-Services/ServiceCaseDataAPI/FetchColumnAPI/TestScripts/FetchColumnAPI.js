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
var config_FetchColumnAPI = config.FetchColumnAPI;

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
var root_url = config.servicecasedata_root_url;


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
    
    var url = root_url + config_FetchColumnAPI.call_suffix_toFetchColumnData;
  //  console.log(url);
    switch (testCaseData.template) {
      
      case 1:
      
      template_GET200(this, testCaseData, url);
      break;
      
      case 2:  
      template_GET404(this, testCaseData, url);
        break;
    }
    this._runnable.title = "Test case " + testCaseData.TestCaseName;
    console.log('test case passed: ' + testCaseData.TestCaseName);

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
        console.log("emit testCaseData for : " + test_data_TestCaseWise[eachTestData].TestCaseId);
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
function template_GET200(object, testData, url) {
  url=url.replace("{pageId}",testData.pageId);
 // console.log("URL **** "+url);
  var options = {headers:config.header, qs:testData.test}
  var response = getResponse(url, object, testData,options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  //console.log("Status Code Matched");

  //Get the Queries Array
  var queries1 = null;
  var queries2 = null;
  var queries3=null;
  queries1 = Query.generateDynamicQuery1(testData);
  queries2 = Query.generateDynamicQuery2(testData);
  queries3 = Query.generateDynamicQuery3(testData);

  //console.log("Queries *** "+queries)
  if (testData.test["userId"] == "system") {
      if (!queries1.length == 0) {
   
    var expected_response1 = Framework.dbValidator(queries1,
      config.SQLConnectionURL,
      config.resultType, 
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
      
     
      var obj = JSON.parse(expected_response1)[0];

      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
        obj[a] = obj[key];
        delete obj[key];
      }); 

      expected_response1=obj;

      var expected=expected_response1;
var columnElementDisplayOrder= parseInt(expected.columnElementDisplayOrder);
expected.columnElementDisplayOrder = columnElementDisplayOrder;
expected = JSON.stringify(expected);
//console.log(typeof expected);

expected = expected.replace("columnTooltipDescription","description");
expected = expected.replace("columnElementDisplayOrder","displayOrder");
expected = expected.replace("columnLabelName","name");
expected = expected.replace("columnDisplayType","displayType");
expected = expected.replace("gridColumnElementId","columnId");



//console.log(expected);

expected_response1=JSON.parse(expected);
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries2.length == 0) {
   
    var expected_response2 = Framework.dbValidator(queries2,
      config.SQLConnectionURL,
      config.resultType, 
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
      
     
      var obj = JSON.parse(expected_response2)[0];

      Object.keys(obj).forEach(function (key) {
        // console.log(key);
        var a = chnageKeysAsPerAPI(key);
        obj[a] = obj[key];
        delete obj[key];
      }); 

      expected_response2=obj;
var expected=expected_response2;
var columnElementDisplayOrder= parseInt(expected.columnElementDisplayOrder);
expected.columnElementDisplayOrder = columnElementDisplayOrder;
expected = JSON.stringify(expected);
//console.log(typeof expected);

expected = expected.replace("columnTooltipDescription","description");
expected = expected.replace("columnElementDisplayOrder","displayOrder");
expected = expected.replace("columnLabelName","name");
expected = expected.replace("columnDisplayType","displayType");
expected = expected.replace("gridColumnElementId","columnId");
expected_response2=JSON.parse(expected);
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }
  }

  if (testData.test["userId"] == "abc") {
    if (!queries3.length == 0) {
   
      var expected_response3 = Framework.dbValidator(queries3,
        config.SQLConnectionURL,
        config.resultType, 
        path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
        path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
        config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);
        
       
        var obj = JSON.parse(expected_response3)[0];
  
        Object.keys(obj).forEach(function (key) {
          // console.log(key);
          var a = chnageKeysAsPerAPI(key);
          obj[a] = obj[key];
          delete obj[key];
        }); 
  
        expected_response3=obj;
  var expected=expected_response3;
  var columnElementDisplayOrder= parseInt(expected.columnElementDisplayOrder);
  expected.columnElementDisplayOrder = columnElementDisplayOrder;
  expected = JSON.stringify(expected);
  //console.log(typeof expected);
  
  expected = expected.replace("columnTooltipDescription","description");
  expected = expected.replace("columnElementDisplayOrder","displayOrder");
  expected = expected.replace("columnLabelName","name");
  expected = expected.replace("columnDisplayType","displayType");
  expected = expected.replace("gridColumnElementId","columnId");
  expected_response3=JSON.parse(expected);
    } else {
      console.log("Dynamic query generator has not generated any query! Please check configurations");
      addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
    }
  }
  var result=[];
  result.push({"availableColumns":[expected_response1],"activeColumns":[expected_response2]});

  expected_response=result[0];
  //If response body has data then verify actual response with expected response
  if (testData.test["userId"] == "system") {
  if (response.statusCode = 200) {
    var actual3 = ((response.body).data.availableColumns[0]);
    var actual4=((response.body).data.activeColumns[0]);
    var result=[];
    result.push({"availableColumns":[actual3],"activeColumns":[actual4]});
    actual2=result[0];
  //console.log("++++++++++++++Actual++++++++++++++++++++++++++");
  //console.log(JSON.stringify(actual2));
  //console.log("++++++++++++++++Expected++++++++++++++++++++++++");
 // console.log(JSON.stringify(expected_response));
 // console.log("Type of actual "+typeof actual2);
  //console.log("Type of expected "+typeof expected_response2);

utils.VerifyResponseBody(object,actual2,expected_response,['availableColumns.0.isColumnDefaultInd','availableColumns.0.isSortableInd','availableColumns.0.isSummaryInd','availableColumns.0.isDefault','availableColumns.0.isSortable','availableColumns.0.isSummaryColumn','activeColumns.0.isColumnDefaultInd','activeColumns.0.isSortableInd','activeColumns.0.displayOrder','activeColumns.0.isSummaryInd','activeColumns.0.createdBy','activeColumns.0.isDefault','activeColumns.0.isSortable','activeColumns.0.isSummaryColumn']);
}  
  }
else {

    console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }
 
  if (testData.test["userId"] == "abc") {

  var result=[];
  result.push({"availableColumns":[],"activeColumns":[expected_response3]});

  expected_response3=result[0];
    if (response.statusCode = 200) {
      var actual3 = ((response.body).data.availableColumns[0]);
      var actual4=((response.body).data.activeColumns[0]);
      var result=[];
      result.push({"availableColumns":[],"activeColumns":[actual4]});
      actual2=result[0];
    //console.log("++++++++++++++Actual++++++++++++++++++++++++++");
    //console.log(JSON.stringify(actual2));
    //console.log("++++++++++++++++Expected++++++++++++++++++++++++");
   // console.log(JSON.stringify(expected_response));
   // console.log("Type of actual "+typeof actual2);
    //console.log("Type of expected "+typeof expected_response2);
  
  utils.VerifyResponseBody(object,actual2,expected_response3,['availableColumns.0.isColumnDefaultInd','availableColumns.0.isSortableInd','availableColumns.0.isSummaryInd','availableColumns.0.isDefault','availableColumns.0.isSortable','availableColumns.0.isSummaryColumn','activeColumns.0.isColumnDefaultInd','activeColumns.0.isSortableInd','activeColumns.0.displayOrder','activeColumns.0.isSummaryInd','activeColumns.0.createdBy','activeColumns.0.isDefault','activeColumns.0.isSortable','activeColumns.0.isSummaryColumn']);
  }  
    }
  else {
  
      console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
      addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
    }

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
function template_GET404 (object, testData, url) { 
  url=url.replace("{pageId}",testData.pageId);
  console.log("URL **** "+url);
   var options = {headers:config.header, qs:testData.test}
   var response = getResponse(url, object, testData,options);
   utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  
}