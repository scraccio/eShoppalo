var url = window.location.href;
url = url.split('/');
var title = url[url.length - 1];
document.title = decodeURI(title);
var game;

$.ajax({
    method: 'GET',
    url: '/api/calls/getgame/' + decodeURI(title),
    success: function(data){
        game = data[0];
        loadInfo();
        loadPosts(game);
    }
});

function loadInfo(){
    document.querySelector('.product-image > img').src = game.image_url;
    document.querySelector('.product-title').textContent = game.title;
    document.querySelector('.product-description').textContent = game.excerpt;

    var dateDiv = document.querySelector('.release-date');
    var date = document.createElement('div');
    date.textContent = game.pretty_date_s;
    dateDiv.appendChild(date);

    var categories = document.querySelector('.product-categories-category');
    var category = document.createElement('div');
    for(let i=0; i<game.game_categories_txt.length-1; i++){
        category.textContent += game.game_categories_txt[i].charAt(0).toUpperCase() + game.game_categories_txt[i].slice(1) + ', ';
    }
    category.textContent += game.game_categories_txt[game.game_categories_txt.length-1].charAt(0).toUpperCase() + game.game_categories_txt[game.game_categories_txt.length-1].slice(1);
    categories.appendChild(category);

    var pegi = document.querySelector('.product-pegi');
    var newPegi = document.createElement('div');
    newPegi.textContent = 'PEGI ' + game.age_rating_sorting_i;
    pegi.appendChild(newPegi);

    var publisher = document.querySelector('.product-publisher');
    var publisherText = document.createElement('div');
    publisherText.textContent = game.publisher;
    publisher.appendChild(publisherText);

    var players = document.querySelector('.product-players');
    var playersText = document.createElement('div');
    playersText.textContent = game.players_to;
    players.appendChild(playersText);

    var languages = document.querySelector('.product-languages');
    var languagesText = document.createElement('div');
    var languageArray = game.language_availability[0].split(',');
    var langText = '';

    for(lang of languageArray){
        lang = lang.charAt(0).toUpperCase() + lang.slice(1);
        langText += lang + ', ';
    }
    langText = langText.slice(0, langText.length - 2);
    languagesText.textContent = langText;
    languages.appendChild(languagesText);

    document.getElementsByClassName('eshop-button-link')[0].href = 'https://nintendo.it' + game.url;
    document.getElementsByClassName('eshop-button-link')[0].target = '_blank';

    document.getElementsByClassName('posts-title')[0].textContent += 'Annunci per ' + game.title;

    document.getElementsByClassName('posts-button-link')[0].addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}