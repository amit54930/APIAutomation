

var qry=`SELECT ug.user_group_name, count(ug.user_group_name) as count FROM user u
INNER JOIN user_group_assignment uga ON u.user_id = uga.user_id 
INNER JOIN user_group ug ON ug.user_group_id = uga.user_group_id
GROUP BY ug.user_group_name;`;

var qry2="SELECT ug.user_group_name,u.user_id,u.email,u.first_name,u.last_name FROM user u INNER JOIN user_group_assignment uga ON u.user_id = uga.user_id INNER JOIN user_group ug ON ug.user_group_id = uga.user_group_id GROUP BY  ug.user_group_name,u.user_id,u.email,u.first_name,u.last_name;";



module.exports.generateDynamicQuery1 = function(){
 
    var finalQuery = qry;
//console.log("=====finalQuery===== "+finalQuery);
 return finalQuery;

}

module.exports.generateDynamicQuery2 = function(){
 
  var finalQuery1 = qry2;
//console.log("=====finalQuery===== "+finalQuery);
return finalQuery1;

}
