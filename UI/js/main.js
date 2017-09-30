//The root URL for the RESTful services
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

    //click drop-menu in sub-nav
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


    function createEmail() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        emptyAll();
        $("#email").load("embedEmail.html", function(response, status, xhr) {
            
            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                console.log( msg + xhr.status + " " + xhr.statusText );
            } else {
                slcRecipients();
            }
        });
        
        //newEmail();

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

