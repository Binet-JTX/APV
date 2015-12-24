//pure.js directive to fill in the image sources
var imagesDirective = {
    '#zone-isolated@src': 'common.zone.isolated',
    '#background@style': function(a) {
        return "background-image: url(" + this.mainMenu.background + ");"
    },
    '#titre@src': 'mainMenu.title',
    '#back-to-intro@src': 'mainMenu.backToIntro.main',
    '#back-to-intro-hover@src': 'mainMenu.backToIntro.hover',
    '.main-menu-section': {
        'section<-mainMenu.sections': {
            '.main-menu-section-poster@src': 'section.poster',
            '.main-menu-section-play@src': 'common.play',
            '.main-menu-section-title': 'section.title'
        }
    }
};

$('body').render(images, imagesDirective); //render the result


//Navigation functions
var goToIntro = function() {
    $('body').load("source/components/intro/intro.html");
}

$(document).ready(function() {
        $('.slideshow').fadeIn(1000);
});
