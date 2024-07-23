var equal = require('deep-eql');
var diff = require('deep-diff');


/**
  * Organized list of modules for internal calling purpose
  */
var self = {

  /**
    * Check if passed object is JSON or not
    * @param input : input object that needs to be verified
    * @return : Boolean status
   */
  isJson: function (input) {
    try {
      //If input is already an JSON, return true
      if (input && 'object' === typeof input) {
        return true;
      };

      // Parse the input and check for type as Object before returning the parsed value
      var parsedJSON = JSON.parse(input);
      if (parsedJSON && 'object' === typeof parsedJSON) {
        return parsedJSON;
      };
    } catch (e) {
      //console.log('Looks like received input is not a JSON :\n' + input + '\nError Message: ' + e);
    }
    return false;
  },

  /**
    * check if passed object is an array
    * @param input : input object that needs to be verified
    * @return : Boolean status
    */
  isArray: function (input) {
    return Array.isArray(input);
  },

  /**
    * Identify the difference between tow objects and return the formatted result for better auditing
    * @param expctedJson : Expected JSON data that needs to be compared against
	  * @param actualJson :  Actual JSON returned by API
    * @param ignoreKey :  If needed to ignore keys from comparision which may be dynamic and would never match. ex. timestamps, random numbers, etc.
    * @param sensitiveKey : If we need to mask data in response for reporting purpose
    * @return formatted difference objects
    */
  catchTheDifference: function (expctedJson, actualJson, ignoreKey, sensitiveKey) {
    var difference = diff(expctedJson, actualJson);
    //console.log("expctedJson "+JSON.stringify(expctedJson));
    // console.log("actualJson"+actualJson);
    //console.log("in catchTheDifference " + JSON.stringify(difference));
    return self.formatter(difference, ignoreKey, sensitiveKey);
  },

  /**
    * Method to well format data for logging Purpose
    * @param input : data for cleansing / foramtting Purpose
    * @return Formatted Data
    */
  stringifyData: function (input) {
    return (self.isJson(input)) ? JSON.stringify(input) : input;
  },

  /**
   * Mask values to avoid sending sensetive data in plain text
   * @param input : data for masking Purpose
   * @return Masked Data
   */
  maskValues: function (input) {
    var mask = "*********"; //9 charcter string
    var maskedData = "";
    /*
     * If the length is exactly 9, mask everything : possible SSN value
     * For other, mask first 5 chars. If length is less than 5, mask the whole string
     */

    if (!self.isJson(input)) {
      if (input.length == 9 || input.length < 5) {
        maskedData = mask.substr(0, input.length);
      } else {
        maskedData = mask.substr(0, 4) + input.toString().substr(5, input.length);
      }
    } else {
      maskedData = "** Value is a JSON... **";
    }
    return maskedData;
  },

  /**
   * checks if the string empty / null / undefined
   * @param input : input string
   * @return boolean
   */

  isEmpty: function (input) {
    return (null == input || 'undefined' == typeof input) ? true : false;
  },

  /**
    * Result formatter to convert the difference object in human redable format.
    *Differences are reported as one or more change records. Change records have the following structure:
      *kind - indicates the kind of change; will be one of the following:
        *    N - indicates a newly added property/element
        *    D - indicates a property/element was deleted
        *    E - indicates a property/element was edited
        *    A - indicates a change occurred within an array
      *path - the property path (from the left-hand-side root)
      *lhs - the value on the left-hand-side of the comparison (undefined if kind === 'N')
      *rhs - the value on the right-hand-side of the comparison (undefined if kind === 'D')
      *index - when kind === 'A', indicates the array index where the change occurred
      *item - when kind === 'A', contains a nested change record indicating the change that occurred at the array index
    * Formatter iterates through provided difference object to convert each category in uniform format
    * @param difference : the object that needs to be formatted
    * @param ignoreKey :  If needed to ignore keys from comparision which may be dynamic and would never match. ex. timestamps, random numbers, etc.
    * @param sensitiveKey : If we need to mask data in response for reporting purpose
    * @return formattedResult : formattedResult
    */
  formatter: function (difference, ignoreKey, sensitiveKey) {
    var formattedResult = [];
    var msg;

    //Look for each key in difference array and update the message as per the difference flag
    for (var index = 0; index < difference.length; index++) {
      var isIgnore = false;
      var isMask = false;
      
      var pathString = "" + difference[index].path;
      var path = pathString.replace(/,/g, '.');
      

      //Exempt current key if its part of ignore keys attribute
      for (var keyIndex = 0; null != ignoreKey && keyIndex < ignoreKey.length; keyIndex++) {
        var currentkey = ignoreKey[keyIndex].replace(/,/g, '.');
        if (path.includes(currentkey)) {
          isIgnore = true;
          break;
        }
      }

      //Mask current key if its part of senitive keys attribute
      for (var keyIndex = 0; null != sensitiveKey && keyIndex < sensitiveKey.length; keyIndex++) {
        var currentkey = sensitiveKey[keyIndex].replace(/,/g, '.');
        if (path.includes(currentkey)) {
          isMask = true;
          //console.log("Sensitive Key is on for path : " + currentkey);
          break;
        }
      }

      if (!isIgnore) {
        var rhs, lhs, itemRhs, itemLhs; //Local variables for logging Purpose

        //Set rhs and lhs
        rhs = (!self.isEmpty(difference[index].rhs) && isMask) ? self.maskValues(difference[index].rhs) : difference[index].rhs;
        lhs = (!self.isEmpty(difference[index].lhs) && isMask) ? self.maskValues(difference[index].lhs) : difference[index].lhs;

        //switch-case for difference flags
        switch (difference[index].kind) {
          case 'N':
            msg = "There is a new element in response received : " + path + " : " + self.stringifyData(rhs);
            formattedResult.push(msg);
            break;
          case 'D':
            msg = "Data for key '" + path + "' could not be found in response received";
            formattedResult.push(msg);
            break;
          case 'E':
            msg = "Data for key '" + path + "' is not matching with response received, Expected : "
              + self.stringifyData(lhs) + ", Actual : " + self.stringifyData(rhs);
            console.log("index " + difference[index].index);
            formattedResult.push(msg);
            break;
          case 'A':
            //If path is undefined, use Index as path
            if (path == 'undefined')
              path = "index " + difference[index].index;

            //These rhs and lhs will only be available while dealing with Arrays
            itemRhs = (!self.isEmpty(difference[index].item.rhs) && isMask) ? self.maskValues(difference[index].item.rhs) : difference[index].item.rhs;
            itemLhs = (!self.isEmpty(difference[index].item.lhs) && isMask) ? self.maskValues(difference[index].item.lhs) : difference[index].item.lhs;

            var tempMsg;
            switch (difference[index].item.kind) {
              case 'N':
                tempMsg = " New element got added at index " + difference[index].index + " as : "
                  + self.stringifyData(itemRhs);
                break;
              case 'E':
                tempMsg = " Element got updated at index " + difference[index].index + ", Expected : "
                  + self.stringifyData(itemLhs) + ", Actual : " + self.stringifyData(itemRhs);
                break;
              case 'D':
                tempMsg = " Element got deleted at index " + difference[index].index + " whose value was : "
                  + self.stringifyData(itemLhs);
                break;
            }
            msg = "Data is updated in Array object of received response at : " + path + "," + tempMsg;
            formattedResult.push(msg);
            break;
        }
      }
      //reassign flag back to false to resume matching with each key in loop
      isIgnore = false;
    } //console.log("formattedResult *****" + formattedResult);
    return formattedResult;

  }
};

/**
  * This functionality helps validate expected response with actual response returned by called API
  * It can help compare responses ebtween APIs, responses between API and other sources (DB, bacthed contents, System Data, etc)
  *
  * @param expctedJson : Expected JSON data that needs to be compared against
  * @param actualJson :  Actual JSON returned by API
  * @param ignoreKey :  If needed to ignore keys from comparision which may be dynamic and would never match. ex. timestamps, random numbers, etc.
  * @param sensitiveKey : If we need to mask data in response for reporting purpose
  * @param maskIt : You can skip masking in lower environments if needed for debugging puspose
  * @return response : Comparision status
  */
module.exports.isExactSame = function (expctedJson, actualJson, ignoreKey, sensitiveKey, maskIt) {
  //console.log("in is exact same method -  Expected " + expctedJson);
 // console.log("in is exact same method -  actual " + actualJson);
  var returnMessage = { 'isSuccess': false, 'errorMessage': 'Default Response' }

  //Sanity checks on received parameters
  if (null == expctedJson || null == actualJson) {
    returnMessage = { 'isSuccess': false, 'errorMessage': 'Expected JSON or Actual JSON is null or undefined' };
    return returnMessage;
  };
  /*if (!self.isJson(expctedJson) || !self.isJson(actualJson)) {
    returnMessage = { 'isSuccess': false, 'errorMessage': 'Expected JSON or Actual JSON is not a JSON object' };
    return returnMessage;
  };*/

  //Utlizing deep-eql package to comapre two JSONs and share the result of same
  var response = equal(expctedJson, actualJson);
  if (response == true) {
    return { 'isSuccess': true, 'errorMessage': null };
  } else {

    var difference = [];

    if (null != ignoreKey && !self.isArray(ignoreKey)) {
      console.log("Keys that needs to be skipped from verification should be passed as an Array."
        + " Ignoring the request for provided key(s).");
      ignoreKey = null;
      //difference = self.catchTheDifference(expctedJson, actualJson, null);
    }
    if ((null != sensitiveKey && !self.isArray(sensitiveKey)) || false == maskIt) {
      console.log("Keys that needs to be masked from verification should be passed as an Array or "
        + "there is a request to supress masking. Ignoring the request for provided key(s).");
      sensitiveKey = null;
    }

    difference = self.catchTheDifference(expctedJson, actualJson, ignoreKey, sensitiveKey);
    //console.log("difference " + difference);

    if (null == difference || 0 == difference.length)
      return { 'isSuccess': true, 'errorMessage': null };
    else
      return { 'isSuccess': false, 'errorMessage': difference };
  };


};



