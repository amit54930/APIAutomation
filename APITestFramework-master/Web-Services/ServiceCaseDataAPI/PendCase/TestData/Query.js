module.exports.generateDynamicQuery = function(caseStageId){
  var finalQuery = "select queue_id from case_stage_detail where case_stage_id='caseStageId';";
  finalQuery=finalQuery.replace('caseStageId',caseStageId);
  return finalQuery;
 }

  
 
