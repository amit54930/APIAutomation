
var qry1=`SELECT reason_code, reason_description FROM dims.reason_code_master where card_brand_code `;

    module.exports.generateDynamicQuery = function(t){
        var tempQuery = "";
        tempQuery = "IN " +"('" + t + "')";
        finalQuery=qry1+tempQuery;
       //console.log("=====finalQuery===== "+finalQuery);
        return finalQuery;  
  }

    module.exports.generateDynamicQuery1 = function(t2,t3){
        var tempQuery = "";
        tempQuery = "IN " +"('" + t2 + "'" +   "," +"'" + t3 + "')";
        finalQuery=qry1+tempQuery;
       //console.log("=====finalQuery===== "+finalQuery);
        return finalQuery;
       }


   