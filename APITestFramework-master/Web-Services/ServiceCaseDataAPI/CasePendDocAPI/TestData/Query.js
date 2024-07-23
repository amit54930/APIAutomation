//var queryUtils = require('../../../../Utilities/queryUtils.js');
var testQuery =
  `SELECT case_detail.case_number, case_detail.acquirer_reference_number,
  case_detail.masked_card_number, case_detail.merchant_name, mh.merchant_number, csd.retreival_response_due_date, case_detail.created_timestamp
  FROM dims.case_detail case_detail 
  JOIN dims.case_stage_detail csd 
  ON case_detail.case_number = csd.case_number 
  JOIN dims.merchant_heirarchy mh 
  ON mh.merchant_heirarchy_id = case_detail.merchant_heirarchy_id`;

  var subquery=` WHERE csd.queue_id ='abc'`;

 

    module.exports.generateDynamicQuery = function(test1){
     
           var tempQuery = "";
            if (test1["orderByProperties"] != undefined) {
            tempQuery =testQuery + subquery.replace("abc",test1.queueId)+ " ORDER BY " + test1["orderByProperties"] + "";
            
            if (test1["propertyDirections"] != undefined) {
          testQuery=tempQuery+ " " + test1["propertyDirections"];
            }
      
            var finalQuery =testQuery;
           //console.log(finalQuery);
            return finalQuery;
  }
}

