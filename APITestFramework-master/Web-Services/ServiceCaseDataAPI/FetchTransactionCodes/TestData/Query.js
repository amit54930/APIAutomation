//var queryUtils = require('../../../../Utilities/queryUtils.js');
var testQuery =
  "select transaction_code from dims.transaction_code_master where card_brand_code = 'cardBrandCode'";

module.exports.generateDynamicQuery = function(cardBrandCode) {
  
  var finalQuery = testQuery.replace("cardBrandCode",cardBrandCode);
  //console.log('finalQuery: '+finalQuery);
  return finalQuery;
}
