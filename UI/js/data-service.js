$(function() {
	/*
	jQuery.get(url [,data] [,success] [,dataType])
	*/
	var eBrootURL = "https://www.eventbriteapi.com/v3";

	var clientKey = "2W2AGMHUMCBQTNXAU25TKHR3CXOISJ7WSPSW4NDPK5LIJZF4UI";

	var authURL = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=" + clientKey;

	var appKey = "7R5NTZ4MIZEGS6KVT4";

	var personalToken = "LIUPZKLIB7TPRNAGZHV6";

	$.get(eBrootURL+"/users/me/", {"token": personalToken}, function(d) {
        console.log(d);
    });
});