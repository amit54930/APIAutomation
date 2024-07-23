
//var queryUtils = require('../../../Utilities/queryUtils.js');

var start = `    select case_number, dispute_source_id,dispute_reason_code, duplicate_ind, 
card_brand_case_number, card_brand_merchant_number,case_stage_id, retreival_response_due_date,
dispute_amount,  merchant_strip_off_ind, support_document_ind, member_message_text,network_reference_id,case_received_date, queue_id, stage_config_id, dispute_stage_id,latest_stage_ind , status_id, last_modified_by, last_modified_timestamp, created_by, created_timestamp
from dims.case_stage_detail where queue_id=8 order by case_number desc; `;

var qry1=` select  case_number, masked_card_number, global_token, merchant_token, acquirer_reference_number,
transaction_amount, transaction_date, transaction_time, authorization_code,
transaction_master_id, merchant_heirarchy_id, foreign_domestic_indicator, card_brand_code,
card_brand_region_code, merchant_region_code,  dispute_currency_code, 
merchant_name, merchant_category_code, merchant_city, merchant_country_code,
acquirer_bin_ica, issuer_bin_ica, acquirer_name, last_modified_by, 
last_modified_timestamp, created_by, created_timestamp from 
dims.case_detail where case_number=3918000001;`;

var qry2=`
select cd.transaction_master_id, wwmaster_transaction_sk, etlbatchid, record_code, arn,
merchant_number, orgnl_transaction_refrnc_nbr, cd.transaction_amount, transaction_code, 
cd.transaction_date, cd.transaction_time, invoice_number, foreign_domestic_ind, 
authorization_source_code, cardholder_id_method, terminal_entry_mode,
transaction_identifier, currency_code, mcc, pos_entry_mode, 
currency_exponent, foreign_amount, batch_date, batch_number, batch_amount,
recurring_pay_ind, category_ind, security_protocol, card_authentication_ind,
unvrsl_cardhldr_auth_field_ind, requested_payment_service_ind, terminal_tid,
moto_ec_ind, terminal_capacity_ind, authorization_response_code, authorization_ind, 
transaction_type, terminal_transaction_date, terminal_capability_profile,
terminal_country_code, cryptogram_code, trmnl_verification_result_code
, cryptogram_unpredictable_nbr, application_transaction_count,
 cryptogram_information, issuer_application_byte1_data, 
issuer_application_byte2_data, issuer_application_byte3_data, application_intrchange_profile,
issr_application_byte4to7_data, issuer_application_byte8_data, issuer_appln_byt9to16_data,
issuer_application_byte17_data, issuer_appln_byt18to32_data, authorization_amount,
mc_quick_payment_service_ind, cd.authorization_code, deposit_control_number, 
cash_back_amount, audit_id, remarks, card_number_sk, cd.merchant_token, card_number_rk,
seq_number_token, cd.global_token, cd.created_by, cd.created_timestamp
from dims.transaction_master tm 
join dims.case_detail cd on cd.transaction_master_id=tm.transaction_master_id
where cd.case_number=3918000001;`;


module.exports.generateDynamicQuery = function(  ){
 //var start = start.replace("{queueId}",queueId );
//console.log("finalQuery====="+finalQuery);
// return finalQuery;
return start;
}
module.exports.generateDynamicQuery1 = function(  ){
    //var start = start.replace("{queueId}",queueId );
   //console.log("finalQuery====="+finalQuery);
   // return finalQuery;
   return qry1;
   }

   module.exports.generateDynamicQuery2 = function(  ){
    //var start = start.replace("{queueId}",queueId );
   //console.log("finalQuery====="+finalQuery);
   // return finalQuery;
   return qry2;
   }
   
   