function loadPosts(game){
    $.ajax({
        method: 'GET',
        url: '/api/calls/searchposts/' + game.title,
        success: function(data){
            if(data == 'Nessun annuncio trovato'){
                document.querySelector('.posts-title').textContent = 'Sembra che non ci siano annunci per questo gioco.';
                document.querySelector('.posts-container').remove();
            }
            else{

                for(let i=0; i<data.array.length; i++){
                    var post = document.createElement('div');
                    post.className = 'post';
                    document.querySelector('.posts-container').appendChild(post);

                    var postGameImageDiv = document.createElement('div');
                    postGameImageDiv.className = 'post-image-div';
                    post.appendChild(postGameImageDiv);

                    var postGameImage = document.createElement('img');
                    postGameImage.className = 'post-image';
                    postGameImage.src = data.gameArray[0].image_url_h2x1_s;
                    postGameImageDiv.appendChild(postGameImage);

                    var postGameTitle = document.createElement('div');
                    postGameTitle.className = 'post-game-title';
                    postGameTitle.textContent = data.gameArray[0].title;
                    post.appendChild(postGameTitle);

                    var postGamePrice = document.createElement('div');
                    postGamePrice.className = 'post-game-price';
                    postGamePrice.textContent = data.array[i].price + '€';
                    post.appendChild(postGamePrice);

                    var postGameConditions = document.createElement('div');
                    postGameConditions.className = 'post-game-conditions';
                    postGameConditions.textContent = data.array[i].condition;
                    post.appendChild(postGameConditions);

                    var postGameSpecial = document.createElement('div');
                    postGameSpecial.className = 'post-game-special';
                    postGameSpecial.textContent = data.array[i].special=="true"?'Sì':'No';
                    post.appendChild(postGameSpecial);

                    var postCity = document.createElement('div');
                    postCity.className = 'post-city';
                    postCity.textContent = data.array[i].city;
                    post.appendChild(postCity);

                    var postDate = document.createElement('div');
                    postDate.className = 'post-date';
                    postDate.textContent = data.array[i].date;
                    post.appendChild(postDate);

                    var postContactDiv = document.createElement('div');
                    postContactDiv.className = 'post-contact-div';
                    post.appendChild(postContactDiv);

                    if(data.array[i].userId != JSON.parse(localStorage.getItem('logged'))._id.toString()){
                        var postContact = document.createElement('div');
                        postContact.className = 'post-contact';
                        postContact.textContent = 'Contatta il venditore';
                        postContact.onclick = ()=>{
                            if(JSON.parse(localStorage.getItem('logged')) != null){
                                setTimeout(()=>{
                                    createChat();
                                    createChatHeader();
                                    document.querySelector('.chat-user-name').textContent = data.array[i].userName;
                                    createChatContent();
                                    document.querySelector('.chat-write-button').onclick = ()=>{
                                        if(document.querySelector('.chat-write-box').value.length != 0){
                                            var message = document.querySelector('.chat-write-box').value;
                                            document.querySelector('.chat-write-box').value = '';
                                            sendMessage(message, user._id.toString(), user.firstName, data.array[i].userId, data.array[i].userName);
                                            document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;
                                        }
                                    }
                                }, 0);
                            }
                            else{
                                fillLogin();
                            }
                        }
                        postContactDiv.appendChild(postContact);
                    }
                }
            }
        }
    });
}