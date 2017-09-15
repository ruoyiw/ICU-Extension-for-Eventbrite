var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='save' type='button' class='btn btn-success'>Save</button>";
var btnSend = "<button id='send' type='button' class='btn btn-success'>Send</button>";



function slcRecipients() {
    $(".sub-nav-left").append(subHome, subNewEmail);
    $(".side-form-content").empty();
    $(".side-form-content").append(stdName1,stdName2);
    $(".side-form-content").after(sdbraction);
    $(".sidebar-buttons").append(btnSlcChkIn, btnSlcAll, btnClrAll);
    $("#next").remove();
    $(".footer-buttons-right").append(btnSave, btnSend);
    $(".footer-buttons-left").append(btnBck);
}

function newEmail() {
    $(".main-content").load("embedEmail.html");
    $(".main-content").append(subHome, subNewEmail);

}




