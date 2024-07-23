
//var queryUtils = require('../../../Utilities/queryUtils.js');

var start = `
SELECT matched_fail_transaction_id, matched_fail_case_id, wwmaster_transaction_sk, etlbatchid,
 record_code, arn, merchant_number, orgnl_transaction_refrnc_nbr, transaction_amount,transaction_code,
  transaction_date, transaction_time, invoice_number, foreign_domestic_ind, authorization_source_code,
  cardholder_id_method, terminal_entry_mode, transaction_identifier, currency_code, mcc, pos_entry_mode,
  currency_exponent, foreign_amount, batch_date, batch_number, batch_amount, recurring_pay_ind,
   category_ind, security_protocol, card_authentication_ind, unvrsl_cardhldr_auth_field_ind,
    requested_payment_service_ind, terminal_tid, moto_ec_ind,terminal_capacity_ind,
    authorization_response_code, authorization_ind, transaction_type, terminal_transaction_date,
     terminal_capability_profile, terminal_country_code,cryptogram_code, trmnl_verification_result_code,
      cryptogram_unpredictable_nbr, application_transaction_count, application_intrchange_profile,
       cryptogram_information,issuer_application_byte1_data, issuer_application_byte2_data,
        issuer_application_byte3_data, issr_application_byte4to7_data,
        issuer_application_byte8_data, issuer_appln_byt9to16_data,issuer_application_byte17_data,
         issuer_appln_byt18to32_data, authorization_amount, mc_quick_payment_service_ind,
         authorization_code, deposit_control_number, cash_back_amount, audit_id, remarks,
         card_number_sk, merchant_token, card_number_rk, seq_number_token,
 global_token, created_by,created_timestamp
 FROM dims.matched_fail_transaction WHERE matched_fail_case_id='failedCaseId'`;


module.exports.generateDynamicQuery = function(failedCaseId){
  var finalQuery = start.replace("failedCaseId",failedCaseId);
//console.log("finalQuery====="+finalQuery);
 return finalQuery;
}
