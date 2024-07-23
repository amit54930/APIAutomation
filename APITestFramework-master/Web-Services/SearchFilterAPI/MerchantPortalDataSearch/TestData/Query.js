
//var queryUtils = require('../../../Utilities/queryUtils.js');

var qry1=`select distinct cd.case_number, cd.masked_card_number,cd.merchant_name, mh.merchant_number,cd.card_brand_code,
csd.dispute_reason_code,csd.dispute_amount,cd.transaction_date,dsm.dispute_stage_name,
csd.card_brand_respond_due_date,cd.global_token,csd.case_stage_id, ub.bookmarked_by, cd.acquirer_reference_number, cd.authorization_code, csd.case_received_date,
cd.issuer_bin_ica, cd.acquirer_bin_ica, cd.merchant_region_code	
from
dims.case_detail cd left join dims.case_stage_detail csd on
cd.case_number=csd.case_number left join dims.transaction_master tm on
cd.transaction_master_id=tm.transaction_master_id left join dims.merchant_heirarchy mh on
cd.merchant_heirarchy_id=mh.merchant_heirarchy_id left join dims.status_master sm on
csd.status_id=sm.status_id left join dims.dispute_stage_master dsm on
csd.dispute_stage_id=dsm.dispute_stage_id left join user_bookmarked_case ub 
on csd.case_stage_id=ub.case_stage_id `;
     
     var qry2=` WHERE csd.latest_stage_ind=1 `;

      var qry3=`ORDER BY `
 var qry4 =` LIMIT 0,10 `;

//var qry2=`select search_type_name from search_type where search_type_id={filterTypeId};`;
 

module.exports.generateDynamicQuery = function(test){
    var tempQuery = "";
  
    if (test["filter1"]== 'case_number') {
      tempQuery = tempQuery +qry2+ " AND cd.case_number=" +  test["value1"] + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
    
    var finalQuery = qry1  + tempQuery ;
    }
  else
  if (test["filter1"]== 'case_type') {
    tempQuery = tempQuery +qry2+ " AND dsm.dispute_stage_name=" +  " '" +test["value1"] +"' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else
  if (test["filter1"]== 'card_brand') {
    tempQuery = tempQuery +qry2+ " AND cd.card_brand_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'reason_code') {
    tempQuery = tempQuery +qry2+ " AND csd.dispute_reason_code=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'merchant_number') {
    tempQuery = tempQuery +qry2+ " AND mh.merchant_number=" +  test["value1"]  + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'merchant_name') {
    tempQuery = tempQuery +qry2+ " AND cd.merchant_name=" + " '" + test["value1"] + "' " + " "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'due_date_from-due_date_to') {
    tempQuery = tempQuery +qry2+ " AND csd.card_brand_respond_due_date BETWEEN" + " '" + test["value1"] + "' " +  " AND "+ " '" + test["value3"] + "' " +" "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'case_amt_from-case_amt_to') {
    tempQuery = tempQuery +qry2+ " AND csd.dispute_amount BETWEEN" + " '" + test["value1"] + "' " +  " AND "+ " '" + test["value3"] + "' " +" "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'first_six-last_four') {
    tempQuery = tempQuery +qry2+ " AND cd.masked_card_number=" + " '" + test["value1"] + "XXXXXX" + test["value3"] + "' " +" "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
  else if(test["filter1"]== 'trans_date_from-trans_date_to') {
    tempQuery = tempQuery +qry2+ " AND cd.transaction_date BETWEEN" + " '" + test["value1"] + "' " +  " AND "+ " '" + test["value3"] + "' " +" "+qry3+test["filter2"]+" "+test["value2"]+qry4;
  
  var finalQuery = qry1  + tempQuery ;
  }
//console.log(finalQuery);
  return finalQuery;
  }
 