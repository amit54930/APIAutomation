
//var queryUtils = require('../../../Utilities/queryUtils.js');

var queryForWorkableCount=`SELECT count(Distinct case_number) as workableCount FROM dims.case_stage_detail where  case_assigned_to ='userId' and status_id=1 ;
`;

var queryForCompletedCount=`SELECT count(Distinct case_number) as completedCount FROM case_stage_detail csd INNER JOIN user u ON u.user_id = csd.case_assigned_to
WHERE csd.case_assigned_to IS NOT NULL AND csd.status_id=2 and u.user_id ='userId'; 
`;


var queryForCriticalCount=`SELECT count(Distinct case_number) AS assignedCasesCriticalCount FROM case_stage_detail csd
INNER JOIN user u ON u.user_id = csd.case_assigned_to
WHERE csd.card_brand_respond_due_date BETWEEN DATE(NOW()) AND DATE(NOW() + INTERVAL 5 DAY) 
AND csd.case_assigned_to IS NOT NULL AND csd.status_id =1 
and u.user_id = 'userId'; 
`;

module.exports.generateDynamicQueryForWorkableCount = function(userID1){
 
    var query=queryForWorkableCount.replace('userId',userID1)
 return query;

}

module.exports.generateDynamicQueryForCompletedCount = function(userID1){
    var query=queryForCompletedCount.replace('userId',userID1)
    return query;
  
   
   }

   module.exports.generateDynamicQueryForCriticalCount = function(userID1){
    var query=queryForCriticalCount.replace('userId',userID1)
    return query;
    
   
   }

   