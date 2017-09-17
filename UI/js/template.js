var svgEditor = "<iframe src='svg-editor/index.html' width='900px' height='600px' id='svgEditor' onload='init_embed()''></iframe>";
var svgCanvas = null;
var smTem3="<div class='radio'><label><input type='radio' name='optradio'><svg viewBox='0 0 842 595' preserveAspectRatio='xMidYMid meet' width='80%' height='80%'><rect width='842' height='595' style='fill:rgb(255,255,0);stroke-width:10;stroke:rgb(0,0,0)'/></svg></label></div>";

    function init_embed() {
          svgCanvas = new SvgEditorEmbedded(window.frames['svgEditor']);
    }
