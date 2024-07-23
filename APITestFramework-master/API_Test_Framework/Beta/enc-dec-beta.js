var fs= require("fs");
var isArray= require('isarray');
var str= require('string');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('test');

module.exports={
  covertToJson:covertToJson
}
module.exports.encrypt = function(filename, keys)
{
  if(filename!== null && (keys !== null|| keys.length !== 0)) {
    var i=0;
    var result=fs.readFileSync(filename,"utf8");
    for(i=0; i<keys.length;i++) {
    result=callEncrypt(result,keys[i]);
    }
    return result;
  }
    return null;
}
module.exports.encryptObj=function(search_Obj,keys){
  if (search_Obj!== null && (keys !== null|| keys.length !== 0)){
  var i=0;
  var result=search_Obj;
  for(i=0; i<keys.length;i++) {
  result=callEncrypt(result,keys[i]);
  }
  return result;
  }
 return null;
}
function callEncrypt(search_Obj, key){
var res=search_Obj.toString().split('\n');
var temp="";
var i=0;
var key1="\""+ key+"\":";
for(i=0; i<res.length; i++){
  if (str(res[i]).contains(key1)&(!str(res[i]).contains('*'))){
    try{
    var test=res[i].split(":");
    var s_key= test[0].trim();
    var s_value=test[1];
    if(str(s_value).contains("[")){
      s_value=str(s_value).between("[","]").s;
      console.log(s_value);
      var s_newKey=('*'.concat(s_key)).replace("*\"","\"*")
      var result_key= (s_key).replace(s_key,s_newKey)
      var result_value=cryptr.encrypt(s_value);
      console.log("value -> "+result_value);
      var s_result=result_key+": [\""+result_value+"\"],";
      temp= (temp).trim()+s_result;
    }
    else{
    if(str(s_value).contains("\","))
    { s_value=((s_value).replace("\"","")).replace("\",","");
    }
    if(str(s_value).contains("\"")){
       s_value=str(s_value).between("\"","\"");
     }
    var s_newKey=('*'.concat(s_key)).replace("*\"","\"*")
    var result_key= (s_key).replace(s_key,s_newKey)
    var result_value=cryptr.encrypt(s_value);
    var s_result=result_key+": \""+result_value+"\",";
    temp= (temp).trim()+s_result;
    }
  }
    catch(e){
      console.log("error -> "+e);
    }
}
else{
  temp= (temp).trim()+res[i].trim();
}
}
return covertToJson(temp);
}

function covertToJson(temp){
  temp=(temp).trim();
  temp= temp.split(",\"").join(",\n\"")
  temp=temp.split("{").join("{\n")
  temp=temp.split(":{").join(":{\n")
  temp=temp.split(",}").join("\n}")
  temp=temp.split(",},").join("\n},")
  temp=temp.split("\"},").join("\"\n},")
  return temp;
}

//decrypt
module.exports.decrypt = function(filename)
{
if(filename !== null){
var result=fs.readFileSync(filename,"utf8");
result=callDecrypt(result);
var res=str(result).replaceAll("\'","\"").s;
return res;
}
return null;
}
module.exports.decryptObj=function(search_Obj){
  if(search_Obj!== null) {
  result=callDecrypt(search_Obj);
  var res=str(result).replaceAll("\'","\"").s;
  return result;
}
return null;
}
function callDecrypt(search_Obj){
var res=search_Obj.toString().split('\n');
var temp="";
var i=0;
for(i=0; i<res.length; i++){
  if(str(res[i]).contains('*')) {
    try{
    var test=res[i].split(":");
    var s_key= test[0].trim();
    var s_value=test[1];
    if(str(s_value).contains("[")){
      s_value=str(s_value).between('[\"', '\"]').s;
      var s_newKey = s_key.replace('*',"");
      var result_key= (s_key).replace(s_key,s_newKey)
      var result_value=cryptr.decrypt(s_value);
      var s_result=result_key+": ["+result_value+"],";
      temp= (temp).trim()+s_result;
    }
    else{
   if(str(s_value).contains(",")){
   s_value=((s_value.trim()).replace("\"","")).replace("\",","")
    }
    if(str(s_value).contains("\"")){
      s_value=((s_value.trim()).replace("\"","")).replace("\"","")
    }
    var s_newKey = s_key.replace('*',"");
    var result_key= (s_key).replace(s_key,s_newKey)
    var result_value= cryptr.decrypt(s_value);
    if(str(result_value).contains("\"")) result_value= ((result_value).replace("\"","")).replace("\"","");
    var s_result=result_key+": \""+(result_value).trim()+"\",";
    temp= (temp).trim()+s_result;
    }
  }
    catch(e){
      console.log("error -> "+e);
    }
}
else temp= (temp).trim()+res[i].trim();
}
return covertToJson(temp);
}
