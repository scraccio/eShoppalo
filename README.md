# eShoppalo
## Descrizione
eShoppalo è un marketplace di giochi usati per Nintendo Switch.<br>
Ogni utente registrato al sito sarà in grado di:
- Consultare il catalogo di giochi **in versione fisica** per Nintendo Switch
- Inserire un annuncio di vendita per uno o più giochi
- Ricevere una valutazione sul prezzo inserito
- Ricevere un suggerimento di prezzo calcolato in base al prezzo del nuovo, anno di uscita, condizioni, edizione speciale, prezzo medio dell'usato
- Contattare un venditore tramite la chat
- Cambiare le informazioni sul proprio account (nome, cognome, e-mail, password)

## Frontend
Il lato frontend del sito è stato realizzato tramite i seguenti componenti:
- **HTML** per lo scheletro della pagina statica e importazioni varie
- **CSS** per la gestione degli stili, delle animazioni e delle media query (responsiveness)
- **Bootstrap** per la gestione di alcuni elementi stilistici
- **OwlCarousel2** per la realizzazione di un carosello di responsive cards
- **JavaScript** per la gestione di funzioni ed algoritmi, per la manipolazione del DOM e per alcune responsabilità relative allo scrolling
- **JQuery** per una facilitata gestione delle chiamate asincrone AJAX al server (GET e POST) e per alcune funzioni (insertAfter, insertBefore)
- **Gauge.js** per la creazione di misuratori utili a capire la "convenienza" del prezzo inserito dall'utente
- **Chart.js** per la disposizione statica/dinamica di dati in forma di istogramma
- **Anime.js** per la gestione delle soft shapes in formato SVG

## Backend
- **NodeJS** per supportare express e per usufruire di componenti aggiuntive (elencate sotto)
- **Handlebars** per la gestione di pagine template, in particolare la pagina del gioco
- **Worker Threads** per avviare lo scraping dei prezzi su un thread a parte (e non appesantire il sito)
- **ExpressJS** per la gestione dell'applicazione, delle chiamate AJAX (GET e POST) e del routing
- **MongoDB** per conservare i dati relativi ai giochi, agli utenti e agli annunci
- **Puppeteer** per eseguire lo scraping da PriceCharting.com, tramite il quale è possibile fare delle statistiche

## Prerequisiti
1. Un package manager (ad esempio npm)
2. NodeJS per avviare il programma
3. (Opzionale) Nodemon per riavviare il server automaticamente al momento del salvataggio
4. Un database MongoDB, che sarà riempito automaticamente con il catalogo di giochi Switch grazie a delle [API non ufficiali](https://nintendo-switch-eshop.vercel.app/docs/Welcome)
5. Installare sul proprio terminale linux il pacchetto chromium tramite il comando
```
sudo apt-get install chromium
```

## Installazione
1. Per utilizzare eShoppalo, per prima cosa si dovrà clonare la repository.<br>
2. Tramite un Package Manager (ad esempio <code>npm</code>), è possibile installare tutte le dipendenze necessarie con il comando <code>npm i</code>.
3. Fatto ciò, sarà necessario creare un file di configurazione chiamato <code>config.json</code> all'interno della root del progetto. Questo file dovrà contenere un oggetto JSON nel seguente formato:<br>
```json
{
"database":{
  "host": "<NOME_HOST>"
  "username": "<NOME_UTENTE>",
  "password": "<PASSWORD>",
  "options": "<OPZIONI>"
},
"port": 5000
}
```
Le informazioni tra doppi apici si recuperano con dalla propria piattaforma MongoDB, nella sezione `Connect > Connect with the MongoDB Shell`. Il sito fornirà un url con le informazioni necessarie: l'utente dovrà recuperare le singole informazioni e inserirle nel file `config.json`</code>.<br>
La porta 5000 è solo un esempio.<br>

## Avvio
Avviare l'applicazione tramite il comando `node ./server.js` oppure `nodemon ./server.js`.<br>
A questo punto il sito sarà hostato in locale, ed è possibile raggiungerlo tramite l'url `localhost:<PORTA>`.
