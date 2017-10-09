
$( document ).ready(function() {
    //Hide svg Canvas
    $(".svg-editor-container").hide();

    //Hide side bar content
    // $(".sidebar-title").hide();
    // $("#email-course").hide();
    // $(".email-stds").hide();


    //authenticate a user, first redirect to a auth url
    // window.location.replace(authURL);

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
        
        //console.log($(this).attr("id"));
        //console.log($(this));
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
        //console.log($(this));
    });


    //when click the small template on the list, the detailed template will be loaded in the canvas 
    $(".side-form-content").on('click', 'input', function() {
        checkBox();
        //Don't move this "if statement" out of this on() function
        if($(this).attr("type")==="radio") {
            var tid = $(this).attr("id");
            //alert(tid);
            loadSvg(tid);
        }
    });

    //clcik the right footer buttons
    $(".footer-buttons-right").on('click', 'button', function() {
        console.log($(this).attr("id"));
        switch($(this).attr("id")) {
            case "emPrShp":
                showCourses("#modalPrintShop");
                break;
            case "dwld":
                showCourses("#modalPrintShop");
                break;
        }
    });

    function slcTemp() {
        //Reusable: Empty all elements in sub navigation bar, middle part and footer
        console.log("slcTemp")
        emptyAll();

        displayTems(1, ".side-form-content");

        addActionBar();
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

        $(".side-form-content").load("embedStdList.html");
    }

});


