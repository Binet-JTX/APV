/********************************
Controller for the main menu page
*********************************/

//pure.js directive to fill in the image sources and other
var displayDirective = {
    '#zone-isolated@src': '#{common.pathPrefix}/#{common.zone.isolated}',
    '#background@style': function(a) {
        return "background-image: url(" + this.menu.main.pathPrefix + this.menu.main.background + ");"
    },
    '#titre@src': '#{menu.main.pathPrefix}/#{menu.main.title}',
    '#back-to-intro@src': '#{menu.main.pathPrefix}/#{menu.main.backToIntro.main}',
    '#back-to-intro-hover@src': '#{menu.main.pathPrefix}/#{menu.main.backToIntro.hover}',
    '#apj@src' : '#{credits.pathPrefix}/#{credits.apj}'
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
