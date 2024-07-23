
//var queryUtils = require('../../../Utilities/queryUtils.js');
var case_detail=`SELECT  masked_card_number, global_token, merchant_token, acquirer_reference_number,
transaction_amount, transaction_date, transaction_time, card_brand_code, 
card_brand_region_code,settlement_bank_id, merchant_name,
merchant_category_code, merchant_city, merchant_country_code, 
acquirer_bin_ica, issuer_bin_ica, acquirer_name,
 created_by, created_timestamp FROM dims.case_detail `;


var case_stage_detail = ` SELECT  csd.case_stage_id, csd.case_number, csd.dispute_source_id,csd.dispute_reason_code,csd.duplicate_ind, csd.card_brand_case_number, csd.card_brand_merchant_number,
csd.retreival_response_due_date, csd.case_received_date, csd.dispute_amount, 
csd.dispute_currency_code, csd.merchant_strip_off_ind, csd.support_document_ind, 
csd.member_message_text, csd.status_indicator, csd.queue_id, csd.stage_config_id,csd.latest_stage_ind, 
csd.dispute_stage_id, csd.status_id,  csd.last_modified_by, csd.last_modified_timestamp, csd.created_by, csd.created_timestamp FROM dims.case_detail cd left join dims.case_stage_detail csd on 
csd.case_number=cd.case_number
`;


var subquery = " where ";

module.exports.generateDynamicQuery1 = function(inputs){

    if (inputs["acquirerReferenceNumber"] != undefined) {
        tempQuery = subquery + "acquirer_reference_number='" + inputs["acquirerReferenceNumber"] + "'";
        
      }
      if (inputs["firstSixMasked", "lastFourMasked"] != undefined ) {
    
        tempQuery = tempQuery + " AND masked_card_number LIKE '" + inputs["firstSixMasked"]+"%"+inputs["lastFourMasked"] + "'";
    
      }
      else if (inputs["firstSixMasked"] != undefined) {
        tempQuery = tempQuery + " AND card_number_rk LIKE '"+inputs["firstSixMasked"] + "%" + "'";
        
      }
      else if (inputs["lastFourDigitsCardNumber"] != undefined) {
        tempQuery = tempQuery + " AND card_number_rk LIKE '" + inputs["lastFourMasked"]+ "'";
        
      }
      if (inputs["startDate", "endDate"] != undefined) {
        tempQuery = tempQuery + " AND auth_date BETWEEN '" + inputs["startDate"]+"' AND '"+inputs["endDate"]+ "'";
      }
     
      if (inputs["globalToken"] != undefined) {
        tempQuery = tempQuery + " AND global_token='" + inputs["globalToken"]+"'";
    
      }
      if (inputs["size"] != undefined) {
        tempQuery = tempQuery + " ORDER BY " + inputs["orderByProperties"] +" "+ inputs["direction"]+" LIMIT "+inputs["size"];
    
      }
       case_detail = case_detail +  tempQuery;
    //console.log('***finalQuery***:'+finalQuery);
  
    return case_detail;
}

module.exports.generateDynamicQuery2 = function(){
return case_stage_detail;
}
