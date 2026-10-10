#!/bin/sh
# Synthetic city ambience (rain-wet street hiss + low traffic rumble + distant crowd murmur). No speech, no music, no third-party samples.
cd "$(dirname "$0")"
ffmpeg -y -f lavfi -i "anoisesrc=d=7:c=brown:r=48000:a=0.5" -f lavfi -i "anoisesrc=d=7:c=pink:r=48000:a=0.5" -f lavfi -i "anoisesrc=d=7:c=white:r=48000:a=0.5" \
 -filter_complex "[0]lowpass=f=180,volume=1.6[rumble];[1]bandpass=f=700:w=600,tremolo=f=0.3:d=0.4,volume=0.5[crowd];[2]highpass=f=4000,lowpass=f=9000,volume=0.07[rain];[rumble][crowd][rain]amix=inputs=3:normalize=0,afade=t=in:d=0.5,afade=t=out:st=6.2:d=0.8,loudnorm=I=-20:TP=-2,aformat=channel_layouts=stereo[a]" -map "[a]" -c:a pcm_s16le city-ambience.wav
ffmpeg -y -i dogtrial-billboard-tokyo-9x16.mp4 -i city-ambience.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 160k -ar 48000 -shortest -movflags +faststart dogtrial-billboard-tokyo-9x16-audio.mp4
