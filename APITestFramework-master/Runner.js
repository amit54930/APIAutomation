const fs = require('fs');
const Framework = require('./API_Test_Framework/controller.js');
//const dot = require('dotenv').config;
//var PropertiesReader = require('properties-reader');
//var properties = PropertiesReader('C:/SACHIN/qa-api-test-scripts/DBConnections.properties');
//const dotenv  = require('dotenv');
//dotenv.config();
const PropertiesReader = require('./Utilities/PropertiesReader.js');
//var properties = PropertiesReader('./DBConnections.properties');
var environment ="Dev";

  environment = process.argv[2];
  environment = environment.toLowerCase();
  //console.log(environment);
    switch (environment) {
        case '@dev':
               global.config = fs.readFileSync('./Config/Dev_Config.json', 'utf8')
               console.log("Working In Dev Env");
               var properties = PropertiesReader('./Dev_DBConnections.properties');
               break;
        case '@qa':
              global.config = fs.readFileSync('./Config/QA_Config.json', 'utf8')
              console.log("Working In QA Env");
              var properties = PropertiesReader('./QA_DBConnections.properties');
              break;
        case '@managed-dev':
              global.config = fs.readFileSync('./Config/Managed_Dev_Config.json', 'utf8')
              console.log("Working In Managed Dev Env");
              var properties = PropertiesReader('./Managed_Dev_DBConnections.properties');
              break;
        case '@managed-qa':
                  global.config = fs.readFileSync('./Config/Managed_QA_Config.json', 'utf8')
                  console.log("Working In Managed QA Env");
                  var properties = PropertiesReader('./Managed_QA_DBConnections.properties');
                  break;

        default: "Wrong environment"
            }

            var config = JSON.parse(global.config);
            config.executionGroup = process.argv[3];
            config.SQLuserName = properties.get("SQLuserName");
           //config.SQLuserName = process.env.DB_USERNAME;
            //console.log(config.SQLuserName);
            //config.CDE_SQLpassWord = properties.get("CDE_SQLpassWord");
            config.SQLpassWord = properties.get("SQLpassWord");
            //config.SQLpassWord = process.env.DB_PASSWORD;
            //console.log(config.CDE_SQLpassWord);
            //console.log(config.NCDE_SQLpassWord);
            //config.CDE_SQLConnectionURL = properties.get("CDE_SQLConnectionURL");
            config.SQLConnectionURL = properties.get("SQLConnectionURL");
            //config.SQLConnectionURL = process.env.DB_URL;
           // console.log(config.CDE_SQLConnectionURL);
            //console.log(config.SQLConnectionURL);
            config.header.Authorization = properties.get("Authorization");
            //console.log(config.Authorization);
            config.BigQueryConnectionURL=properties.get("BigQueryConnectionURL");

            global.config = JSON.stringify(config);
            



var testDir = config.TestPath;
//console.log("\n"+"test path is "+testDir);

global.config = JSON.stringify(config);
//console.log(global.config);

var tags = config.executionGroup;
//console.log('tags:'+tags);

var result = Framework.mochaReport(tags,testDir,'DiMSAPI- Test Execution Report- ','DiMSAPI- Test Execution Report- ', 'DiMSAPI- Test Execution Report- ');
//console.log("success" + result.isSuccess);
