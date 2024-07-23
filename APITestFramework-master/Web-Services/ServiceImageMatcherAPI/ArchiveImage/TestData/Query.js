module.exports.generateDynamicQuery = function(documentId){
  var finalQuery = "select document_type_id, queue_id, document_directory_id from dims.case_documents where document_id = documentId";
  finalQuery=finalQuery.replace('documentId',documentId);
  return finalQuery;
 }

  
 
