
//var queryUtils = require('../../../Utilities/queryUtils.js');

var testQuery=`Select document_Name,redacted_document_name,original_document_name,cd.card_brand_case_number,fdm.file_directory_path,case_number,dtm.document_type,cd.document_type_id card_Brand_Case_Number
from dims.case_documents cd
left join dims.file_directory_master fdm 
on cd.document_directory_id=fdm.file_directory_id
left join dims.document_type_master dtm
on cd.document_type_id=dtm.document_type_id
`;

var subQuery=`where queue_id=1 and case_number='caseNumber' `;
 var subQuery1=`and cd.document_type_id='documentTypeId'`;

module.exports.generateDynamicQuery = function(caseNumber,documentTypeId){
 
    var finalQuery =testQuery+ subQuery.replace('caseNumber',caseNumber)+subQuery1.replace('documentTypeId',documentTypeId);

 return finalQuery;

}