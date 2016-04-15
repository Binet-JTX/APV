#! /bin/bash

welcome_message() {
    clear
    echo "\
=========================================================
======= Patch ADD pour l' APV 2013 : v1.0 -> v1.1 =======
=========================================================

Afin de mettre à jour les fichiers de ton APV, indique
l'emplacement où est montée ta clé USB (ou l'emplacement)
du dossier de l'APV sur ton disque dur.

Pour connaître l'emplacement, rends-toi dans le dossier
de l'APV avec ton explorateur de fichiers (là où est le
fichier 'APV_2013.hmtml'). Appuie ensuite sur CTRL+L pour
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
    else
        wrong_location
    fi
}

wrong_location() {
    echo "\
L'emplacement que tu as choisi ne contient pas l'APV.
Cela devrait ressembler à '/media/utilisateur/APV2013' si
tu utilises la clé USB.
"
choose_apv_dir
}

copyfiles() {

}

#Main execution
welcome_message
