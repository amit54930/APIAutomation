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
var config_DisputeRecordCountAPI = config.DisputeRecordCountAPI;

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

    var url = root_url + config_DisputeRecordCountAPI.call_suffix_toFetchDisputeRecordCountData;
    switch (testCaseData.template) {

      case 1:

        template_GET200(this, testCaseData, url);
        break;

      case 2:
        template_GET404(this, testCaseData, url);
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
function template_GET200(object, testData, url) {
  //console.log("URL **** " + url);
  var options = { headers: config.header};
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
 // console.log("Status Code Matched");
/*
  //Get the Queries Array
  var queries1 = Query.generateDynamicQuery1();
  var queries2 = Query.generateDynamicQuery2();
  var queries3 = Query.generateDynamicQuery3();
  var queries4 = Query.generateDynamicQuery4();
  var queries5 = Query.generateDynamicQuery5();
  var queries6 = Query.generateDynamicQuery6();
  var queries7 = Query.generateDynamicQuery7();
  var queries8 = Query.generateDynamicQuery8();
  var queries9 = Query.generateDynamicQuery9();
  var queries10 = Query.generateDynamicQuery10();
  var queries11 = Query.generateDynamicQuery11();
  var queries12 = Query.generateDynamicQuery12();
  var queries13 = Query.generateDynamicQuery13();
  var queries14 = Query.generateDynamicQuery14();
  var queries15 = Query.generateDynamicQuery15();
  var queries16 = Query.generateDynamicQuery16();
  var queries17 = Query.generateDynamicQuery17();
  var queries18 = Query.generateDynamicQuery18();
  var queries19 = Query.generateDynamicQuery19();
  var queries20 = Query.generateDynamicQuery20();
  var queries21 = Query.generateDynamicQuery21();
  

  //console.log("Queries *** "+queries)
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

    expected_response1 = obj;
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

    expected_response2 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

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

    expected_response3 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries4.length == 0) {

    var expected_response4 = Framework.dbValidator(queries4,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response4)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response4 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries5.length == 0) {

    var expected_response5 = Framework.dbValidator(queries5,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response5)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response5 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries6.length == 0) {

    var expected_response6 = Framework.dbValidator(queries6,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response6)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response6 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries7.length == 0) {

    var expected_response7 = Framework.dbValidator(queries7,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response7)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response7 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries8.length == 0) {

    var expected_response8 = Framework.dbValidator(queries8,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response8)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response8 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries9.length == 0) {

    var expected_response9 = Framework.dbValidator(queries9,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response9)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response9 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries10.length == 0) {

    var expected_response10 = Framework.dbValidator(queries10,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response10)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response10 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries11.length == 0) {

    var expected_response11 = Framework.dbValidator(queries11,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response11)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response11 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries12.length == 0) {

    var expected_response12 = Framework.dbValidator(queries12,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response12)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response12 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries13.length == 0) {

    var expected_response13 = Framework.dbValidator(queries13,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response13)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response13 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }


  if (!queries14.length == 0) {

    var expected_response14 = Framework.dbValidator(queries14,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response14)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response14 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries15.length == 0) {

    var expected_response15 = Framework.dbValidator(queries15,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response15)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response15 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries16.length == 0) {

    var expected_response16 = Framework.dbValidator(queries16,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response16)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response16 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries17.length == 0) {

    var expected_response17 = Framework.dbValidator(queries17,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response17)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response17 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries18.length == 0) {

    var expected_response18 = Framework.dbValidator(queries18,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response18)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response18 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries19.length == 0) {

    var expected_response19 = Framework.dbValidator(queries19,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response19)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response19 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries20.length == 0) {

    var expected_response20 = Framework.dbValidator(queries20,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response20)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response20 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }

  if (!queries21.length == 0) {

    var expected_response21 = Framework.dbValidator(queries21,
      config.SQLConnectionURL,
      config.resultType,
      path.join(__dirname, config.expected_response_root_path, "responseStructure.json"),
      path.join(__dirname, config.expected_response_root_path, "actualResponse11.json"),
      config.SQLuserName, config.SQLpassWord, config.SQLmysqlDriver);


    var obj = JSON.parse(expected_response21)[0];

    Object.keys(obj).forEach(function (key) {
      // console.log(key);
      var a = chnageKeysAsPerAPI(key);
      obj[a] = obj[key];
      delete obj[key];
    });

    expected_response21 = obj;
  } else {
    console.log("Dynamic query generator has not generated any query! Please check configurations");
    addContext(object, "Dynamic query generator has not generated any query! Please check configurations")
  }
  //If response body has data then verify actual response with expected response
  if (response.statusCode = 200) {
    var actual2 = ((response.body).data);
   // console.log("++++++++++++++Actual++++++++++++++++++++++++++");
   // console.log(JSON.stringify(actual2));
   // console.log("++++++++++++++++Expected++++++++++++++++++++++++");

    //console.log("Type of actual "+typeof actual2);
    //console.log("Type of expected "+typeof expected_response);

    ob = [expected_response1, expected_response2, expected_response3, expected_response4, expected_response5, expected_response6
      , expected_response7, expected_response8, expected_response9, expected_response10, expected_response11, expected_response12,
      expected_response13,expected_response14,expected_response15,expected_response16,expected_response17,expected_response18,
      expected_response19,expected_response20,expected_response21];


    ob = JSON.stringify(ob);
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(cd.queueId)", "recordCount");
    ob = ob.replace("count(cd.queueId)", "recordCount");
    ob = ob.replace("count(cd.queueId)", "recordCount");
    ob = ob.replace("count(cd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");
    ob = ob.replace("count(csd.queueId)", "recordCount");

      //console.log("*******  " + ob);
    ob = JSON.parse(ob);
  for (var i = 0; i < ob.length; i++) {
      ob[i].recordCount = parseInt(ob[i].recordCount);
      ob[i].queueId = parseInt(ob[i].queueId);
    }
     expected_response = ob;

    // console.log("++++++++++++++Actual++++++++++++++++++++++++++");
   // console.log(JSON.stringify(actual2));
  // console.log("++++++++++++++++Expected++++++++++++++++++++++++");

    //console.log("Type of actual "+typeof actual2);
   // console.log(JSON.stringify(expected_response));

    utils.VerifyResponseBody(object, actual2[0], expected_response[0]);
  }

  else {

    console.log("Response body is empty array hence Response body comparison is not required. Please try with other file pattern!");
    addContext(object, "Response body is empty array hence Response body comparison is not required. Please try with other file pattern!")
  }
*/
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
function template_GET404(object, testData, url) {
  url = url.replace("{queueId}", testData.test.input);
  var options = { headers: config.header};
  var response = getResponse(url, object, testData, options);
  utils.VerifyStatusCode(object, testData.statusCode, response.statusCode);
  console.log("Status Code Matched");

}