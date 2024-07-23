//var queryUtils = require('../../../../Utilities/queryUtils.js');


var subquery = " where ";



var testQuery =
  "select wwmaster_authorization_sk AS referenceAuthorizationId, etlbatchid AS etlBatchId, hierarchy , corporate, region, principal, associate, chain, merchant_number AS merchantNumber, auth_amount AS authAmount, tran_code AS tranCode, tran_desc AS tranDesc, auth_date AS authDate, auth_time AS authTime, auth_code AS authCode, auth_source AS authSource, tran_id AS tranId, pos_entry_mode AS posEntryMode,  auth_desc AS authDesc, auth_vendor AS authVendor,  pay_service_ind AS payServiceInd, issuer_response_code AS issuerResponseCode, avs_code AS avsCode, cvv2_results AS cvv2Results, xid, cavv_results AS cavvResults, cat_ind AS catInd, ucaf_ind AS ucafInd, terminal_id AS terminalId, currency_code AS currencyCode, global_token AS globalToken, merchant_token AS merchantToken, card_number_rk As cardNumberRk, card_number_sk AS cardNumberSk from"

var s = "`consumption_layer_dims.vw_wwmaster_authorization`";



module.exports.generateDynamicQuery = function (inputs) {
  var tempQuery = "";
  if (inputs["cardNumber"] != undefined) {
    tempQuery = subquery + "global_token='" + inputs["cardNumber"] + "'";
    //subquery = subquery.replace("globalToken",inputs["cardNumber"]);

  }
  if (inputs["merchantNumber"] != undefined) {
    tempQuery = tempQuery + " AND merchant_number='" + inputs["merchantNumber"] + "'";
    //subquery = subquery.replace("merchantNumber",inputs["merchantNumber"]);
  }
  if (inputs["fromAuthorizationDate"] != undefined) {
    var temp = " AND auth_date>=CAST('date1' AS DATE)";
    temp = temp.replace("date1", inputs["fromAuthorizationDate"]);
    //subquery += temp;
    tempQuery = tempQuery + temp;
    //subquery = subquery.replace("date1",inputs["fromAuthorizationDate"]);
  }
  if (inputs["toAuthorizationDate"] != undefined) {
    var temp1 = " AND auth_date<=CAST('date2' AS DATE)";
    temp1 = temp1.replace("date2", inputs["toAuthorizationDate"]);
    // subquery += temp1;
    tempQuery = tempQuery + temp1;
    //subquery = subquery.replace("date2",inputs["toAuthorizationDate"]);
  }
  if (inputs["authorizationAmount"] != undefined) {
    tempQuery = tempQuery + " AND auth_amount=" + inputs["authorizationAmount"];

  }
  if (inputs["authorizationCode"] != undefined) {
    tempQuery = tempQuery + " AND auth_code='" + inputs["authorizationCode"] + "'";

  }
  var finalQuery = testQuery + s + tempQuery;
  //console.log('finalQuery'+finalQuery);
  return finalQuery;
}
