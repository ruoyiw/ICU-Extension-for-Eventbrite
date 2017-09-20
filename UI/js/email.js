var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var emailNum = 0;



function slcRecipients() {
    $(".sub-nav-left").append(subHome, subNewEmail);
    $(".side-form-content").empty();
    $(".side-form-content").append(stdName1,stdName2);
    $(".side-form-content").after(sdbraction);
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $("#next").remove();
    $(".footer-buttons-right").append(btnSave,btnSend);
    $(".footer-buttons-left").append(btnBck);
}

function newEmail() {
    $(".main-content").load("embedEmail.html");
    $(".main-content").append(subHome, subNewEmail);

}

$("#name1").click( function() {
    if($('#name1').is(':checked') && emailNum == 0) {
        $('#emailTo').val(emailAddr1);
        emailNum++;
    } else if ($('#name1').is(':checked') && emailNum > 0) {
        $('#emailTo').val($('#emailTo').val() + ";" + emailAddr1);
        emailNum++;
    } else {
        $('#emailTo').val("");
        emailNum--;
    }
});

$("#name2").click( function() {
    if($('#name2').is(':checked') && emailNum == 0) {
        $('#emailTo').val(emailAddr2);
        emailNum++;
    } else if ($('#name2').is(':checked') && emailNum > 0) {
        $('#emailTo').val($('#emailTo').val() + ";" + emailAddr2);
        emailNum++;
    } else {
        $('#emailTo').val("");
        emailNum--;
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













