var subquery =" from `pid-gousenaid-dims-res01.referrence_data.merchant_detail`";

var testQuery =`SELECT merchant_number`; 

var test=` ORDER BY RAND() LIMIT 1`;

module.exports.generateDynamicQuery = function(){

  var finalQuery = testQuery+subquery+test;
 // console.log("**************** finalQuery: *******************"+finalQuery);
 return finalQuery;
}
