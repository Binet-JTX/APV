/******************************
Controller for the video player
*******************************/

/*
Retrieving the parameters if they exist
*/
if (QueryString.prev == undefined
    ||QueryString.prevPrev == undefined
    || QueryString.proj == undefined
    ) {
    window.location = "../main-menu/main-menu.html";
} else {
    var prevMenu = QueryString.prev;
    var projMode = (QueryString.proj === 'true');
    var prevPrevMenu = QueryString.prevPrev;
}

/*
Display a nice error message in case of error
*/
var displayError = function() {
    document.getElementById('current-video').style.display = "none";
    document.getElementById('alternat').style.display = "block";
}
$(document).ready(function() {
    var errorDirective = {
        '#video-src@onerror': "displayError()"
    };
    $('body').render({}, errorDirective);
})


if (projMode) {
    /*
    The player reads all the videos in the projection one after the otherwise
    then reverts to the projection menu
    */
    if (videos[prevMenu] == undefined) {
        window.location = "../main-menu/main-menu.html";
    }
    var videosToPlay = videos[prevMenu].videos;
    var pathPrefix = videos[prevMenu].videoPathPrefix;
    var currentVideoIndex = 0;
    var videoSrcDirective = {
        '#video-src@src': pathPrefix+videosToPlay[0].src
    };
    $('body').render({}, videoSrcDirective);

    var onEndedVideo = function() {
        currentVideoIndex++;
        if (currentVideoIndex == videosToPlay.length) {
            window.location = "../projection/projection.html?id="+prevMenu+"&prev="+prevPrevMenu;
        } else {
            var videoSrcDirective = {
                '#video-src@src': pathPrefix+videosToPlay[currentVideoIndex].src
            };
            $('body').render({}, videoSrcDirective);
        }
    }
} else {
    /*
    The player reads one video then reverts to the associated projection menu
    */
    if (QueryString.src == undefined) {
        window.location = "../projection/projection.html?id="+prevMenu+"&prev="+prevPrevMenu;
    }
    var videoSrc = QueryString.src;
    var videoSrcDirective = {
        '#video-src@src': videoSrc
    };
    $('body').render({}, videoSrcDirective);

    var onEndedVideo = function() {
        if (QueryString.prevSlide != undefined) {
            var prevSlide = QueryString.prevSlide;
        } else {
            var prevSlide = 0;
        }
        window.location = "../projection/projection.html?id="+prevMenu+"&prev="+prevPrevMenu+"&slide="+prevSlide;
    }
}
