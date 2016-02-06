#!/bin/bash
if [ -z $1 -o -z $2 ]; then
    exit 1
fi


#Parameters
videos_folder=$1
posters_folder=$2

echo $videos_folder
echo $posters_folder

#Deals with complex file names
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

#The first loop : encodes with constant quality
for video in $(find "$videos_folder" -maxdepth 1 -type f -name "*.mp4")
do
    filename=$(basename $video)
    poster="$posters_folder${filename%.mp4}.png"
    echo $poster
    nohup vlc $video &>/dev/null &
    read -p "Timestamp de la frame sous la forme mm:ss : " instant
    ffmpeg -i "$video" -ss 00:$instant -vframes 1 -y "$poster"
    convert "$poster" -resize 250x444 "$poster"
done


#Restores filename dealing configuration
IFS=$SAVEIFS
