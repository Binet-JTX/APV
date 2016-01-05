/********************************
Controller for the main menu page
*********************************/

//pure.js directive to fill in the image sources and other
var displayDirective = {
    '#zone-isolated@src': '#{mainMenu.pathPrefix}/#{common.zone.isolated}',
    '#background@style': function(a) {
        return "background-image: url(" + this.mainMenu.pathPrefix + this.mainMenu.background + ");"
    },
    '#titre@src': '#{mainMenu.pathPrefix}/#{mainMenu.title}',
    '#back-to-intro@src': '#{mainMenu.pathPrefix}/#{mainMenu.backToIntro.main}',
    '#back-to-intro-hover@src': '#{mainMenu.pathPrefix}/#{mainMenu.backToIntro.hover}',
    '.main-menu-section': {
        'section<-mainMenu.sections': {
            '.main-menu-section-poster@src': '#{mainMenu.pathPrefix}/#{section.poster}',
            '.main-menu-section-play@src': '#{mainMenu.pathPrefix}/#{common.play}',
            '.main-menu-section-title': 'section.title',
            '.main-menu-section-link@href+': 'section.id'
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
