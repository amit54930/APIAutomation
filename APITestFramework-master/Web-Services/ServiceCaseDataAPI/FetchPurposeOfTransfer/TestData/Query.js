//var queryUtils = require('../../../../Utilities/queryUtils.js');
var query =`SELECT transfer_reason_code, transfer_reason_description FROM dims.transfer_reason_master`;
  module.exports.generateDynamicQuery= function () {

  var finalQuery = query;
   //console.log('finalQuery'+finalQuery);
   return finalQuery;
  }



 
