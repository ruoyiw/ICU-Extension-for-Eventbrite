$(function() {
	
});

	/*
	$.post(url [,data] [,success] [,dataType])
	*/
	/*
	$.ajax({
    	url: eBrootURL+eventURL,
    	data: {"token": personalToken},
    	success: function(data) {
    		console.log(data);
    	}
    });
    */
    var templates = [];
    getAllTemplatesByUid(1, encapTem);

    //tid must be an interger
	function Template(uid, name, tid, content) {
		this.uid = uid;
		this.name = name;
		this.tid = tid;
		this.content = content;
	}

	function encapTem(data) {
			if(data.response==="success") {
				if(data.result.length>0) {
					
					for (temp of data.result) {
						templates.push(temp);
						console.log(temp);
						//console.log("template name: " + template.name);
					}
					console.log(templates);
				}
				
			}else{
				console.log("something wrong");
				console.log(data);
			}
	}

	function getAllTemplatesByUid(uid, callBackFunc) {
		$.getJSON(`${baseTemURL}get`, {"uid": uid}, function(data){
			callBackFunc(data);
		})
		.fail(function() {
			alert("error");
		});
	}

	// function getAllTemplatesByUid(uid) {
	// 	$.getJSON(`${baseTemURL}get`, {"uid": uid, "callback": "encapTem"}, encapTem);
	// }


  