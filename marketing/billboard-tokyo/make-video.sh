#!/bin/sh
# Slow push-in on the untouched billboard image (no generator => text/dog never altered).
# Usage: ./make-video.sh  -> dogtrial-billboard-tokyo-9x16.mp4 (1080x1920, 30fps, 7s, silent)
cd "$(dirname "$0")"
ffmpeg -y -loop 1 -framerate 30 -i tokyo-billboard.png -t 7 -vf "\
scale=4320:7680:flags=lanczos,\
zoompan=z='1+0.07*on/209':x='(iw-iw/zoom)*0.55':y='(ih-ih/zoom)*0.30':d=210:s=1080x1920:fps=30,\
format=yuv420p" -c:v libx264 -crf 16 -preset slow -movflags +faststart -an dogtrial-billboard-tokyo-9x16.mp4
