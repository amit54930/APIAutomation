var subquery =` WHERE merchant_number='abc'`;

var testQuery = 
`select merchant_number as merchantNumber, hierarchy as hierarchyNumber, corporate, region, principal, associate, chain from `; 

var s = "`consumption_layer_dims.merchant_detail`"; 
                                     


module.exports.generateDynamicQuery = function(merchantNumber){
  
  var finalQuery = testQuery+s+subquery;
 finalQuery=finalQuery.replace('abc',merchantNumber);
  //console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
