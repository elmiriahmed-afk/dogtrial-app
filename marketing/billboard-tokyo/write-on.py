#!/usr/bin/env python3
"""Write-on animation: the original billboard text is revealed line by line (left to right).
Letters are the untouched pixels of tokyo-billboard.png, so spelling/shape never changes; the dog is never modified.
Usage: python3 write-on.py  -> frames piped to ffmpeg -> dogtrial-billboard-write-on-9x16.mp4 (+ audio if city-ambience-10s.wav exists)"""
import os, subprocess, numpy as np, cv2
os.chdir(os.path.dirname(os.path.abspath(__file__)))
src = cv2.imread('tokyo-billboard.png'); H, W = src.shape[:2]
b, g, r = [src[..., i].astype(int) for i in range(3)]
mask = np.zeros((H, W), np.uint8)
navy = (r < 100) & (g < 110) & (b < 175) & (b > r + 10) & (g < b - 5)
white = (r > 190) & (g > 200) & (b > 200)
# (x0, x1, y0, y1, t_start, t_end, kind)  -- boxes only cover the text lines, away from the dog
lines = [(190, 365, 245, 340, 0.6, 1.5, 'n'),    # dogtrial
         (170, 478, 360, 500, 1.8, 3.0, 'n'),    # Before
         (170, 370, 495, 610, 3.1, 3.9, 'n'),    # you
         (170, 478, 550, 715, 4.0, 5.2, 'n'),    # adopt.
         (165, 478, 712, 790, 5.8, 6.7, 'n'),    # Try 30 days
         (165, 478, 770, 845, 6.7, 7.7, 'n'),    # with a simulated
         (165, 270, 835, 925, 7.7, 8.1, 'n'),    # dog.
         (300, 565, 940, 1015, 8.5, 9.3, 'w')]   # dogtrial.dog
for x0, x1, y0, y1, _, _, k in lines:
    m = (navy if k == 'n' else white)[y0:y1, x0:x1]
    mask[y0:y1, x0:x1] |= m.astype(np.uint8) * 255
mask = cv2.dilate(mask, np.ones((5, 5), np.uint8))
keep = (1 - mask.astype(np.float32) / 255)[..., None]
num = cv2.GaussianBlur(src.astype(np.float32) * keep, (0, 0), 7)
den = cv2.GaussianBlur(keep, (0, 0), 7)[..., None] if keep.ndim == 3 else cv2.GaussianBlur(keep, (0, 0), 7)
clean = np.where(keep > 0.5, src.astype(np.float32), num / np.maximum(den, 1e-3)).clip(0, 255).astype(np.uint8)
alpha = cv2.GaussianBlur(mask, (3, 3), 0).astype(np.float32)[..., None] / 255
S, FPS, DUR = 1, 30, 10.0
cmd = ['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', '1080x1920', '-r', str(FPS), '-i', '-']
aud = os.path.exists('city-ambience-10s.wav')
if aud: cmd += ['-i', 'city-ambience-10s.wav']
cmd += ['-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p']
if aud: cmd += ['-c:a', 'aac', '-b:a', '160k', '-shortest']
cmd += ['-movflags', '+faststart', 'dogtrial-billboard-write-on-9x16.mp4']
p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
xs = np.arange(W)[None, :, None].astype(np.float32)
for f in range(int(DUR * FPS)):
    t = f / FPS
    reveal = np.zeros((H, W, 1), np.float32)
    for x0, x1, y0, y1, ts, te, _ in lines:
        p_ = np.clip((t - ts) / (te - ts), 0, 1)
        p_ = p_ * p_ * (3 - 2 * p_) * 0.35 + p_ * 0.65  # gentle ease
        edge = x0 - 14 + (x1 - x0 + 28) * p_
        w = np.clip((edge - xs) / 14, 0, 1)
        reveal[y0:y1, :, :] = np.maximum(reveal[y0:y1, :, :], w[:, :, :])
    a = alpha * reveal
    img = (clean * (1 - a) + src * a).astype(np.uint8)
    z = 1 + 0.07 * t / DUR
    sc = 1920 / H * z
    ox = (W - W / z) * 0.55 * 1920 / H
    oy = (H - H / z) * 0.30 * 1920 / H
    M = np.float32([[sc, 0, -ox], [0, sc, -oy]])
    out = cv2.warpAffine(img, M, (1080, 1920), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
    p.stdin.write(out.tobytes())
p.stdin.close(); p.wait()
