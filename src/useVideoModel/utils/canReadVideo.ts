export function canReadVideo(video: HTMLVideoElement | null): boolean {
    const { videoWidth = 0, videoHeight = 0 } = video || {};
    return !!video && videoWidth > 0 && videoHeight > 0;
}