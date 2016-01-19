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

/*
Function to determine the type of menu : single-slide, two-slide of more than two slides.
*/
if (projection.videos.length == 1) {
    var type = "single";
} else if (projection.videos.length == 2) {
    var type = "double"
} else {
    var type = "multiple"
}

/*
PureJS directive to fill the slides and the video html elements
*/
var videosDirective = {
    '.slidemenu' : {
        'slide<-videos' : {
            //The function below aims to give the right background image
            //for the slide depending on the type of menu and the position
            //of the slide
            '.imgzoneimg@class+' : function(a) {
                if (type=="single") {
                    return " isolated_zone";
                } else if (type=="double") {
                    if (a.pos == 0) {
                        return " left_zone";
                    } else {
                        return " right_zone"
                    }
                } else {
                    if (a.pos == 0) {
                        return " left_zone";
                    } else if (a.pos < this.length-1) {
                        return " isolated_zone";
                    } else {
                        return " right_zone"
                    }
                }
            },
            '.projection-video': {
                'video<-slide': {
                    '.projection-video-poster@src': '#{posterPathPrefix}/#{video.poster}',
                    '.projection-video-title': 'video.title',
                }
            }
        }
    }

};

/*
PureJSDirective to display graphical elements on the page that don't
depend on the current projection
*/
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
    '.playbutton@src' : '#{projection.pathPrefix}/#{common.play}'
};
//Depending on the number of slides, we do not display the same background
if (type=="single") {
    displayDirective['.isolated_zone@src'] ='#{projection.pathPrefix}/#{common.zone.isolated}';
} else if (type="double") {
    displayDirective['.left_zone@src'] ='#{projection.pathPrefix}/#{common.zone.left}';
    displayDirective['.right_zone@src'] ='#{projection.pathPrefix}/#{common.zone.right}';
} else {
    displayDirective['.isolated_zone@src'] ='#{projection.pathPrefix}/#{common.zone.isolated}';
    displayDirective['.left_zone@src'] ='#{projection.pathPrefix}/#{common.zone.left}';
    displayDirective['.right_zone@src'] ='#{projection.pathPrefix}/#{common.zone.right}';
}

/*
PureJS directive to display graphical elements related to the current projection
*/
var projectionDisplayDirective = {
    '.bkgd@style+': function(a) {
        return "background-image: url(" + this.pathPrefix + this.background + ");"
    },
    '#titre@src' : '#{pathPrefix}/#{titre}',
}

/*
PureJS commands to render the template according to the directives above
*/
$('body').render(projection, videosDirective); //render the result
$('body').render(display, displayDirective);
$('body').render(projectionDisplay, projectionDisplayDirective);


/*
Slideshow controller : uses the slideshow plugin to animate the slides
*/
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
        startingSlide: 0
    });
});

function onBefore(curr, next, opts) {
    $('#prev')['hide']();
    $('#next')['hide']();
}

var appearTime = 250;
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
