function checkExistingUser(){
    if(document.getElementsByClassName('login-error').length > 0){
        document.getElementsByClassName('login-error')[0].remove();
    }
    $.ajax({
        method: 'GET',
        url: '/api/calls/checkuser/' + document.getElementsByClassName('login-email')[0].value,
        success: function(data){
            if(data != 'false'){
                checkPassword(document.getElementsByClassName('login-email')[0].value);
            }
            else{
                var errorMessage = document.createElement('div');
                errorMessage.className = 'login-error';
                errorMessage.textContent = 'L\'e-mail inserita non è associata ad un account';

                $(errorMessage).insertAfter(document.getElementsByClassName('login-login-button'));
            }
        }
    });
}

function checkPassword(email){
    $.ajax({
        method: 'POST',
        url: '/api/calls/checkpassword',
        data: {
            email: email,
            password: document.getElementsByClassName('login-password')[0].value
        },
        success: function(data){
            if(data != 'Utente non trovato'){
                localStorage.setItem('logged', JSON.stringify(data));

                document.querySelector('.login-login-button').classList.add('red-to-green');
                document.querySelector('.login-login-text').onanimationend = ()=>{
                    document.querySelector('.login-login-text').innerHTML = "<i class='bx bxs-check-circle'></i>";
                    document.querySelector('.login-login-text').classList.remove('dim-out');
                    document.querySelector('.login-login-text').classList.add('dim-in');
                    document.querySelector('.login-login-text').classList.add('scale-little');
                }
                document.querySelector('.login-login-text').classList.add('dim-out');
                setTimeout(()=>{location.reload();}, 1000);
            }
            else{
                var errorMessage = document.createElement('div');
                errorMessage.className = 'login-error';
                errorMessage.textContent = 'Password errata';

                $(errorMessage).insertAfter(document.getElementsByClassName('login-login-button'));
            }
        }
    });
}

function fillLogin(){
    var dimmedDiv = document.createElement('div');
    dimmedDiv.className = 'dim dim-in';

    var loginDiv = document.createElement('div');
    loginDiv.className = 'login-div';

    loginDiv.onclick = (e)=>{
        e.stopPropagation();
    }

    var loginHeader = document.createElement('div');
    loginHeader.className = 'login-header';

    var loginTitle = document.createElement('div');
    loginTitle.className = 'login-title';
    loginTitle.textContent = 'Accedi su eShoppalo';

    var closeButton = document.createElement('div');
    closeButton.className = 'login-close';
    closeButton.onclick = ()=>{
        document.getElementsByClassName('dim')[0].classList.remove('dim-in');
        document.getElementsByClassName('dim')[0].classList.add('dim-out');
        document.getElementsByClassName('dim dim-out')[0].onanimationend = ()=>{
            document.getElementsByClassName('dim dim-out')[0].remove();
            document.body.style.overflow = 'visible';
        }
    };
    
    var closeCross = document.createElement('div');
    closeCross.className = 'close-cross';
    closeCross.textContent = '\u2715';
    
    closeButton.appendChild(closeCross);
    loginHeader.appendChild(loginTitle);
    loginHeader.appendChild(closeButton);

    var loginMain = document.createElement('div');
    loginMain.className = 'login-main';

    var email = document.createElement('input');
    email.className = 'login-email';
    email.placeholder = 'E-mail';
    var password = document.createElement('input');
    password.type = 'password';
    password.className = 'login-password';
    password.placeholder = 'Password';
    password.onkeyup = ()=>{
        const key = event.key;
        if (key === "Enter") {
            if(document.getElementsByClassName('login-email')[0].value.length > 0 && document.getElementsByClassName('login-password')[0].value.length > 0){
                checkExistingUser();
            }
        }
    }
    var login = document.createElement('div');
    login.className = 'login-login-button';

    login.onclick = ()=>{
        if(document.getElementsByClassName('login-email')[0].value.length > 0 && document.getElementsByClassName('login-password')[0].value.length > 0){
            checkExistingUser();
        }
    };

    var loginText = document.createElement('div');
    loginText.className = 'login-login-text';
    loginText.textContent = 'Accedi';

    login.appendChild(loginText);
    loginMain.appendChild(email);
    loginMain.appendChild(password);
    loginMain.appendChild(login);

    var loginFooter = document.createElement('div');
    loginFooter.className = 'login-footer';

    var footerRegister = document.createElement('div');
    footerRegister.className = 'login-footer-text';
    footerRegister.textContent = 'Non hai un account? Clicca qui per registrarti';
    footerRegister.onclick = ()=>{
        window.location.href = '/registrazione';
    };

    loginFooter.appendChild(footerRegister);
    loginDiv.appendChild(loginHeader);
    loginDiv.appendChild(loginMain);
    loginDiv.appendChild(loginFooter);
    dimmedDiv.appendChild(loginDiv);
    document.body.appendChild(dimmedDiv);

    document.body.style.overflow = 'hidden';
}

for(let i=0; i<document.getElementsByClassName('home-button').length; i++){
    document.getElementsByClassName('home-button')[i].onclick = ()=>{
        window.location.href = '/';
    };
}

for(let i=0; i<document.getElementsByClassName('catalogue-button').length; i++){
    document.getElementsByClassName('catalogue-button')[i].onclick = ()=>{
        window.location.href = '/catalogo';
    };
}

for(let i=0; i<document.getElementsByClassName('to-catalogue-button').length; i++){
    document.getElementsByClassName('to-catalogue-button')[i].onclick = ()=>{
        window.location.href = '/catalogo';
    };
}

for(let i=0; i<document.getElementsByClassName('login-button').length; i++){
    document.getElementsByClassName('login-button')[i].onclick = (e)=>{
        e.stopPropagation();
        if(document.getElementsByClassName('login-div').length == 0){
            fillLogin();
        }
    };
}

if(document.getElementById('login-button')){
    document.getElementById('login-button').onclick = (e)=>{
        e.stopPropagation();
        if(document.getElementsByClassName('login-div').length == 0){
            fillLogin();
        }
    };
}

if(document.getElementsByClassName('insert-button').length != 0){
    document.getElementsByClassName('insert-button')[0].onclick = (e)=>{
        e.stopPropagation();

        if(JSON.parse(localStorage.getItem('logged')) == null && document.getElementsByClassName('login-div').length == 0){
            fillLogin();
        }
        else{
            window.location.href = '/inserisci-annuncio';
        }
    };
}

if(document.getElementsByClassName('insert-post-button').length != 0){
    document.getElementsByClassName('insert-post-button')[0].onclick = (e)=>{
        e.stopPropagation();

        if(JSON.parse(localStorage.getItem('logged')) == null && document.getElementsByClassName('login-div').length == 0){
            fillLogin();
        }
        else{
            window.location.href = '/inserisci-annuncio';
        }
    };
}

if(document.getElementsByClassName('footer-insert-post').length != 0){
    document.getElementsByClassName('footer-insert-post')[0].onclick = (e)=>{
        e.stopPropagation();

        if(JSON.parse(localStorage.getItem('logged')) == null && document.getElementsByClassName('login-div').length == 0){
            fillLogin();
        }
        else{
            window.location.href = '/inserisci-annuncio';
        }
    };
}