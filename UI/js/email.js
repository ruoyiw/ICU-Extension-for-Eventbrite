var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var emailNum = 0;
var emailArray = new Array();


function slcRecipients() {
    $(".side-form-content").append(stdName1,stdName2);
    $(".sidebar-action").show();
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $(".footer-buttons-right").append(btnSave,btnSend);
    $(".footer-buttons-left").append(btnBck);
}

function newEmail() {
    $(".main-content").load("embedEmail.html");
    $(".main-content").append(subHome, subNewEmail);
}

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













