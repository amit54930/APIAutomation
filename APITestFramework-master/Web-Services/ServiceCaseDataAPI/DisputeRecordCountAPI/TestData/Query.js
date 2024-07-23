//var queryUtils = require('../../../../Utilities/queryUtils.js');
  var query1 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  join dims.case_detail cd on cd.case_number=csd.case_number
  where csd.queue_id=6  and cd.transaction_master_id is null`;
  var query2 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=8`;
  var query3 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=11`;
  var query4 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=13`;
  var query5 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=18`;
  var query6 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=19`;
  var query7 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=21`;
  var query8 =
  `SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
  join dims.queue_master qm on csd.queue_id=qm.queue_id
  where csd.queue_id=23`;

var query9=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=29`;

var query10=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=30`;

var query11=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=32`;

var query12=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=33`;

var query13=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=36`;

var query14=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
where csd.queue_id=62`;

var query15=
`select qm.queue_id,qm.queue_name,count(cd.queue_id) from dims.case_documents cd
join dims.queue_master qm on cd.queue_id=qm.queue_id 
where cd.queue_id=9 and case_number is null`;

var query16=
`select qm.queue_id,qm.queue_name,count(cd.queue_id) from dims.case_documents cd
join dims.queue_master qm on cd.queue_id=qm.queue_id 
where cd.queue_id=15 and case_number is null`;

var query17=
`select qm.queue_id,qm.queue_name,count(cd.queue_id) from dims.case_documents cd
join dims.queue_master qm on cd.queue_id=qm.queue_id 
where cd.queue_id=63 and case_number is null`;

var query18=
`select qm.queue_id,qm.queue_name,count(cd.queue_id) from dims.case_documents cd
join dims.queue_master qm on cd.queue_id=qm.queue_id 
where cd.queue_id=64 and case_number is null`;

var query19=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
 join dims.case_detail cd on cd.case_number=csd.case_number
where csd.queue_id=12 and cd.transaction_master_id is not null`;

var query20=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
 join dims.case_detail cd on cd.case_number=csd.case_number
where csd.queue_id=14 and cd.transaction_master_id is not null`;

var query21=
`SELECT qm.queue_id,qm.queue_name,count(csd.queue_id) FROM dims.case_stage_detail csd
join dims.queue_master qm on csd.queue_id=qm.queue_id
 join dims.case_detail cd on cd.case_number=csd.case_number
where csd.queue_id=65 and cd.transaction_master_id is not null`;

module.exports.generateDynamicQuery1 = function () {

    var finalQuery = query1;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery2 = function () {

    var finalQuery = query2;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery3 = function () {

    var finalQuery = query3;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery4 = function () {

    var finalQuery = query4;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery5 = function () {

    var finalQuery = query5;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery6 = function () {

    var finalQuery = query6;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery7 = function () {

    var finalQuery = query7;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery8 = function () {

    var finalQuery = query8;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery9 = function () {

    var finalQuery = query9;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery10 = function () {

    var finalQuery = query10;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery11 = function () {

    var finalQuery = query11;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery12 = function () {

    var finalQuery = query12;
    //console.log(finalQuery);
    return finalQuery;
  }
  module.exports.generateDynamicQuery13 = function () {

    var finalQuery = query13;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery14 = function () {

    var finalQuery = query14;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery15 = function () {

    var finalQuery = query15;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery16 = function () {

    var finalQuery = query16;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery17 = function () {

    var finalQuery = query17;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery18 = function () {

    var finalQuery = query18;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery19 = function () {

    var finalQuery = query19;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery20 = function () {

    var finalQuery = query20;
    //console.log(finalQuery);
    return finalQuery;
  }

  module.exports.generateDynamicQuery21 = function () {

    var finalQuery = query21;
    //console.log(finalQuery);
    return finalQuery;
  }

  