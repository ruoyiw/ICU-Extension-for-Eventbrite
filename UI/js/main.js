//The root URL for the RESTful services
var rootURL = "Please type down root url here";

//Web elements
var subHome = "<li><a href='#'>Home »</a></li>";
var subSlcTem = "<li><a href='#'>Select Template »</a></li>"; 
var subSlcStds = "<li><a href='#'>Select Students »</a></li>";
var subPrev = "<li><a href='#''><span class='glyphicon glyphicon-eye-open' title='Preview'></span></a></li>"

var stdName1 ="<div class='checkbox'><label><input type='checkbox' name='' value=''>Sankar Narayanan</label></div>"
var stdName2 ="<div class='checkbox'><label><input checked type='checkbox' name='' value=''>Ruoyi Wang</label></div>"
var sdbraction = "<div class='sidebar-action'><div class='sidebar-buttons'></div></div>"
var btnSlcChkIn = "<button type='button' id='ckin' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnSlcAll = "<button type='button' id='slcall' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnClrAll = "<button type='button' id='clrall' class='btn btn-primary btn-block'>Select Checked-in</button>"

var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancle = "<button id='cancle' type='button' class='btn btn-default'>Cancle ❯</button>";
var btnDwld = "<button id='dwld' type='button' class='btn btn-success'>Download ❯</button>";
var btnEmPrShp = "<button id='emprshp' type='button' class='btn btn-success'>Email Print Shop ❯</button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";

var smImg = "<div class='checkbox'><label class='sid-ck'><input type='checkbox' name='' value=''><img src='images/certi1.png' width='80%' class='img-responsive'></label></div>";

$( document ).ready(function() {

    //click sub-nav
    $(".nav li").click(function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");

        switch($(this).attr("id")) {
            case "print-certi":
                slcTemp();
                break;
            case "manage-tem":
                manageTem();
                break;
            case "create-email":
                createEmail();
                break;
            case "draft-email":
                checkDraft();
                break;
            case "del-email":
                checkDel();
                break;
            case "manage-ep":
                manageEp();
                break;
        }

        console.log($(this).attr("id"));
    });

    //check if there is a checked checkbox
    $(".side-form-content").on('click', 'input', function() {
            if(this.checked) {
                $("#next").removeClass("disabled");
            } else {
                var ck = false;
                $(".side-form-content input").each(function() {
                    if(this.checked) {
                        ck = true;
                    }
                })
                if(ck) {
                    $("#next").removeClass("disabled");
                } else {
                    $("#next").addClass("disabled");
                }                
            }
    });


    //click "next" button
    /*
    TODO: SAVE PREVIOUS DATA IN JQUERY
    */
    $(".footer-buttons-right").on('click', '#next', function() {
        var isDisabled = $("#next").hasClass("disabled");
        //console.log(isDisabled);
        if(!isDisabled) {
            var subnav = $(".sub-nav-left li").last().text();
            subnav = subnav.slice(0, -2);
            switch(subnav) {
                case 'Select Template':
                    slcStds();
                    break;
            }            
        }

    });

    //click "back" button
    /*
    TODO: GET PREVIOUS DATA IN JQUERY
    */
    $(".footer-buttons-left").on('click', '#bck', function() {
        var subnav = $(".sub-nav-left li").last().prev().text();
        subnav = subnav.slice(0, -2);
        //alert(subnav);
        switch(subnav) {
            case 'Select Template':
                slcTemp();
                break;
        }
    });

    //Click "sub-nav"
    /*
    TODO: GET PREVIOUS DATA IN JQUERY
    */
    $(".sub-nav-left").on('click', 'li', function() {
        var subnav = $(this).text();
        subnav = subnav.slice(0, -2);
        //alert(subnav);
        switch(subnav) {
            case 'Select Template':
                slcTemp();
                break;
            case 'Select Students':
                slcStds();
                break;
        }       
    });

    function slcTemp() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        emptyAll();
        ptCerTemp();
    }

    function emptyAll() {
        //Sub-nav
        $(".sub-nav-left").empty();
        $(".sub-nav-right").empty();
        //Middle part
        $(".side-form-content").empty();
        $(".sidebar-action").remove();    
        //Footer
        $(".footer-buttons-right").empty();
        $(".footer-buttons-left").empty();
    }

    /*
    TO DO: GET TEMPLATES FROM SERVER
    */
    function ptCerTemp() {
        $(".sub-nav-left").append(subHome, subSlcTem);      
        $(".sub-nav-right").append(subPrev);  
        $(".side-form-content").append(smImg, smImg);
        //TODO: show pdf on left side of middle part
        $(".footer-buttons-right").append(btnNext);
        $("#next").addClass("disabled");
    }

    /*
    TO DO: GET STUDENTS NAMES FROM SERVER
    */ 
    function slcStds() {
        $(".sub-nav-left").append(subSlcStds);
        
        $(".side-form-content").empty();
        $(".side-form-content").append(stdName1,stdName2);
        $(".side-form-content").after(sdbraction);
        $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);

        $("#next").remove();
        $(".footer-buttons-right").append( btnDwld, btnEmPrShp);
        $(".footer-buttons-left").append(btnBck);
    }

});
