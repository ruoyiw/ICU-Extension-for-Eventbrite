/*
Common DOMS for Footer buttons
*/
var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";

/*
DOMS for Manageing Template
*/
var btnDelTem = "<button type='button' id='deltem' class='btn btn-primary btn-block'>Delete</button>"
var btnSaveAs = "<button type='button' id='saveas' class='btn btn-primary btn-block' data-toggle='modal' data-target='#save-as'>Save As</button>"
var btnSaveTem = "<button type='button' id='savetem' class='btn btn-primary btn-block'>Save</button>"

/*
DOMS for Certificates
*/
var btnDwld = "<button id='dwld' type='button' class='btn btn-success'>Download ❯</button>";
var btnEmPrShp = "<button id='emPrShp' type='button' class='btn btn-success'>Email Print Shop ❯</button>";
var btnEmStd = "<button id='emrStd' type='button' class='btn btn-success'>Email Students ❯</button>";

/*
DOMS for students
*/
var stdName ="<div class='checkbox'><label><input class = 'stdName' type='checkbox' name='' value='%value%'>%data%</label></div>";
var stdNameEmail ="<div class='checkbox'><label><input class = 'stdNameEmail' type='checkbox' name='' value='%value%'>%data%</label></div>";
var btnSlcChkIn = "<button type='button' id='ckin' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnSlcAll = "<button type='button' id='slcall' class='btn btn-primary btn-block'>Select All</button>"
var btnClrAll = "<button type='button' id='clrall' class='btn btn-primary btn-block'>Clear All</button>"

/*
DOMS for Courses
*/
//var sideTitle = "<h4>Student List<i class='fa fa-spinner fa-spin'></i><span class='sr-only'>Loading...</span></h4>"
//var courceMenu = "<select class='form-control course-select' id='email-course'><option selected id='email-select-course-instruction'>Please Select Course</option></select>";
var selectCourse = "<option value='%value%'>%data%&emsp;&emsp;%time%</option>";
//var noStd = "<div class='email-stds'><strong class='text-center'>No students to show</strong><div class='email-names'></div></div>";


/*
DOMS for Email
*/
var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";

/*
URLS
*/
//The root URL for the RESTful services
//TO DO: CHANGE THE VARIABLE NAME
var rootURL = "http://frank.mzalive.org/service/icu-service/webapi/mail";
var baseTemURL = "http://frank.mzalive.org/service/icu-service/webapi/template/";
//The root URL and its appendix for Eventbrite API
var eBrootURL = "https://www.eventbriteapi.com/v3";
var eventURL = "/users/me/owned_events/";
var personalToken = "LIUPZKLIB7TPRNAGZHV6";
//The URLS for authentication (may be deleted for the security issues)
var clientKey = "2W2AGMHUMCBQTNXAU25TKHR3CXOISJ7WSPSW4NDPK5LIJZF4UI";
var authURL = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=" + clientKey;
var appKey = "7R5NTZ4MIZEGS6KVT4";