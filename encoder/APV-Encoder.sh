#!/bin/bash
if [ -z $1 -o -z $2 ]; then
    exit 1
fi

#Parameters
folder_to_encode=$1
desired_size=$(echo "$2*10^6" | bc)
video_quality_factor="28"
audio_bitrate=$(echo "192*10^3" | bc)

#Deals with complex file names
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

#The first loop : encodes with constant quality
mkdir "$folder_to_encode/constant_quality_output"
total_size=0
for video in $(find "$folder_to_encode" -maxdepth 1 -type f -name "*.mp4")
do
    filename=$(basename $video)
    ffmpeg -i "$video" -c:v libx264 -preset medium -crf $video_quality_factor -pix_fmt yuv420p -threads 0 -c:a copy -y "$folder_to_encode/constant_quality_output/$filename"
    size=$(ffprobe -v error -show_entries format=size -of default=noprint_wrappers=1:nokey=1 "$folder_to_encode/constant_quality_output/$filename")
    total_size=$(($total_size + $size))
done

echo "[$folder_to_encode]: encodage à qualité constant effectué." >> APV-Encoder.log

#The second loop : encodes the whole to respect size limit
mkdir "$folder_to_encode/encoding_final_output"
for video in $(find "$folder_to_encode" -maxdepth 1 -type f -name "*.mp4")
do
    filename=$(basename "$video")
    if [ -f "$folder_to_encode/constant_quality_output/$filename" ]; then
        constant_quality_bitrate=$(ffprobe -v error -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 "$folder_to_encode/constant_quality_output/$filename")
        video_bitrate=$(echo "($desired_size*$constant_quality_bitrate)/$total_size-$audio_bitrate" | bc )
        ffmpeg -i "$video" -codec:v libx264 -profile:v high -preset veryslow -b:v $video_bitrate -threads 0 -pass 1 -an -f mp4 -y /dev/null
        ffmpeg -i "$video" -strict -2 -c:v libx264 -preset veryslow -b:v $video_bitrate -threads 0 -pass 2 -c:a aac -b:a $audio_bitrate -y "$folder_to_encode/encoding_final_output/$filename"
    else
        echo $(printf "Erreur : fichier %s non trouve dans le dossier %s/constant_quality_output !" "$filename" "$folder_to_encode")
    fi
done

echo "[$folder_to_encode]: encodage final effectué." >> APV-Encoder.log

#Delete temporary files
rm -rf "$folder_to_encode/constant_quality_output"

#Restores filename dealing configuration
IFS=$SAVEIFS
