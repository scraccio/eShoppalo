function openMenu(){
    var menu = document.getElementsByClassName('header-menu')[0];
    if(menu.classList.contains('menu-visible')){
        menu.classList.remove('menu-visible');
    }
    else{
        menu.classList.add('menu-visible');
    }
}