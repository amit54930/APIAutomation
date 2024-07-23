//var queryUtils = require('../../../../Utilities/queryUtils.js');
var testQuery =
  `select ste.search_type_element_id,ste.element_sequence_number, ste.element_label_name,
  ec.element_category_name, et.element_type_name ,ste.is_mandate_ind
from dims.search_type_element ste 
 JOIN dims.search_type st on ste.search_type_id=st.search_type_id 
 JOIN dims.element_category ec on ste.element_category_id=ec.element_category_id 
 JOIN dims.element_type et on ste.element_type_id=et.element_type_id 
 where st.search_type_name='pageId'
and ste.search_type_element_id not in (
select  ste.search_type_element_id
from dims.search_type_element ste 
JOIN dims.search_type st on ste.search_type_id=st.search_type_id 
JOIN dims.element_category ec on ste.element_category_id=ec.element_category_id 
JOIN dims.element_type et on ste.element_type_id=et.element_type_id
JOIN dims.applied_search_parameters asp on asp.search_type_element_id=ste.search_type_element_id
where st.search_type_name='pageId' and et.element_type_name  in ('STRING'))  order by element_sequence_number ASC;
`;

var subquery = ` select  ste.search_type_element_id,ste.element_sequence_number, ste.element_label_name,
ec.element_category_name, et.element_type_name ,ste.is_mandate_ind
from dims.search_type_element ste 
JOIN dims.search_type st on ste.search_type_id=st.search_type_id 
JOIN dims.element_category ec on ste.element_category_id=ec.element_category_id 
JOIN dims.element_type et on ste.element_type_id=et.element_type_id
JOIN dims.applied_search_parameters asp on asp.search_type_element_id=ste.search_type_element_id
where st.search_type_name='pageId' order by element_sequence_number ASC;`;

var queryForFilterID=`select search_type_id from dims.search_type where search_type_name='pageId'`


module.exports.generateDynamicQuery = function(pageId) {

   var finalQuery = testQuery.replace("pageId",pageId);
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery2= function(pageId) {

    var finalQuery1 = subquery.replace("pageId",pageId);
//    console.log(finalQuery1);
    return finalQuery1;
  }

  module.exports.generateDynamicQueryforFilterID= function(pageId) {
    var finalQuery1 = queryForFilterID.replace("pageId",pageId);
    //    console.log(finalQuery1);
        return finalQuery1;
    
    
  }