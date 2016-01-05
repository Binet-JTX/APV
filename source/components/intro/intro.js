//Simple function called after the intro video to redirect to main menu
var goToMenu = function() {;
    window.location.href = "../main-menu/main-menu.html";
}

//pure.js directive to fill in the intro video source
var introVideosDirective = {
    '#intro-video-src@src': '#{intro.pathPrefix}/#{intro.src}'
};
var introImagesDirective = {
    '#skip-intro-image@src' : '#{intro.pathPrefix}/#{intro.skipIntro}'
}

$p('body').render(images, introImagesDirective);
$p('body').render(videos, introVideosDirective); //render the result
