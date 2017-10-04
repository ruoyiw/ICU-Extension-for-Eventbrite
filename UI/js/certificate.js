$(function() {

	//After course name is selcted, show its students' names
	$("#course").on("change", showStdNames);

	//show students name for different courses according to index of course array
	function showStdNames() {		
		removeStdList();

		var index = $(this).find("option:selected").index();
		var students = getStdsByIndex(index-1);
		if(students.length>0) {
			$(".modal-stds").find("strong").text("Please select students");
			students.forEach(function(std) {
				var formattedStd1 = stdName.replace("%value%",std.email);
				var formattedStd = formattedStd1.replace("%data%", std.fullName );
				$(".modal-names").append(formattedStd);
			});	
		}
	} 
	 
	function getStdsByIndex(i) {
		if(i>=0) {
			var students = events_array[i].attendees;
		}
		return students;
	}

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

function hideThenShowModal(modalId){
	$(modalId).find(".modal-title").children().show();
	$(modalId).modal('show');
	$(modalId).find(".modal-body").hide();
}

function showModal(modalId){
	$(modalId).find(".modal-title").children().hide();
	$(modalId).find(".modal-body").show();
	removeStdList();
}

function removeStdList() {
	$(".modal-names").empty();
	$(".modal-stds").find("strong").text("No students to show");		
}

/*
show course name in select menu
*/

function showCourses(modalId) {
	//May become common methods
	hideThenShowModal(modalId);

	getAllEvents(displayEventsName, modalId, showModal);
}