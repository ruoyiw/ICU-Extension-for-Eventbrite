$(function() {
	/*
	jQuery.get(url [,data] [,success] [,dataType])
	*/
	var eBrootURL = "https://www.eventbriteapi.com/v3";

	var clientKey = "2W2AGMHUMCBQTNXAU25TKHR3CXOISJ7WSPSW4NDPK5LIJZF4UI";

	var authURL = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=" + clientKey;
	var appKey = "7R5NTZ4MIZEGS6KVT4";
	var eventURL = "/users/me/owned_events/";
	var personalToken = "LIUPZKLIB7TPRNAGZHV6";


	function Event(id, name, startTime, endTime, attendees) {
		this.id = id;
		this.name = name;
		this.startTime = startTime;
		this.endTime = endTime;
		this.attendees = attendees;
	}

	function Attendee(name, email, isCheckIn) {
		this.name = name;
		this.email = email;
		this.isCheckIn = isCheckIn;
	}

    var events_array = [];
    var attendees_array = [];

	var jqxhr =	$.get(eBrootURL+eventURL, {"token": personalToken}, function(d) {
        //console.log(d.events[1]);
        d.events.forEach(function(event) {
        	attendees_array = [];
        	$.get(eBrootURL+"/events/"+event.id + "/attendees/", {"token": personalToken}, function(stds) {  
        		
        		stds.attendees.forEach(function(atte) {
        			attendees_array.push(new Attendee(atte.profile.name, atte.profile.email, atte.checked_in));
        		});   		
        		

        	});
        	events_array.push(new Event(event.id, event.name.text, event.end.local, event.start.local, attendees_array));
        });
    })
    .done(function() {
    	console.log(events_array);
    });

    


});