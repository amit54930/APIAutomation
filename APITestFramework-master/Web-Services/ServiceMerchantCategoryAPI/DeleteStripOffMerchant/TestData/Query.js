var testQuery =`SELECT merchant_number FROM dims.exception_merchant WHERE is_active_ind='Y' order by RAND() limit 1`; 
module.exports.generateDynamicQuery = function(){

  var finalQuery = testQuery;
 // console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
