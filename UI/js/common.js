
 
    //check whether there is a checkbox on the left side bar  
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

    //empty all rendered doms, usually invoked after clicking another navigation button
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


