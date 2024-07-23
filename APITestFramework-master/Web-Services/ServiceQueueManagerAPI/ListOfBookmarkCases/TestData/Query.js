//var queryUtils = require('../../../../Utilities/queryUtils.js');
var query =`select ubc.bookmarked_by,ubc.bookmarked_timestamp,csd.case_number,csd.card_brand_respond_due_date,csd.case_received_date,
csd.dispute_reason_code,mh.corporate,mh.region,mh.principal,mh.associate,mh.chain,cd.card_brand_code,csd.case_stage_id,csd.dispute_amount,
cd.transaction_date,dsm.dispute_stage_name,cd.acquirer_bin_ica,cd.merchant_heirarchy_id,cd.merchant_name,tm.pos_entry_mode,
mh.hierarchy_number,mh.merchant_number,inc.currency_code,
mh.corporate,mh.principal,mh.region,mh.associate,mh.chain
from dims.case_stage_detail csd
inner join dims.case_detail cd on cd.case_number=csd.case_number
inner join dims.merchant_heirarchy mh on cd.merchant_heirarchy_id=mh.merchant_heirarchy_id
inner join dims.transaction_master tm on cd.transaction_master_id=tm.transaction_master_id
inner join dims.dispute_stage_master dsm on csd.dispute_stage_id=dsm.dispute_stage_id
inner join dims.user_bookmarked_case ubc on ubc.case_stage_id=csd.case_stage_id
inner join dims.iso_numeric_currency_code inc on inc.iso_numeric_currency_code=cd.merchant_payment_currency_code
where ubc.case_stage_id=csd.case_stage_id`;
  module.exports.generateDynamicQuery= function () {

  var finalQuery = query;
   return finalQuery;
  }



 
