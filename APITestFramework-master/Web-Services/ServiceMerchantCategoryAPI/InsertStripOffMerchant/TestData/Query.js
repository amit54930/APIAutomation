var subquery =" from `pid-gousenaiq-dlak-res01.consumption_layer.merchant_detail`";

var testQuery =`SELECT merchant_number`; 

var test=` ORDER BY RAND() LIMIT 1`;

module.exports.generateDynamicQuery = function(){

  var finalQuery = testQuery+subquery+test;
 // console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
