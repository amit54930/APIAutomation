
//var queryUtils = require('../../../Utilities/queryUtils.js');
var case_detail=`SELECT case_detail.global_token,
case_detail.merchant_token,
case_detail.acquirer_reference_number,
case_detail.transaction_amount,
case_detail.transaction_date,
case_detail. authorization_code,
card_brand_master.card_brand_name,
case_detail.card_brand_code,
case_detail.card_brand_region_code,
case_detail.merchant_name,
case_detail.acquirer_bin_ica,
case_detail.issuer_bin_ica,
case_detail.acquirer_name,
case_detail. masked_card_number,
case_detail.created_by,
case_detail.created_timestamp,
case_detail.transaction_time,
case_detail. merchant_category_code ,
 case_detail.merchant_city,  
case_detail.merchant_country_code
FROM dims.case_detail case_detail
join dims.card_brand_master card_brand_master on card_brand_master.card_brand_code=case_detail.card_brand_code
join dims.case_stage_detail case_stage_detail on case_stage_detail.case_number=case_detail.case_number
where case_stage_detail.queue_id in (6,7) and case_detail.transaction_master_id is null limit 10000;
`;
var case_stage_detail = `SELECT case_stage_detail.case_stage_id,
case_stage_detail.case_number,
case_stage_detail.dispute_source_id,
case_stage_detail.latest_stage_ind,
case_stage_detail.dispute_reason_code,
case_stage_detail.duplicate_ind,
case_stage_detail.card_brand_case_number,
case_stage_detail.card_brand_merchant_number,
case_stage_detail.retreival_response_due_date,
case_stage_detail.case_received_date,
cd.dispute_currency_code,
case_stage_detail.dispute_amount,
case_stage_detail.merchant_strip_off_ind,
case_stage_detail.support_document_ind,
case_stage_detail.queue_id,
case_stage_detail.stage_config_id,
case_stage_detail.dispute_stage_id,
dispute_stage_master.dispute_stage_name,
case_stage_detail.status_id,
case_stage_detail.last_modified_by,
case_stage_detail.last_modified_timestamp,
case_stage_detail.created_by,
case_stage_detail.created_timestamp,
case_stage_detail.member_message_text,
case_stage_detail.network_reference_id,
reason_code_master.reason_description

FROM dims.case_stage_detail case_stage_detail
inner join dims.case_detail cd on case_stage_detail.case_number=cd.case_number
join dims.reason_code_master reason_code_master on reason_code_master.reason_code=case_stage_detail.dispute_reason_code
join dims.dispute_stage_master dispute_stage_master on dispute_stage_master.dispute_stage_id=case_stage_detail.dispute_stage_id
where case_stage_detail.queue_id in (6,7) and cd.transaction_master_id is null limit 10000;`;

module.exports.generateDynamicQuery1 = function(){
    return case_detail;
    }
module.exports.generateDynamicQuery2 = function(){
return case_stage_detail;
}
