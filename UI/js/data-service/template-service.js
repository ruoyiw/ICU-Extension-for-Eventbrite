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
    var tem_list = [];
    
    //tid must be an interger
	function Template(uid, name, tid, content) {
		this.uid = uid;
		this.name = name;
		this.tid = tid;
		this.content = content;
	}

	function encapTem(data) {
		tem_list = [];
		if(data.response==="success") {
			if(data.result.length>0) {
				
				for (temp of data.result) {
					tem_list.push(temp);
					//console.log(temp);
				}
			}
			console.log(tem_list);
		}else{
			//TODO: display error msg in page
			console.log("something wrong");
			console.log(data);
		}
	}

	function getAllTemplatesCerti(uid, loc, callBack, callBack2, callBack3, i, ...callBacks) {
		$.getJSON(`${baseTemURL}get`, {"uid": uid})
		.done(function(data) {
			callBack(data);
			callBack2(loc);
			callBack3(i);
			if(callBacks.length>0) {
				for(callBack of callBacks) {
					callBack();
				}
			}
		})
		.fail(function() {
			//TODO: display error msg in page
			alert("error");
		});
	}

	function getAllTemplatesEmail(uid, loc, callBack1, callBack2, callBack3, i, ...callBacks) {
		$.getJSON(`${baseTemURL}get`, {"uid": uid})
		.done(function(data) {
			if(callBacks.length>0) {
				for(callBack of callBacks) {
					callBack();
				}
			}
			callBack1(data);
			callBack2(loc);
			callBack3(i);

		})
		.fail(function() {
			//TODO: display error msg in page
			alert("error");
		});
	}

	function addATemplate(uid, name, content) {
		$.post(
			`${baseTemURL}add`, 
			{
				"tid": -1,
				"uid": uid,
				"name": name, 
				"content": content
			 },
			 function(data) {
			 	if(data.response==="success") {
			 		tem_list.push({"uid": uid, "name": name, "tid": data.tid, "content": content});

		            addTemToBar(tem_list.length-1, ".side-form-content");

		            loadSvg(tem_list[tem_list.length-1].tid);

		            selCheckBox(tem_list.length-1);
			 	}
			 },
			 "json");
	}

	function modifyTemplate(uid, tid, name, content) {
		$.post(
			`${baseTemURL}add`, 
			{
				"tid": tid,
				"uid": uid,
				"name": name, 
				"content": content
			 },
			 function(data) {
			 	if(data.response==="success") {
			 		//alert(data.tid);
		            $(".side-form-content").find(".svg-entity").eq(i).empty();
		            $(".side-form-content").find(".svg-entity").eq(i).append("<label><p class='svg-name'>"+ tem_list[i].name +"</p><input type='radio' name='optradio'>"+tem_list[i].content+"</label>");
		            
		            renderATem(i, ".side-form-content");

		            selCheckBox(i);
		            loadSvg(tem_list[i].tid);
			 	}
			 },
			 "json");		
	}

	function deleteTemByTid(uid, tid) {
		$.getJSON(`${baseTemURL}remove`, {"uid": uid, "tid": tid})
		.done(function(data) {
			if(data.response === "success") {
				//alert("delete success");
				tem_list.splice(i,1);
    			deleteTemFromBar(i);
			}
		})
		.fail(function() {
			//TODO: display error msg in page
			alert("error");
		});
	}

	// function getAllTemplatesByUid(uid) {
	// 	$.getJSON(`${baseTemURL}get`, {"uid": uid, "callback": "encapTem"}, encapTem);
	// }


  