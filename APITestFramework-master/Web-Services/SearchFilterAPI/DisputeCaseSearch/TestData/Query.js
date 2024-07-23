
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`select cd.case_number ,cd.masked_card_number,cd.merchant_name,
cd.card_brand_code,cd.acquirer_bin_ica,cd.acquirer_reference_number,
cd.issuer_bin_ica,cd.transaction_amount, cd.transaction_date,cd.transaction_time,cd.global_token,
csd.dispute_amount,csd.dispute_reason_code,csd.case_stage_id,sm.status_name,dsm.dispute_stage_name,
mh.merchant_number,cd.merchant_region_code,cd.settlement_company_number, ub.bookmarked_by from
 dims.case_detail cd left join dims.case_stage_detail csd on 
 cd.case_number=csd.case_number left join dims.transaction_master tm on
  cd.transaction_master_id=tm.transaction_master_id left join dims.merchant_heirarchy mh on
   cd.merchant_heirarchy_id=mh.merchant_heirarchy_id left join dims.status_master sm on
    csd.status_id=sm.status_id left join dims.dispute_stage_master dsm on
     csd.dispute_stage_id=dsm.dispute_stage_id left join user_bookmarked_case ub on csd.case_stage_id=ub.case_stage_id `;
     
     var qry2=` WHERE csd.latest_stage_ind=1 `;

      var qry3=`ORDER BY `
 var qry4 =` LIMIT 0,25 `;

//var qry2=`select search_type_name from search_type where search_type_id={filterTypeId};`;
 

module.exports.generateDynamicQuery = function(test){
    var tempQuery = "";
  
  if (test["filter1"]== 'case_status') {
    tempQuery = tempQuery +qry2+ " AND sm.status_name IN ('" + test["value1"] + "') "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else
  if (test["filter1"]== 'case_number') {
    tempQuery = tempQuery +qry2+ " AND csd.case_number=" +  test["value1"] + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else
  if (test["filter1"]== 'case_zone') {
    tempQuery = tempQuery +qry2+ " AND cd.merchant_region_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_trans_code') {
    tempQuery = tempQuery +qry2+ " AND tm.transaction_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_trans_code') {
    tempQuery = tempQuery +qry2+ " AND tm.transaction_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_arn') {
    tempQuery = tempQuery +qry2+ " AND cd.acquirer_reference_number=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_card_brand') {
    tempQuery = tempQuery +qry2+ " AND cd.card_brand_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_acquirer_bin') {
    tempQuery = tempQuery +qry2+ " AND cd.acquirer_bin_ica=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_issuer_bin') {
    tempQuery = tempQuery +qry2+ " AND cd.issuer_bin_ica=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_trans_amount') {
    tempQuery = tempQuery +qry2+ " AND cd.transaction_amount=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_account_number') {
    tempQuery = tempQuery +qry2+ " AND cd.global_token=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
//console.log(finalQuery);
  return finalQuery;
  }
 