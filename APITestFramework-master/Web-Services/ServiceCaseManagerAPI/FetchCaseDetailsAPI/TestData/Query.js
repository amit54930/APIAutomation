var CaseDetailQuery = `select case_number, masked_card_number, global_token, merchant_token, acquirer_reference_number, transaction_amount,transaction_date, authorization_code, foreign_domestic_indicator, cd.card_brand_code, cbm.card_brand_name, card_brand_region_code,merchant_region_code, rm.region_name, rm.region_name, acquirer_bin_ica, issuer_bin_ica, acquirer_name, merchant_name, cd.transaction_time, cd.last_modified_by, cd.created_by from dims.case_detail cd join dims.card_brand_master cbm on cd.card_brand_code = cbm.card_brand_code join dims.region_master rm on cd.card_brand_region_code = rm.region_code where cd.case_number = 'caseNumber'`;

var CaseStageDetailQuery = `SELECT csd.case_stage_id,csd.case_number, csd.dispute_source_id,csd.dispute_reason_code, csd.latest_stage_ind, csd.duplicate_ind,csd.card_brand_case_number,csd.card_brand_merchant_number, csd.queue_id, csd.dispute_stage_id, csd.credited_date, csd.credited_amount, csd.status_id, csd.stage_config_id,csd.retreival_response_due_date, csd.case_received_date, csd.dispute_amount, csd.dispute_currency_code, csd.merchant_strip_off_ind, csd.hpy_delay_debit_ind, csd.support_document_ind, csd.last_modified_by, csd.created_by, csd.last_modified_timestamp, csd.created_timestamp, csd.status_indicator,csd.merchant_payment_amount, csd.merchant_currency_code, csd.credit_debit_ind, csd.member_message_text, csd.network_reference_id,qm.queue_name, dsm.dispute_stage_name, sm.status_name, dam.disposition_action_description, csd.disposition_activity_code,csd.disposition_action_code,csd.partial_ind,csd.card_brand_respond_due_date, dm.dspstn_activity_description,cbm.card_brand_name, rm.region_name, sc.card_brand_code, sc.region_code, sc.acquirer_name, sc.message_type, sc.action_code, sc.action_description, sc.function_code, sc.function_description, sc.stage_id, sc.is_received_ind, sc.response_indicator,dfd.file_name, cc.currency_code as dispute_currency_code_desc,rc.reason_description,rc.operations_description,rc.merchant_description,rc.reason_code,dcm.dispute_category_name FROM dims.case_stage_detail csd 
LEFT JOIN dims.queue_master qm ON csd.queue_id = qm.queue_id LEFT JOIN dispute_stage_master dsm on csd.dispute_stage_id = dsm.dispute_stage_id
LEFT JOIN dims.status_master sm ON csd.status_id = sm.status_id
LEFT JOIN dims.stage_config sc ON csd.stage_config_id = sc.stage_config_id 
LEFT JOIN dims.card_brand_master cbm ON sc.card_brand_code = cbm.card_brand_code
LEFT JOIN dims.region_master rm ON rm.region_code=sc.region_code
LEFT JOIN dims.disposition_action_master dam ON csd.disposition_action_code=dam.disposition_action_code
LEFT JOIN dims.disposition_activity_master dm ON csd.disposition_activity_code=dm.disposition_activity_code
LEFT JOIN dims.iso_numeric_currency_code cc on csd.dispute_currency_code = cc.iso_numeric_currency_code
LEFT JOIN dims.reason_code_master rc on csd.dispute_reason_code=rc.reason_code and cbm.card_brand_code=rc.card_brand_code and language_code='EN'
LEFT JOIN dims.di_data_file_detail dfd on csd.dispute_source_id = dfd.di_data_file_id 
LEFT JOIN dims.dispute_category_master dcm on dcm.dispute_category_code = rc.dispute_category_code
WHERE csd.case_number = 'caseNumber' AND csd.latest_stage_ind=1 ORDER BY csd.case_stage_id ASC`;

var transactionDetailQuery  = `select tm.transaction_master_id,tm.wwmaster_transaction_sk,tm.etlbatchid,tm.record_code,tm.arn,tm.merchant_number,tm.orgnl_transaction_refrnc_nbr,tm.transaction_amount,tm.transaction_code,tm.transaction_date,tm.transaction_time,tm.invoice_number,tm.foreign_domestic_ind,tm.authorization_source_code,tm.cardholder_id_method,tm.terminal_entry_mode,tm.transaction_identifier,tm.currency_code,tm.mcc,tm.pos_entry_mode,tm.currency_exponent,tm.foreign_amount,tm.batch_date,tm.batch_number,tm.batch_amount,tm.recurring_pay_ind,tm.category_ind,tm.security_protocol,tm.card_authentication_ind,tm.unvrsl_cardhldr_auth_field_ind,tm.requested_payment_service_ind,tm.terminal_tid,tm.moto_ec_ind,tm.terminal_capacity_ind,tm.authorization_response_code,tm.authorization_ind,tm.transaction_type,tm.terminal_transaction_date,tm.terminal_capability_profile,tm.terminal_country_code,tm.cryptogram_code,tm.trmnl_verification_result_code,tm.cryptogram_unpredictable_nbr,tm.application_transaction_count,tm.application_intrchange_profile,tm.cryptogram_information,tm.issuer_application_byte1_data,tm.issuer_application_byte2_data,tm.issuer_application_byte3_data,tm.issr_application_byte4to7_data,tm.issuer_application_byte8_data,tm.issuer_appln_byt9to16_data,tm.issuer_application_byte17_data,tm.issuer_appln_byt18to32_data,tm.authorization_amount,tm.mc_quick_payment_service_ind,tm.authorization_code,tm.deposit_control_number,tm.cash_back_amount,tm.audit_id,tm.remarks,tm.card_number_sk,tm.merchant_token,tm.card_number_rk,tm.seq_number_token,tm.global_token,tm.created_by,tm.created_timestamp,cc.currency_code as currency_code_desc from dims.transaction_master tm 
left JOIN dims.iso_numeric_currency_code cc on tm.currency_code = cc.iso_numeric_currency_code where tm.transaction_master_id=(select transaction_master_id from dims.case_detail where case_number = 'caseNumber')`

var authorizationDetailQuery  =`SELECT am.authorization_master_id, am.case_number, am.wwmaster_authorization_sk, am.etlbatchid, am.hierarchy, am.corporate, am.region, am.principal, am.associate, am.chain, am.card_holder_num_mask, am.merchant_number, am.auth_amount, am.tran_code, am.tran_desc, am.auth_date, am.auth_time, am.auth_code, am.auth_source, am.tran_id, am.pos_entry_mode, am.pos_entry_mode_desc, am.auth_desc, am.auth_vendor, am.pay_service_ind, am.issuer_response_code, am.avs_code, am.cvv2_results, am.xid, am.cavv_results, am.cat_ind, am.ucaf_ind, am.terminal_id, am.currency_code, am.global_token, am.merchant_token, am.card_number_rk, am.card_number_sk, am.created_by, am.created_timestamp, cc.currency_code as currency_code_desc from authorization_master am left JOIN iso_numeric_currency_code cc on am.currency_code = cc.iso_numeric_currency_code where am.case_number='caseNumber' ORDER BY am.authorization_master_id ASC`

var merchantDetailQuery = `SELECT mh.merchant_heirarchy_id, mh.merchant_number, mh.hierarchy_number, mh.corporate, mh.region, mh.principal, mh.associate, mh.chain, mh.last_modified_by, mh.created_by,mh.last_modified_timestamp, mh.created_timestamp FROM merchant_heirarchy mh JOIN case_detail cd ON mh.merchant_heirarchy_id = cd.merchant_heirarchy_id WHERE cd.case_number='caseNumber'`

var takeActionPageDetailQuery = `select tam.take_action_code,plm.page_description,sapm.componenent_display_order from dims.stage_actions_page_mapping sapm join take_action_master tam on sapm.take_action_code = tam.take_action_code join dims.page_list_master plm on sapm.page_list_id = plm.page_list_id where sapm.take_action_code='actionCode' and sapm.dispute_stage_id ='disputeStageId' order by sapm.componenent_display_order `

var takeActionsQuery = `select cbsam.take_action_code, tam.take_action_name from dims.card_brnd_stage_action_mapping cbsam join dims.take_action_master tam on cbsam.take_action_code = tam.take_action_code where cbsam.card_brand_code='cardBrandCode' and cbsam.dispute_stage_id ='disputeStageId'`


var accountDetailsQuery = `SELECT gd.gl_account_number,gd.gl_amount, inc.currency_code,gd.case_adjustment,gd.resolved_to,gd.resolved_on,gd.bank_id,gd.transaction_type,gd.work_of_date,gd.gl_status,dsm.dispute_stage_name,csd.case_stage_id ,csd.latest_stage_ind,gc.gl_account_description FROM gl_out_detail gd INNER JOIN dispute_stage_master dsm on dsm.dispute_stage_id = gd.dispute_stage_id INNER JOIN case_stage_detail csd on csd.case_stage_id = gd.case_stage_id INNER JOIN gl_account_config gc on gc.gl_account_number = gd.gl_account_number INNER JOIN iso_numeric_currency_code inc  on inc.iso_numeric_currency_code =  gd.iso_numeric_currency_code where gd.case_number ='caseNumber' AND csd.latest_stage_ind='1'`

module.exports.generateQueryforCaseDetail = function (caseNumber) {
  CaseDetailQuery = CaseDetailQuery.replace("caseNumber", caseNumber);
//console.log(CaseDetailQuery);
  return CaseDetailQuery;
}

module.exports.generateQueryforCaseStageDetail = function (caseNumber) {
  CaseStageDetailQuery = CaseStageDetailQuery.replace("caseNumber", caseNumber);
//console.log(CaseStageDetailQuery);
  return CaseStageDetailQuery;
}

module.exports.generateQueryforTransactionDetail = function (caseNumber) {
  transactionDetailQuery = transactionDetailQuery.replace("caseNumber", caseNumber);
//console.log(transactionDetailQuery);
  return transactionDetailQuery;
}

module.exports.generateQueryforAuthorizationDetail = function (caseNumber) {
  authorizationDetailQuery = authorizationDetailQuery.replace("caseNumber", caseNumber);
//console.log(authorizationDetailQuery);
  return authorizationDetailQuery;
}

module.exports.generateQueryforMerchantDetail = function (caseNumber) {
  merchantDetailQuery = merchantDetailQuery.replace("caseNumber", caseNumber);
//console.log(merchantDetailQuery);
  return merchantDetailQuery;
}

module.exports.generateQueryforTakeActions = function (cardBrandCode,disputeStageId) {
  takeActionsQuery = takeActionsQuery.replace("cardBrandCode", cardBrandCode);
  takeActionsQuery = takeActionsQuery.replace("disputeStageId", disputeStageId);
//console.log(takeActionsQuery);
  return takeActionsQuery;
}

module.exports.generateQueryforTakeActionPageDetails = function (actionCode,disputeStageId) {
  takeActionPageDetailQuery = takeActionPageDetailQuery.replace("actionCode", actionCode);
  takeActionPageDetailQuery = takeActionPageDetailQuery.replace("disputeStageId", disputeStageId);
//console.log(takeActionPageDetailQuery);
  return takeActionPageDetailQuery;
}

module.exports.generateQueryforAccountDetails = function (caseNumber) {
  accountDetailsQuery = accountDetailsQuery.replace("caseNumber", caseNumber);
//console.log(accountDetailsQuery);
  return accountDetailsQuery;
}




