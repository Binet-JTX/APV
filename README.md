# APV2013
Site HTML/JS de présentation de l'APV 2013.

## APV-Encoder

Script d'encodage basé sur `ffmpeg` et sa librairie `libx264` permettant une compression efficace des vidéos de l'APV basée sur une politique de qualité constante. L'encodeur prend en argument un dossier contenant des vidéos et la taille désirée pour ce dossier une fois les vidéos encodées. Il fonctionne en trois passes :
* la première encode les vidéos à qualité constante (option `-crf`) ;
* la deuxième passe récupère la taille et le débit des vidéos à qualité constante et utilise ces informations pour déterminer le débit moyen d'encodage de chacune des vidéos du dossier ; les vidéos sont donc réencodées une deuxième fois mais cette passe ne produit pas de fichiers, juste des informations exploitées par la trosième passe ;
* la troisième passe qui correspond à la deuxième passe du deuxième encodage réalise l'encodage effectif des vidéos à l'aide du débit moyen déterminé et des informations locales produites par la deuxième passe.

L'effet de ce système est que le débit est doublement modulé afin de garantir l'uniformité de la qualité de l'image :
* si une vidéo « bouge plus » qu'une autre, son débit moyen sera plus élevé (grâce aux deux encodages successifs);
* à l'intérieur d'une vidéo, les passages qui « bougent plus » auront un débit local plus élevé que les passages fixes (grâce aux deux passes du deuxième encodage). 
