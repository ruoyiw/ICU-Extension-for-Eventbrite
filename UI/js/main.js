//The root URL for the RESTful services
var rootURL = "Please type down root url here";

new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/email.js");
document.body.appendChild(new_element);

//Web elements

var stdName1 ="<div class='checkbox'><label><input type='checkbox' name='' value=''>Sankar Narayanan</label></div>"
var stdName2 ="<div class='checkbox'><label><input type='checkbox' name='' value=''>Ruoyi Wang</label></div>"


var sdbraction = "<div class='sidebar-action'><div class='sidebar-buttons'></div></div>"
var btnSlcChkIn = "<button type='button' id='ckin' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnSlcAll = "<button type='button' id='slcall' class='btn btn-primary btn-block'>Select All</button>"
var btnClrAll = "<button type='button' id='clrall' class='btn btn-primary btn-block'>Clear All</button>"
var btnNewTem = "<button type='button' id='newtem' class='btn btn-primary btn-block'>New Template</button>"
var btnDelTem = "<button type='button' id='deltem' class='btn btn-primary btn-block'>Delete Template</button>"




var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";
var btnDwld = "<button id='dwld' type='button' class='btn btn-success'>Download ❯</button>";
var btnEmPrShp = "<button id='emprshp' type='button' class='btn btn-success'>Email Print Shop ❯</button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";
var btnSaveAs = "<button type='button' id='saveas' class='btn btn-success'>Save As</button>"
var btnSaveTem = "<button type='button' id='savetem' class='btn btn-success'>Save</button>"





$( document ).ready(function() {
    //Hide svg Canvas
    $("#svgEditor").hide();

    //click sub-nav
    $(".nav li").click(function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");

        switch($(this).attr("id")) {
            case "certi":
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

    function checkBox() {
            console.log("click");
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
    }

    //check if there is a checked checkbox
    $(".side-form-content").on('click', 'input', function() {
        checkBox();
        if($(this).attr("type")==="radio") {
            var svg_name = $(this).attr("class");
            loadSvg(svg_name);
        }

    });

    $(".sidebar-buttons").on('click', 'button', function() {
        console.log($(this).attr("id"));
        switch($(this).attr("id")) {
            case "newtem":
                loadSvg();
        }
    });

    function emptyAll() {
        //Middle part
        $(".side-form-content").empty();
        $(".sidebar-action").hide();
        $("#svgEditor").hide();        
        //Footer
        $(".footer-buttons-right").empty();
        $(".footer-buttons-left").empty();

    }

    function manageTem() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        console.log("slcTemp")
        emptyAll();
        showTem();
        addActionBar();
        //load the first svg in editor
        loadSvg(json_obj[0].name);
        addFooterBtn();
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



    function createEmail() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        emptyAll();
        slcRecipients();
        newEmail();
    }

});
