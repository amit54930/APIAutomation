
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

/* Plese specify the path of test directory in below array
 * testDir = ['./Web-Services/getMerchantInfo/TestScripts', './Web-Services/getTerminalInfo/TestScripts', './Web-Services/UpdateMerchantContact/TestScripts']
 */
module.exports.mochaReport= function(tags,testDir,reportFilename,reportTitle,reportPageTitle,enableCode,timeout){
//	console.log("In mocha****  "+testDir);
var repFileName= "Execution-Report";
var repTitle="Execution-Report-Title";
var repPageTitle= "Execution-Report-Page-Title";
var enable_code= false;
var exetime= 60000;

if (testDir == null) return {"isSuccess" : false, "error" : "No scripts provided , hence unable to trigger scripts"};
if(reportFilename != null) repFileName = reportFilename;
if(reportTitle != null)   repTitle=reportTitle;
if(reportPageTitle != null ) repPageTitle=reportPageTitle;
if(enableCode != null ) enable_code= enableCode;
if (timeout !=null) exetime=timeout;

// Instantiate a Mocha instance.
const mocha = new Mocha({
  reporter: 'mochawesome',

  reporterOptions: {
    reportFilename: repFileName,
    reportTitle: repTitle,
    reportPageTitle:repPageTitle,
    inlineAssets:true,
    enableCode: enable_code,
    quiet:true,
    timestamp: 'ddmmyyyyHH:MM:ss'
  },
    timeout: exetime,
    grep : tags
});


for(i = 0; i<testDir.length; i++){
// Add each .js file to the mocha instance
fs.readdirSync(testDir[i])
   .filter(file => file.substr(-3) === '.js')
//  .filter(file => file === 'test.js')
  .forEach(file => mocha.addFile(path.join(testDir[i], file)));
}
// Run the tests.
mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});

return {"isSuccess" : true, "error" : null}
}
