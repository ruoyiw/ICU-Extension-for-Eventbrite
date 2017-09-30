var subNewEmail = "<li><a href='#'>New Email »</a></li>";
var btnSave = "<button id='sendSave' type='submit' class='btn btn-success' name='submit'>Save </button>";
var btnSend = "<button id='sendEmail' type='submit' class='btn btn-success' name='submit'>Send </button>";
var emailArray = [
    {'name': 'Sankar', 'emailAddr': '1073653692@qq.com', 'checkedin': true},
    {'name': 'Ruoyi Wang', 'emailAddr': 'ruoyiw@student.unimelb.edu.au', 'checkedin': false}];


var selectedEmail = [];

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

}

function newEmail() {
    $("#email").load("embedEmail.html");
}

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

















