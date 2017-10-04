<<<<<<< HEAD
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
        showTemFir(".side-form-content");
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
        $("#email").load("embedEmail.html", function (response, status, xhr) {

            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                console.log(msg + xhr.status + " " + xhr.statusText);
            } else {
                slcRecipients();
            }
        });
    }

});





=======


$( document ).ready(function() {
    //Hide svg Canvas
    $(".svg-editor-container").hide();

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
            case "emPrShp":
                $("#modalPrintShop").modal("show");
                showCourses();
                break;
            case "dwld":
                $("#modalPrintShop").modal("show");
                showCourses();
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
        $(".svg-editor-container").show();
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





});

>>>>>>> 9ef8b03b387fa496e052e020e1ddef844fd05013
