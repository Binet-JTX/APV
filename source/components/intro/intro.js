//Simple function called after the intro video to redirect to main menu
var goToMenu = function() {;
    $('body').load("source/main-menu.html");
}

//pure.js directive to fill in the intro video source
var introDirective = {
       '#intro-video-src@src':'intro.src'
 };

 $p('body').render( videos, introDirective );  //render the result
