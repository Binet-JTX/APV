#! /bin/bash

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

welcome_message() {
    clear
    echo "\
=========================================================
======= Patch ADD pour l' APV 2013 : v1.0 -> v1.1 =======
=========================================================

Afin de mettre à jour les fichiers de ton APV, indique
l'emplacement où est montée ta clé USB (ou l'emplacement)
du dossier de l'APV sur ton disque dur.

Le patch de l'APV nécessite 7,2 Go d'espace supplémentaire
sur la clé USB ou le disque dur où ets stocké l'APV, vérifie
la place restante avant de lancer le patch. Appuie sur Ctrl+C
pour quitter le patch.

Pour connaître l'emplacement, rends-toi dans le dossier
de l'APV avec ton explorateur de fichiers (là où est le
fichier 'APV_2013.html'). Appuie ensuite sur CTRL+L pour
que l'emplacement s'affiche et copie-colle le ci-dessous.
"
    choose_apv_dir
}

choose_apv_dir() {
    read -p "Emplacement : " apv_dir
    echo ""
    if [ -e $apv_dir/APV_2013.html ]
    then
        copy_files $apv_dir
        end_message
    else
        wrong_location_APV
    fi
}

wrong_location_APV() {
    echo "\
L'emplacement que tu as choisi ne contient pas l'APV.
Cela devrait ressembler à '/media/utilisateur/APV2013' si
tu utilises la clé USB.
"
choose_apv_dir
}

copy_files() {
    apv_dir=$1

    tput sc
    echo "Correction du son sur les interviews..."
    rsync -azhr --info=progress2 "$script_dir/contents/Interviews/" "$apv_dir/04-Interviews/"
    tput rc
    tput ed
    echo "Correction du son sur les interviews... [OK]"

    tput sc
    echo "Copie des vidéos de l'ADD..."
    rsync -azhr --info=progress2 "$script_dir/contents/ADD/" "$apv_dir/08-ADD/"
    tput rc
    tput ed
    echo "Copie des vidéos de l'ADD... [OK]"

    tput sc
    echo "Copie des bonus supplémentaires..."
    rsync -azhr --info=progress2 "$script_dir/contents/Bonus-officiel/" "$apv_dir/07-Bonus/Bonus-JTX/"
    rsync -azhr "$script_dir/contents/Bonus-cache/" "$apv_dir/source/utils/js/" > /dev/null
    tput rc
    tput ed
    echo "Copie des bonus supplémentaire... [OK]"

    tput sc
    echo "Copie des vidéos des écoles d'officiers..."
    rsync -azhr --info=progress2 "$script_dir/contents/Proj_gendarmerie/" "$apv_dir/02-Vie_de_promo/2013-11_Ecole_officiers/2013-11_EOGN/"
    rsync -azhr --info=progress2 "$script_dir/contents/Theatre_Coet/" "$apv_dir/02-Vie_de_promo/2013-11_Ecole_officiers/2013-11_Coet/"
    rsync -azhr --info=progress2 "$script_dir/contents/Vaneau_navale/" "$apv_dir/02-Vie_de_promo/2013-11_Ecole_officiers/2013-11_Navale/"
    tput rc
    tput ed
    echo "Copie des vidéos des écoles d'officiers... [OK]"

    tput sc
    echo "Copie des nouveaux clips binets..."
    rsync -azhr --info=progress2 "$script_dir/contents/Binets/" "$apv_dir/05-Binets/"
    tput rc
    tput ed
    echo "Copie des nouveaux clips binets... [OK]"

    tput sc
    echo "Copie de la campagne Kès des 2014..."
    rsync -azhr --info=progress2 "$script_dir/contents/Campagne_Kes_X2014/" "$apv_dir/02-Vie_de_promo/2015-11_Campagne_Kes_X2014/"
    tput rc
    tput ed
    echo "Copie de la campagne Kès des 2014... [OK]"

    tput sc
    echo "Copie des nouveaux menus de présentation..."
    rsync -azhr --info=progress2 "$script_dir/contents/source/" "$apv_dir/source/"
    tput rc
    tput ed
    echo "Copie des nouveaux menus de présentation...[OK]"
}

end_message () {
    echo "\

La mise à jour de l'APV est terminée !"
}

#Main execution
welcome_message
