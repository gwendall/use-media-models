"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopVideo = stopVideo;
function stopVideo(video) {
    var _a;
    if (!video || !video.srcObject)
        return;
    (_a = video.srcObject) === null || _a === void 0 ? void 0 : _a.getTracks().forEach((track) => {
        track.stop();
    });
    video.srcObject = null;
}
