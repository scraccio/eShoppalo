window.onscroll = function() {check(); updateItems();};
var bannerHeight;
var header = document.querySelector('.search-bar');
if(window.innerWidth <= 800){
  document.querySelector('.banner-image > img').src = 'assets/img/mario.png';
}
else{
  document.querySelector('.banner-image > img').src = 'assets/img/characters1.png';
}

$(window).resize(function(){
  bannerHeight = $('.banner').height();
  featuredGridHeight = $('.featured-grid').height();
  if(window.innerWidth <= 800){
    document.querySelector('.banner-image > img').src = 'assets/img/mario.png';
  }
  else{
    document.querySelector('.banner-image > img').src = 'assets/img/characters1.png';
  }
});

function check() {
  featuredGridHeight = $('.featured-grid').height();
  //console.log(window.pageYOffset , bannerHeight , featuredGridHeight);
  //console.log(window.pageYOffset > bannerHeight + featuredGridHeight);
  if (window.pageYOffset > bannerHeight + featuredGridHeight){
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  if (window.pageYOffset > bannerHeight) {
    document.getElementsByClassName('title-ellipse')[0].classList.add('reduced');

    document.querySelector('.top-button').onanimationend = ()=>{
      document.querySelector('.top-button').classList.remove('text-fade-in');
    }
    document.querySelector('.top-button').classList.add('text-fade-in');
  }
  else {
    document.getElementsByClassName('title-ellipse')[0].classList.remove('reduced');

    document.querySelector('.top-button').classList.remove('text-fade-in');

    document.querySelector('.top-button').onanimationend = ()=>{
      document.querySelector('.top-button').classList.remove('text-fade-out');
    }
    document.querySelector('.top-button').classList.add('text-fade-out');
  }

  if (window.pageYOffset > bannerHeight && window.pageYOffset <= bannerHeight + featuredGridHeight) {
    if(document.getElementsByClassName('page-title')[0].innerHTML != document.getElementsByClassName('featured-text')[0].innerHTML){
      document.getElementsByClassName('page-title')[0].classList.add('page-title-animation');
      setTimeout(()=>{
        document.getElementsByClassName('page-title')[0].innerHTML = document.getElementsByClassName('featured-text')[0].innerHTML;
        document.getElementsByClassName('page-title')[0].classList.remove('page-title-animation');
      }, 100);
    }
  }
  else if(window.pageYOffset <= bannerHeight){
    document.getElementsByClassName('page-title')[0].classList.add('page-title-animation');
      setTimeout(()=>{
        document.getElementsByClassName('page-title')[0].innerHTML = '';
        document.getElementsByClassName('page-title')[0].classList.remove('page-title-animation');
      }, 100);
  }

  if (window.pageYOffset > bannerHeight + featuredGridHeight) {
    if(document.getElementsByClassName('page-title')[0].innerHTML != document.getElementsByClassName('featured-text')[1].innerHTML){
      document.getElementsByClassName('page-title')[0].classList.add('page-title-animation');
      setTimeout(()=>{
        document.getElementsByClassName('page-title')[0].innerHTML = document.getElementsByClassName('featured-text')[1].innerHTML;
        document.getElementsByClassName('page-title')[0].classList.remove('page-title-animation');
      }, 100);
    }
  }
}

function updateItems(){
  lastGridElement = document.getElementsByClassName('grid-element')[document.getElementsByClassName('grid-element').length-1];
  //console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
  //console.log((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
  //console.log(headerHeight, bannerHeight, featuredTextHeight);
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && !functionCalled && canRequest) {
    functionCalled = true;
    setTimeout(()=>{requestGames(42, document.querySelector('.search-bar > :first-child').value, document.getElementsByClassName('grid-element').length); functionCalled = false;}, 500);
  }
}