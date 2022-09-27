function getProductPage(element){
    $.ajax({
        method: 'GET',
        url: '/catalogo/' + element.obj.title,
        success: function(data){
            window.location = '/catalogo/' + element.obj.title;
        }
    });
}

$.ajax({
    method: 'POST',
    url: '/api/calls/vetrina',
    data: 
        {
            url1: '/Games/Nintendo-Switch-games/Pokemon-Scarlet-2179556.html',
            url2: '/Games/Nintendo-Switch-games/Xenoblade-Chronicles-3-2168340.html',
            url3: '/Games/Nintendo-Switch-games/Fire-Emblem-Warriors-Three-Hopes-2169456.html',
            url4: '/Games/Nintendo-Switch-games/Mario-Strikers-Battle-League-Football-2169139.html',
            url5: '/Games/Nintendo-Switch-games/Mario-Kart-8-Deluxe-1173281.html',
            url6: '/Games/Nintendo-Switch-games/Splatoon-3-1924751.html',
            url7: '/Games/Nintendo-Switch-games/Pokemon-Legends-Arceus-1930510.html',
            url8: '/Games/Nintendo-Switch-games/Super-Smash-Bros-Ultimate-1395713.html'
        },
    success: function(data){
        for(let i=0; i<data.length; i++){
            var img = document.createElement('img');
            img.src = data[i].image_url_h2x1_s;
            img.obj = data[i];
            img.addEventListener('click', (evt)=>{
                getProductPage(evt.currentTarget);
            });
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderTopRightRadius = '10px';
            img.style.borderTopLeftRadius = '10px';
            document.getElementsByClassName('card')[i].appendChild(img);
            var text = document.createElement('div');
            text.className = 'card-text';
            text.textContent = data[i].title;
            document.getElementsByClassName('card')[i].appendChild(text);
        }
    }
});