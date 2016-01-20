/********************************
Controller for the main menu page
*********************************/

//pure.js directive to fill in the image sources and other
display.menu.main.pathPrefix = display.menu.pathPrefix;
var displayDirective = {
    '#zone-isolated@src': '#{menu.main.pathPrefix}/#{common.zone.isolated}',
    '#background@style': function(a) {
        return "background-image: url(" + this.menu.main.pathPrefix + this.menu.main.background + ");"
    },
    '#titre@src': '#{menu.main.pathPrefix}/#{menu.main.title}',
    '#back-to-intro@src': '#{menu.main.pathPrefix}/#{menu.main.backToIntro.main}',
    '#back-to-intro-hover@src': '#{menu.main.pathPrefix}/#{menu.main.backToIntro.hover}',
    '.main-menu-section': {
        'section<-menu.main.sections': {
            '.main-menu-section-poster@src': '#{menu.main.pathPrefix}/#{section.poster}',
            '.main-menu-section-play@src': '#{menu.main.pathPrefix}/#{common.play}',
            '.main-menu-section-title': 'section.title',
            '.main-menu-section-link@href': function(a) {
                if (this.type == "projection") {
                    return "../projection/projection.html?prev=main&id=" + this.id;
                } else if (this.type == "menu") {
                    return "../menu/menu.html?prev=main&id=" + this.id;
                } else {
                    return "../main-menu/main-menu.html";
                }
            }
        }
    }
};

$('body').render(display, displayDirective); //render the result


//Navigation functions
var goToIntro = function() {
    window.location.href = "../intro/intro.html";
}

//FadeIn to mask the loading of the page elements
$(document).ready(function() {
    $('.slideshow').fadeIn(1000);
});
