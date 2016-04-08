# APV2013

Répertoire du code de présentation de et production de l'APV 2013.

## Scripts

### APV-Encoder

Le script `utilities/encoder/APV-Encoder.sh` nécessite d'avoir installé `ffmpeg` et `ffprobe` (version supérieure à 2.7.2). Le principe de l'encodage est décrit [ici](http://wikix.polytechnique.org/APV/Dossier_de_passation/Encodage). Le script s'utilise de la manière suivante :

    ./APV-Encoder.sh <chemin vers le dossier à encoder> <taille finale désirée en Mo>

À noter que le script n'encode que les vidéos déjà au format `.mp4`.

### APV-PosterExtractor

Une des tâches les plus chronophages est de générer les menus des projections car il faut donner un titre et un poster à chaque vidéo. Un script permet de semi-automatiser le travail, c'est `utilities/posters/APV-PosterExtractor.sh` qui nécessite d'avoir installé VLC et ImageMagick (commande `convert`). Il s'utilise par la commande suivante sur un dossier contenant la projection dont on veut générer le menu :

    ./APV-PosterExtractor.sh <nom du dossier de la projection>

Le script parcoure toutes les vidéos `.mp4` do dossier et pour chacune :
* lance sa lecture dans VLC ;
* demande sur un prompt le timestamp (au format `mm:ss`) de la frame que l'on veut utiliser comme poster ;
* demande sur un prompt le titre de la vidéo telle qu'il apparaîtra dans le menu.
À partir de cela, le script génère dans le dossier de la projection un dossier `posters` contenant les images extraites redimensionnées et un fichier `.json` contenant pour chaque vidéo l'objet :

      {
        "poster": "<nom du fichier du poster>",
        "src": "<nom du fichier de la vidéo>",
        "title": "<titre de la vidéo>"
      };

Une fois le dossier de vidéos terminé, il ne reste plus qu'à copier-coller le dossier de posters dans `source/images/posters/<nom de la projection>/` et inclure le contenu du fichier `.json` dans la propriété `video` de l'objet projection désiré dans `source/data/videos.js`.

### APV-Copy

Le dossier `utilities/copy` contient tous les scripts nécessaires à la mise en place d'une copie massive de l'APV sur des clés USB branchées sur les 150 ordis des salles infos de l'X.

Attention, seul un magicien du `ssh` et du `screen` sera en mesure d'exécuter la manœuvre en attendant que le respo copie 2013 fasse son dossier de passation.
