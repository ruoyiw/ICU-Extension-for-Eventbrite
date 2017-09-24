//The root URL for the RESTful services
var rootURL = "Please type down root url here";

new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","js/email.js");
document.body.appendChild(new_element);

//Web elements



var stdName1 ="<div class='checkbox'><label><input id='name1' type='checkbox' name='' value=''>Sankar Narayanan</label></div>"
var emailAddr1 = "1073653692@qq.com"
var stdName2 ="<div class='checkbox'><label><input id='name2' type='checkbox' name='' value=''>Ruoyi Wang</label></div>"
var emailAddr2 = "ruoyiw@student.unimelb.edu.au"

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
var smImg = "<div class='checkbox'><label class='sid-ck'><input type='checkbox' name='' value=''><img src='images/certi1.png' width='80%' class='img-responsive'></label></div>";

// The root URL for the RESTful services
var rootURL = "http://frank.mzalive.org/service/icu-service/webapi/mail";


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
            case "manage-ep":
                manageEp();
                break;
        }
        
        console.log($(this).attr("id"));
        console.log($(this));
    });

    $(".dropdown-menu").find("li").click(function() {
        switch($(this).attr("id")) {
            case "create-email":
                createEmail();
                break;
            case "draft-email":
                checkDraft();
                break;
            case "del-email":
                checkDel();
                break;
        }
        console.log($(this));
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
        $(".sidebar-buttons").empty();
        $("#svgEditor").hide();
        $("#email").empty();        
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
        //show the hided svg editor
        $("#svgEditor").show();
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


    // Variable to store your files
    var files;
    var attachments;
    var fileNum = 0;

    // Add events
    $('#file').on('change', prepareUpload);

    // Grab the files and set them to our variable
    function prepareUpload(event)
    {
        files = event.target.files;
    }

    $("#upload").click(function(event) {

        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        var formData = new FormData();

        $.each(files, function(key, value)
        {
            formData.append("file", value);

        });

        $.ajax({
            type: "POST",
            url: rootURL+"/uploadFile",
            data: formData,
            dataType: "json", // data type of response
            //Tell jQuery not to process data or worry about content-type
            //You must include these options
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, textStatus, jqXHR)
            {
                success_jsonpCallback(data);
                // Success so call function to process the form
                //submitForm(event, data);
                if (fileNum == 0) {
                    attachments = data.filename;
                    fileNum++;
                } else {
                    attachments = attachments + ";" + data.filename;
                    fileNum++;
                }
                console.log(attachments);
                alert(fileNum + " attachments: " + attachments)

            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                error_jsonpCallback(event);
                // STOP LOADING SPINNER
            }
        });
    });



    $("#sendEmail").click(function(event) {

        // stop the regular form submission
        event.preventDefault();

        $.post( "http://frank.mzalive.org/service/icu-service/webapi/mail/sendMail",
        { FROM: $('#emailFrom').val(),
          TO_LIST: $('#emailTo').val(),
          CC_LIST: $('#ccTo').val(),
          BCC_LIST: $('#bccTo').val(),
          SUBJECT: $('#subject').val(),
          CONTENT: $('#editor').html(),
          ATTACHMENT_LIST: attachments
        }) .done(function(data, textStatus, jqXHR) {
            success_jsonpCallback(data);
            console.log($('#emailTo').val());
            console.log($('#ccTo').val());
            $("#emailForm").trigger("reset");
            $("#editor").empty();
            alert("Send successfully");
        })
            .fail(function(jqXHR, textStatus, errorThrown) {
            error_jsonpCallback(event);
        })
    });

    function success_jsonpCallback(d) {
        console.log("success");
        console.log(d);
    }

    function error_jsonpCallback(e) {
        console.log("error");
        console.log(e);
    }



});

