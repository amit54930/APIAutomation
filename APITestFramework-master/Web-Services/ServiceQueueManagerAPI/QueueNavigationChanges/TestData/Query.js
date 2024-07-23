var QueryforAssignedCases =`SELECT (SELECT COUNT(1) FROM case_stage_detail csd LEFT JOIN case_detail cd ON csd.case_number = cd.case_number WHERE case_assigned_to IS NOT NULL AND status_id=1 AND cd.merchant_region_code='regionCode') AS count, qm.queue_id, qm.queue_name FROM queue_master qm WHERE qm.queue_id=68;`; 

module.exports.generateDynamicQueryforAssignedCases = function(regionCode){

  var AssignedCases = QueryforAssignedCases.replace("regionCode",regionCode)
 return AssignedCases;
}

var QueryforUnmatchedMerchantImages =`SELECT COUNT(1) AS count ,q.queue_name,q.queue_id FROM case_documents cd INNER JOIN queue_master q ON q.queue_id = cd.queue_id WHERE cd.region_code='regionCode' AND cd.queue_id ='15' GROUP BY q.queue_id`; 



module.exports.generateDynamicQueryforUnmatchedMerchantImages = function(regionCode){

  var UnmatchedMerchantImages = QueryforUnmatchedMerchantImages.replace("regionCode",regionCode)
 return UnmatchedMerchantImages;
}

var QueryforCaseFilings =`SELECT qm.queue_id,qm.queue_name, COUNT(cd.merchant_region_code) AS count FROM  case_stage_detail csd LEFT JOIN case_detail cd ON csd.case_number = cd.case_number  AND cd.merchant_region_code = 'regionCode' INNER JOIN queue_master qm ON csd.queue_id = qm.queue_id WHERE csd.status_id =1 AND csd.case_assigned_to IS NULL AND qm.queue_id IN (67) GROUP BY  qm.queue_id ,qm.queue_name;`; 

module.exports.generateDynamicQueryforCaseFilings = function(regionCode){

  var CaseFilings = QueryforCaseFilings.replace("regionCode",regionCode)
 return CaseFilings;
}

var QueryforDisputeCases =`SELECT qm.queue_id,qm.queue_name, COUNT(cd.merchant_region_code) AS count FROM  case_stage_detail csd LEFT JOIN case_detail cd ON csd.case_number = cd.case_number  AND cd.merchant_region_code = 'regionCode' INNER JOIN queue_master qm ON csd.queue_id = qm.queue_id WHERE csd.status_id =1 AND csd.case_assigned_to IS NULL AND qm.queue_id IN (66) GROUP BY  qm.queue_id ,qm.queue_name;`; 

module.exports.generateDynamicQueryforDisputeCases = function(regionCode){

  var DisputeCases = QueryforDisputeCases.replace("regionCode",regionCode)
 return DisputeCases;
}