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
    '.projection-video': {
        'video<-videos': {
            '.projection-video-poster@src': '#{posterPathPrefix}/#{video.poster}',
            '.projection-video-title': 'video.title',
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



/*---------------------------------------------------

                Bloc de navigation

----------------------------------------------------*/
var baseNumeroVideos = 2000;
var activeIntro = false;
var activeTeam = false;

var hasIntro = [2, 5, 13, 15, 17, 21, 23, 25, 27, 29, 31, 33, 35, 38, 40, 42, 44, 46, 49, 55];
var inTeam = [ //inTeam[i] donne la page de Team pour acceder a i
    22, -1, 0, 8, -1, 0, 0, 0, 0, 1, 1,
    9, -1, 16, -1, 10, -1, 17, 18, 17, -1,
    11, -1, 19, -1, 11, -1, 20, -1, 11, -1,
    19, -1, 20, -1, 1, 8, -1, 0, -1, 21, -1, 21, -1, 12, -1, 0, 0, -1, 21, 1,
    14, 18, 0, -1, 14, 13, 13, 15, 5, 14
]


var loadVideo = function(i, continuer) { //cont=2 pour juste lire l'intro et la vidéo puis s'arrêter
    if (activeTeam && continuer != 1) {
        loadTeam(i);
        return;
    }
    var offset = [activeIntro && hasIntro.indexOf(i) > -1 ? 1 : 0];

    if (continuer == 1) {
        window.location = 'video.html?id=' + (baseNumeroVideos + i - offset) + "&cont=1&origin=dvd-2&menu=-1";
    } else {
        window.location = 'video.html?id=' + (baseNumeroVideos + i - offset) + "&cont=" + (2 * offset) + "&origin=dvd-2&menu=" + currentMenu;
    }
}


var randomize = function(i) {
    if (i == 1) {
        var pageRandom = Math.floor((Math.random() * 22));
        goToTeam(pageRandom);
    } else if (i == 2) {
        var videoRandom = Math.floor((Math.random() * 60) + 1);
        loadVideo(videoRandom, 0);
    } else if (i == 3) {
        $('.slideshowteam').cycle('destroy');
        $(document).ready(function() {
            $('.slideshowteam').cycle({
                after: onAfterTeam,
                slideResize: false,
                containerResize: false,
                fx: 'all',
                speed: 500,
                timeout: 0,
                startingSlide: 0
            });
        });
    } else {}
}


var accesPage = function(page) {
    window.location = page;
}

function switchIntro() {
    activeIntro = !activeIntro;
    if (activeIntro) {
        document.getElementById("intro").src = "Images/intro_on.png";
    } else {
        document.getElementById("intro").src = "Images/intro.png";
    }
}


$(document).ready(function() {
    $('.slideshow').fadeIn();
});

var loadImage = function(i) {
    var real = document.getElementById("photo_" + i).getAttribute("srcrl");
    if (real != document.getElementById("photo_" + i).src) {
        document.getElementById("photo_" + i).src = real;
    }
}

var unloadAllImages = function() {
    $('.lb-overlay img').each(function() {
        $(this).attr('src', "");
    });
}


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

$(document).ready(function() {
    $('.slideshowteam').cycle({
        after: onAfterTeam,
        slideResize: false,
        containerResize: false,
        fx: 'fade',
        speed: 300,
        timeout: 0,
        startingSlide: currentTeam
    });
});


function onBefore(curr, next, opts) {
    $('#prev')['hide']();
    $('#next')['hide']();
    $('#goto0')['hide']();
    $('#goto1')['hide']();
    $('#goto2')['hide']();
    $('#goto3')['hide']();
    $('#goto4')['hide']();
    $('#goto5')['hide']();
    $('#introduction')['hide']();
}

function onAfter(curr, next, opts) {
    currentMenu = opts.currSlide;

    for (i = 1; i <= 5; i++) {
        var nom = "goto" + i;
        document.getElementById(nom).getElementsByTagName('img')[0].src = "Images/bouton.png";
    }
    document.getElementById('goto' + (currentMenu + 1)).getElementsByTagName('img')[0].src = "Images/bouton_on.png";


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
