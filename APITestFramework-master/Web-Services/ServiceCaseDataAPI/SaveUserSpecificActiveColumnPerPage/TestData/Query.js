
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`select saved_column_element_id as saved_column_element_id from dims.saved_grid_column_element order by created_timestamp desc limit 1;
`;


module.exports.generateDynamicQuery = function(respondToStageId){
 
 return testQuery;

}