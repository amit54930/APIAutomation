
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`SELECT region_code,region_name FROM dims.region_master;`;



module.exports.generateDynamicQuery = function(){
 var finalQuery = qry1;
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}
