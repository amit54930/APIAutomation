var subquery ="Select acquirer_reference_number from dims.case_detail ORDER BY RAND() LIMIT 1;";

//var testQuery =`SELECT merchant_number`; 

//var test=` ORDER BY RAND() LIMIT 1`;

module.exports.generateDynamicQuery = function(){

  var finalQuery = subquery;
 // console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
