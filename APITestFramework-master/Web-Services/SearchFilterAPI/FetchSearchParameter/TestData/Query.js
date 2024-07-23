
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`select ste.search_type_element_id, ste.element_sequence_number, ste.element_label_name, ec.element_category_name, et.element_type_name 
from dims.search_type_element ste 
JOIN dims.search_type st on ste.search_type_id=st.search_type_id 
JOIN dims.element_category ec on ste.element_category_id=ec.element_category_id 
JOIN dims.element_type et on ste.element_type_id=et.element_type_id 
where st.search_type_id={filterTypeId}
order by ste.element_sequence_number;`;

var qry2=`select search_type_name from search_type where search_type_id={filterTypeId};`;

module.exports.generateDynamicQuery1 = function(filterTypeId){
 var finalQuery = qry1.replace("{filterTypeId}",filterTypeId);
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}

module.exports.generateDynamicQuery2 = function(filterTypeId){
    var finalQuery = qry2.replace("{filterTypeId}",filterTypeId );
   //console.log("finalQuery====="+finalQuery);
    return finalQuery;
   }