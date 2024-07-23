//var queryUtils = require('../../../../Utilities/queryUtils.js');
var Query =  `select * from dims.case_documents WHERE document_id ='abc'`;


    module.exports.generateDynamicQuery = function(case_stage_id){
     
           Query  = Query.replace('abc',case_stage_id);      
            
           //console.log(finalQuery);
            return Query;
}

