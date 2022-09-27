breakme: if(JSON.parse(localStorage.getItem('logged')) == null){

    if(document.querySelector('.main') || document.querySelector('.account-main')){
        if(document.querySelector('.main')){
            document.querySelector('.main').onanimationend = ()=>{
                document.querySelector('.main').remove();
            }
            document.querySelector('.main').classList.add('dim-out');

            document.querySelector('.steps').onanimationend = ()=>{
                document.querySelector('.steps').remove();
            }
            document.querySelector('.steps').classList.add('dim-out');
        }
        else if(document.querySelector('.account-main')){
            document.querySelector('.account-main').onanimationend = ()=>{
                document.querySelector('.account-main').remove();
                document.querySelector('.footer').remove();
            }
            document.querySelector('.account-main').classList.add('dim-out');
        }
    }
    else{
        sunf = 1;
        break breakme
    }
    var alertShadow = document.createElement('div');
    alertShadow.className = 'alert-shadow';
    document.body.appendChild(alertShadow);

    var alertDiv = document.createElement('div');
    alertDiv.className = 'alert-div';
    alertShadow.appendChild(alertDiv);

    var alertTitle = document.createElement('div');
    alertTitle.className = 'alert-title';
    alertTitle.textContent = 'Login richiesto';
    alertDiv.appendChild(alertTitle);

    var alertMessage = document.createElement('div');
    alertMessage.className = 'alert-message';
    alertMessage.textContent = 'Devi aver effettuato l\'accesso per accedere alla pagina.';
    alertDiv.appendChild(alertMessage);

    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons-div';
    alertDiv.appendChild(buttonsDiv);

    var buttonHome = document.createElement('div');
    buttonHome.className = 'button-home';
    buttonHome.onclick = ()=>{
        window.location.href = '/';
    }
    buttonsDiv.appendChild(buttonHome);

    var buttonHomeText = document.createElement('div');
    buttonHomeText.className = 'button-home-text';
    buttonHomeText.textContent = 'Torna alla home';
    buttonHome.appendChild(buttonHomeText);

    var buttonLogin = document.createElement('div');
    buttonLogin.className = 'button-login';
    buttonLogin.onclick = ()=>{
        fillLogin();
    }
    buttonsDiv.appendChild(buttonLogin);

    var buttonLoginText = document.createElement('div');
    buttonLoginText.className = 'button-login-text';
    buttonLoginText.textContent = 'Login';
    buttonLogin.appendChild(buttonLoginText);
}
