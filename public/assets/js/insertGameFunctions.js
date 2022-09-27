const firstPath = "M11.3,-16.5C16.8,-14,24.9,-14.5,25.8,-12C26.7,-9.4,20.3,-3.7,17.3,1C14.4,5.8,14.9,9.6,14.5,15.6C14,21.5,12.5,29.6,7.8,34.9C3,40.1,-5.1,42.6,-8.7,37.8C-12.2,33,-11.2,20.9,-14.8,14.3C-18.3,7.6,-26.3,6.3,-31.2,1.8C-36,-2.7,-37.7,-10.3,-33.1,-13C-28.6,-15.7,-17.9,-13.4,-11.3,-15.4C-4.8,-17.5,-2.4,-23.8,0.2,-24.2C2.9,-24.6,5.7,-19,11.3,-16.5Z";
const secondPath = "M22.7,-33.8C29.4,-31,34.9,-24.7,38.4,-17.4C41.9,-10.1,43.5,-1.8,42.7,6.3C41.8,14.5,38.5,22.5,32,24.8C25.5,27.1,15.7,23.7,8.9,21.7C2.1,19.8,-1.7,19.3,-6.1,18.9C-10.4,18.4,-15.4,18,-19.7,15.6C-24,13.2,-27.6,8.9,-29.3,3.6C-30.9,-1.6,-30.6,-7.7,-26.9,-10.9C-23.3,-14.1,-16.4,-14.5,-11.4,-18C-6.3,-21.5,-3.2,-28.2,2.4,-32C8,-35.7,16,-36.5,22.7,-33.8Z";
const thirdPath = "M11.9,-20.3C14.6,-16.7,15.5,-12.1,21.3,-7.4C27.2,-2.6,38,2.2,39,6.6C39.9,11,30.9,15,24.7,20.3C18.4,25.6,14.9,32.3,10.1,33.1C5.3,33.9,-0.8,28.8,-4.7,24C-8.6,19.3,-10.3,14.8,-14.8,11.7C-19.3,8.5,-26.7,6.7,-31.8,1.7C-37,-3.3,-40,-11.5,-38,-18.1C-36.1,-24.7,-29.2,-29.7,-22,-31.2C-14.9,-32.7,-7.4,-30.7,-1.4,-28.5C4.6,-26.3,9.2,-23.8,11.9,-20.3Z";

var paths = [{value: firstPath}, {value: secondPath}, {value: thirdPath}];
var pointer = 0;
var selectedGame = null;
var selectedCity = null;
var selectedPrice = null;
var oldSelectedPrice = null;
var selectedSpecial = false;
var selectedCondition = null;
var devalPercentageActual;
var actualDevalActual;
var prezzoGiusto;
var color;
var phrase;
var gauge;
var gauge2;
var priceAvg;
var myChart;
var histogram;
var backgroundArray;
var ctx;
var labels;
var dataTitle;
var array;
var opts;
var target;
var target2;

$(document).ready(function() {
    var windowHeight = $(window).innerHeight();
    $('body').css({'height':windowHeight});
});

function setRatingValue(gauge){
    if(gauge.value <= -40){
        color = "rgb(218,17,17)";
        phrase = 'Credo che tu voglia soltanto liberartene.';
    }
    if(gauge.value >= 30){
        color = "rgb(218,17,17)";
        phrase = 'Pfft. Ti aspetti davvero che qualcuno lo comprerà?';
    }
    if(gauge.value >= -40 && gauge.value <= -30){
        color = "#F29000";
        phrase = 'Fin troppo conveniente. Io ci ripenserei.';
    }
    if(gauge.value >= 20 && gauge.value <= 30){
        color = "#F29000";
        phrase = 'Un po\' altino, non credi?';
    }
    if(gauge.value >= -30 && gauge.value <= -15){
        color = "#FFDD00";
        phrase = 'Sei troppo buono.';
        document.querySelector('.rating').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
        document.querySelector('.price-mine > .price-subtext').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
        document.querySelector('.actual-deval > .price-subtext').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
    }
    if(gauge.value >= 5 && gauge.value <= 20){
        color = "#FFDD00";
        phrase = 'Ci sono offerte migliori in giro.';
        document.querySelector('.rating').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
        document.querySelector('.price-mine > .price-subtext').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
        document.querySelector('.actual-deval > .price-subtext').style.textShadow = '2px 1px 1px rgba(0, 0, 0, 0.306)';
    }
    if(gauge.value >= -15 && gauge.value <= -10){
        color = "#84B947";
        phrase = 'Un ottimo affare.';
    }
    if(gauge.value >= 0 && gauge.value <= 5){
        color = "#84B947";
        phrase = 'Non male.';
    }
    if(gauge.value >= -10 && gauge.value <= 0){
        color = "#30B32D";
        phrase = 'È praticamente perfetto.';
    }

    document.querySelector('.rating').innerHTML = '<span style="color: rgb(60,60,60); text-shadow: none;">Valutazione:</span> ' + phrase;
    document.querySelector('.rating').style.color = color;

    document.querySelector('.price-mine > .price-subtext').style.color = color;
    document.querySelector('.actual-deval > .price-subtext').style.color = color;
}

setInterval(() => {
    if(pointer == 0){
        if(document.querySelector('.speciale')){
            selectedSpecial = document.querySelector('.speciale').checked;
        }
        if(document.querySelector('.game-status > select') && document.querySelector('.game-status > select').value == "Seleziona la condizione"){
            if(document.querySelector('.next-button').classList.contains('button-clickable')){
                document.querySelector('.next-button').classList.remove('button-clickable');
                document.querySelector('.next-button').classList.add('button-unclickable');
            }
            document.querySelector('.next-button').removeEventListener('click', nextEventListener);
        }
        if(selectedGame != null && document.querySelector('.game-status > select') && document.querySelector('.game-status > select').value != "Seleziona la condizione"){
            document.querySelector('.next-button').addEventListener('click', nextEventListener);
            if(!document.querySelector('.next-button').classList.contains('button-clickable')){
                document.querySelector('.next-button').classList.add('button-clickable');
                document.querySelector('.next-button').classList.remove('button-unclickable');
            }
        }
    }
    if(pointer == 2){
        if(document.querySelector('.search-bar') && document.querySelector('.confirm-price-button')){
            if(document.querySelector('.search-bar').value.length == 0 || document.querySelector('.search-bar').value < 1){
                if(document.querySelector('.confirm-price-button').classList.contains('button-clickable')){
                    document.querySelector('.confirm-price-button').classList.remove('button-clickable');
                    document.querySelector('.confirm-price-button').classList.add('button-unclickable');
                    document.querySelector('.confirm-price-button').onclick = ()=>{};
                }
            }
            else{
                if(document.querySelector('.confirm-price-button').classList.contains('button-unclickable')){
                    document.querySelector('.confirm-price-button').classList.remove('button-unclickable');
                    document.querySelector('.confirm-price-button').classList.add('button-clickable');
                    document.querySelector('.confirm-price-button').onclick = ()=>{
                        oldSelectedPrice = selectedPrice;
                        selectedPrice = document.querySelector('.search-bar').value;
                        document.querySelector('.dim').onanimationend = ()=>{
                            document.querySelector('.dim').remove();
                        };
                        document.querySelector('.dim').classList.remove('dim-in');
                        document.querySelector('.dim').classList.add('dim-out');

                        if(document.querySelector('.prices-bar-pre')){
                            var legend2 = document.createElement('div');
                            legend2.className = 'legend-2';
                            document.querySelector('.chart-legend').appendChild(legend2);

                            var legend2box = document.createElement('div');
                            legend2box.className = 'legend-2-box';
                            document.querySelector('.legend-2').appendChild(legend2box);

                            var legend2text = document.createElement('div');
                            legend2text.className = 'legend-text';
                            legend2text.textContent = 'Il tuo prezzo';
                            document.querySelector('.legend-2').appendChild(legend2text);

                            document.querySelector('.prices-bar-pre').onanimationend = ()=>{
                                document.querySelector('.prices-bar-pre').className
                                document.querySelector('.prices-bar-pre').className = 'prices-bar dim-in';
                                document.querySelector('.prices-bar').onanimationend = ()=>{};
                                
                                var priceMine = document.createElement('div');
                                priceMine.className = 'price-mine';
                                document.querySelector('.prices-bar').appendChild(priceMine);

                                var priceMineTitle = document.createElement('div');
                                priceMineTitle.className = 'price-uppertext';
                                priceMineTitle.textContent = 'Il tuo prezzo';
                                priceMine.appendChild(priceMineTitle);

                                var priceMineValue = document.createElement('div');
                                priceMineValue.className = 'price-subtext';
                                priceMineValue.textContent = selectedPrice + '€';
                                priceMine.appendChild(priceMineValue);

                                var actualDeval = document.createElement('div');
                                actualDeval.className = 'actual-deval';
                                actualDevalActual = (100 - parseInt(selectedPrice*100/selectedGame.price_sorting_f));
                                document.querySelector('.prices-bar').appendChild(actualDeval);

                                var actualDevalTitle = document.createElement('div');
                                actualDevalTitle.className = 'price-uppertext';
                                actualDevalTitle.textContent = 'Svalutazione offerta';
                                actualDeval.appendChild(actualDevalTitle);

                                var actualDevalValue = document.createElement('div');
                                actualDevalValue.className = 'price-subtext';
                                actualDevalValue.textContent = actualDevalActual + '%';
                                actualDeval.appendChild(actualDevalValue);

                                var gaugeCanvasDiv1 = document.createElement('div');
                                gaugeCanvasDiv1.className = 'gauge-canvas-div';
                                document.querySelector('.gauge-canvases').appendChild(gaugeCanvasDiv1);

                                var gaugeDiv1 = document.createElement('div');
                                gaugeDiv1.className = 'gauge-div';
                                gaugeCanvasDiv1.appendChild(gaugeDiv1);
                                
                                var gaugeValue1 = document.createElement('div');
                                gaugeValue1.className = 'gauge-value';
                                gaugeCanvasDiv1.appendChild(gaugeValue1);
                                
                                var gaugeCanvas1 = document.createElement('canvas');
                                gaugeCanvas1.className = 'gauge-canvas';
                                gaugeDiv1.appendChild(gaugeCanvas1);

                                var gaugeCanvasDiv2 = document.createElement('div');
                                gaugeCanvasDiv2.className = 'gauge-canvas-div';
                                document.querySelector('.gauge-canvases').appendChild(gaugeCanvasDiv2);

                                var gaugeDiv2 = document.createElement('div');
                                gaugeDiv2.className = 'gauge-div';
                                gaugeCanvasDiv2.appendChild(gaugeDiv2);
                                
                                var gaugeValue2 = document.createElement('div');
                                gaugeValue2.className = 'gauge-value';
                                gaugeCanvasDiv2.appendChild(gaugeValue2);
                                
                                var gaugeCanvas2 = document.createElement('canvas');
                                gaugeCanvas2.className = 'gauge-canvas';
                                gaugeDiv2.appendChild(gaugeCanvas2);

                                opts = {
                                    angle: -0.2,
                                    lineWidth: 0.2,
                                    radiusScale: 1,
                                    pointer: {
                                        length: 0.5,
                                        strokeWidth: 0.035,
                                        color: '#000000'
                                    },
                                    highDpiSupport: true,
                                    staticZones: [
                                        {strokeStyle: "rgb(218,17,17)", min: -50, max: -40},
                                        {strokeStyle: "#F29000", min: -40, max: -30},
                                        {strokeStyle: "#FFDD00", min: -30, max: -15},
                                        {strokeStyle: "#84B947", min: -15, max: -10},
                                        {strokeStyle: "#30B32D", min: -10, max: 0},
                                        {strokeStyle: "#84B947", min: 0, max: 5},
                                        {strokeStyle: "#FFDD00", min: 5, max: 20},
                                        {strokeStyle: "#F29000", min: 20, max: 30},
                                        {strokeStyle: "rgb(218,17,17)", min: 30, max: 50}
                                        ],
                                };
                                target = document.querySelectorAll('.gauge-canvas')[0];
                                gauge = new Gauge(target).setOptions(opts);
                                gauge.maxValue = 50;
                                gauge.setMinValue(-50);
                                gauge.animationSpeed = 20;
                                gauge.set(devalPercentageActual - actualDevalActual);

                                gaugeValue1.textContent = gauge.value + '% rispetto alla media';

                                target2 = document.querySelectorAll('.gauge-canvas')[1];
                                gauge2 = new Gauge(target2).setOptions(opts);
                                gauge2.maxValue = 50;
                                gauge2.setMinValue(-50);
                                gauge2.animationSpeed = 20;
                                gauge2.set((100 - parseInt(prezzoGiusto*100/selectedGame.price_sorting_f)) - actualDevalActual);

                                gaugeValue2.textContent = gauge2.value + '% rispetto al suggerito';

                                var valutazione = document.createElement('div');
                                valutazione.className = 'rating';
                                $(valutazione).insertAfter(document.querySelector('.second-container'));
                                
                                setRatingValue(gauge);

                                array.push(selectedPrice);
                                array = array.sort((a,b)=>a-b);
                                array = array.map(elem => Math.ceil(elem));
                                console.log(array);
                                var labels = [];
                                for(let i=Math.min(...array); i<Math.min(...array) + (Math.max(...array) - Math.min(...array)) + 1; i++){
                                    labels[i - Math.min(...array)] = i + '€';
                                }

                                histogram = toHistogram(array);

                                backgroundArray = new Array(Math.max(...array) - Math.min(...array) + 1).fill('rgb(218, 17, 17)');
                                backgroundArray[parseInt(selectedPrice) - Math.min(...array)] = 'rgb(30, 176, 37)';

                                myChart.destroy();
                                myChart = new Chart(ctx, {
                                    type: 'bar',
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            data: histogram.histogram,
                                            backgroundColor: backgroundArray,
                                            borderRadius: 8,
                                            barPercentage: 0.8
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Numero di annunci'
                                                }
                                            },
                                            x:{
                                                title: {
                                                    display: true,
                                                    text: 'Prezzo dell\'usato'
                                                }
                                            }
                                        },
                                        plugins:{
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: dataTitle + ', fonte: PriceCharting.com'
                                            }
                                        }
                                    }
                                });

                                var nextButton = document.createElement('div');
                                nextButton.className = 'button-login button-login2';
                                console.log(user);
                                nextButton.onclick = ()=>{
                                    $.ajax({
                                        method: 'POST',
                                        url: '/api/calls/insertpost',
                                        data: {
                                            user: JSON.stringify(user),
                                            city: selectedCity,
                                            game: selectedGame._id,
                                            price: selectedPrice,
                                            condition: selectedCondition,
                                            special: selectedSpecial
                                        },
                                        success: function(data){
                                            if(data == 'ok'){

                                                var confirmDim = document.createElement('div');
                                                confirmDim.className = 'dim dim-in';
                                                document.body.appendChild(confirmDim);

                                                var confirmDiv = document.createElement('div');
                                                confirmDiv.className = 'confirm-div slide-from-top';
                                                confirmDim.appendChild(confirmDiv);

                                                var confirmDivText = document.createElement('div');
                                                confirmDivText.className = 'confirm-div-text';
                                                confirmDivText.innerHTML = 'Annuncio inserito con successo.<br><br>Verrai reindirizzato alla pagina del gioco.';
                                                confirmDiv.appendChild(confirmDivText);

                                                setTimeout(()=>{window.location.href = '/catalogo/' + selectedGame.title.replace(' ','%20');}, 2000);
                                            }
                                        }
                                    });
                                }
                                document.querySelector('.nav-menu').appendChild(nextButton);

                                var nextButtonText = document.createElement('div');
                                nextButtonText.className = 'button-login-text';
                                nextButtonText.textContent = 'Conferma e pubblica';
                                nextButton.appendChild(nextButtonText);
                            }
                            document.querySelector('.prices-bar-pre').classList.add('dim-out');
                        }
                        else{
                            document.querySelector('.main-graph').onanimationend = ()=>{
                                document.querySelector('.main-graph').classList.remove('dim-out');
                                document.querySelector('.price-mine > .price-subtext').textContent = selectedPrice + '€';
                                actualDevalActual = (100 - parseInt(selectedPrice*100/selectedGame.price_sorting_f));
                                document.querySelector('.actual-deval > .price-subtext').textContent = actualDevalActual + '%';
                                devalPercentageActual = (100 - parseInt(dataAvg*100/selectedGame.price_sorting_f));
                                gauge = new Gauge(target).setOptions(opts);
                                gauge.maxValue = 50;
                                gauge.setMinValue(-50);
                                gauge.animationSpeed = 20;
                                gauge.set(devalPercentageActual - actualDevalActual);
                                gauge2 = new Gauge(target2).setOptions(opts);
                                gauge2.maxValue = 50;
                                gauge2.setMinValue(-50);
                                gauge2.animationSpeed = 20;
                                gauge2.set((100 - parseInt(prezzoGiusto*100/selectedGame.price_sorting_f)) - actualDevalActual);
                                document.querySelectorAll('.gauge-value')[0].textContent = gauge.value + '% rispetto alla media';
                                document.querySelectorAll('.gauge-value')[1].textContent = gauge2.value + '% rispetto al suggerito';
                                setRatingValue(gauge);

                                array.splice(array.indexOf(parseInt(oldSelectedPrice)), 1);
                                array.push(selectedPrice);
                                array = array.sort((a,b)=>a-b);
                                array = array.map(elem => Math.ceil(elem));

                                var labels = [];
                                for(let i=Math.min(...array); i<Math.min(...array) + (Math.max(...array) - Math.min(...array)) + 1; i++){
                                    labels[i - Math.min(...array)] = i + '€';
                                }

                                histogram = toHistogram(array);
                                
                                backgroundArray = new Array(Math.max(...array) - Math.min(...array) + 1).fill('rgb(218, 17, 17)');
                                backgroundArray[parseInt(selectedPrice) - Math.min(...array)] = 'rgb(30, 176, 37)';

                                myChart.destroy();
                                myChart = new Chart(ctx, {
                                    type: 'bar',
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            data: histogram.histogram,
                                            backgroundColor: backgroundArray,
                                            borderRadius: 8,
                                            barPercentage: 0.8
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Numero di annunci'
                                                }
                                            },
                                            x:{
                                                title: {
                                                    display: true,
                                                    text: 'Prezzo dell\'usato'
                                                }
                                            }
                                        },
                                        plugins:{
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: true,
                                                text: dataTitle + ', fonte: PriceCharting.com'
                                            }
                                        }
                                    }
                                });
                            }
                            document.querySelector('.main-graph').classList.add('dim-out');
                        }
                    };
                }
            }
        }
    }
}, 100);

document.getElementsByClassName('search-bar')[0].onkeydown = ()=>{
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
        if(pointer == 0){
            selectedGame = null;
            if(document.querySelector('.next-button').classList.contains('button-clickable')){
                document.querySelector('.next-button').classList.remove('button-clickable');
                document.querySelector('.next-button').classList.add('button-unclickable');
            }
            document.querySelector('.next-button').removeEventListener('click', nextEventListener);

            if(document.querySelector('.game-image')){
                document.querySelector('.game-image').onanimationend = ()=>{
                    document.querySelector('.game-image').classList.remove('dim-in');
                    document.querySelector('.game-image').remove();
                }
                document.querySelector('.game-image').classList.add('dim-out');
            }
        }
        if(pointer == 1){
            selectedCity = null;
            if(document.querySelector('.next-button').classList.contains('button-clickable')){
                document.querySelector('.next-button').classList.remove('button-clickable');
                document.querySelector('.next-button').classList.add('button-unclickable');
            }
            document.querySelector('.next-button').removeEventListener('click', nextEventListener);
        }
        
    }
};

document.body.addEventListener('click', ()=>{
    if(document.getElementsByClassName('search-div')[0]){
        document.getElementsByClassName('search-div')[0].remove();
        document.querySelector('.prev-button').style.display = 'flex';
        document.querySelector('.next-button').style.display = 'flex';
        if(document.querySelector('.game-data-container')){
            document.querySelector('.game-data-container').style.display = 'flex';
        }
    }
});

function filtra(){
    var string = document.getElementsByClassName('search-bar')[0].value;
    if(string.length > 3){
        $.ajax({
            method: 'GET',
            url: '/api/calls/searchgame/' + string,
            success: function(data){
                if(document.getElementsByClassName('search-div')[0]){
                    document.getElementsByClassName('search-div')[0].remove();
                    document.querySelector('.prev-button').style.display = 'flex';
                    document.querySelector('.next-button').style.display = 'flex';
                }

                if(data.length > 0){
                    var div = document.createElement('div');
                    div.className = 'search-div';
                    document.querySelector('.prev-button').style.display = 'none';
                    document.querySelector('.next-button').style.display = 'none';
                    document.querySelector('.game-data-container').style.display = 'none';

                    for(let i=0; i<data.length; i++){
                        var minidiv = document.createElement('div');
                        minidiv.className = 'search-entry-div';
                        minidiv.obj = data[i];
                        minidiv.onclick = (e)=>{
                            selectedGame = e.currentTarget.obj;
                            document.getElementsByClassName('search-bar')[0].value = e.currentTarget.textContent;
                            var gameImage = document.createElement('img');
                            gameImage.src = selectedGame.image_url;
                            gameImage.className = 'game-image dim-in';
                            document.body.append(gameImage);
                        };

                        var imgcontainer = document.createElement('div');
                        imgcontainer.className = 'search-entry-image-container';
                        minidiv.appendChild(imgcontainer);

                        var image = document.createElement('img');
                        image.src = data[i].image_url_h2x1_s;
                        image.className = 'search-entry-image';
                        imgcontainer.appendChild(image);

                        var minidivtext = document.createElement('div');
                        minidivtext.textContent = data[i].title;
                        minidivtext.className = 'search-entry-text';
                        minidiv.appendChild(minidivtext)

                        div.appendChild(minidiv);
                    }
                    
                    document.getElementsByClassName('search-bar-container')[0].appendChild(div);
                }
            }
        });
    }
    else if(document.getElementsByClassName('search-div')[0]){
        document.getElementsByClassName('search-div')[0].remove();
    }
}

function filtraCitta(){
    var string = document.getElementsByClassName('search-bar')[0].value;
    if(string.length > 1){
        $.ajax({
            method: 'GET',
            url: '/api/calls/searchcity/' + string,
            success: function(data){
                if(document.getElementsByClassName('search-div')[0]){
                    document.getElementsByClassName('search-div')[0].remove();
                    document.querySelector('.prev-button').style.display = 'flex';
                    document.querySelector('.next-button').style.display = 'flex';
                }

                if(data.length > 0){
                    var div = document.createElement('div');
                    div.className = 'search-div search-div-city';
                    document.querySelector('.prev-button').style.display = 'none';
                    document.querySelector('.next-button').style.display = 'none';

                    for(let i=0; i<data.length; i++){
                        var minidiv = document.createElement('div');
                        minidiv.className = 'search-entry-div';
                        minidiv.city = data[i];
                        minidiv.onclick = (e)=>{
                            selectedCity = e.currentTarget.city;
                            document.getElementsByClassName('search-bar')[0].value = e.currentTarget.textContent;
                            document.querySelector('.next-button').addEventListener('click', nextEventListener);
                            if(!document.querySelector('.next-button').classList.contains('button-clickable')){
                                document.querySelector('.next-button').classList.add('button-clickable');
                                document.querySelector('.next-button').classList.remove('button-unclickable');
                            }
                        };

                        var minidivtext = document.createElement('div');
                        minidivtext.textContent = data[i];
                        minidivtext.className = 'search-entry-text';
                        minidiv.appendChild(minidivtext)

                        div.appendChild(minidiv);
                    }
                    document.getElementsByClassName('search-bar-container')[0].appendChild(div);
                }
            }
        });
    }
    else if(document.getElementsByClassName('search-div')[0]){
        document.getElementsByClassName('search-div')[0].remove();
    }
}

function nextEventListener(){
    if(pointer < 3){
        pointer++;
        if(pointer == 1){
            selectedCondition = document.querySelector('.game-status select').value;
            if(selectedCity == null){
                document.querySelector('.next-button').removeEventListener('click', nextEventListener);
                document.querySelector('.next-button').classList.remove('button-clickable');
                document.querySelector('.next-button').classList.add('button-unclickable');
            }
            document.querySelector('.search-bar').onkeyup = filtraCitta;
            document.querySelector('.prev-button').addEventListener('click', prevEventListener);
            document.querySelector('.prev-button').classList.add('button-clickable');
            document.querySelector('.prev-button').classList.remove('button-unclickable');

            document.querySelector('.step-text').onanimationend = ()=>{
                document.querySelector('.step-text').innerHTML = 'Agli utenti potrebbe interessare la città in cui abiti. Ma forse, eh.';
                document.querySelector('.step-text').classList.remove('text-fade-out');
                document.querySelector('.step-text').classList.add('text-fade-in');
            }
            document.querySelector('.step-text').classList.add('text-fade-out');

            document.querySelector('.search-bar').onanimationend = ()=>{
                document.querySelector('.search-bar').placeholder = 'Città';
                if(selectedCity != null){
                    document.querySelector('.search-bar').value = selectedCity;
                }
                else{
                    document.querySelector('.search-bar').value = '';
                }
                document.querySelector('.search-bar').classList.remove('text-fade-out');
                document.querySelector('.search-bar').classList.add('text-fade-in');
                document.querySelector('.search-bar').type = 'text';
            }
            document.querySelector('.search-bar').classList.add('text-fade-out');

            document.querySelector('.game-data-container').onanimationend = ()=>{
                document.querySelector('.game-data-container').remove();
            }
            document.querySelector('.game-data-container').classList.add('text-fade-out');
        }
        if(pointer == 2){
            document.querySelector('.step-text').onanimationend = ()=>{
                document.querySelector('.step-text').innerHTML = 'Sto controllando il prezzo online.<br><br>Perché non bevi dell\'acqua nel frattempo?';
                document.querySelector('.step-text').classList.remove('text-fade-out');
                document.querySelector('.step-text').classList.add('text-fade-in');
            }
            document.querySelector('.step-text').classList.add('text-fade-out');

            document.querySelector('.search-bar').onanimationend = ()=>{
                document.querySelector('.search-bar-container').remove();
            };
            document.querySelector('.search-bar').classList.add('text-fade-out');

            document.querySelector('.buttons').onanimationend = ()=>{
                document.querySelector('.buttons').remove();
            }
            document.querySelector('.buttons').classList.add('text-fade-out');


            $.ajax({
                method: 'GET',
                url: '/api/calls/scrape/' + selectedGame.title,
                success: function(data){
                    if(data == 'none'){
                        document.querySelector('.step-text').onanimationend = ()=>{
                            document.querySelector('.main').className = 'main-graph';
                            var newdiv = document.createElement('div');
                            newdiv.className = 'chart-container no-chart';
                            newdiv.textContent = 'Non ho trovato risultati per ' + selectedGame.title;
                            document.querySelector('.main-graph').appendChild(newdiv);
                            
                            document.querySelector('.step-text').remove();
                        }
                    }
                    else{
                        array = data.array;
                        array = data.array.sort((a,b)=>a-b);
                        array = array.map(elem => Math.ceil(elem));
                        var labels = [];
                        for(let i=Math.min(...array); i<Math.min(...array) + (Math.max(...array) - Math.min(...array)) + 1; i++){
                            labels[i - Math.min(...array)] = i + '€';
                        }
                        
                        histogram = toHistogram(array);
                        
                        backgroundArray = new Array(Math.max(...array) - Math.min(...array) + 1).fill('rgb(218, 17, 17)');
                        var num = Math.floor(selectedPrice);
                        
                        document.querySelector('.step-text').onanimationend = ()=>{
                            document.querySelector('.main').className = 'main-graph';

                            var newdiv = document.createElement('div');
                            newdiv.className = 'chart-container';
                            document.querySelector('.main-graph').appendChild(newdiv);
                            
                            document.querySelector('.step-text').remove();
                            document.querySelector('.chart-container').innerHTML = '<div class="chartxd"><canvas id="chart" class="chart"></canvas><div>';

                            var legend = document.createElement('div');
                            legend.className = 'chart-legend';
                            document.querySelector('.chart-container').appendChild(legend);

                            var legend1 = document.createElement('div');
                            legend1.className = 'legend-1';
                            document.querySelector('.chart-legend').appendChild(legend1);

                            var legend1box = document.createElement('div');
                            legend1box.className = 'legend-1-box';
                            document.querySelector('.legend-1').appendChild(legend1box);

                            var legend1text = document.createElement('div');
                            legend1text.className = 'legend-text';
                            legend1text.textContent = 'Prezzi degli annunci';
                            document.querySelector('.legend-1').appendChild(legend1text);

                            var newdiv1 = document.createElement('div');
                            newdiv1.className = 'second-container';
                            document.querySelector('.main-graph').appendChild(newdiv1);

                            var pricesBar = document.createElement('div');
                            pricesBar.className = 'prices-bar-pre';
                            document.querySelector('.second-container').appendChild(pricesBar);

                            var priceNew = document.createElement('div');
                            priceNew.className = 'price-new';
                            document.querySelector('.prices-bar-pre').appendChild(priceNew);

                            var priceNewTitle = document.createElement('div');
                            priceNewTitle.className = 'price-uppertext';
                            priceNewTitle.textContent = 'Prezzo del nuovo';
                            priceNew.appendChild(priceNewTitle);

                            var priceNewValue = document.createElement('div');
                            priceNewValue.className = 'price-subtext';
                            priceNewValue.textContent = selectedGame.price_sorting_f + '€';
                            priceNew.appendChild(priceNewValue);

                            var priceAvg = document.createElement('div');
                            priceAvg.className = 'price-avg';
                            document.querySelector('.prices-bar-pre').appendChild(priceAvg);

                            var priceAvgTitle = document.createElement('div');
                            priceAvgTitle.className = 'price-uppertext';
                            priceAvgTitle.textContent = 'Prezzo medio usato';
                            priceAvg.appendChild(priceAvgTitle);

                            var priceAvgValue = document.createElement('div');
                            priceAvgValue.className = 'price-subtext';
                            dataAvg = data.avg
                            priceAvgValue.textContent = dataAvg + '€';
                            priceAvg.appendChild(priceAvgValue);

                            var priceRight = document.createElement('div');
                            priceRight.className = 'price-right';
                            document.querySelector('.prices-bar-pre').appendChild(priceRight);

                            var priceRightTitle = document.createElement('div');
                            priceRightTitle.className = 'price-uppertext';
                            priceRightTitle.textContent = 'Prezzo suggerito';
                            priceRight.appendChild(priceRightTitle);

                            var priceRightValue = document.createElement('div');
                            priceRightValue.className = 'price-subtext';
                            
                            var today = new Date();
                            var scontoAnni = 1 - Math.floor(10 * (today.getFullYear() - selectedGame.pretty_date_s.split('/')[2]))/100;
                            var scontoCondizione;
                            switch(selectedCondition){
                                case 'Nuovo':
                                    scontoCondizione = 1 - 0.15;
                                    break;
                                case 'Ottimo':
                                    scontoCondizione = 1 - 0.17;
                                    break;
                                case 'Buono':
                                    scontoCondizione = 1 - 0.20;
                                    break;
                                case 'Accettabile':
                                    scontoCondizione = 1 - 0.23;
                                    break;
                                case 'Solo cartuccia':
                                    scontoCondizione = 1 - 0.3;
                                    break;
                            }
                            var scontoSpeciale = selectedSpecial?1.2:1;

                            prezzoGiusto = Math.floor(100 * ((selectedGame.price_sorting_f * scontoAnni * scontoCondizione * scontoSpeciale) + (2*dataAvg))/3)/100;
                            priceRightValue.textContent = prezzoGiusto + '€';
                            priceRight.appendChild(priceRightValue);

                            var devalPercentage = document.createElement('div');
                            devalPercentage.className = 'deval-percentage';
                            devalPercentageActual = (100 - parseInt(dataAvg*100/selectedGame.price_sorting_f));
                            document.querySelector('.prices-bar-pre').appendChild(devalPercentage);

                            var devalPercentageTitle = document.createElement('div');
                            devalPercentageTitle.className = 'price-uppertext';
                            devalPercentageTitle.textContent = 'Svalutazione media';
                            devalPercentage.appendChild(devalPercentageTitle);

                            var devalPercentageValue = document.createElement('div');
                            devalPercentageValue.className = 'price-subtext';
                            devalPercentageValue.textContent = devalPercentageActual + '%';
                            devalPercentage.appendChild(devalPercentageValue);

                            var gaugeCanvases = document.createElement('div');
                            gaugeCanvases.className = 'gauge-canvases';
                            document.querySelector('.second-container').appendChild(gaugeCanvases);

                            dataTitle = data.title;
                            ctx = document.getElementById('chart');
                            myChart = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                    labels: labels,
                                    datasets: [{
                                        data: histogram.histogram,
                                        backgroundColor: backgroundArray,
                                        borderRadius: 8,
                                        barPercentage: 0.8
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Numero di annunci'
                                            }
                                        },
                                        x:{
                                            title: {
                                                display: true,
                                                text: 'Prezzo dell\'usato'
                                            }
                                        }
                                    },
                                    plugins:{
                                        legend: {
                                            display: false
                                        },
                                        title: {
                                            display: true,
                                            text: dataTitle + ', fonte: PriceCharting.com'
                                        }
                                    }
                                }
                            });

                            

                            var navMenu = document.createElement('div');
                            navMenu.className = 'nav-menu';
                            document.querySelector('.main-graph').appendChild(navMenu);

                            var backButton = document.createElement('div');
                            backButton.className = 'button-home button-home2';
                            backButton.onclick = () => {

                                var dimDiv = document.createElement('div');
                                dimDiv.className = 'dim dim-in';
                                document.body.appendChild(dimDiv);

                                var changePriceDiv = document.createElement('div');
                                changePriceDiv.className = 'change-price-div text-fade-in';
                                dimDiv.appendChild(changePriceDiv);

                                var changePriceTitle = document.createElement('div');
                                changePriceTitle.className = 'change-price-title';
                                changePriceTitle.textContent = 'Inserisci il nuovo prezzo in euro.';
                                changePriceDiv.appendChild(changePriceTitle);

                                var inputPrice = document.createElement('input');
                                inputPrice.className = 'search-bar text-fade-in';
                                inputPrice.placeholder = 'Prezzo';
                                inputPrice.type = 'number';
                                inputPrice.max = '10000';
                                inputPrice.min = '1';
                                inputPrice.step = '0.01';
                                changePriceDiv.appendChild(inputPrice);

                                var confirmPriceButton = document.createElement('div');
                                confirmPriceButton.className = 'confirm-price-button button-unclickable';
                                changePriceDiv.appendChild(confirmPriceButton);

                                var confirmButtonText = document.createElement('div');
                                confirmButtonText.className = 'confirm-price-button-text';
                                confirmButtonText.textContent = 'Conferma';
                                confirmPriceButton.appendChild(confirmButtonText);

                                var closePriceButton = document.createElement('div');
                                closePriceButton.className = 'confirm-price-close';
                                closePriceButton.onclick = ()=>{
                                    document.querySelector('.dim').onanimationend = ()=>{
                                        document.querySelector('.dim').remove();
                                    };
                                    document.querySelector('.dim').classList.remove('dim-in');
                                    document.querySelector('.dim').classList.add('dim-out');
                                }
                                closePriceButton.innerHTML = "<i class='bx bx-x'></i>";
                                changePriceDiv.appendChild(closePriceButton);
                            }
                            navMenu.appendChild(backButton);

                            var backButtonText = document.createElement('div');
                            backButtonText.className = 'button-home-text';
                            backButtonText.textContent = 'Scegli il tuo prezzo';
                            backButton.appendChild(backButtonText);
                        }
                    }
                    document.querySelector('.step-text').classList.add('text-fade-out');

                    document.querySelector('.steps').onanimationend = ()=>{
                        document.querySelector('.steps').style.display = 'none';
                        document.querySelector('.steps').classList.remove('text-fade-out');

                    }
                    document.querySelector('.steps').classList.add('text-fade-out');

                }
            });
            
        }
    
        const timeline = anime.timeline({
            duration: 500,
            easing: 'cubicBezier(.5, .05, .1, .3)'
        });
        timeline.add({
            targets: ".sun",
            d: [paths[pointer]]
        });
        for(let i=1; i<4; i++){
            document.querySelector('.step' + i).className = 'step' + i + ' steps-small';
        }
        document.getElementsByClassName('step' + (pointer+1))[0].classList.remove('steps-small');
        document.getElementsByClassName('step' + (pointer+1))[0].classList.add('steps-big');
    }
}

function prevEventListener(){
    pointer--;
    if(pointer == 0){
        document.querySelector('.next-button').addEventListener('click', nextEventListener);
        document.querySelector('.next-button').classList.add('button-clickable');
        document.querySelector('.next-button').classList.remove('button-unclickable');
        document.querySelector('.prev-button').removeEventListener('click', prevEventListener);
        document.querySelector('.search-bar').onkeyup = filtra;
        if(document.querySelector('.prev-button').classList.contains('button-clickable')){
            document.querySelector('.prev-button').classList.remove('button-clickable');
            document.querySelector('.prev-button').classList.add('button-unclickable');
        }
        document.querySelector('.step-text').onanimationend = ()=>{
            document.querySelector('.step-text').innerHTML = 'Partiamo dal facile.<br>Inserisci il dati del gioco.'
            document.querySelector('.step-text').classList.remove('text-fade-out');
            document.querySelector('.step-text').classList.add('text-fade-in');
        }
        document.querySelector('.step-text').classList.add('text-fade-out');

        document.querySelector('.search-bar').onanimationend = ()=>{
            document.querySelector('.search-bar').placeholder = 'Titolo';
            document.querySelector('.search-bar').value = selectedGame.title;
            document.querySelector('.search-bar').classList.remove('text-fade-out');
            document.querySelector('.search-bar').classList.add('text-fade-in');

            if(!document.querySelector('.game-data-container')){
                var gameContainer = document.createElement('div');
                gameContainer.className = 'game-data-container text-fade-in';
                $(gameContainer).insertAfter(document.querySelector('.search-bar-container'));

                var gameStatus = document.createElement('div');
                gameStatus.className = 'game-status';
                document.querySelector('.game-data-container').appendChild(gameStatus);

                var gameStatusSelect = document.createElement('select');
                gameStatusSelect.name = 'condizioni';
                document.querySelector('.game-status').appendChild(gameStatusSelect);

                var option1 = document.createElement('option');
                option1.value = 'Seleziona la condizione';
                option1.text = '--Seleziona la condizione--';
                gameStatusSelect.appendChild(option1);

                var option2 = document.createElement('option');
                option2.value = 'Ottimo';
                option2.text = 'Ottimo';
                gameStatusSelect.appendChild(option2);

                var option3 = document.createElement('option');
                option3.value = 'Buono';
                option3.text = 'Buono';
                gameStatusSelect.appendChild(option3);

                var option4 = document.createElement('option');
                option4.value = 'Accettabile';
                option4.text = 'Accettabile';
                gameStatusSelect.appendChild(option4);

                var option5 = document.createElement('option');
                option5.value = 'Solo cartuccia';
                option5.text = 'Solo cartuccia';
                gameStatusSelect.appendChild(option5);

                gameStatusSelect.value = selectedCondition;

                var specialText = document.createElement('div');
                specialText.className = 'special-text';
                specialText.textContent = 'È un\'edizione speciale?';
                document.querySelector('.game-data-container').appendChild(specialText);

                var gameSpecial = document.createElement('label');
                gameSpecial.className = 'game-special';
                document.querySelector('.game-data-container').appendChild(gameSpecial);

                var gameSpecialInput = document.createElement('input');
                gameSpecialInput.className = 'speciale';
                gameSpecialInput.name = 'speciale';
                gameSpecialInput.type = 'checkbox';
                gameSpecialInput.checked = selectedSpecial;
                gameSpecial.appendChild(gameSpecialInput);

                var gameSpecialSpan = document.createElement('span');
                gameSpecialSpan.className = 'slider round';
                gameSpecial.appendChild(gameSpecialSpan);
            }
        }
        document.querySelector('.search-bar').classList.add('text-fade-out');
    }
    if(pointer == 1){
        document.querySelector('.next-button').addEventListener('click', nextEventListener);
        document.querySelector('.next-button').classList.add('button-clickable');
        document.querySelector('.next-button').classList.remove('button-unclickable');
        document.querySelector('.search-bar').onkeyup = filtraCitta;
        document.querySelector('.step-text').onanimationend = ()=>{
            document.querySelector('.step-text').innerHTML = 'Agli utenti potrebbe interessare la città in cui abiti. Ma forse, eh.';
            document.querySelector('.step-text').classList.remove('text-fade-out');
            document.querySelector('.step-text').classList.add('text-fade-in');
        }
        document.querySelector('.step-text').classList.add('text-fade-out');

        document.querySelector('.search-bar').onanimationend = ()=>{
            document.querySelector('.search-bar').placeholder = 'Titolo';
            document.querySelector('.search-bar').type = 'text';
            document.querySelector('.search-bar').removeAttribute('min');
            document.querySelector('.search-bar').removeAttribute('max');
            document.querySelector('.search-bar').removeAttribute('step');
            document.querySelector('.search-bar').value = selectedCity;
            document.querySelector('.search-bar').classList.remove('text-fade-out');
            document.querySelector('.search-bar').classList.add('text-fade-in');
        }
        document.querySelector('.search-bar').classList.add('text-fade-out');
    }

    const timeline = anime.timeline({
        duration: 500,
        easing: 'cubicBezier(.5, .05, .1, .3)'
    });
    timeline.add({
        targets: ".sun",
        d: [paths[pointer]]
    });
    for(let i=1; i<4; i++){
        document.querySelector('.step' + i).className = 'step' + i + ' steps-small';
    }
    document.getElementsByClassName('step' + (pointer+1))[0].classList.remove('steps-small');
    document.getElementsByClassName('step' + (pointer+1))[0].classList.add('steps-big');
}