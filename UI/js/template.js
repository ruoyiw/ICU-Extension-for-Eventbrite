var svgEditor = "<iframe src='svg-editor/index.html' width='900px' height='600px' id='svgEditor' onload='init_embed()''></iframe>";
var svgCanvas = null;

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
//TO DO: In the future, jsonTem will be the json Object fetched through ajax

var json_obj = [{"name": "item_1", "content": SAMPLE_SVG_STRING}, {"name": "item_2", "content": SAMPLE_SVG_STRING}];

function init_embed() {
      svgCanvas = new SvgEditorEmbedded(window.frames['svgEditor']);
}

function loadSvg() {
    svgCanvas.setSvgString(SAMPLE_SVG_STRING)(function (d, e) {
        alert(d, e)
    });
}