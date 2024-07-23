
//var queryUtils = require('../../../Utilities/queryUtils.js');

var case_detail=`SELECT case_detail.case_number,
case_detail.masked_card_number,
case_detail.global_token,
case_detail.merchant_token,
case_detail.acquirer_reference_number,
case_detail.transaction_amount,
case_detail.transaction_date,
case_detail.transaction_time,
case_detail.authorization_code,
case_detail.transaction_master_id,
case_detail.merchant_heirarchy_id,
case_detail.foreign_domestic_indicator,
case_detail.card_brand_code,
case_detail.card_brand_region_code,
case_detail.merchant_region_code,
case_detail.merchant_name,
case_detail.merchant_category_code,
case_detail.merchant_city,
case_detail.merchant_country_code,
case_detail.acquirer_bin_ica,
case_detail.issuer_bin_ica,
case_detail.acquirer_name,
case_detail.last_modified_by,
case_detail.last_modified_timestamp,
case_detail.created_by,
case_detail.created_timestamp`;

var case_stage_detail=`select case_stage_detail.case_stage_id,
case_stage_detail.case_number,
case_stage_detail.dispute_source_id,
case_stage_detail.dispute_reason_code,
case_stage_detail.duplicate_ind,
case_stage_detail.latest_stage_ind,
case_stage_detail.card_brand_case_number,
case_stage_detail.card_brand_merchant_number,
case_stage_detail.card_brand_respond_due_date,
case_stage_detail.internal_respond_due_date,
case_stage_detail.merchant_respond_due_date,
case_stage_detail.retreival_response_due_date,
case_stage_detail.case_received_date,
case_stage_detail.representment_amount,
case_stage_detail.dispute_amount,
case_stage_detail.dispute_currency_code,
case_stage_detail.merchant_strip_off_ind,
case_stage_detail.support_document_ind,
case_stage_detail.network_reference_id,
case_stage_detail.member_message_text,
case_stage_detail.queue_id,
case_stage_detail.stage_config_id,
case_stage_detail.dispute_stage_id,
dsm.dispute_stage_name,
case_stage_detail.status_id,
case_detail.last_modified_by,
case_stage_detail.last_modified_timestamp,
case_stage_detail.created_by,
case_stage_detail.created_timestamp`;

var transaction_master=`select transaction_master.pos_entry_mode,
transaction_master.currency_code FROM dims.transaction_master transaction_master
inner join dims.case_detail case_detail on transaction_master.transaction_master_id=case_detail.transaction_master_id
where case_detail.case_number='abc'`;

var merchant=`SELECT mh.merchant_number FROM dims.case_detail cd
inner join dims.merchant_heirarchy mh on mh.merchant_heirarchy_id=cd.merchant_heirarchy_id where cd.case_number='abc'`

var subquery1=` FROM dims.case_detail case_detail
inner join dims.case_stage_detail case_stage_detail on case_stage_detail.case_number=case_detail.case_number 
inner join dims.merchant_heirarchy mh on mh.merchant_heirarchy_id=case_detail.merchant_heirarchy_id
inner join dims.transaction_master tm on tm.transaction_master_id=case_detail.transaction_master_id
where `;

var subquery2=` FROM dims.case_stage_detail case_stage_detail
inner join dims.case_detail case_detail on case_stage_detail.case_number=case_detail.case_number 
inner join dims.merchant_heirarchy mh on mh.merchant_heirarchy_id=case_detail.merchant_heirarchy_id
inner join dims.transaction_master tm on tm.transaction_master_id=case_detail.transaction_master_id
inner join dims.dispute_stage_master dsm on dsm.dispute_stage_id=case_stage_detail.dispute_stage_id
where `;



module.exports.generateDynamicQuery1 = function(inputs){
  subquery1 = subquery1.replace("caseNumber",inputs.caseNumber);
  subquery1 = subquery1.replace("transactionAmount",inputs.transactionAmount);
  subquery1 = subquery1.replace('merchantNumber',inputs.merchantNumber);
  subquery1 = subquery1.replace("firstSixcardNumber",inputs.firstSixcardNumber);
  subquery1 = subquery1.replace("lastFourCardNumber",inputs.lastFourCardNumber);
  subquery1 = subquery1.replace("transactionDate",inputs.transactionDate);
  subquery1 = subquery1.replace("transactionCode",inputs.transactionCode);
  subquery1 = subquery1.replace("acqReferenceNumber",inputs.acqReferenceNumber);
 var tempQuery = "";
 if (inputs["caseNumber"] != undefined) {
   tempQuery = subquery1 + "case_detail.case_number='" + inputs["caseNumber"] + "'";
   
 }
 if (inputs["merchantNumber"] != undefined) {
   tempQuery = tempQuery + " AND mh.merchant_number='" + inputs["merchantNumber"] + "'";
   
 }
 if (inputs["firstSixcardNumber", "lastFourCardNumber"] != undefined ) {
   
   tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '" + inputs["firstSixcardNumber"]+ "%" + "'";
 } else
 if (inputs["lastFourCardNumber"] != undefined) {
   tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '"+ "%" +inputs["lastFourCardNumber"] + "'";
   
 }else
 if (inputs["firstSixcardNumber"] != undefined) {
   tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '" + inputs["firstSixcardNumber"]+ "%" + "'";
 }
 if (inputs["transactionDate"] != undefined) {
   tempQuery = tempQuery + " AND case_detail.transaction_date=  '"+inputs["transactionDate"]+ "'";
 }
 if (inputs["acqReferenceNumber"] != undefined) {
   tempQuery = tempQuery + " AND case_detail.acquirer_reference_number= '"+inputs["acqReferenceNumber"]+ "'";
 }
 if (inputs["transactionAmount"] != undefined) {
   tempQuery = tempQuery + " AND case_detail.transaction_amount='" + inputs["transactionAmount"]+"'";

 }
 if (inputs["transactionCode"] != undefined) {
   tempQuery = tempQuery + " AND tm.transaction_code='" + inputs["transactionCode"]+"' + 'order by case_detail.case_number desc'";

 }
 var finalQuery = case_detail + tempQuery;
 //console.log('finalQuery'+finalQuery);
 return finalQuery;

}
module.exports.generateDynamicQuery2 = function(inputs){
  subquery2 = subquery2.replace("caseNumber",inputs.caseNumber);
  subquery2 = subquery2.replace("transactionAmount",inputs.transactionAmount);
  subquery2 = subquery2.replace("merchantNumber",inputs.merchantNumber);
  subquery2 = subquery2.replace("firstSixcardNumber",inputs.firstSixcardNumber);
  subquery2 = subquery2.replace("lastFourCardNumber",inputs.lastFourCardNumber);
  subquery2 = subquery2.replace("transactionDate",inputs.transactionDate);
  subquery2 = subquery2.replace("transactionCode",inputs.transactionCode);
  subquery2 = subquery2.replace("acqReferenceNumber",inputs.acqReferenceNumber);
  subquery2 = subquery2.replace("cardBrandCaseNumber",inputs.cardBrandCaseNumber);
  var tempQuery = "";
 
  if (inputs["cardBrandCaseNumber"] != undefined) {
    tempQuery = subquery2 + "case_stage_detail.card_brand_case_number='" + inputs["cardBrandCaseNumber"] + "'";
    
  }
  if (inputs["merchantNumber"] != undefined) {
    tempQuery = tempQuery + " AND mh.merchant_number='" + inputs["merchantNumber"] + "'";
    
  }
  if (inputs["firstSixcardNumber", "lastFourCardNumber"] != undefined ) {
    
    tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '" + inputs["firstSixcardNumber"]+ "%" + "'";
  } else
  if (inputs["lastFourCardNumber"] != undefined) {
    tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '"+ "%" +inputs["lastFourCardNumber"] + "'";
    
  }else
  if (inputs["firstSixcardNumber"] != undefined) {
    tempQuery = tempQuery + " AND case_detail.masked_card_number LIKE '" + inputs["firstSixcardNumber"]+ "%" + "'";
  }
  if (inputs["transactionDate"] != undefined) {
    tempQuery = tempQuery + " AND case_detail.transaction_date=  '"+inputs["transactionDate"]+ "'";
  }
  if (inputs["acqReferenceNumber"] != undefined) {
    tempQuery = tempQuery + " AND case_detail.acquirer_reference_number= '"+inputs["acqReferenceNumber"]+ "'";
  }
  if (inputs["transactionAmount"] != undefined) {
    tempQuery = tempQuery + " AND case_detail.transaction_amount='" + inputs["transactionAmount"]+"'";
 
  }
  if (inputs["transactionCode"] != undefined) {
    tempQuery = tempQuery + " AND tm.transaction_code='" + inputs["transactionCode"]+"' + 'order by case_detail.case_number desc'";
 
  }
  var finalQuery = case_stage_detail + tempQuery ;
  //console.log('finalQuery'+finalQuery);
  return finalQuery;
   }
 
   module.exports.generateDynamicQuery3 = function(inputs){
    var finalQuery = transaction_master.replace("abc",inputs.caseNumber);
  // console.log("finalQuery== 3 ==="+finalQuery);
    return finalQuery;
   }
   module.exports.generateDynamicQuery4 = function(inputs){
    var finalQuery = merchant.replace("abc",inputs.caseNumber);
  // console.log("finalQuery== 3 ==="+finalQuery);
    return finalQuery;
   }

