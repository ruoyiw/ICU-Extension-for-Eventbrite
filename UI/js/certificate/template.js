

//Singleton Pattern
var svgCanvas_singleton = (function () {
    var instance;
 
    function createCanvas() {
        var svgCanvas = new SvgEditorEmbedded(window.frames['svgEditor']);
        return svgCanvas;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createCanvas();
            }
            return instance;
        }
    };
})();

var SAMPLE_SVG_STRING = '<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">\n' +
    ' <!-- Created with SVG Editor - http://github.com/mzalive/SVG Editor/ -->\n' +
    ' <g>\n' +
    '  <title>background</title>\n' +
    '  <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>\n' +
    '  <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">\n' +
    '   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>\n' +
    '  </g>\n' +
    ' </g>\n' +
    ' <g>\n' +
    '  <title>Layer 1</title>\n' +
    '  <path id="svg_1" d="m186.5825,162.04691l79.06753,0l24.43247,-73.71964l24.43249,73.71964l79.06751,0l-63.96685,45.56072l24.43374,73.71964l-63.96688,-45.56197l-63.96687,45.56197l24.43374,-73.71964l-63.96688,-45.56072z" stroke-width="1.5" stroke="#000" fill="#ff0000"/>\n' +
    ' </g>\n' +
    '</svg>'
    
var SAMPLE_SVG_STRING1 = '<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">\n'+
 '<!-- Created with SVG Editor - http://github.com/mzalive/SVG Editor/ -->\n'+
 '<g>\n'+
  '<title>background</title>\n'+
  '<rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>\n'+
 '</g>\n'+
 '<g>\n'+
  '<title>Layer 1</title>\n'+
  '<text stroke="#000" transform="matrix(1.2243140935897827,0,0,1.2243140935897827,-44.75066167116165,-12.021833453327417) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_1" y="65.39859" x="179.0804" stroke-width="0" fill="#000000">ICU Certificate</text>\n'+
  '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_2" y="131.2" x="209.5" stroke-width="0" stroke="#000" fill="#000000">Awarded to</text>\n'+
  '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_3" y="189.2" x="182.5" stroke-width="0" stroke="#000" fill="#000000">{{studentName}}</text>\n'+
  '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_4" y="242.2" x="252.5" stroke-width="0" stroke="#000" fill="#000000">By</text>\n'+
  '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_5" y="288.2" x="179.5" stroke-width="0" stroke="#000" fill="#000000">{{providerName}}</text>\n'+
  '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_6" y="337.2" x="443.5" stroke-width="0" stroke="#000" fill="#000000">{{date}}</text>\n'+
  '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="87.2" x2="548.80848" y1="87.2" x1="23.5" stroke-width="1.5" stroke="#000" fill="none"/>\n'+
  '<rect id="svg_10" height="11" width="37" y="45.2" x="388.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#ff0000"/>\n'+
  '<rect transform="rotate(-0.6500758528709412 407,50.70000076293905) " stroke="#000" id="svg_11" height="39" width="11" y="31.2" x="401.5" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="#ff0000"/>\n'+
 '</g>\n'+
'</svg>'
//TO DO: In the future, obj will be the json Object fetched through ajax-*9+9


//Init svg editor
function init_embed() {
      svgCanvas_singleton.getInstance();
}

//Load Svg according its name
function loadSvg(tid) {
    var svg_content = null;
    for(i in tem_list) {
        //alert(typeof tid);
        if(tem_list[i].tid === parseInt(tid)) {
            svg_content = tem_list[i].content;
            break;
        }
    }
    //alert(svg_content);
    svgCanvas_singleton.getInstance().setSvgString(svg_content)(function (d, e) {
        console.log("load successfully: "+d, e);
    });
}


//render one template in template list according to its index

    function renderATem(i, loc) {
        $(loc).find("input").eq(i).attr("id", tem_list[i].tid);
        var svg = $(loc).find("svg").eq(i);
        console.log(svg.attr("width"));
        $(loc).find("svg").eq(i).attr({
            "viewBox": "0 0 "+ svg.attr("width") +" "+ svg.attr("height"),
            "preserveAspectRatio": "xMidYMid meet",
            "width": "80%",
            "height": "80%"});       
    }


function addTemToBar(i, loc) {
    $(loc).
        append("<div class='radio svg-entity'><label><p class='svg-name'>"+ tem_list[i].name +"</p><input type='radio' name='optradio'>"+tem_list[i].content+"</label></div>");
    renderATem(i, loc);
}

function addTemsToBar(loc) {
    for(i in tem_list) {
        addTemToBar(i, loc);
    };
}

function showSvgEditor() {
    //show the hided svg editor
    $(".svg-editor-container").show();
    //load the first svg in editor
    loadSvg(tem_list[0].tid);
}

function renderTemList(uid, loc) {
    //console.log(tem_list);
    getAllTemplatesCerti(uid, loc, encapTem, addTemsToBar, selCheckBox, 0, showSvgEditor);
    //check the first svg
    //$(loc).find("input").first().prop("checked", true);
}


//show template list on the left side of the bar

function displayTems(uid, loc) {
    renderTemList(uid, loc);

}

function addFooterBtn() {
    $(".footer-buttons-right").append(btnDwld, btnEmPrShp);
}

function addActionBar() {
    //console.log("add bar btns");
    $(".sidebar-buttons").append(btnSaveTem, btnSaveAs, btnDelTem);
}

function addNewTem(uid,svg_name) {
    //get new templat object 
    svgCanvas_singleton.getInstance().getSvgString()(function handleSvgData(content, e) {
        if (e) {
            console.log('error ' + e);
        }
        else {
            //console.log("get svg content successfully"+d);
            console.log('The exported SVG string:\n\n' + content);    

            addATemplate(uid, svg_name, content);           

        }
    }); 
}



function modifyTem(uid, i) {
    svgCanvas_singleton.getInstance().getSvgString()(function handleSvgData(d, e) {
        if (e) {
            console.log('error ' + e);
        }
        else {
            //console.log('The exported SVG string:\n\n' + d);    
            tem_list[i].content = d;  

            modifyTemplate(uid, tem_list[i].tid, tem_list[i].name, d);
        }
    }); 

}

function deleteTemFromBar(i) {       
    if(tem_list.length>=1) {
        $(".side-form-content").find(".svg-entity").eq(i).remove();
        selCheckBox(0);
        loadSvg(tem_list[0].tid);


    }else{
        alert("There should be at least one template.");
    }
}

function deleteTem(uid, i) {
    
    deleteTemByTid(uid, tem_list[i].tid);

}

function selCheckBox(index) {
    $(".side-form-content").find("input").eq(index).prop(
        "checked",true
    );  
}



$(function() {
    
    //Add the new template after click "save as"
    $(".modal-footer").on("click", "#save-complete", function() {
        addNewTem(1, $("#svg-name").val());
        console.log("save as");
    });

    //click save button in sidebar
    $(".sidebar-buttons").on("click", "#savetem", function() {
        //console.log("click save button");
        $(".side-form-content input").each(function(index, inputEle) {
            if(inputEle.checked) {
                modifyTem(1, index);
                console.log("save");
            }
        });
    });    

    //click delete button in sidebar
    $(".sidebar-buttons").on("click", "#deltem", function() {
        $(".side-form-content input").each(function(index, inputEle) {
            if(inputEle.checked) {
                deleteTem(1, index);
                console.log("delete");
            }
        });
    });
       
});
