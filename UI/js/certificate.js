$(function() {

	
});

	function displayEventsName(courses) {
		if(courses.length>0) {
			var selCourInstru = $("#select-course-instruction");
			courses.forEach(function(course) {
				var formattedCourse1 = selectCourse.replace("%value%", course.id);
				var formattedCourse = formattedCourse1.replace("%data%", course.name);
				selCourInstru.after(formattedCourse);
			});
			
		}

	}

/*
show course name in select menu
*/
function showCourses() {
	$("#modalPrintShop").on("shown.bs.modal", function() {
		getAllEvents(displayEventsName);
		//console.log(courses);
		
	});


}