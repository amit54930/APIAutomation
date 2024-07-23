
var testQuery =
  "select document_name,original_document_name,redacted_document_name from dims.case_documents where case_stage_id='caseStageId';"

module.exports.generateDynamicQuery = function (caseStageId) {
 
  var finalQuery = testQuery.replace('caseStageId',caseStageId);
 // console.log('***finalQuery***:'+finalQuery);
  return finalQuery;
}
