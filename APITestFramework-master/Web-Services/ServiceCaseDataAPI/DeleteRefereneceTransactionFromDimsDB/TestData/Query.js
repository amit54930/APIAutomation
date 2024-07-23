
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`SELECT * FROM dims.reference_transactions 
`;

//var subQuery=`where queue_id='queueId'`;
var subQuery1=`where reference_transaction_id='refID' and case_number='caseNumberId'`
 

module.exports.generateDynamicQuery = function(reference_transaction_id,caseNumberInput){
 
    var finalQuery1 =testQuery+ subQuery1.replace('refID',reference_transaction_id).replace('caseNumberId',caseNumberInput);
    
 return finalQuery1;

}