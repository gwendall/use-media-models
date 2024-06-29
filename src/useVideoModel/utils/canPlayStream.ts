export function canPlayStream(stream?: MediaStream | null) {
    if (!stream) return false;
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length === 0 || videoTracks[0].readyState !== 'live') {
        return false;
    }
    return true;
}