
var selectedEmail = [];

var emailArray = [
    {'name': 'Sankar', 'emailAddr': '1073653692@qq.com', 'checkedin': true},
    {'name': 'Ruoyi Wang', 'emailAddr': 'ruoyiw@student.unimelb.edu.au', 'checkedin': false}];


// function displayStdName() {
//     selectedEmail = [];
//     emailArray.forEach(function(email) {
//         var formattedName =  stdName.replace("%data%", email.name);
//         var formattedFinal = formattedName.replace("%value%", email.emailAddr);
//         //append select menu
//         $(".side-form-content").append(formattedFinal);
//     });
// }

function slcRecipients() {
    //getallevents(displaystudents);
    //displayStdName();

    listCourses(".side-form-content");
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $(".footer-buttons-right").append(btnSave,btnSend);
    $(".footer-buttons-left").append(btnBck);
    $("#spinner").hide();
    $("#upload").attr("disabled",true);
    $("#errorCC").hide();
    $("#errorBCC").hide();
}

$(function() {

    //After course name is selcted, show its students' names
    $("#email-course").on("change", displayStdNames);

    //show students name for different courses according to index of course array
    function displayStdNames() {
        clearStdList();

        var index = $(this).find("option:selected").index();
        let i = (events_array.length)-index;
        var students = getStds(i);
        if(students.length>0) {
            $(".email-stds").find("strong").text("Please select students");
            students.forEach(function(std) {
                var formattedStd1 = stdName.replace("%value%", std.email);
                var formattedStd = formattedStd1.replace("%data%", std.fullName );
                $(".email-names").append(formattedStd);
            });
        }
    }

    function getStds(i) {
        let students = [];
        if(i>=0 && i<events_array.length) {
            students = events_array[i].attendees;
        }
        return students;
    }

});

function showEventsName(courses) {
    if(courses.length>0) {
        var selCourInstru = $("#email-select-course-instruction");
        var course = $("#email-course");
        course.find("option").not("#email-select-course-instruction").remove();
        courses.forEach(function(course) {
            var formattedCourse1 = selectCourse.replace("%value%", course.id);
            var formattedCourse2 = formattedCourse1.replace("%data%", course.name);
            course.startTime = course.startTime.replace(/T/g, " at ");
            var formattedCourse = formattedCourse2.replace("%time%", course.startTime);
            selCourInstru.after(formattedCourse);
        });
    }
}

function hideDiv(){

    $(".side-email-content").hide();
}

function showDiv(){
    $("#small-spinner").hide();
    $(".side-email-content").show();
    clearStdList();
}

function clearStdList() {
    $(".email-names").empty();
    $(".email-stds").find("strong").text("No students to show");
}

/*
show course name in select menu
*/
function listCourses(divId) {
    //May become common methods
    hideDiv();
    getAllEvents(showEventsName, divId, showDiv);

}




$(function() {  
$(".stdName").click(function() {
    if(this.checked && selectedEmail.length == 0) {
        selectedEmail.push($(this).val());
        $('#emailTo').val(selectedEmail);
    } else if (this.checked && selectedEmail.length > 0) {
        selectedEmail.push($(this).val());
        $.each(selectedEmail, function( i, email ){
            if (i < selectedEmail.length - 1 ) {
                $('#emailTo').val(email + ";");
            } else {
                $('#emailTo').val($('#emailTo').val() + email);
            }
        });
    } else {
        selectedEmail.splice($.inArray($(this).val(), selectedEmail), 1);
        $('#emailTo').val(selectedEmail);
    }
    console.log(selectedEmail);

});

$(".sidebar-buttons").on("click", "#slcall", function() {
    $('.stdName').prop('checked',true);
    selectedEmail = [];
    $('#emailTo').val("");
    emailArray.forEach(function(email) {
        selectedEmail.push(email.emailAddr);
    });
    $.each(selectedEmail, function( i, email ){
        if (i < selectedEmail.length - 1 ) {
            $('#emailTo').val(email + ";");
        } else {
            $('#emailTo').val($('#emailTo').val() + email);
        }
    });
});
$(".sidebar-buttons").on('click',"#clrall", function() {
    $('.stdName').prop('checked',false);
    selectedEmail = [];
    $('#emailTo').val(selectedEmail);
});

$(".sidebar-buttons").on('click', '#ckin', function() {
    selectedEmail = [];
    $('#emailTo').val("");
    $('.stdName').prop('checked',false);

    emailArray.forEach(function(email) {
        if (email.checkedin) {
            $.each($('.stdName'), function(i){
                if(emailArray.indexOf(email) == i) {
                    $('.stdName').eq(i).prop('checked',true);
                }
            });
            selectedEmail.push(email.emailAddr);
        }
    });
    $.each(selectedEmail, function( i, email ){
        if (i < selectedEmail.length - 1 ) {
            $('#emailTo').val(email + ";");
        } else {
            $('#emailTo').val($('#emailTo').val() + email);
        }
    });
}); 

    // Variable to store your files
    var files;
    var attachments;
    var fileNum = 0;

    // Add events
    $('#file').on('change', prepareUpload);

    // Grab the files and set them to our variable
    function prepareUpload(event)
    {
        if($("#file").val() != ""){
            files = event.target.files;
            $("#upload").removeAttr("disabled");
        } else {
            $("#upload").attr("disabled",true);
        }
    }

    $("#upload").click(function(event) {

        $("#spinner").show();
        $("#upload").attr("disabled",true);

        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        var formData = new FormData();


        $.each(files, function(key, value)
        {
            formData.append("file", value);
            console.log(value.name);

            $.ajax({
                type: "POST",
                url: rootURL+"/uploadFile",
                data: formData,
                dataType: "json", // data type of response
                //Tell jQuery not to process data or worry about content-type
                //You must include these options
                cache: false,
                contentType: false,
                processData: false,

                success: function(data, textStatus, jqXHR)
                {
                    success_jsonpCallback(data);
                    // Success so call function to process the form
                    //submitForm(event, data);
                    if (fileNum == 0) {
                        attachments = data.filename;
                        fileNum++;
                    } else {
                        attachments = attachments + ";" + data.filename;
                        fileNum++;
                    }
                    console.log(fileNum + " attachments: " + attachments);
                    $("#list-files").append("<tr><td>"+value.name+"</td></tr>");
                    // STOP LOADING SPINNER
                    $("#spinner").hide();
                    $("#upload").removeAttr("disabled");

                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Handle errors here
                    error_jsonpCallback(event);
                    // STOP LOADING SPINNER
                    $("#spinner").hide();
                    $("#upload").removeAttr("disabled");
                }
            });

        });

    });



    $("#sendEmail").click(function(event) {

        // stop the regular form submission
        event.preventDefault();

        if (isValidEmailAddress($('#ccTo').val()) && isValidEmailAddress($('#bccTo').val())) {

            $.post( "http://frank.mzalive.org/service/icu-service/webapi/mail/sendMail",
                {   FROM: $('#emailFrom').val(),
                    TO_LIST: $('#emailTo').val(),
                    CC_LIST: $('#ccTo').val(),
                    BCC_LIST: $('#bccTo').val(),
                    SUBJECT: $('#subject').val(),
                    CONTENT: $('#editor').html(),
                    ATTACHMENT_LIST: attachments
                }) .done(function(data, textStatus, jqXHR) {
                success_jsonpCallback(data);
                var obj = jQuery.parseJSON(data);
                if(obj.response == "success") {
                    emptyForm();
                    alert("Send successfully");
                } else {
                    alert("Error: " + obj.errorMessage);
                }

            })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    error_jsonpCallback(event);
                })
        }

    });

    function emptyForm() {
        emptyAll();
        $("#email").load("embedEmail.html", function (response, status, xhr) {

            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                console.log(msg + xhr.status + " " + xhr.statusText);
            } else {
                slcRecipients();
            }
        });

    }

    $("#ccTo").blur(function(){
        if(!isValidEmailAddress($(this).val())) {
            $("#errorCC").show();
        } else {
            $("#errorCC").hide();
        }
    });
    $("#bccTo").blur(function(){
        if(!isValidEmailAddress($(this).val())) {
            $("#errorBCC").show();
        } else {
            $("#errorBCC").hide();
        }
    });

    function isValidEmailAddress(inputValue) {
        var isValid = true;
        if (inputValue == "") {
            return isValid;
        }
        var email = inputValue.split(";");

        var pattern = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i;
        $.each(email, function(i){
            if (!pattern.test(email[i])) {
                isValid = false;
            }
        });
        return isValid;
    }

    function success_jsonpCallback(d) {
        console.log("success");
        console.log(d);
    }

    function error_jsonpCallback(e) {
        console.log("error");
        console.log(e);
    }

    function emptyTemListEmail () {
        $('#email-template-list').empty();
    }

    function renderTemListEmail(uid, loc) {
        getAllTemplatesEmail(uid, loc, encapTem, addTemsToBar, selCheckBox, 0, emptyTemListEmail);
    }
    
    $('#attachTemplateModal').on('show.bs.modal', function () {
        
        renderTemListEmail(1, "#email-template-list");
    });

    $("#confirm-template").click(function(){
        $("#attachTemplateModal").modal("hide");
        $("#email-template-list input").each(function(index, inputEle) {
            if(inputEle.checked) {
                $("#template-id").text(tem_list[index].name);
                console.log("template select");
            }
        });

    });
});


