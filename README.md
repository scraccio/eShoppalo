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
