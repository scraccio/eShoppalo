function sendMessage(message, sender, senderName, receiver, receiverName){
    $.ajax({
        method: 'POST',
        url: '/api/calls/sendmessage',
        data: {
            message: message,
            sender: sender,
            senderName: senderName,
            receiver: receiver,
            receiverName: receiverName
        },
        success: function(data){
            if(data != 'Stesso utente'){
                console.log(data);
                spawnMyMessage(message);
            }
            else{
                console.log(data);
            }
        }
    });
}

function toChat(chatUserName, chatObj){
    document.querySelector('.found-chats-div').onanimationend = ()=>{
        document.querySelector('.found-chats-div').remove();
        document.querySelector('.chat-header').remove();
        createChatHeader();
        document.querySelector('.chat-user-name').textContent = chatUserName;
        createChatContent();
        document.querySelector('.chat-write-button').onclick = ()=>{
            if(document.querySelector('.chat-write-box').value.length != 0){
                var message = document.querySelector('.chat-write-box').value;
                document.querySelector('.chat-write-box').value = '';
                sendMessage(message, user._id.toString(), user.firstName, chatObj.receiver, chatObj.receiverName);
                document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;
            }
        }
    }
    document.querySelector('.found-chats-div').classList.remove('dim-in-slower');
    document.querySelector('.found-chats-div').classList.add('dim-out');
}

function toChatMain(chatUserName, chatObj){
    document.querySelector('.chat-content-div').onanimationend = ()=>{
        document.querySelector('.chat-content-div').remove();
        document.querySelector('.chat-header').remove();
        createChatHeaderMain();
        getChats();
    }
    document.querySelector('.chat-content-div').classList.add('dim-out');
}

function spawnMyMessage(message){
    var myMessageRow = document.createElement('div');
    myMessageRow.className = 'my-message-row';
    document.querySelector('.chat-box').appendChild(myMessageRow);

    var myMessageDiv = document.createElement('div');
    myMessageDiv.className = 'my-message-div';
    myMessageRow.appendChild(myMessageDiv);

    var myMessageContent = document.createElement('div');
    myMessageContent.className = 'my-message-content';
    myMessageContent.textContent = message;
    myMessageDiv.appendChild(myMessageContent);
}

function spawnTheirMessage(message){
    var theirMessageRow = document.createElement('div');
    theirMessageRow.className = 'their-message-row';
    document.querySelector('.chat-box').appendChild(theirMessageRow);

    var theirMessageDiv = document.createElement('div');
    theirMessageDiv.className = 'their-message-div';
    theirMessageRow.appendChild(theirMessageDiv);

    var theirMessageContent = document.createElement('div');
    theirMessageContent.className = 'their-message-content';
    theirMessageContent.textContent = message;
    theirMessageDiv.appendChild(theirMessageContent);
}

function createChat(){

    var chatDiv = document.createElement('div');
    chatDiv.className = 'chat-div dim-in';
    chatDiv.onclick = (e)=>{
        e.stopPropagation();
    }
    document.body.appendChild(chatDiv);
}

function createChatHeaderMain(){

    var chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    document.querySelector('.chat-div').appendChild(chatHeader);

    var chatHeaderText = document.createElement('div');
    chatHeaderText.className = 'chat-header-main-text';
    chatHeaderText.textContent = 'Chat';
    chatHeader.appendChild(chatHeaderText);
}

function createChatHeader(){

    var chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    document.querySelector('.chat-div').appendChild(chatHeader);

    var chatHeaderDiv = document.createElement('div');
    chatHeaderDiv.className = 'chat-header-div';
    chatHeader.appendChild(chatHeaderDiv);

    var backButton = document.createElement('div');
    backButton.className = 'back-button';
    backButton.onclick = ()=>{
        toChatMain();
    };
    backButton.innerHTML = "<i class='bx bx-arrow-back'></i>";
    chatHeaderDiv.appendChild(backButton);

    var userChatDiv = document.createElement('div');
    userChatDiv.className = 'user-chat-div';
    chatHeaderDiv.appendChild(userChatDiv);

    var userName = document.createElement('div');
    userName.className = 'chat-user-name';
    userChatDiv.appendChild(userName);
}

function createChatContent(){

    var chatContentDiv = document.createElement('div');
    chatContentDiv.className = 'chat-content-div';
    document.querySelector('.chat-div').appendChild(chatContentDiv);

    var chatBox = document.createElement('div');
    chatBox.className = 'chat-box';
    chatContentDiv.appendChild(chatBox);

    var chatWrite = document.createElement('div');
    chatWrite.className = 'chat-write';
    chatContentDiv.appendChild(chatWrite);

    var chatWriteBox = document.createElement('textarea');
    chatWriteBox.className = 'chat-write-box';
    chatWriteBox.placeholder = 'Scrivi un messaggio...';
    chatWriteBox.type = 'text';
    chatWriteBox.cols = 40;
    chatWriteBox.rows = 4;

    $.ajax({
        method: 'GET',
        url: '/api/calls/getchats/' + JSON.parse(localStorage.getItem('logged')).email,
        success: function(data){
            if(data != 'Utente non trovato'){
                if(data.length == 0){
                    chatWriteBox.value = 'Ciao! Sono interessato al tuo annuncio di ' + game.title + ', ';
                }
                else{
                    console.log(data);
                    for(message of data){
                        if(message.sender == user._id.toString()){
                            spawnMyMessage(message.content);
                        }
                        else{
                            spawnTheirMessage(message.content);
                        }

                    }
                    document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;
                }
            }
        }
    });
    
    chatWrite.appendChild(chatWriteBox);

    var chatWriteButton = document.createElement('div');
    chatWriteButton.className = 'chat-write-button';
    chatWriteButton.innerHTML = "<i class='bx bx-send'></i>";
    chatWrite.appendChild(chatWriteButton);

}

function getChats(){
    var chatContentWait = document.createElement('div');
    chatContentWait.className = 'chat-content-wait';
    document.querySelector('.chat-div').appendChild(chatContentWait);

    var chatLoader = document.createElement('div');
    chatLoader.className = 'loader spinner chat-element';
    chatContentWait.appendChild(chatLoader);

    $.ajax({
        method: 'GET',
        url: '/api/calls/getchats/' + JSON.parse(localStorage.getItem('logged')).email,
        success: function(data){
            if(data != 'Utente non trovato'){
                if(data.length == 0){
                    console.log('Non ci sono chat');
                    var el = document.querySelector('.loader.spinner.chat-element');
                    el.onanimationend = ()=>{
                        document.querySelector('.chat-content-wait').remove();

                        var noChats = document.createElement('div');
                        noChats.className = 'no-chats dim-in-slower';
                        document.querySelector('.chat-div').appendChild(noChats);

                        var noChatsText = document.createElement('div');
                        noChatsText.className = 'no-chats-text';
                        noChatsText.innerHTML = 'Non ho trovato messaggi :(<br><br>Prova a contattare i venditori tramite gli annunci.';
                        noChats.appendChild(noChatsText);
                    }
                    setTimeout(()=>{
                        el.classList.remove('spinner');
                        el.classList.add('spinner-once');
                    }, 100);
                }
                else{
                    console.log('Ho trovato delle chat');
                    console.log(data);
                    var el = document.querySelector('.loader.spinner.chat-element');
                    el.onanimationend = ()=>{
                        document.querySelector('.chat-content-wait').remove();

                        var foundChatsDiv = document.createElement('div');
                        foundChatsDiv.className = 'found-chats-div dim-in-slower';
                        document.querySelector('.chat-div').appendChild(foundChatsDiv);

                        var uniqueIDS = [user._id.toString()];
                        for(chat of data){
                            if(!uniqueIDS.includes(chat.sender) || !uniqueIDS.includes(chat.receiver)){
                                if(!uniqueIDS.includes(chat.sender)){
                                    uniqueIDS.push(chat.sender);

                                    var foundChat = document.createElement('div');
                                    foundChat.className = 'found-chat';
                                    foundChat.onclick = ()=>{
                                        toChat(chat.senderName, chat);
                                    }
                                    foundChatsDiv.appendChild(foundChat);

                                    var foundChatName = document.createElement('div');
                                    foundChatName.className = 'found-chat-name';
                                    foundChatName.textContent = chat.senderName;
                                    foundChat.appendChild(foundChatName);
                                }
                                if(!uniqueIDS.includes(chat.receiver)){
                                    uniqueIDS.push(chat.receiver);

                                    var foundChat = document.createElement('div');
                                    foundChat.className = 'found-chat';
                                    foundChat.onclick = ()=>{
                                        toChat(chat.receiverName, chat);
                                    }
                                    foundChatsDiv.appendChild(foundChat);

                                    var foundChatName = document.createElement('div');
                                    foundChatName.className = 'found-chat-name';
                                    foundChatName.textContent = chat.receiverName;
                                    foundChat.appendChild(foundChatName);
                                }
                            }
                        }
                    }
                    setTimeout(()=>{
                        el.classList.remove('spinner');
                        el.classList.add('spinner-once');
                    }, 100);
                }
            }
            else{
                console.log(data);
            }
        }
    });
}

function chat(){
    var chatButton = document.createElement('div');
    chatButton.className = 'chat-button';
    chatButton.onclick = (e)=>{
        e.stopPropagation();

        if(!document.querySelector('.chat-div')){
            createChat();
            createChatHeaderMain();
            getChats();
        }
    }

    document.body.appendChild(chatButton);

    var chatButtonIcon = document.createElement('i');
    chatButtonIcon.className = 'bx bx-message-dots';
    chatButton.appendChild(chatButtonIcon);
}

if(JSON.parse(localStorage.getItem('logged')) != null){
    var user;

    $.ajax({
        method: 'GET',
        url: '/api/calls/getuser/' + JSON.parse(localStorage.getItem('logged')).email,
        success: function(data){
            if(data != 'Utente non trovato'){
                user = data;

                for(let i=0; i<document.getElementsByClassName('login-button').length; i++){
                    document.getElementsByClassName('login-button')[i].textContent = user.firstName;
                    document.getElementsByClassName('login-button')[i].onclick = (e)=>{
                        window.location.href = '/account';
                    };
                }

                chat();
            }
        }
    });
}

document.body.addEventListener('click', ()=>{
    if(document.querySelector('.chat-div')){
        document.querySelector('.chat-div').onanimationend = ()=>{
            document.querySelector('.chat-div').remove();
        }
        document.querySelector('.chat-div').classList.remove('dim-in');
        document.querySelector('.chat-div').classList.add('dim-out');
    }
});