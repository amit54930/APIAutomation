var request = require('sync-request');

/*
This method will hit the web service and return the response with statusCode, headers and body.
PARAMETERS:
  1. type : GET, POST, PUT, DELETE etc
  2. url : This is the the url of the web service
  3. Options : This is the JSON options in which we can provide  options like query string [qs], body, headers etc.
      for more options, please refer options section on https://www.npmjs.com/package/sync-request
*/

//Ignore certicate issue

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' ;
module.exports.hitWebService = function( type, url, options){


  if(options != null ){
    if(options.body != null && options.body instanceof Array){
    var str_body = JSON.stringify(options.body);
	//console.log(JSON.stringify(options.body));
   // options.body = str_body;
  }
}

  var response = {};
 

  var result = request(type,url, options);
	//console.log("retrn url"+result.url);
  if(result != null){
  var body = result.body.toString('utf8');
  if(IsJsonString(body)){
    body = JSON.parse(body)
  }
  var response = {"statusCode": result.statusCode, "headers": result.headers, "body": result.body.toString('utf8')}
   response = {"statusCode": result.statusCode, "headers": result.headers, "body": body, "error": null}
   //console.log("**************response in hitWebService = "+ JSON.stringify(response));
   //console.log("End of response in hitWebService"+url);
 }else
 {
   response = {"statusCode": null, "headers": null, "body": null, "error" : "Recieved null response! "}
 }
  return response ;

}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
