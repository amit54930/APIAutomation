/**
 * Created by anuradhag on 9/6/2017.
 */
var fs = require('fs');
var format = require("string-template");
var path = require('path');
var mergeJSON = require('merge-json');

var response = null;
module.exports.parameterization = function(input_skeleton_Path , test_data_obj , token ) {
    var response;
      var skeleton ;
    var skeleton_Path = input_skeleton_Path; //path.join(__dirname,"..","..",input_skeleton_Path);
try{
     skeleton =fs.readFileSync(skeleton_Path,'utf8');
  }
  catch(e){// It will handle if skeleton is passed as JSON object directly instead of file path
      skeleton =JSON.stringify(input_skeleton_Path);
  }
    if(token == null) {
          response = format(skeleton,test_data_obj);
          return response;
    }
    if(token != null && mergeJSON.isJSON(token))
    {
          var temp_Obj = mergeJSON.merge(test_data_obj,token);
          response = format ( skeleton , temp_Obj );
          return response;
    }
    var str = "Error : type incompatible --> should be in [ parameterization(string,object,object) ] format ";
    return  {"errorMessage" : str} ;


 }
