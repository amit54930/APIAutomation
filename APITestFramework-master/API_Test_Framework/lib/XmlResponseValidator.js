var fs = require('fs'),
	xml2js = require('xml2js');
var DomParser= require('dom-parser');
var framework= require('../controller.js');

  var Options = {
//   attrkey: '_',
//   charkey: '$',
// 	explicitArray: true,
//   explicitCharkey: true,
//   emptyTag: null,
//   normalize: true,
//   normalizeTags: true,
//   explicitArray: false,
  trim: true,
	ignoreAttrs: true,
	explicitArray: false
 };

var parser =new xml2js.Parser(Options);

/*
	This function will convert xml object to the JSON object
*/
function xmlToJsonConvertor(xml_object){
	var converted_Xml;

	 parser.parseString(xml_object, function (err,result){
		if (err){
			console.log("Error :"+err);
		}
		else{
				converted_Xml =  result;
			}
	});

return converted_Xml;
}


/*
 	This method verifies wheather given XML object is present in Given XML object
*/
module.exports.verifyKeysPresentInTheXMLResponse = function (expected_XML_Object, XML_Object){


	var expected_JSON_Object = xmlToJsonConvertor(expected_XML_Object);
	var JSON_Object = xmlToJsonConvertor(XML_Object);
	var isSuccess =  framework.isObjectContainedInSearchedObject(expected_JSON_Object,JSON_Object); //boolean
	return isSuccess;
}

/*
This method will search for given xml tag in XML_Object and return value of that tag
*/

module.exports.getValueForXMLTag = function(xmlTag, XML_Object){

	var trimmedTag =xmlTag.replace(/</g,"").replace(/>/g,"");

	var JSON_Object = xmlToJsonConvertor(XML_Object);

	//console.log('json ==>'+JSON.stringify(JSON_Object));

	var searchResultJSON = framework.getJsonObjectForKeyWithRelativePath(trimmedTag, JSON_Object);

	//var searchResultJSON =  framework.array_To_Key_Value_Pair(searchResultArray);


	return searchResultJSON;

}

/*
This method will compare two given XML objects and returns JSON {isSucess : true/false, Error: if Any}
*/
module.exports.compareXmlToXmlResponse = function(XML_Exp_Object, XML_Actual_Object, Array_Ignore_Field){

//xmlTag.replace(/</g,"").replace(/>/g,"");

	var JSON_Exp_Object = xmlToJsonConvertor(XML_Exp_Object);
	var JSON_Actual_Object = xmlToJsonConvertor(XML_Actual_Object);

	var cleanedIgnoreFieldArray = [];

	if(Array_Ignore_Field != undefined ){
			for(var i = 0; i < Array_Ignore_Field.length; i++ ){
			cleanedIgnoreFieldArray[i] = Array_Ignore_Field[i].replace(/</g,"").replace(/>/g,"");
	}
}
	var isSame = framework.is_Exact_Same(JSON_Exp_Object, JSON_Actual_Object,cleanedIgnoreFieldArray);
 	return isSame;

}


//================================================================================================
/*
var xml1 =
`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
      <GetQuickQuoteResponse1 xmlns="http://ws.cdyne.com/">
         <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
				  <GetQuickQuoteResult1>1</GetQuickQuoteResult1>
      </GetQuickQuoteResponse1>
			<GetQuickQuoteResponse2 xmlns="http://ws.cdyne.com/">
				 <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
					<GetQuickQuoteResult1>1</GetQuickQuoteResult1>
			</GetQuickQuoteResponse2>
			<GetQuickQuoteResponse3 xmlns="http://ws.cdyne.com/">
				 <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
					<GetQuickQuoteResult1>1</GetQuickQuoteResult1>
			</GetQuickQuoteResponse3>
			<a><b>
				<text>1234</text>
			</b>
			</a>
   </soap:Body>
</soap:Envelope>`;
var xml2 =
`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
   <soap:Body>
	 <GetQuickQuoteResponse2 xmlns="http://ws.cdyne.com/">
			<GetQuickQuoteResult>49.51</GetQuickQuoteResult>
			 <GetQuickQuoteResult1>1</GetQuickQuoteResult1>
	 </GetQuickQuoteResponse2>

      <GetQuickQuoteResponse1 xmlns="http://ws.cdyne.com/">
         <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
				  <GetQuickQuoteResult1>1</GetQuickQuoteResult1>
      </GetQuickQuoteResponse1>

			<GetQuickQuoteResponse3 xmlns="http://ws.cdyne.com/">
				 <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
					<GetQuickQuoteResult1>1</GetQuickQuoteResult1>
			</GetQuickQuoteResponse3>
			<a><b>
				<text>1234</text>
			</b>
			</a>
   </soap:Body>
</soap:Envelope>`;


var exp_xml =
`<GetQuickQuoteResponse1 xmlns="http://ws.cdyne.com/">
	 <GetQuickQuoteResult>49.51</GetQuickQuoteResult>
		<GetQuickQuoteResult1>1</GetQuickQuoteResult1>
</GetQuickQuoteResponse1>
<text>1234</text>`;

console.log(" Chceck presence : "+verifyKeysPresentInTheXMLResponse(exp_xml,xml1));
var tag = `<GetQuickQuoteResult>`;
var value = getValueForXMLTag(tag,xml1);

console.log("Value of the tag  : "+JSON.stringify(value));


console.log(compareXmlToXmlResponse(xml1,xml2));

*/
