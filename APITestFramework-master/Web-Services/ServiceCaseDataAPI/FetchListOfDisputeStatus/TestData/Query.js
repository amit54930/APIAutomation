
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`SELECT status_id, status_name FROM status_master;`;


module.exports.generateDynamicQuery = function(){
 var finalQuery = qry1;
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}