//The root URL for the RESTful services
var rootURL = "Please type down root url here";

//Web elements
var subHome = "<li><a href='#'>Home »</a></li>";
var subTem = "<li><a href='#'>Select Template »</a></li>"; 
var subPrev = "<li><a href='#''><span class='glyphicon glyphicon-eye-open' title='Preview'></span></a></li>"
var butNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var smImg = "<div class='checkbox'><label class='sid-ck'><input type='checkbox' name='' value=''><img src='images/certi1.png' width='80%' class='img-responsive'></label></div>";

$( document ).ready(function() {

    //click sub-nav
    $(".nav li").click(function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");

        switch($(this).attr("id")) {
            case "print-certi":
                printCerti();
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

    //click checkbox in the middle part
    $(".side-form-content").on('click', 'input', function() {
            if(this.checked) {
                $("#next").removeClass("disabled");
            }
    });

    function printCerti() {
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

        
    }

    function ptCerTemp() {
        $(".sub-nav-left").append(subHome, subTem);      
        $(".sub-nav-right").append(subPrev);  
        $(".side-form-content").append(smImg);
        //TODO: show pdf on left side of middle part
        $(".footer-buttons-right").append(butNext);
        $("#next").addClass("disabled");
    }
 

});
