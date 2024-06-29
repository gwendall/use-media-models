"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideo = createVideo;
function createVideo() {
    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.onloadedmetadata = () => {
        video.play();
    };
    return video;
}
