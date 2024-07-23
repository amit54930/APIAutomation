
    
   

var testQuery =
  "Select case_assignment_id from dims.case_assignment_detail where case_stage_id IN ";
  var subquery="('first','second')";
  var qry2=" and is_active_ind=1;";

module.exports.generateDynamicQuery = function() {
  
  var finalQuery=testQuery+subquery+qry2;
  
  return finalQuery;
}
  