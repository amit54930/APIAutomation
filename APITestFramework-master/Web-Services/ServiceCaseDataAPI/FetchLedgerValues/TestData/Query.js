
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`SELECT gac.gl_account_number,gac.acquirer_code,gac.gl_account_description FROM dims.gl_account_config gac
left join dims.gl_account_merchant_region  gamr on gac.gl_account_number=gamr.gl_account_number 
`;

var subQuery=`where gamr.merchant_region_code='merchantRegionCode'`;


module.exports.generateDynamicQuery = function(merchantRegionCodeValue){
 var finalQuery =testQuery+ subQuery.replace('merchantRegionCode',merchantRegionCodeValue);
 return finalQuery;

}