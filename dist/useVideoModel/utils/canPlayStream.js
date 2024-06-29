"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canPlayStream = canPlayStream;
function canPlayStream(stream) {
    if (!stream)
        return false;
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length === 0 || videoTracks[0].readyState !== 'live') {
        return false;
    }
    return true;
}
