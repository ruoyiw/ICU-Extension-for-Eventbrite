$(function() {

	
});

	function displayEventsName(courses) {
		if(courses.length>0) {
			var selCourInstru = $("#select-course-instruction");
			var course = $("#course");
			course.find("option").not("#select-course-instruction").remove();
			courses.forEach(function(course) {
				var formattedCourse1 = selectCourse.replace("%value%", course.id);
				var formattedCourse2 = formattedCourse1.replace("%data%", course.name);
				course.startTime = course.startTime.replace(/T/g, " at ");
				var formattedCourse = formattedCourse2.replace("%time%", course.startTime);
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