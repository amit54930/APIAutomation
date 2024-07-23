
var testQuery =
`select disposition_activity_code, disposition_action_code from dims.case_stage_detail where case_stage_id = '17952' `;


module.exports.generateDynamicQuery = function(id){

  //var finalQuery = testQuery.replace("stageId",id);
 // console.log('finalQuery'+finalQuery);
 return testQuery;
}
