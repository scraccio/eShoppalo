function checkExistingUserRegister(){
    if(document.getElementsByClassName('login-error').length > 0){
        document.getElementsByClassName('login-error')[0].remove();
    }
    $.ajax({
        method: 'GET',
        url: '/api/calls/checkuser/' + document.getElementsByClassName('register-email')[0].value,
        success: function(data){
            if(data == 'true'){
                var errorMessage = document.createElement('div');
                errorMessage.className = 'login-error';
                errorMessage.textContent = 'L\'email inserita è già associata ad un account';
                $(errorMessage).insertAfter(document.getElementsByClassName('third-row')[0]);
                return;
            }
            else{
                var pw = SHA1(document.getElementsByClassName('register-password')[0].value);
                $.ajax({
                    method: 'POST',
                    url: '/api/calls/registration',
                    data: {
                        firstName: document.getElementsByClassName('register-name')[0].value,
                        lastName: document.getElementsByClassName('register-surname')[0].value,
                        email: document.getElementsByClassName('register-email')[0].value,
                        password: pw
                    },
                    success: function(data){
                        if(data == 'ok'){
                            window.location.href = '/';
                        }
                    }
                });
            }
        }
    });
}

document.getElementsByClassName('submit-button')[0].onclick = ()=>{
    console.log(document.getElementsByClassName('register-surname')[0].value);
    if(document.getElementsByClassName('login-error').length > 0){
        document.getElementsByClassName('login-error')[0].remove();
    }

    if(document.getElementsByClassName('register-name')[0].value == undefined ||
       document.getElementsByClassName('register-surname')[0].value == undefined ||
       document.getElementsByClassName('register-email')[0].value == undefined ||
       document.getElementsByClassName('register-password')[0].value == undefined)
    {
        var errorMessage = document.createElement('div');
        errorMessage.className = 'login-error';
        errorMessage.textContent = 'Compila tutti i campi';
        $(errorMessage).insertAfter(document.getElementsByClassName('third-row')[0]);
        return;
    }

    var email = document.querySelector('.second-row > input');
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value.length > 0 && re.test(email.value)){
        console.log(email.value + ' email valida');
    }
    else{
        var errorMessage = document.createElement('div');
        errorMessage.className = 'login-error';
        errorMessage.textContent = 'Formato e-mail invalido';
        $(errorMessage).insertAfter(document.getElementsByClassName('third-row')[0]);
        return;
    }

    checkExistingUserRegister();
};
