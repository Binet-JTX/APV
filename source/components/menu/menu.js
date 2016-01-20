/********************************
Controller for the menu page
*********************************/

if (QueryString.id) {
    var menuId = QueryString.id;
}
else {
    window.location("../main-menu/main-menu.html");
}
if (QueryString.prev) {
    var prevMenu = QueryString.prev;
}
else {
    window.location("../main-menu/main-menu.html");
}
var menu = display.menu[menuId];
menu.pathPrefix = display.menu.pathPrefix;

//pure.js directive to fill in the image sources and other
var menuDisplayDirective = {
    '#titre@src': '#{pathPrefix}/#{title}',
    '#background@style': function(a) {
        return "background-image: url(" + this.pathPrefix + this.background + ");"
    },
    '.menu-section': {
        'section<-sections': {
            '.menu-section-poster@src': '#{pathPrefix}/#{section.poster}',
            '.menu-section-title': 'section.title',
            '.menu-section-link@href': function(a) {
                if (this.type == "projection") {
                    return "../projection/projection.html?prev="+menuId+"&id=" + this.id;
                } else if (this.type == "menu") {
                    return "../menu/menu.html?prev="+menuId+"&id=" + this.id;
                } else {
                    return "../main-menu/main-menu.html";
                }
            }
        }
    }
}

var displayDirective = {
    '#prevMenuImg@src' : '#{menu.pathPrefix}/#{common.accueil.main}',
    '#prevMenuImg_hover@src' : '#{menu.pathPrefix}/#{common.accueil.hover}',
    '#prevMenu@href' : function(a) {
        if (prevMenu == "main" || !prevMenu) {
            return "../main-menu/main-menu.html";
        } else {
            return "../menu/menu.html?id="+prevMenu;
        }
    },
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
