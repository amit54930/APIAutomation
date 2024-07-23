//var queryUtils = require('../../../../Utilities/queryUtils.js');
var testQuery =
  `select search_type_id FROM dims.search_type`;

var subquery = ` where search_type_name='abc'`;



module.exports.generateDynamicQuery = function(input) {

    var finalQuery = testQuery + subquery.replace("abc",input);
    //console.log(finalQuery);
    return finalQuery;
  }


