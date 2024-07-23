var subquery =` where `;

var testQuery =
`select message_type
, action_code
, action_description
, function_code
, function_description
, dispute_stage_name
, card_brand_name
,  stage_config_id
, stage_id
 from

`;

var s = `dims.stage_config a join dims.dispute_stage_master b ON a.stage_id=b.dispute_stage_id
join dims.card_brand_master c ON a.card_brand_code=c.card_brand_code`;



module.exports.generateDynamicQuery = function(test){
  var tempQuery = "";
  
 if (test["actionCode"] != undefined) {
  tempQuery = subquery + "action_code='" + test["actionCode"] + "'";
 

}

if (test["cardSchemeCode"] != undefined) {
  tempQuery = tempQuery + " AND c.card_brand_code='" + test["cardSchemeCode"] + "'";
 

if (test["functionCode"] != undefined) {
  tempQuery = tempQuery + " AND function_code='" + test["functionCode"] + "'";

}

if (test["messageType"] != undefined) {
  tempQuery = tempQuery + " AND message_type='" + test["messageType"] + "'";

}
var finalQuery = testQuery + s + tempQuery;
 //console.log(finalQuery);
  return finalQuery;
}

}

