$(function() {
	//show students name for different courses according to index of course array 
	function getStdNamesByIndex(i) {

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
	$(modalId).modal('show');
	$(modalId).find(".modal-body").hide();
}

function showModal(modalId){
	$(modalId).find(".modal-title").children().hide();
	$(modalId).find(".modal-body").show();
}

/*
show course name in select menu
*/
function showCourses(modalId) {
	//May become common methods
	hideThenShowModal(modalId);

	getAllEvents(displayEventsName, modalId, showModal);

	//showModal(modalId);

}