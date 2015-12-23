
window.onload = function(e) {
	$(".invisible").hide(1);
	var zones = ['topleft', 'midleft', 'botleft', 'topright', 'midright', 'botright', 'midmid', 'jeu1', 'jeu2', 'jeu3', 'jeu4', 'cdm', 'pokephotos'];
	for(var i = 0; i < zones.length; i ++) {
		var z = document.getElementById(zones[i] + "_desc");
		var r = document.getElementById(zones[i] + "_zone");
		if(z && r) {
			r = r.getBoundingClientRect();
			z.style.position="absolute";
			z.style.top = r.bottom.toString() + "px";
			if(zones[i] == "jeu3") {
				z.style.left = (r.left - 25).toString() + "px";
			} else if(zones[i] == "jeu4") {
				z.style.left = (r.left - 50).toString() + "px";
			} else {
				z.style.left = r.left.toString() + "px";
			}
		}
	}
}


function zone_mouseover(id) {
	$("#" + id + "_desc").css("zIndex", 4);
	$("#" + id + "_desc").slideDown();
	$("#" + id + "_sb").show();
}

function zone_mouseout(id) {
	$("#" + id + "_desc").css("zIndex", 3);
	$("#" + id + "_desc").slideUp();
	$("#" + id + "_sb").hide();
}