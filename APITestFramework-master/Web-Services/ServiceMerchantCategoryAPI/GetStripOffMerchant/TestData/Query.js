var subquery =` WHERE merchant_number='abc'`;

var testQuery =`SELECT merchant_number,acquirer_name,merchant_type,comments,is_active_ind,last_modified_by,last_modified_timestamp,created_by,created_timestamp FROM dims.exception_merchant`; 

module.exports.generateDynamicQuery = function(merchantNumber){

  var finalQuery = testQuery+subquery;
 finalQuery=finalQuery.replace("abc",merchantNumber);
 // console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
