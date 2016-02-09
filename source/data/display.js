var display = {
    "intro": {
        "pathPrefix": "../../images/intro",
        "skipIntro": "skip_intro.png"
    },
    "menu": {
        "main": {
            "pathPrefix": "../../images/menus/main/",
            "background": "background.jpg",
            "title": "titre.png",
            "backToIntro": {
                "main": "back_to_intro.png",
                "hover": "back_to_intro_hover.png"
            },
            "sections": [{
                "type": "menu",
                "poster": "01-ProjJtx.png",
                "title": "Projections JTX",
                "id": "jtx"
            }, {
                "type": "menu",
                "poster": "02-VieDePromo.png",
                "title": "Vie de Promo",
                "id": "promo"
            }, {
                "type": "menu",
                "poster": "03-Evenements.png",
                "title": "Événements",
                "id": "evenements"
            }, {
                "type": "projection",
                "poster": "04-Interview.png",
                "title": "Interviews",
                "id": "interviews"
            }, {
                "type": "menu",
                "poster": "05-Binets.png",
                "title": "Binets",
                "id": "binets"
            }, {
                "type": "menu",
                "poster": "06-Sections.png",
                "title": "Sections",
                "id": "sections"
            }]
        },
        "jtx": {
            "pathPrefix": "../../images/menus/jtx/",
            "background": "background.jpg",
            "prev": "main",
            "title": "titre.png",
            "sections": [{
                "type": "projection",
                "poster": "jtx2012juin.png",
                "title": "Aproj' du 18 juin",
                "id": "jtx2012juin"
            },
            {
                "type": "projection",
                "poster": "jtx2012novembre.png",
                "title": "Proj'de passation du JTX 2012",
                "id": "jtx2012novembre"
            },
            {
                "type": "projection",
                "poster": "jtx2013fevrier.png",
                "title": "Des traditions à l'anarchie",
                "id": "jtx2013fevrier"
            },
            {
                "type": "projection",
                "poster": "jtx2013juin.png",
                "title": "Action !",
                "id": "jtx2013juin"
            }]
        }
    },
    "projection": {
            "jtx2012juin": {
                "pathPrefix": "../../images/projections/jtx2012juin/",
                "titre": "titre.png",
                "prev": "jtx",
                "background": "background.png"
            },
            "jtx2012novembre": {
                "pathPrefix": "../../images/projections/jtx2012novembre/",
                "titre": "titre.png",
                "prev": "jtx",
                "background": "background.png"
            },
            "jtx2013fevrier": {
                "pathPrefix": "../../images/projections/jtx2013fevrier/",
                "titre": "titre.png",
                "prev": "jtx",
                "background": "background.png"
            },
            "jtx2013juin": {
                "pathPrefix": "../../images/projections/jtx2013juin/",
                "titre": "titre.png",
                "prev": "jtx",
                "background": "background.png"
            }
    },
    "credits" : {
        "pathPrefix" : "../../images/credits/",
        "apj" : "Photo_APJ_APV.jpg"
    },
    "common": {
        "pathPrefix" : "../../images/common/",
        "zone": {
            "isolated": "zone_isole.png",
            "left": "zone_gauche.png",
            "right": "zone_droite.png",
            "center": "zone_centre.png"
        },
        "play": "play.png",
        "droite": {
            "main": "droite.png",
            "hover": "droite_hover.png"
        },
        "gauche": {
            "main": "gauche.png",
            "hover": "gauche_hover.png"
        },
        "accueil": {
            "main": "accueil.png",
            "hover": "accueil_hover.png"
        },
        "proj": {
            "main": "proj.png",
            "hover": "proj_hover.png"
        },
        "equipe": {
            "main": "equipe.png",
            "hover": "equipe_hover.png"
        }
    }
}
