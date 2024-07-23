
//var queryUtils = require('../../../Utilities/queryUtils.js');

var queryForWorkableCount=`SELECT count(Distinct case_number) as workableCount FROM dims.case_stage_detail where  case_assigned_to is  null and status_id=1 ;
`;

var queryForNewCount=`SELECT count(Distinct case_number) as newCount FROM dims.case_stage_detail
WHERE case_received_date >= Date(NOW() - INTERVAL 1 DAY) and status_id=1; ;
`;


var queryForCriticalCount=`SELECT COUNT(Distinct case_number) AS criticalCount FROM case_stage_detail csd WHERE csd.status_id= 1 AND csd.card_brand_respond_due_date BETWEEN DATE(NOW()) AND DATE(NOW()
+ INTERVAL 5 DAY) ;
`;

module.exports.generateDynamicQueryForWorkableCount = function(){
 
 return queryForWorkableCount;

}

module.exports.generateDynamicQueryForNewCount = function(){
 
    return queryForNewCount;
   
   }

   module.exports.generateDynamicQueryForCriticalCount = function(){
 
    return queryForCriticalCount;
   
   }

   