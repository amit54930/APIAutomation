
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`select card_brand_respond_due_date  from dims.case_stage_detail
`;

//var subQuery=`where queue_id='queueId'`;
var subQuery1=`where case_number='caseNumber'`
 

module.exports.generateDynamicQuery = function(caseNumberInput){
 
  //  var finalQuery1 =testQuery+ subQuery.replace('queueId',queueIdInput);
    var finalQuery=testQuery+subQuery1.replace('caseNumber',caseNumberInput);
    //console.log(finalQuery)
 return finalQuery;

}