var jre = require('node-jre');
var path = require('path');

/*
 * Database validator module
 *
 *
 *
 */

module.exports.DatabaseValidator = function(query, connectionURL, ResultType,
		responseStructureFilePath, actualResponseFilePath,userName,passWord,driver) {

if(userName == undefined && passWord==undefined && driver==undefined)
{
	//console.log("In dbv");

var dbModulePath = path.join(__dirname, 'DBValidator-1.0.2-SNAPSHOT-jar-with-dependencies.jar');


var output = jre.spawnSync(

	
// call synchronously
[ dbModulePath],
'com.bitwiseglobal.dbvalidator.core.APIMain',

[ "-q", query,
"-c", connectionURL,
"-t", ResultType,
"-r", responseStructureFilePath,
"-a", actualResponseFilePath
],

{
		encoding : 'utf8'
} // encode output as string
).output; // take output from stdout as trimmed String
} 

else
{
	var dbModulePath = path.join(__dirname, 'DBValidator-1.0.2-SNAPSHOT-jar-with-dependencies.jar');
		
	var output = jre.spawnSync(
	// call synchronously
	[ dbModulePath],
	'com.bitwiseglobal.dbvalidator.core.APIMain',

	[ "-q", query,
	  "-c", connectionURL,
	  "-t", ResultType,
	  "-r", responseStructureFilePath,
	  "-a", actualResponseFilePath,
	  "-u", userName,
	  "-p", passWord,
	  "-n", driver
	  ],

	{
					encoding : 'utf8'
	} // encode output as string
	).output; // take output from stdout as trimmed String

}
//console.log("******"+output);
//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		var transformedJson = output[1].split("Transformed Json:")[1];
		if(transformedJson == undefined){
										console.log("------------Error Occured During Database Validator ---------------");
										console.log(output[1].split("Transformed Json:")[0]);
										console.log("-------------------------------------------------------------------");
		}
		if(!transformedJson == undefined){
										return transformedJson.replace(/\\/g, "");
		}
		else{
						return transformedJson;
						
		}
		
	}
