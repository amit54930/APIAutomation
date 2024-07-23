
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`SELECT * FROM dims.multiple_matched_transaction 
`;

//var subQuery=`where queue_id='queueId'`;
var subQuery1=`where case_number='caseNumber'`
 

module.exports.generateDynamicQuery = function(caseNumberInput){
 
  
    var finalQuery=testQuery+subQuery1.replace('caseNumber',caseNumberInput);
    
 return finalQuery;

}