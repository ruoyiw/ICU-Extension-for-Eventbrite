//DOM
var stdName1 ="<div class='checkbox'><label><input id='name1' type='checkbox' name='' value=''>Sankar Narayanan</label></div>"
var emailAddr1 = "1073653692@qq.com"
var stdName2 ="<div class='checkbox'><label><input id='name2' type='checkbox' name='' value=''>Ruoyi Wang</label></div>"
var emailAddr2 = "zhijinl@student.unimelb.edu.au"

var btnSlcChkIn = "<button type='button' id='ckin' class='btn btn-primary btn-block'>Select Checked-in</button>"
var btnSlcAll = "<button type='button' id='slcall' class='btn btn-primary btn-block'>Select All</button>"
var btnClrAll = "<button type='button' id='clrall' class='btn btn-primary btn-block'>Clear All</button>"

var btnNext = "<button id='next' type='button' class='btn btn-success'>Next ❯</button>";
var btnCancel = "<button id='cancle' type='button' class='btn btn-default'>Cancel ❯</button>";

var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var emailNum = 0;
var emailArray = new Array(); 

function slcRecipients() {
    $(".side-form-content").append(stdName1,stdName2);
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $(".footer-buttons-right").append(btnSave,btnSend);
    $(".footer-buttons-left").append(btnBck);
    console.log("render students names")
}

$(function() {  
    // function newEmail() {
    //     $("#email").load("embedEmail.html");
    // }

    $("#name1").click( function() {
        if($('#name1').is(':checked') && emailArray.length == 0) {
            emailArray.push(emailAddr1);
            $('#emailTo').val(emailArray);
        } else if ($('#name1').is(':checked') && emailArray.length > 0) {
            emailArray.push(emailAddr1);
            $.each(emailArray, function( i, email ){
                if (i < emailArray.length - 1 ) {
                    $('#emailTo').val(email + ";");
                } else {
                    $('#emailTo').val($('#emailTo').val() + email);
                }
            });
        } else {
            emailArray.splice($.inArray(emailAddr1, emailArray), 1);
            $('#emailTo').val(emailArray);
        }
    });

    $("#name2").click( function() {
        if($('#name2').is(':checked') && emailArray.length == 0) {
            emailArray.push(emailAddr2);
            $('#emailTo').val(emailArray);
        } else if ($('#name2').is(':checked') && emailArray.length > 0) {
            emailArray.push(emailAddr2);
            $.each(emailArray, function( i, email ){
                if (i < emailArray.length - 1 ) {
                    $('#emailTo').val(email + ";");
                } else {
                    $('#emailTo').val($('#emailTo').val() + email);
                }
            });
        } else {
            emailArray.splice($.inArray(emailAddr2, emailArray), 1);
            $('#emailTo').val(emailArray);
        }
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













