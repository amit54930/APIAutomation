var QueryforUnmatchedTransaction =`SELECT COUNT(1) AS count ,q.queue_name,q.queue_id FROM dims.case_stage_detail csd INNER JOIN queue_master q ON q.queue_id = csd.queue_id INNER JOIN dims.case_detail cd on cd.case_number = csd.case_number WHERE csd.queue_id =6 AND cd.transaction_master_id IS NULL GROUP BY q.queue_id`; 

module.exports.generateDynamicQueryforUnmatchedTransaction = function(){

  return QueryforUnmatchedTransaction;
}

var QueryforUnmatchedMerchants =`SELECT count(*) AS count, q.queue_name, q.queue_id FROM (SELECT csd.case_number, MAX(csd.created_timestamp) time_stamp FROM case_stage_detail as csd WHERE csd.queue_id = '8' GROUP BY csd.case_number ) AS csd INNER JOIN case_stage_detail AS cs ON csd.case_number = cs.case_number AND csd.time_stamp =  cs.created_timestamp INNER JOIN case_detail AS cd ON csd.case_number = cd.case_number INNER JOIN transaction_master AS tm ON cd.transaction_master_id = tm.transaction_master_id INNER JOIN iso_numeric_currency_code cc ON cc.iso_numeric_currency_code=tm.currency_code INNER JOIN dims.queue_master q ON q.queue_id = cs.queue_id GROUP BY q.queue_id`; 

module.exports.generateDynamicQueryforUnmatchedMerchants = function(){

 return QueryforUnmatchedMerchants;
}

var QueryforUnmatchedSchemeImages =`SELECT COUNT(1) AS count ,q.queue_name,q.queue_id FROM dims.case_documents cd INNER JOIN dims.queue_master q ON q.queue_id = cd.queue_id WHERE  cd.case_number is null and cd.case_stage_id is null AND cd.queue_id =9 GROUP BY q.queue_id`; 

module.exports.generateDynamicQueryforUnmatchedSchemeImages = function(){

 return QueryforUnmatchedSchemeImages;
}