//var queryUtils = require('../../../../Utilities/queryUtils.js');
var activeColumns =
  `select gcem.grid_column_element_id,pgcl.column_element_display_order,gcem.column_label_name,gcem.column_key,
  gcem.column_tooltip_description,gcem.column_display_type,pgcl.created_by,
  gcem.is_sortable_ind,gcem.is_summary_ind,pgcl.is_column_default_ind
  from dims.page_grid_column_list pgcl 
  join dims.grid_column_element_master gcem on gcem.grid_column_element_id=pgcl.grid_column_element_id
  where pgcl.page_list_id='abc' and pgcl.grid_column_element_id in
  (select distinct sgce.grid_column_element_id from dims.saved_grid_column_element sgce
  where sgce.page_list_id='xyz' and sgce.created_by='pqr')`;

  var availableColumns=
  `select gcem.grid_column_element_id,pgcl.column_element_display_order,gcem.column_label_name,gcem.column_key,
  gcem.column_tooltip_description,gcem.column_display_type,pgcl.created_by,
  gcem.is_sortable_ind,gcem.is_summary_ind,pgcl.is_column_default_ind
  from dims.page_grid_column_list pgcl 
  join dims.grid_column_element_master gcem on gcem.grid_column_element_id=pgcl.grid_column_element_id
  where pgcl.page_list_id='abc' and pgcl.grid_column_element_id not in
  (select distinct sgce.grid_column_element_id from dims.saved_grid_column_element sgce
  where sgce.page_list_id='xyz' and sgce.created_by='pqr')`;

  var newColumn=`select gcem.grid_column_element_id,pgcl.column_element_display_order,gcem.column_label_name,gcem.column_key,
  gcem.column_tooltip_description,gcem.column_display_type,pgcl.created_by,
  gcem.is_sortable_ind,gcem.is_summary_ind,pgcl.is_column_default_ind
  from dims.page_grid_column_list pgcl 
  join dims.grid_column_element_master gcem on gcem.grid_column_element_id=pgcl.grid_column_element_id
  where pgcl.page_list_id='abc'`;
  

 
  module.exports.generateDynamicQuery1 = function (testData) {
    if (testData.test["userId"] == "system") {
  availableColumns = availableColumns.replace("abc",testData.pageId);
  availableColumns = availableColumns.replace("xyz",testData.pageId);
  availableColumns = availableColumns.replace("pqr",testData.test.userId);
  var finalQuery = availableColumns;
   //console.log('finalQuery'+finalQuery);
   return finalQuery;
  }
}

  module.exports.generateDynamicQuery2 = function (testData) {
    if (testData.test["userId"] == "system") {
    activeColumns = activeColumns.replace("abc",testData.pageId);
    activeColumns = activeColumns.replace("xyz",testData.pageId);
    activeColumns = activeColumns.replace("pqr",testData.test.userId);
  var finalQuery = activeColumns;
    //console.log('finalQuery'+finalQuery);
    return finalQuery;
  }
}
  module.exports.generateDynamicQuery3 = function (testData) {
    if (testData.test["userId"] == "abc") {
    newColumn = newColumn.replace("abc",testData.pageId);
    var finalQuery = newColumn;
    //console.log('finalQuery'+finalQuery);
    return finalQuery;
  }
}

 
