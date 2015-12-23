// JavaScript Document

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

function changerWEBM(obj){
	document.getElementById('video-src').src = obj.dataset.videoUrl;
	document.getElementById('current-video-title').innerHTML = obj.dataset.videoTitle;
	var video = document.getElementById('current-video');
	video.load();
    video.play();
}

function initPlayList() {
	var myVideo = document.getElementById('current-video');
	myVideo.addEventListener('ended', myNewSrc, false);
}

function myNewSrc() {
	var found = false;
	var elems = document.getElementById('video-list').getElementsByTagName('div');
    for(var i = 0; i < elems.length; i++) {
		var elem = elems[i];
		if (found) {
			document.getElementById('video-src').src = elem.dataset.videoUrl;
			document.getElementById('current-video-title').innerHTML = elem.dataset.videoTitle;
            this.load();
            this.play();
			break;
		}

		if (elem.dataset.videoUrl !== undefined && basename(elem.dataset.videoUrl) == basename(document.getElementById('video-src').src)) {
			found = true;
		}
	}
}

function lancer_proj(){
	/*var elems = document.getElementById('video-list').getElementsByTagName('div');
	var elem = elems[0];
	document.getElementById('video-src').src = elem.dataset.videoUrl;
	document.getElementById('current-video-title').innerHTML = elem.dataset.videoTitle;
	this.load();
	this.play();*/
	
	var elems = document.getElementById('video-list').getElementsByTagName('div');
	elem = elems[0];
	document.getElementById('video-src').src = elem.dataset.videoUrl;
	document.getElementById('current-video-title').innerHTML = elem.dataset.videoTitle;
	var video = document.getElementById('current-video');
	video.load();
    video.play();
	
	initPlayList();
	document.getElementById('current-video').autoplay='true';
	
}

function basename(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

initPlayList();