

var subquery =`WHERE file_config.file_pattern LIKE 'filePattern'`;

var testQuery =
`SELECT file_config_id, file_category, card_brand_code, region_code, card_brand_file_type, card_brand_file_desc, acquirer_name AS acquirerName, file_encoding_method, file_format, file_pattern, plugin_binary_path, day_processed_ind, is_pan_present_indicator, is_pii_present_indicator, file_active_indicator,
original_source_name, file_received_through, file_config.created_by, file_config.created_timestamp, file_config.last_modified_by, file_config.last_modified_timestamp, FDM_processing.file_directory_path AS processingPath,
FDM_processed.file_directory_path AS processedPath, FDM_error.file_directory_path AS errorPath, FDM_duplicate.file_directory_path AS duplicatePath, FDM_incoming.file_directory_path AS incomingPath
FROM dims.file_config
LEFT JOIN dims.file_directory_master FDM_processing
ON FDM_processing.file_directory_id = file_config.processing_file_directory_id
LEFT JOIN dims.file_directory_master FDM_processed
ON FDM_processed.file_directory_id = file_config.processed_file_directory_id
LEFT JOIN dims.file_directory_master FDM_error
ON FDM_error.file_directory_id = file_config.error_file_directory_id
LEFT JOIN dims.file_directory_master FDM_duplicate
ON FDM_duplicate.file_directory_id = file_config.duplicate_file_directory_id
LEFT JOIN dims.file_directory_master FDM_incoming
ON FDM_incoming.file_directory_id = file_config.incoming_file_directory_id `;



module.exports.generateDynamicQuery = function(filePattern){

  var finalQuery = testQuery+subquery.replace("filePattern",filePattern);
 // console.log('finalQuery'+finalQuery);
 return finalQuery;
}
