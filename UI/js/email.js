//DOM
var stdName ="<div class='checkbox'><label><input class = 'stdName' type='checkbox' name='' value='%value%'>%data%</label></div>";

var btnSlcChkIn = "<button type='button' id='ckin' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnSlcAll = "<button type='button' id='slcall' class='btn btn-primary btn-block'>Select All</button>"
var btnClrAll = "<button type='button' id='clrall' class='btn btn-primary btn-block'>Clear All</button>"

var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";

var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var btnBck = "<button id='bck' type='button' class='btn btn-default'>❮ Back</button>";

var selectedEmail = [];

var emailArray = [
    {'name': 'Sankar', 'emailAddr': '1073653692@qq.com', 'checkedin': true},
    {'name': 'Ruoyi Wang', 'emailAddr': 'ruoyiw@student.unimelb.edu.au', 'checkedin': false}];

function displayStdName() {
    selectedEmail = [];
    emailArray.forEach(function(email) {
        var formattedName =  stdName.replace("%data%", email.name);
        var formattedFinal = formattedName.replace("%value%", email.emailAddr);
        $(".side-form-content").append(formattedFinal);
    });
}

function slcRecipients() {
    displayStdName();
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $(".footer-buttons-right").append(btnSave,btnSend);
    $(".footer-buttons-left").append(btnBck);
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

$("#slcall").click( function() {
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
$("#clrall").click( function() {
    $('.stdName').prop('checked',false);
    selectedEmail = [];
    $('#emailTo').val(selectedEmail);
});

$("#ckin").click( function() {
    selectedEmail = [];
    $('#emailTo').val("");
    $('.stdName').prop('checked',false);

    emailArray.forEach(function(email) {
        if (email.checkedin) {
            $.each($('.stdName'), function(i){
                if(emailArray.indexOf(email) == i) {
                    $(this).prop('checked',true);
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
        files = event.target.files;
    }

    $("#upload").click(function(event) {

        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        var formData = new FormData();

        $.each(files, function(key, value)
        {
            formData.append("file", value);

        });

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
                console.log(attachments);
                alert(fileNum + " attachments: " + attachments)

            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                error_jsonpCallback(event);
                // STOP LOADING SPINNER
            }
        });
    });



    $("#sendEmail").click(function(event) {

        // stop the regular form submission
        event.preventDefault();

        $.post( "http://frank.mzalive.org/service/icu-service/webapi/mail/sendMail",
        { FROM: $('#emailFrom').val(),
          TO_LIST: $('#emailTo').val(),
          CC_LIST: $('#ccTo').val(),
          BCC_LIST: $('#bccTo').val(),
          SUBJECT: $('#subject').val(),
          CONTENT: $('#editor').html(),
          ATTACHMENT_LIST: attachments
        }) .done(function(data, textStatus, jqXHR) {
            success_jsonpCallback(data);
            console.log($('#emailTo').val());
            console.log($('#ccTo').val());
            $("#emailForm").trigger("reset");
            $("#editor").empty();
            alert("Send successfully");
        })
            .fail(function(jqXHR, textStatus, errorThrown) {
            error_jsonpCallback(event);
        })
    });

    function success_jsonpCallback(d) {
        console.log("success");
        console.log(d);
    }

    function error_jsonpCallback(e) {
        console.log("error");
        console.log(e);
    }

});







//check if there is a checked checkbox
// $(".side-form-content").on('click', 'input', function() {
//     if(this.checked) {
//         $("#next").removeClass("disabled");
//     } else {
//         var ck = false;
//         $(".side-form-content input").each(function() {
//             if(this.checked) {
//                 ck = true;
//             }
//         })
//         if(ck) {
//             $("#next").removeClass("disabled");
//         } else {
//             $("#next").addClass("disabled");
//         }
//     }
// });













