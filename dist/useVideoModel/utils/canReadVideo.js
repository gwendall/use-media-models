"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canReadVideo = canReadVideo;
function canReadVideo(video) {
    const { videoWidth = 0, videoHeight = 0 } = video || {};
    return !!video && videoWidth > 0 && videoHeight > 0;
}
