
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`SELECT sapm.take_action_code,plm.page_description FROM dims.stage_actions_page_mapping sapm
left join dims.page_list_master plm
on sapm.page_list_id=plm.page_list_id
`;

var subQuery1=` where sapm.dispute_stage_id='dispute_stage_id1' `;
var subQuery2=`  and sapm.take_action_code='take_Action_code1';`;

module.exports.generateDynamicQuery = function(takeActionCode,disputeStageId ){
 var query1 = subQuery1.replace('dispute_stage_id1',disputeStageId);
 var query2=subQuery2.replace('take_Action_code1',takeActionCode)
var finalQuery=testQuery+query1+query2;
 return finalQuery;

}