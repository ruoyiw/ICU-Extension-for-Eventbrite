//The root URL for the RESTful services
var rootURL = "Please type down root url here";

$( document ).ready(function() {
 
    $("#pdf-upload").click(function( event ) {
 
        upload();
 
    });

    function upload() {
		//Reference: https://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
    	console.log("Upload Start");
    	//TO DO: Get PDF file

    	$.ajax({
    		type: "POST",
    		url: //rootURL + '/defined sufix'
    		data: new FormData($("form")[0]),

    		//Tell jQuery not to process data or worry about content-type
    		//You must include these options
    		cache: false,
    		contentType: false;
    		processData: false;

    		//Custom XMLHttpRequest
    		xhr: function() {
    			var myXhr = $.ajaxSettings.xhr();
    			if(myXhr.upload) {
    				//For hadling the progress of the upload
    				myXhr.upload.addEventListener("progress", function(e) {
    					if (e.lengthComputable) {
    						$("progress").attr({
    							value: e.loaded,
    							max: e.total,
    						});
    					}
    				}, false);
    			}
    			console.log("Upload Finish");
    			return myXhr;
    		},

    	})
    	//Code to run if the request succeesd (is done)
    	.done (function(data) {
    		alert("generate PDFs succesfully");
    		window.open(data);
    	})
    	;
    }
 
});
