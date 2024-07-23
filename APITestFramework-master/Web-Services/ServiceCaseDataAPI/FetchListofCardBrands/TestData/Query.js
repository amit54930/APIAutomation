
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`SELECT card_brand_code, card_brand_name FROM dims.card_brand_master`;


module.exports.generateDynamicQuery = function(){
 var finalQuery = qry1;
//console.log("finalQuery====="+finalQuery);
 return finalQuery;

}

