var x = setInterval(()=>{
    if(document.querySelector('.chat-button')){
        document.querySelector('.chat-button').remove();
        clearInterval(x);
    }
}, 10);