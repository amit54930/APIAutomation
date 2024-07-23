

var qry1=`Select vl.varbiage_text from dims.verbiage_language vl JOIN dims.verbiage_config vc ON 
vc.verbiage_id=vl.verbiage_id 
JOIN dims.case_detail cd ON cd.merchant_region_code=vc.region_code JOIN dims.case_stage_detail csd 
ON vc.reason_code=
csd.dispute_reason_code AND cd.case_number=csd.case_number AND vc.verbiage_type="Manual" where 
csd.case_stage_id='caseStageId'
AND vl.verbiage_language_code='languageCode';`;

var qry2=`Select vl.varbiage_text from dims.verbiage_language vl JOIN dims.verbiage_config vc ON 
vc.verbiage_id=vl.verbiage_id 
JOIN dims.case_detail cd ON cd.merchant_region_code=vc.region_code JOIN dims.case_stage_detail csd 
ON vc.reason_code=
csd.dispute_reason_code AND cd.case_number=csd.case_number AND vc.verbiage_type="Manual" where 
csd.case_stage_id='caseStageId'
AND vl.verbiage_language_code='languageCode';`;

module.exports.generateDynamicQuery1 = function(caseStageId,languageCode){
 var finalQuery1 = qry1.replace("caseStageId",caseStageId).replace("languageCode","EN");
console.log("finalQuery====="+finalQuery1);
 return finalQuery1;

}

module.exports.generateDynamicQuery2 = function(caseStageId, languageCode){
    var finalQuery2 = qry2.replace("caseStageId",caseStageId).replace("languageCode", languageCode);
console.log("finalQuery====="+finalQuery2);
    return finalQuery2;
   }