var subquery =`  where `;

var testQuery =
`select wwmaster_authorization_sk AS referenceAuthorizationId, 
etlbatchid AS etlBatchId,
hierarchy, 
corporate, 
region, 
principal, 
associate, 
chain, 

merchant_number AS merchantNumber, 
auth_amount AS authAmount, 
tran_code AS tranCode, 
tran_desc AS tranDesc, 
auth_date AS authDate, 
auth_time AS authTime, 
auth_code AS authCode, 
auth_source AS authSource,
tran_id AS tranId,
pos_entry_mode AS posEntryMode, 

auth_desc AS authDesc, 
auth_vendor AS authVendor, 
expiry_date AS expiryDate, 
pay_service_ind AS payServiceInd, 
issuer_response_code AS issuerResponseCode, 
avs_code AS avsCode, 
cvv2_results AS cvv2Results, 
xid, 
cavv_results AS cavvResults, 
cat_ind AS catInd, 
ucaf_ind AS ucafInd, 
terminal_id AS terminalId, 
currency_code AS currencyCode,
 global_token AS globalToken, 
merchant_token AS merchantToken, 
card_number_rk AS cardNumberRk, 
card_number_sk AS cardNumberSk
from `; 

var s = "`consumption_layer_dims.vw_wwmaster_authorization`";



module.exports.generateDynamicQuery = function(test){
  var tempQuery = "";
  
 if (test["cardNumber"] != undefined) {
  tempQuery = subquery + "global_token='" + test["cardNumber"] + "'";
 

}

if (test["merchantNumber"] != undefined) {
  tempQuery = tempQuery + " AND merchant_number='" + test["merchantNumber"] + "'";
 

if (test["authCode"] != undefined) {
  tempQuery = tempQuery + " AND auth_code='" + test["authCode"] + "'";

}
var finalQuery = testQuery + s + tempQuery;
 
  return finalQuery;
}

}

  
 
