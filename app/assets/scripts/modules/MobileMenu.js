import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.siteHeader = $('.site-header');
        this.menuIcon = $('.burger-icon');
        this.menuContent = $('.site-header__menu-content');
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleMenu.bind(this));
    }

    toggleMenu() {
        this.menuContent.toggleClass('site-header__menu-content--is-visible');
        this.siteHeader.toggleClass('site-header--expanded');
        this.menuIcon.toggleClass('burger-icon--close-x');
    }

}

export default MobileMenu;