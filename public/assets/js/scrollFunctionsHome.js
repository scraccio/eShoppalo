window.onscroll = function() {check();};

var header = document.getElementsByClassName("search-bar")[0];

var sticky = header.offsetTop;
var headerHeight = document.getElementsByClassName('header')[0].offsetHeight;
var bannerHeight = document.getElementsByClassName('banner')[0].offsetHeight;
var featuredTextHeight = document.getElementsByClassName('featured-text')[0].offsetHeight;
var image = document.getElementsByClassName('used-image')[0];

function check() {
  if (window.pageYOffset > (headerHeight + bannerHeight)/3) {
    image.classList.add("used-image-visible");
  }
}