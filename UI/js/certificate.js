    /*
    TO DO: GET TEMPLATES FROM SERVER
    */
    function showTem() {
        
        console.log(json_obj);

        //render svg lists in left bar
        for(i in json_obj) {
            $(".side-form-content").
                append("<div class='radio'><label><input type='radio' name='optradio'>"+json_obj[i].content+"</label></div>");
                
            $(".side-form-content").find("input").last().addClass(json_obj[i].name);

        };

        //check the first svg
        $(".side-form-content").find("input").first().attr(
            "checked","checked"
        );

        //show the hided svg editor
        $("#svgEditor").show();

        //load the first svg in editor
        loadSvg(json_obj[0].name);

        //make svg list responsible
        $(".side-form-content svg").each(function() {
            $(this).attr({
                "viewBox": "0 0 580 400",
                "preserveAspectRatio": "xMidYMid meet",
                "width": "80%",
                "height": "80%"});
        });

        $(".footer-buttons-right").append(btnNext);
    }

