
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`select ssp.saved_search_parameter_id, ssp.saved_search_id, ssp.search_type_element_id, ssp.parameter_value,
ste.element_label_name, ste.element_sequence_number, ec.element_category_name, et.element_type_name
from dims.saved_search_parameter 
ssp JOIN dims.saved_search ss ON ssp.saved_search_id=ss.saved_search_id
JOIN dims.search_type_element ste ON ssp.search_type_element_id=ste.search_type_element_id
JOIN dims.element_category ec ON ste.element_category_id=ec.element_category_id
JOIN dims.element_type et ON ste.element_type_id=et.element_type_id 
where ss.search_type_id={categoryId};`;

var qry2=`select saved_search_id, saved_search_name from dims.saved_search where 
search_type_id={categoryId};`;

module.exports.generateDynamicQuery1 = function(categoryId){
 var finalQuery = qry1.replace("{categoryId}",categoryId);
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}

module.exports.generateDynamicQuery2 = function(categoryId){
    var finalQuery = qry2.replace("{categoryId}",categoryId );
   //console.log("finalQuery====="+finalQuery);
    return finalQuery;
   }