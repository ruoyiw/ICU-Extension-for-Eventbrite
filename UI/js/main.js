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



var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";
var btnDwld = "<button id='dwld' type='button' class='btn btn-success'>Download ❯</button>";
var btnEmPrShp = "<button id='emprshp' type='button' class='btn btn-success'>Email Print Shop ❯</button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";






$( document ).ready(function() {

    //click sub-nav
    $(".nav li").click(function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");

        switch($(this).attr("id")) {
            case "certi":
                console.log("print");
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




    function slcTemp() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        console.log("slcTemp")
        emptyAll();
        ptCerTemp();
    }

    function emptyAll() {
        //Middle part
        $(".side-form-content").empty();
        $(".sidebar-action").remove();
        $(".main-content").empty();        
        //Footer
        $(".footer-buttons-right").empty();
        $(".footer-buttons-left").empty();

    }

    /*
    TO DO: GET TEMPLATES FROM SERVER
    */
    function ptCerTemp() {
        $(".main-content").append(svgEditor);
        console.log(json_obj);

        for(i in json_obj) {
            $(".side-form-content").
                append("<div class='radio'><label><input type='radio' name='optradio'>"+json_obj[i].content)+"</label></div>";
        };

        //loadSvg();

        $(".side-form-content").find("input").first().attr(
            "checked","checked"
        );



        $(".side-form-content svg").each(function() {
            $(this).attr({
                "viewBox": "0 0 580 400",
                "preserveAspectRatio": "xMidYMid meet",
                "width": "80%",
                "height": "80%"});
        });

        //$(".side-form-content").append(json_obj[1].content);
        //TODO: show pdf on left side of middle part
        $(".footer-buttons-right").append(btnNext);
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
