
//var queryUtils = require('../../../Utilities/queryUtils.js');
var finalQuery;
var qry1=`select ltm.letter_template_name , 
ltl.letter_template_language_code,ltl.letter_template,ltl.letter_template_language_id
 from dims.letter_template_master  ltm 
join dims.letter_template_language ltl  on 
 ltl.letter_template_id=ltm.letter_template_id
 `;
     
var qry2=`where letter_template_language_code='abc'`;

module.exports.generateDynamicQuery = function(languageCode){
    finalQuery= qry1+qry2;
    finalQuery=finalQuery.replace('abc',languageCode);
 
 //console.log(finalQuery);
 return finalQuery;

  }
 