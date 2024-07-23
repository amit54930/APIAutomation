

var qry=`SELECT uga.user_group_id,ug.user_group_name,u.user_id,u.email,u.first_name,
u.last_name,
COUNT(csd.case_assigned_to) AS assignedCasesCount 
FROM dims.user u INNER JOIN dims.user_group_assignment uga ON u.user_id = uga.user_id
INNER JOIN dims.user_group ug ON uga.user_group_id = ug.user_group_id 
LEFT OUTER JOIN dims.case_stage_detail csd ON u.user_id = csd.case_assigned_to
WHERE `;

var s=" AND csd.status_id=1 GROUP BY ug.user_group_name,u.user_id,u.email,u.first_name,u.last_name;";



module.exports.generateDynamicQuery = function(inputs){
    var qry1="";
    if (inputs["userGroupId"] != undefined &&  inputs["userId"]!= undefined) {
    
        qry1 = qry1 + "ug.user_group_id=" + inputs["userGroupId"]+" AND u.user_id="+inputs["userId"];
    
      }
      else if (inputs["userGroupId"] != undefined) {
        qry1 = qry1 + "ug.user_group_id="+inputs["userGroupId"];
        
      }
      else if (inputs["userId"] != undefined) {
        qry1 = qry1 + "u.user_id="+inputs["userId"];
        
      } 
 
 
 
    var finalQuery = qry+qry1+s;
//console.log("=====finalQuery===== "+finalQuery);
 return finalQuery;

}

