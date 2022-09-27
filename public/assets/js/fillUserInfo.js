if(JSON.parse(localStorage.getItem('logged')) != null){
    var userObj = JSON.parse(localStorage.getItem('logged'));
    var currentPage = 'info';

    document.querySelector('.panel-general').onclick = ()=>{
        document.querySelector('.user-general-tab').onanimationend = ()=>{
            document.querySelector('.user-general-tab').classList.remove('dim-out');
            document.querySelector('.user-general-tab').onanimationend = ()=>{
                document.querySelector('.user-general-tab').classList.remove('dim-in');
            }
            document.querySelector('.user-general-tab').classList.add('dim-in');
            toInfo();
        }
        document.querySelector('.user-general-tab').classList.add('dim-out');
    }
    document.querySelector('.panel-posts').onclick = ()=>{
        document.querySelector('.user-general-tab').onanimationend = ()=>{
            document.querySelector('.user-general-tab').classList.remove('dim-out');
            document.querySelector('.user-general-tab').onanimationend = ()=>{
                document.querySelector('.user-general-tab').classList.remove('dim-in');
            }
            document.querySelector('.user-general-tab').classList.add('dim-in');
            toPosts();
        }
        document.querySelector('.user-general-tab').classList.add('dim-out');
    }
    document.querySelector('.panel-logout').onclick = ()=>{
        localStorage.removeItem('logged');
        window.location.href = '/';
    }

    toInfo();
}

function applyInfoBehavior(){
    document.querySelector('.save-changes-button').onclick = ()=>{

        if((document.querySelector('.user-first-name > input').value != JSON.parse(localStorage.getItem('logged')).firstName) && (document.querySelector('.user-first-name > input').value.length > 0)
        || (document.querySelector('.user-last-name > input').value != JSON.parse(localStorage.getItem('logged')).lastName) && (document.querySelector('.user-last-name > input').value.length > 0)
        || (document.querySelector('.user-email > input').value != JSON.parse(localStorage.getItem('logged')).email) && (document.querySelector('.user-email > input').value.length > 0)){

            $.ajax({
                method: 'POST',
                url: '/api/calls/updateuser/' + userObj.email,
                data: {
                    firstName: document.querySelector('.user-first-name > input').value,
                    lastName: document.querySelector('.user-last-name > input').value,
                    email: document.querySelector('.user-email > input').value
                },
                success: function(data){
                    if(data == 'ok'){
                        var usr = JSON.parse(localStorage.getItem('logged'));
                        usr.firstName = document.querySelector('.user-first-name > input').value;
                        localStorage.setItem('logged', JSON.stringify(usr));

                        spawnOkDiv();
                    }
                }
            });
        }
        else{
            spawnNotOkDiv();
        }
    }

    document.querySelector('.save-password-button').onclick = ()=>{

        if(document.querySelector('.user-password > input').value.length > 0
        && document.querySelector('.user-new-password > input').value.length > 0
        && SHA1(document.querySelector('.user-password > input').value) == userObj.password){
            $.ajax({
                method: 'POST',
                url: '/api/calls/updateuserpassword/' + userObj.email,
                data: {
                    newPassword: document.querySelector('.user-new-password > input').value
                },
                success: function(data){
                    if(data == 'ok'){
                        var usr = JSON.parse(localStorage.getItem('logged'));
                        usr.password = SHA1(document.querySelector('.user-new-password > input').value);
                        localStorage.setItem('logged', JSON.stringify(usr));

                        spawnOkDiv();
                    }
                }
            });

        }
        else{
            spawnNotOkDiv();
        }
    }
}

function toPosts(){
    document.querySelector('.user-general-tab').innerHTML = `
    <div class="posts-title">I tuoi annunci</div>
    <div class="posts-container">
        <div class="post-categories">
            <div class="category-void"></div>
            <div class="category-title">Titolo</div>
            <div class="category-price">Prezzo</div>
            <div class="category-condition">Condizioni</div>
            <div class="category-special">Edizione speciale</div>
            <div class="category-city">Città</div>
            <div class="category-date">Data</div>
            <div class="category-void1"></div>
        </div>
    </div>
    `;

    document.querySelector('.user-general-tab').style.overflowY = 'scroll';
    document.querySelector('.user-general-tab').style.height = 'calc(100% - 100px);';
    document.querySelector('.user-general-tab').style.justifyContent = 'flex-start';

    document.querySelector('.panel-general').classList.remove('active');
    document.querySelector('.panel-general').classList.add('inactive');

    document.querySelector('.panel-posts').classList.remove('inactive');
    document.querySelector('.panel-posts').classList.add('active');

    $.ajax({
        method: 'GET',
        url: '/api/calls/searchuserposts/' + userObj._id,
        success: function(data){
            console.log(data);
            if(data[0].length == 0){
                document.querySelector('.posts-title').textContent = 'Non hai ancora pubblicato annunci.';
            }
            else{

                for(let i=0; i<data[0].length; i++){
                    var post = document.createElement('div');
                    post.className = 'post';
                    document.querySelector('.posts-container').appendChild(post);

                    var postGameImageDiv = document.createElement('div');
                    postGameImageDiv.className = 'post-image-div';
                    post.appendChild(postGameImageDiv);

                    var postGameImage = document.createElement('img');
                    postGameImage.className = 'post-image';
                    postGameImage.src = data[1][i].image_url_h2x1_s;
                    postGameImageDiv.appendChild(postGameImage);

                    var postGameTitle = document.createElement('div');
                    postGameTitle.className = 'post-game-title';
                    postGameTitle.textContent = data[1][i].title;
                    post.appendChild(postGameTitle);

                    var postGamePrice = document.createElement('div');
                    postGamePrice.className = 'post-game-price';
                    postGamePrice.textContent = data[0][i].price + '€';
                    post.appendChild(postGamePrice);

                    var postGameConditions = document.createElement('div');
                    postGameConditions.className = 'post-game-conditions';
                    postGameConditions.textContent = data[0][i].condition;
                    post.appendChild(postGameConditions);

                    var postGameSpecial = document.createElement('div');
                    postGameSpecial.className = 'post-game-special';
                    postGameSpecial.textContent = data[0][i].special=="true"?'Sì':'No';
                    post.appendChild(postGameSpecial);

                    var postCity = document.createElement('div');
                    postCity.className = 'post-city';
                    postCity.textContent = data[0][i].city;
                    post.appendChild(postCity);

                    var postDate = document.createElement('div');
                    postDate.className = 'post-date';
                    postDate.textContent = data[0][i].date;
                    post.appendChild(postDate);

                    var postContactDiv = document.createElement('div');
                    postContactDiv.className = 'post-contact-div';
                    post.appendChild(postContactDiv);

                    var postContact = document.createElement('div');
                    postContact.className = 'post-contact';
                    postContact.textContent = 'Rimuovi annuncio';
                    postContact.onclick = ()=>{
                        $.ajax({
                            method: 'GET',
                            url: '/api/calls/removepost/' + data[0][i]._id,
                            success: function(data){
                                if(data == 'ok'){
                                    window.location.reload();
                                }
                            }
                        });
                    }
                    postContactDiv.appendChild(postContact);
                }
            }
        }
    });
}

function toInfo(){

    document.querySelector('.user-general-tab').innerHTML = `
    <div class="user-full-name">Simone Costanzo</div>
    <div class="user-row1">
        <div class="user-first-name">
            <div class="input-text-div">
                <div class="input-text">Nome:</div>
            </div>
            <input type="text">
        </div>
        <div class="user-last-name">
            <div class="input-text-div">
                <div class="input-text">Cognome:</div>
            </div>
            <input type="text">
        </div>
    </div>
    <div class="user-row2">
        <div class="user-email">
            <div class="input-text-div">
                <div class="input-text">E-mail:</div>
            </div>
            <input type="text">
        </div>
    </div>
    <div class="save-changes-button">
        <div class="save-changes-text">Salva le modifiche</div>
    </div>
    <div class="user-row3">
        <div class="user-password">
            <div class="input-text-div">
                <div class="input-text">Password attuale:</div>
            </div>
            <input type="password">
        </div>
        <div class="user-new-password">
            <div class="input-text-div">
                <div class="input-text">Nuova password:</div>
            </div>
            <input type="password">
        </div>
    </div>
    <div class="save-password-button">
        <div class="save-password-text">Aggiorna password</div>
    </div>
    `;

    document.querySelector('.user-general-tab').style.overflowY = 'none';
    document.querySelector('.user-general-tab').style.height = '100%';
    document.querySelector('.user-general-tab').style.justifyContent = 'center';

    document.querySelector('.user-first-name > input').value = JSON.parse(localStorage.getItem('logged')).firstName;
    document.querySelector('.user-last-name > input').value = JSON.parse(localStorage.getItem('logged')).lastName;
    document.querySelector('.user-email > input').value = JSON.parse(localStorage.getItem('logged')).email;

    
    if(document.querySelector('.panel-posts').classList.contains('active')){
        document.querySelector('.panel-posts').classList.remove('active');
        document.querySelector('.panel-posts').classList.add('inactive');

        document.querySelector('.panel-general').classList.remove('inactive');
        document.querySelector('.panel-general').classList.add('active');
    }

    applyInfoBehavior();
}

function spawnOkDiv(){
    var updatedDiv = document.createElement('div');
    updatedDiv.className = 'updated-div';
    updatedDiv.innerHTML = '<i class=\'bx bxs-check-circle\'></i>';
    document.querySelector('.user-general-tab').appendChild(updatedDiv);

    var updatedText = document.createElement('div');
    updatedText.className = 'updated-text';
    updatedText.textContent = 'Utente modificato';
    updatedDiv.appendChild(updatedText);

    updatedDiv.onanimationend = ()=>{
        setTimeout(()=>{
            updatedDiv.classList.remove('slide-from-bottom');
            updatedDiv.onanimationend = ()=>{
                updatedDiv.remove();
            }
            updatedDiv.classList.add('dim-out-slower');
        }, 1500);
    }
    updatedDiv.classList.add('slide-from-bottom');
}

function spawnNotOkDiv(){
    var notUpdatedDiv = document.createElement('div');
    notUpdatedDiv.className = 'not-updated-div slide-from-bottom';
    notUpdatedDiv.innerHTML = '<i class=\'bx bxs-x-circle\'></i>';
    document.querySelector('.user-general-tab').appendChild(notUpdatedDiv);

    var notUpdatedText = document.createElement('div');
    notUpdatedText.className = 'not-updated-text';
    notUpdatedText.textContent = 'Utente non modificato';
    notUpdatedDiv.appendChild(notUpdatedText);

    notUpdatedDiv.onanimationend = ()=>{
        setTimeout(()=>{
            notUpdatedDiv.classList.remove('slide-from-bottom');
            notUpdatedDiv.onanimationend = ()=>{
                notUpdatedDiv.remove();
            }
            notUpdatedDiv.classList.add('dim-out-slower');
        }, 1500);
    }
    notUpdatedDiv.classList.add('slide-from-bottom');
}