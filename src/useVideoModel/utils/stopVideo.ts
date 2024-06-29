export function stopVideo(video: HTMLVideoElement | null) {
    if (!video || !video.srcObject) return;
    (video.srcObject as MediaStream)?.getTracks().forEach((track) => {
        track.stop();
    });
    video.srcObject = null;
}