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
//var btnNewTem = "<button type='button' id='newtem' class='btn btn-primary btn-block'>New Template</button>"
var btnDelTem = "<button type='button' id='deltem' class='btn btn-primary btn-block'>Delete</button>"
var btnSaveAs = "<button type='button' id='saveas' class='btn btn-primary btn-block' data-toggle='modal' data-target='#save-as'>Save As</button>"
var btnSaveTem = "<button type='button' id='savetem' class='btn btn-primary btn-block'>Save</button>"



var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";
var btnDwld = "<button id='dwld' type='button' class='btn btn-success'>Download ❯</button>";
var btnEmPrShp = "<button id='emprshp' type='button' class='btn btn-success'>Email Print Shop ❯</button>";
var btnEmStd = "<button id='emprshp' type='button' class='btn btn-success'>Email Students ❯</button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";




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
                $(".footer-buttons-right").find("button").removeClass("disabled");

            } else {
                var ck = false;
                $(".side-form-content input").each(function() {
                    if(this.checked) {
                        ck = true;
                    }
                });
                if(ck) {
                    $(".footer-buttons-right").find("button").removeClass("disabled");
                } else {
                    $(".footer-buttons-right").find("button").addClass("disabled");
                }                
            }
    }

    //when click the small template on the list, the detailed template will be loaded in the canvas 
    $(".side-form-content").on('click', 'input', function() {
        checkBox();
        //Don't move this "if statement" out of this on() function
        if($(this).attr("type")==="radio") {
            var svg_name = $(this).attr("id");
            loadSvg(svg_name);
        }
    });

    //clcik the right footer buttons
    $(".footer-buttons-right").on('click', 'button', function() {
        console.log($(this).attr("id"));
        switch($(this).attr("id")) {
            case "emprshp":
                
                break;
            case "dwld":
                
                break;
        }
    });

    //Add the new template after click "save as"
    $(".modal-footer").on("click", "button", function() {
        addNewTem($("#svg-name").val());
    });

    //click save button in sidebar
    $(".sidebar-buttons").on("click", "#savetem", function() {
        //console.log("click save button");
        $(".side-form-content input").each(function(index, inputEle) {
            if(inputEle.checked) {
                modifyTem(index);
            }
        });
        //modifyTem();
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

    function slcTemp() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        console.log("slcTemp")
        emptyAll();
        showTemFir();
        addActionBar();
        //load the first svg in editor
        loadSvg(tem_list[0].name);
        addFooterBtn();
    }


    /*
    TO DO: GET STUDENTS NAMES FROM SERVER
    */ 
    function slcStds() {
    	$(".sub-nav-left").find("li").eq(1).removeClass("active-blue");
        $(".sub-nav-left").find("li").eq(2).addClass("active-blue");

        $(".side-form-content").empty();
        $(".side-form-content").append(stdName1,stdName2);
        $(".side-form-content").after(sideActBottom);
        $("#sideActBottom").append(btnSlcChkIn, btnSlcAll, btnClrAll);

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
