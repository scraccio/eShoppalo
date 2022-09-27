function requestGames(count, query_title, skip, postCity){
    $.ajax({
        method: 'POST',
        url: '/api/calls/grid',
        data: 
            {
                num: count,
                title: query_title,
                skip: skip,
                city: postCity
            },
        success: gridAdapter
    });

}

function gridAdapter(data){

    if(data.length == 0){
        canRequest = false;
        document.getElementsByClassName('footer-loading')[0].remove();
        return;
    }

    var element = document.getElementsByClassName('grid')[0];

    for(let i=0; i<data.length; i++){

        var gridElement = document.createElement('div');
        gridElement.className = 'grid-element';
        gridElement.obj = data[i];
        gridElement.addEventListener('click', (evt)=>{
            getProductPage(evt.currentTarget);
        });
        gridElement.num = currElems;

        element.appendChild(gridElement);

        var img = document.createElement('img');
        img.src = data[i].image_url_sq_s;

        var dimmedDiv = document.createElement('div');
        dimmedDiv.className = 'hidden-div ' + 'hidden-' + currElems;
        
        var dimmedText = document.createElement('div');
        dimmedText.className = 'dimmed-text ' + 'dimmed-' + currElems;

        var dimmedTextText = document.createElement('div');
        dimmedTextText.className = 'dimmed-text-text';
        dimmedTextText.textContent = data[i].title;
        dimmedText.appendChild(dimmedTextText);

        gridElement.onmouseover = (evt)=>{
            document.getElementsByClassName('hidden-' + evt.currentTarget.num)[0].className = 'visible ' + 'visible-' + evt.currentTarget.num ;
        };

        gridElement.onmouseout = (evt)=>{
            document.getElementsByClassName('visible ' + 'visible-' + evt.currentTarget.num)[0].className = 'hidden-div ' + 'hidden-' + evt.currentTarget.num;
        };

        dimmedDiv.appendChild(dimmedText);
        gridElement.appendChild(dimmedDiv);
        gridElement.appendChild(img);

        currElems += 1;
    }
}

function getProductPage(element){
    $.ajax({
        method: 'GET',
        url: '/catalogo/' + element.obj.title,
        success: function(data){
            window.location = '/catalogo/' + element.obj.title;
        }
    });
}

var currElems = 0;
var currFeaturedElems = 0;
var canRequest = true;
var functionCalled = false;

requestGames(42);

document.getElementsByClassName('search-button')[0].addEventListener('click', ()=>{
    document.querySelector('.grid').innerHTML = '';
    requestGames(42, document.querySelector('.search-bar > :first-child').value, null, document.querySelector('.search-bar > :nth-child(2)').value);
});

var featuredGrid = document.getElementsByClassName('featured-grid')[0];
var featuredGridHeight;

$.ajax({
    method: 'POST',
    url: '/api/calls/featuredgrid',
    data: 
        {
            url1: '/Games/Nintendo-Switch-games/Xenoblade-Chronicles-3-2168340.html',
            url2: '/Games/Nintendo-Switch-games/Fire-Emblem-Warriors-Three-Hopes-2169456.html',
            url3: '/Games/Nintendo-Switch-games/Nintendo-Switch-Sports-2168292.html',
            url4: '/Games/Nintendo-Switch-games/Pokemon-Legends-Arceus-1930510.html',
            url5: '/Games/Nintendo-Switch-download-software/OlliOlli-World-1951283.html',
            url6: '/Games/Nintendo-Switch-games/Kirby-and-the-Forgotten-Land-2045110.html',
            url7: '/Games/Nintendo-Switch-games/Metroid-Dread-1987653.html',
            url8: '/Games/Nintendo-Switch-games/MONSTER-HUNTER-RISE-1843169.html',
            url9: '/Games/Nintendo-Switch-games/Fire-Emblem-Three-Houses-1175482.html',
            url10: '/Games/Nintendo-Switch-games/Animal-Crossing-New-Horizons-1438623.html',
            url11: '/Games/Nintendo-Switch-download-software/Hades-1821819.html',
            url12: '/Games/Nintendo-Switch-download-software/Into-the-Breach-1430880.html',
            url13: '/Games/Nintendo-Switch-games/Super-Smash-Bros-Ultimate-1395713.html',
            url14: '/Games/Nintendo-Switch-games/Super-Mario-Odyssey-1173332.html',
            url15: '/Games/Nintendo-Switch-games/Splatoon-2-1173295.html',
            url16: '/Games/Nintendo-Switch-games/Splatoon-3-1924751.html',
            url17: '/Games/Nintendo-Switch-games/Mario-Kart-8-Deluxe-1173281.html',
            url18: '/Games/Nintendo-Switch-games/The-Legend-of-Zelda-Breath-of-the-Wild-1173609.html'
        },
    success: function(data){
        for(let i=0; i<data.length; i++){
            var newElement = document.createElement('div');
            newElement.obj = data[i];
            newElement.className = 'featured-grid-element';
            newElement.addEventListener('click', (evt)=>{
                getProductPage(evt.currentTarget);
            });
            newElement.num = currFeaturedElems;
            featuredGrid.appendChild(newElement);
            featuredGridHeight = document.getElementsByClassName('featured-grid')[0].offsetHeight;

            var img = document.createElement('img');
            img.src = data[i].image_url_sq_s;

            var dimmedDiv = document.createElement('div');
            dimmedDiv.className = 'hidden-div ' + 'hidden-featured-' + i;
            
            var dimmedText = document.createElement('div');
            dimmedText.className = 'dimmed-text ' + 'dimmed-featured-' + currFeaturedElems;
            dimmedText.textContent = data[i].title;

            newElement.onmouseover = (evt)=>{
                document.getElementsByClassName('hidden-featured-' + evt.currentTarget.num)[0].className = 'visible ' + 'visible-featured-' + evt.currentTarget.num ;
            };

            newElement.onmouseout = (evt)=>{
                document.getElementsByClassName('visible ' + 'visible-featured-' + evt.currentTarget.num)[0].className = 'hidden-div ' + 'hidden-featured-' + evt.currentTarget.num;
            };

            dimmedDiv.appendChild(dimmedText);
            newElement.appendChild(dimmedDiv);

            newElement.appendChild(img);

            currFeaturedElems += 1;
        }

        header = document.getElementsByClassName("search-bar")[0];

        sticky = header.offsetTop;
        headerHeight = document.getElementsByClassName('header')[0].offsetHeight;
        bannerHeight = document.getElementsByClassName('banner')[0].offsetHeight;
        featuredTextHeight = document.getElementsByClassName('featured-text')[0].offsetHeight;
        functionCalled = false;
    }
});

document.querySelector('.top-button').addEventListener('click', function(e){
    window.scrollTo({top: 0, behavior: 'smooth'});
});