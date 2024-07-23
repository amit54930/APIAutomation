
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`SELECT dispute_stage_id, dispute_stage_name FROM dispute_stage_master;`;



module.exports.generateDynamicQuery = function(){
 var finalQuery = qry1;
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}
