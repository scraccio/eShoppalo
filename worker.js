const puppeteer = require('puppeteer');
const { parentPort } = require('worker_threads');

async function chartScraper(url){
    parentPort.postMessage({type: 'messaggio', message: url});
    
    const browser = await puppeteer.launch();
    const pageCurrency = await browser.newPage();
    await pageCurrency.goto('https://www.google.com/search?q=usd+to+eur');
    var usdPrice = await pageCurrency.evaluate(()=>{
        return parseFloat(document.querySelector('.DFlfde.SwHCTb').textContent.replace(',','.'));
    });
    const page = await browser.newPage();
    await page.goto(url);
    
    var result = await page.evaluate(()=>{
        if(document.querySelectorAll('#games_table').length == 0){
            if(!document.querySelector('#search-page > :first-child')){
                var array = Array.from(document.querySelectorAll('.completed-auctions-used .js-price'));
                var avg = parseFloat(document.querySelector('#used_price .price.js-price').textContent.replaceAll(' ','').replaceAll('$',''));
                var title = document.querySelector('#product_name').textContent
                .replaceAll('\n','').replaceAll('Nintendo Switch','').replaceAll('PAL','').split(' ').filter(c => c != ' ' && c != '').join(' ');
                return ['array', array.map(el => parseFloat(el.textContent.replaceAll(' ','').replaceAll('$',''))), avg, title];
            }
            else{
                return ['none'];
            }
            
        }
        else{
            if(document.querySelectorAll('#search-page > p')[0].textContent.includes('0 results')){
                return ['none'];
            }
            var href = document.querySelectorAll('#games_table a')[0].href;
            return ['href', href];
        }
    });

    if(result[0] == 'none'){
        return {
            type: 'none'
        }
    }
    if(result[0] == 'array'){
        return {
            type: 'price',
            chartData: {
                array: result[1].map(el => el * usdPrice),
                avg: result[2],
                title: result[3]
            }
        }
    }
    if(result[0] == 'href'){
        await page.goto(result[1]);

        var result = await page.evaluate(()=>{
            var array = Array.from(document.querySelectorAll('.completed-auctions-used .js-price'));
            var avg = parseFloat(document.querySelector('#used_price .price.js-price').textContent.replaceAll(' ','').replaceAll('$',''));
            var title = document.querySelector('#product_name').textContent
            .replaceAll('\n','').replaceAll('Nintendo Switch','').replaceAll('PAL','').split(' ').filter(c => c != ' ' && c != '').join(' ');
            return ['array', array.map(el => parseFloat(el.textContent.replaceAll(' ','').replaceAll('$',''))), avg, title];
        });

        return {
            type: 'price',
            chartData: {
                array: result[1].map(el => el * usdPrice),
                avg: result[2],
                title: result[3]
            }
        }
    }
}

parentPort.on('message', async (message)=>{
    if(message[0] == 'chart'){
        var chartPrices = await chartScraper(message[1]);
        parentPort.postMessage(chartPrices);
    }
});