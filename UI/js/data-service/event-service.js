$(function() {


});

	/*
	$.get(url [,data] [,success] [,dataType])
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
    var events_array = [];

	function Event(id, name, startTime, endTime, attendees) {
		this.id = id;
		this.name = name;
		this.startTime = startTime;
		this.endTime = endTime;
		this.attendees = attendees;
	}

	function Attendee(fullName, email, isCheckIn) {
		this.fullName = fullName;
		this.email = email;
		this.isCheckIn = isCheckIn;
	}

    function getAllEvents(callBackFunc, modalId, callBackFun2) {
    	
		var jqxhr =	$.get(eBrootURL+eventURL, {"token": personalToken}, function(d) {
	        //console.log(d.events[1]);
	        events_array = [];
	        d.events.forEach(function(event) {
	        	var attendees_array = [];
	        	$.get(eBrootURL+"/events/"+event.id + "/attendees/", {"token": personalToken}, function(stds) {  	        		
	        		stds.attendees.forEach(function(atte) {
	        			attendees_array.push(new Attendee(atte.profile.name, atte.profile.email, atte.checked_in));
	        		});   		
	        	});
	        	events_array.push(new Event(event.id, event.name.text, event.start.local, event.end.local, attendees_array));
	        });
	        console.log(events_array);
	        callBackFunc(events_array);
	        
	    })
	    .done(function() {
	    	callBackFun2(modalId);
	    });
    }

  