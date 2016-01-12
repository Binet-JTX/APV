/**********************************
Controller for the projection page
***********************************/

//FadeIn to mask the loading of the page elements
$(document).ready(function() {
    $('.slideshow').fadeIn(1000);
});

//We select the relevant section of video data corresponding to the projection
//QueryString is given by queryString.js imported in the <head>
var projId = QueryString.id;
var projection = videos[projId];
var projectionDisplay = display.projection.projections[projId]
projectionDisplay.pathPrefix = display.projection.pathPrefix;

//pure.js directive to fill in the video sources and posters
var videosDirective = {
    '.slidemenu' : {
        'slide<-videos' : {
            '.projection-video': {
                'video<-slide': {
                    '.projection-video-poster@src': '#{posterPathPrefix}/#{video.poster}',
                    '.projection-video-title': 'video.title',
                }
            }
        }
    }

};

var displayDirective = {
    '#droite@src' : '#{projection.pathPrefix}/#{common.droite.main}',
    '#droite_hover@src' : '#{projection.pathPrefix}/#{common.droite.hover}',
    '#gauche@src' : '#{projection.pathPrefix}/#{common.gauche.main}',
    '#gauche_hover@src' : '#{projection.pathPrefix}/#{common.gauche.hover}',
    '#accueil@src' : '#{projection.pathPrefix}/#{common.accueil.main}',
    '#accueil_hover@src' : '#{projection.pathPrefix}/#{common.accueil.hover}',
    '#proj@src' : '#{projection.pathPrefix}/#{common.proj.main}',
    '#proj_hover@src' : '#{projection.pathPrefix}/#{common.proj.hover}',
    '#equipe@src' : '#{projection.pathPrefix}/#{common.equipe.main}',
    '#equipe_hover@src' : '#{projection.pathPrefix}/#{common.equipe.hover}',
    '#left_zone@src' : '#{projection.pathPrefix}/#{common.zone.left}',
};

var projectionDisplayDirective = {
    '.bkgd@style+': function(a) {
        return "background-image: url(" + this.pathPrefix + this.background + ");"
    },
    '#titre@src' : '#{pathPrefix}/#{titre}',
}

$('body').render(projection, videosDirective); //render the result
$('body').render(display, displayDirective);
$('body').render(projectionDisplay, projectionDisplayDirective);


/**********************************************
************** Breton's JS down here **********
**********************************************/

var menu = parseInt(QueryString.menu);
var appearTime = 250; //Temps d'apparition des boutons au deplacement dans le menu

var currentMenu = 0;
var currentTeam = 0;
var currentPage = 0;
if (menu >= 0 && menu < 5) {
    currentPage = 1;
    currentMenu = menu;
}
if (menu >= 10 && menu < 32) {
    currentPage = 2;
    currentTeam = menu - 10;
}


var goToMenu = function(i) {
    $('.slideshowmenu').cycle(i);
}


var goTo = function(i) {


    $('.slideshow').cycle(i);
}


var accesPage = function(page) {
    window.location = page;
}


$(document).ready(function() {
    $('.slideshow').fadeIn();
});



$(document).ready(function() {
    $('.slideshowmenu').cycle({

        slideResize: false,
        containerResize: false,
        after: onAfter,
        before: onBefore,
        next: '#next',
        prev: '#prev',
        fx: 'scrollHorz',
        speed: 500,
        timeout: 0,
        startingSlide: currentMenu
    });
});

$(document).ready(function() {
    $('.slideshow').cycle({

        slideResize: false,
        containerResize: false,
        fx: 'fade',
        speed: 500,
        after: onAfterGlobal,
        timeout: 0,
        startingSlide: currentPage
    });
});

function onBefore(curr, next, opts) {
    $('#prev')['hide']();
    $('#next')['hide']();
}

function onAfter(curr, next, opts) {
    currentMenu = opts.currSlide;


    $('#prev')[currentMenu == 0 ? 'hide' : 'show'](appearTime);
    $('#next')[currentMenu == opts.slideCount - 1 ? 'hide' : 'show'](appearTime);
    $('#introduction')['show'](appearTime);
    for (i = 0; i <= 5; i++) {
        var nom = "#goto" + i;
        $(nom)['show'](appearTime);
    }
}


function onAfterGlobal(curr, next, opts) {
    if (activeTeam) {
        switchTeam()
    }
    currentPage = opts.currSlide;
    if (currentPage != 2) {
        $('.slideshowteam').cycle(0);
    }
    if (currentPage != 1) {
        $('.slideshowmenu').cycle(0);
    }

}
