var path = require('path');

var param = require(path.join(__dirname,"lib", 'parameterization'));
var response_validator= require(path.join(__dirname, 'lib','responseValidator'));
//var response_validator= require(path.join(__dirname, 'lib','response_validator'));
var ecrpt=require('./Beta/enc-dec-beta.js');
var hit_Web_Service = require(path.join(__dirname , 'lib', 'hitWebService'));
var XmlResponseValidator = require(path.join(__dirname, 'lib', 'XmlResponseValidator'));
//var schemaValidator = require(path.join(__dirname, 'lib', 'XMLSchemaValidator'));
var mocha_runner = require('./lib/Mocha-Report');

var database = require(path.join(__dirname, 'lib', 'DatabaseValidator'));
/*
module.exports.XMLSchemaValidator = function (XMLRequest, XMLSchemaPath ) {
  return schemaValidator.XMLSchemaValidator( XMLRequest, XMLSchemaPath);
}*/

module.exports.mochaReport= function(tags,testDir,reportFilename,reportTitle,reportPageTitle,enableCode,timeout){
 return mocha_runner.mochaReport(tags,testDir,reportFilename,reportTitle,reportPageTitle,enableCode,timeout);
}

module.exports.parameterization = function ( input_skeleton_Path , test_data_obj , token ){
  var param_res = param.parameterization( input_skeleton_Path , test_data_obj , token ) ;
  return param_res;
}

module.exports.is_Exact_Same = function ( expct_Json , res_Json , ignore_Key, sensitive_key ) {
  return response_validator.isExactSame ( expct_Json , res_Json , ignore_Key, sensitive_key );
 
}

module.exports.XML_is_Exact_Same = function ( expct_Json , res_Json , ignore_Key ) {
    var result = XmlResponseValidator.compareXmlToXmlResponse( expct_Json , res_Json , ignore_Key );
    return result;
}

module.exports.getJsonObjectForGivenKey = function ( search_Key , search_Obj ) {
  return response_validator.getJsonObjectForGivenKey ( search_Key , search_Obj );
}

module.exports.getJsonObjectForKeyWithRelativePath = function ( search_Key , search_Obj ) {
  return response_validator.getJsonObjectForKeyWithRelativePath( search_Key , search_Obj );
}

module.exports.isObjectContainedInSearchedObject = function ( expct_Json , res_Json) {
  return response_validator.isObjectContainedInSearchedObject( expct_Json , res_Json);
}
module.exports.subsetOfArray = function ( expct_Json , res_Json) {
  return response_validator.subsetOfArray( expct_Json , res_Json);
}
module.exports.hitWebService = function ( type,url, options ) {
  return hit_Web_Service.hitWebService( type,url, options );
}
module.exports.encrypt = function(filename, keys){
  return ecrpt.encrypt(filename, keys)}

module.exports.encryptObj=function(search_Obj,keys){
 return ecrpt.encryptObj(search_Obj,keys)}

 module.exports.decrypt = function(filename){
   return ecrpt.decrypt(filename)}

 module.exports.decryptObj=function(search_Obj){

    return ecrpt.decryptObj(search_Obj)};



module.exports.dbValidator = function(query, connectionURL, ResultType,
	responseStructureFilePath, actualResponseFilePath,userName,passWord,driver){
  //console.log("myfunction");
     return database.DatabaseValidator(query, connectionURL, ResultType,
      responseStructureFilePath, actualResponseFilePath,userName,passWord,driver);
    }
