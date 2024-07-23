


var queryToCheckActiveIndicator=`select is_active_ind from dims.case_assignment_detail 
`;


var subQuery1=`where case_stage_id='caseStageId' and case_assignment_id='caseAssignmentId'`

var queryToCheckCaseAssignedTo=`select case_assigned_to from dims.case_stage_detail where case_stage_id ='caseStageId'`;
 

module.exports.generateDynamicQueryToCheckActiveIndicator = function(caseStageIdInput,caseAssignmentIdInput){
 
    var finalQuery =queryToCheckActiveIndicator+ subQuery1.replace('caseStageId',caseStageIdInput).replace('caseAssignmentId',caseAssignmentIdInput);
    
 return finalQuery;

}

module.exports.generateDynamicQueryToCheckCaseAssignedTo = function(caseStageIdInput){
 
    var finalQuery1 =queryToCheckCaseAssignedTo.replace('caseStageId',caseStageIdInput);
    
 return finalQuery1;

}