//var queryUtils = require('../../../../Utilities/queryUtils.js');
var query =`SELECT user_id,email,first_name,last_name,status,user_role_key FROM dims.user where user_role_key='DISPUTE_SUPERVISOR'`;
  module.exports.generateDynamicQuery= function () {

  var finalQuery = query;
   //console.log('finalQuery'+finalQuery);
   return finalQuery;
  }



 
