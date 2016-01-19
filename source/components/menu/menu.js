/********************************
Controller for the menu page
*********************************/

var menuId = QueryString.id;
var menu = display.menu[menuId];
menu.pathPrefix = display.menu.pathPrefix;

//pure.js directive to fill in the image sources and other
var menuDisplayDirective = {
    '#titre@src': '#{pathPrefix}/#{title}',
    '#back-to-intro@src': '#{pathPrefix}/#{backToIntro.main}',
    '#back-to-intro-hover@src': '#{pathPrefix}/#{backToIntro.hover}',
    '#background@style': function(a) {
        return "background-image: url(" + this.pathPrefix + this.background + ");"
    },
    '.menu-section': {
        'section<-sections': {
            '.menu-section-poster@src': '#{pathPrefix}/#{section.poster}',
            '.menu-section-title': 'section.title',
            '.menu-section-link@href+': function(a) {
                return this.id+"&prev="+menuId;
            }
        }
    }
}

var displayDirective = {
    '#zone-isolated@src': '#{menu.pathPrefix}/#{common.zone.isolated}',
    '.menu-section-play@src': '#{menu.pathPrefix}/#{common.play}'
};



//render the result
$('body').render(menu,menuDisplayDirective);
$('body').render(display, displayDirective);




//Navigation functions
var goToIntro = function() {
    window.location.href = "../intro/intro.html";
}

//FadeIn to mask the loading of the page elements
$(document).ready(function() {
        $('.slideshow').fadeIn(1000);
});
