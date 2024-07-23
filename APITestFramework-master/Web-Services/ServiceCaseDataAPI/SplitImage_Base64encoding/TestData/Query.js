
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`Select document_Name,redacted_document_name,original_document_name,fdm.file_directory_path,case_number,document_type,card_Brand_Case_Number
from dims.case_documents cd
left join dims.file_directory_master fdm 
on cd.document_directory_id=fdm.file_directory_id 
`;

var subQuery=`where case_number='caseNumber' `;
 var subQuery1=`and document_type='documentType'`;

module.exports.generateDynamicQuery = function(caseNumber,documentType){
 
    var finalQuery =testQuery+ subQuery.replace('caseNumber',caseNumber)+subQuery1.replace('documentType',documentType);

 return finalQuery;

}