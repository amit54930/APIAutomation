var Framework = require('../API_Test_Framework/controller.js');
const addContext = require('mochawesome/addContext');
var expect = require('chai').expect;


//to add initial testCase details in Mocha report
/*
* This method will add testCase details in report
* It accepts two parameters
*
*/
module.exports.testCaseInfo = function(obj, testData) {
  addContext(obj, "Test Case ID :" + testData.TestCaseId);
  addContext(obj, "Test Case Name :" + testData.TestCaseName);
  addContext(obj, "Test Call Method :" + testData.type);
  addContext(obj, "--------------------STEPS --------------------")
  addContext(obj, "Step 1. Hit API!!");
};


//to add initial testCase details in Mocha report
/*
* This method will verify status code
* It accepts three parameters
1)  this Object
2)  actual status Code
3)  expected status code
*
*/
module.exports.VerifyStatusCode= function(obj, expectedStatusCode, actualStatusCode) {
  addContext(obj, "Step 2. Verify status code");
  addContext(obj, "Expected statusCode : " + expectedStatusCode + " Actual statusCode :" + actualStatusCode);
  expect(actualStatusCode).to.equal(expectedStatusCode);
  addContext(obj, "Status Code verification passed");
};

module.exports.VerifyErrorMessage = function(obj, expectedErrorMessage, actualErrorMessage) {
  addContext(obj, "Step 2. Verify Error Message");
  addContext(obj, "Expected Error Message : " + expectedErrorMessage + " Actual Error Message :" + actualErrorMessage);
  expect(actualErrorMessage).to.equal(expectedErrorMessage);
  addContext(obj, "Error Message verification passed");
};

//to add initial testCase details in Mocha report
/*
* This method will verify response body
* It accepts three parameters
1)  this Object
2)  actual  response body
3)  expected response body
*
*/
module.exports.VerifyResponseBody = function(obj, actualResponseBody, expectedResponseBody, ignore_key, sensitive_key) {
  sensitive_key = null;
  //console.log("Ingore keys" + ignore_key.toString());
  //console.log("In VerifyResponseBody");
  //console.log("Actual: "+ JSON.stringify(actualResponseBody));
 // console.log("Expected: "+ JSON.stringify(expectedResponseBody));
  //addContext(obj, "Expected Response : " + expectedResponseBody);
  // addContext(obj, "Actual Response : " + actualResponseBody);

  addContext(obj, "step 3. Verify Response Body");
  var comparision_result = Framework.is_Exact_Same(expectedResponseBody, actualResponseBody, ignore_key, sensitive_key);
  //console.log("comparision_result   " + JSON.stringify(comparision_result));
//  addContext(obj, " Comparison Result : " + JSON.stringify(comparision_result))

  expect(comparision_result.isSuccess).to.equal(true);

  addContext(obj, "Verification of response Successfull!");
  addContext(obj, 'Result: Test Case is PASSED');
};


module.exports.VerifyCountNumber = function(obj, expectedCount, actualCount) {
  console.log("In verify count number");
  console.log(expectedCount);
  console.log(actualCount);
  addContext(obj, "Step 2. Verify Count Number");
  addContext(obj, "Expected Count : " + expectedCount + " Actual Count :" + actualCount);
  expect(expectedCount).to.equal(actualCount);
  addContext(obj, "Count verification passed");

};

