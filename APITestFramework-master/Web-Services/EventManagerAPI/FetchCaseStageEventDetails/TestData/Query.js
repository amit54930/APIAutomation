

var qry1=`Select ep.event_parameters_id, ep.event_parameter_name from dims.event_parameters ep JOIN dims.event_template_parameters etp 
ON ep.event_parameters_id=etp.event_parameters_id where etp.event_template_code='abc'`;



module.exports.generateDynamicQuery = function(eventTemplateName){
 var finalQuery = qry1.replace('abc',eventTemplateName);
//console.log("=====finalQuery===== "+finalQuery);
 return finalQuery;

}

