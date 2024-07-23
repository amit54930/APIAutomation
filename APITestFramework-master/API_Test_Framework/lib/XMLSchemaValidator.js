

var jre = require('node-jre');

/*
  XMLSchemaValidator method will validate the XML schema against the specified xsd
  parameters :
      1.  XMLRequest - Accepts two type of inputs 1. XML file path 2. XML object [i.e. variable containing entire XML string]
      2. XMLSchemaPath - Accepts the path of the scheama file
*/

module.exports.XMLSchemaValidator = function(XMLRequest, XMLSchemaPath){

var errors = null;

if(XMLRequest.charAt(0) == "<"){
        XMLRequest = '-data='+XMLRequest;
    }else {
        XMLRequest = '-file='+XMLRequest;
      }

  var XMLSchemaPath = "-schema="+XMLSchemaPath;

  var output = jre.spawnSync(  // call synchronously
      [''],                // add the relative directory 'java' to the class-path
      'XMLValidator',                 // call main routine in class 'Hello'
      [XMLRequest, XMLSchemaPath],   // pass 'World' as only parameter
      { encoding: 'utf8' }     // encode output as string
    ).output;      // take output from stdout as trimmed String


  var isSuccess = output[1].split("=")[1];
  var successFlag = true;

  if(!(isSuccess.trim().toUpperCase() == 'OK')){
      successFlag = false;
      errors =  output[2];
  }
  var ValidationResult = {"isSuccess" : successFlag, "Errors" : errors};
  return ValidationResult;
}



var xml =`<?xml version="1.0" encoding="UTF-8"?> <foo xmlns="http://example.com/XMLSchema/1.0"></foo1>`;
console.log("START");

//var o = XMLSchemaValidator(xml,"C:\\Users\\ravindram\\Desktop\\D-data\\schema\\schema.xsd")
var o = this.XMLSchemaValidator("C:\\Users\\ravindram\\Desktop\\D-data\\schema\\validXml.xml","C:\\Users\\ravindram\\Desktop\\D-data\\schema\\schema.xsd")
console.log("final output = "+JSON.stringify(o));

console.log("enD");
