//var queryUtils = require('../../../../Utilities/queryUtils.js');


var subquery = " where ";



var testQuery =
  "select wwmaster_authorization_sk AS referenceAuthorizationId, etlbatchid AS etlBatchId, hierarchy , corporate, region, principal, associate, chain, merchant_number AS merchantNumber, auth_amount AS authAmount, tran_code AS tranCode, tran_desc AS tranDesc, auth_date AS authDate, auth_time AS authTime, auth_code AS authCode, auth_source AS authSource, tran_id AS tranId, pos_entry_mode AS posEntryMode,  auth_desc AS authDesc, auth_vendor AS authVendor,  pay_service_ind AS payServiceInd, issuer_response_code AS issuerResponseCode, avs_code AS avsCode, cvv2_results AS cvv2Results, xid, cavv_results AS cavvResults, cat_ind AS catInd, ucaf_ind AS ucafInd, terminal_id AS terminalId, currency_code AS currencyCode, global_token AS globalToken, merchant_token AS merchantToken, card_number_rk As cardNumberRk, card_number_sk AS cardNumberSk from "

var s = "`prj-gousenaib-dlak-res01.consumption_layer_dims.vw_wwmaster_authorization`";



module.exports.generateDynamicQuery = function (inputs) {
  var tempQuery = "";
  if (inputs["authorizationCode"] != undefined) {
    tempQuery = subquery + "auth_code='" + inputs["authorizationCode"] + "'";
    
  }
  if (inputs["firstSixDigitsCardNumber", "lastFourDigitsCardNumber"] != undefined ) {
    
    tempQuery = tempQuery + " AND card_number_rk LIKE '" + inputs["firstSixDigitsCardNumber"]+"%"+inputs["lastFourDigitsCardNumber"] + "'";

  }
  else if (inputs["firstSixDigitsCardNumber"] != undefined) {
    tempQuery = tempQuery + " AND card_number_rk LIKE '"+inputs["firstSixDigitsCardNumber"] + "%" + "'";
    
  }
  else if (inputs["lastFourDigitsCardNumber"] != undefined) {
    tempQuery = tempQuery + " AND card_number_rk LIKE '" + inputs["lastFourDigitsCardNumber"]+ "'";
    
  }
  if (inputs["fromAuthorizationDate", "toAuthorizationDate"] != undefined) {
    tempQuery = tempQuery + " AND auth_date BETWEEN '" + inputs["fromAuthorizationDate"]+"' AND '"+inputs["toAuthorizationDate"]+ "'";
  }
  if (inputs["merchantNumber"] != undefined) {
    tempQuery = tempQuery + " AND merchant_number='" + inputs["merchantNumber"]+"'";

  }
  if (inputs["globalToken"] != undefined) {
    tempQuery = tempQuery + " AND global_token='" + inputs["globalToken"]+"'";

  }
  if (inputs["size"] != undefined) {
    tempQuery = tempQuery + " ORDER BY " + inputs["orderByProperties"] +" "+ inputs["direction"]+" LIMIT "+inputs["size"];

  }
  var finalQuery = testQuery + s + tempQuery;
//console.log('***finalQuery***:'+finalQuery);
  return finalQuery;
}
