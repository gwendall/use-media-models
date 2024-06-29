"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediapipePose = useMediapipePose;
const deepmerge_1 = __importDefault(require("deepmerge"));
const pose_1 = require("@mediapipe/pose");
const useVideoModel_1 = require("../useVideoModel");
const defaultPoseOptions = {
    selfieMode: true,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    // minDetectionConfidence: 0.5,
    // minTrackingConfidence: 0.5,
};
function getMediapipePose(options = defaultPoseOptions) {
    const pose = new pose_1.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    const poseOptions = (0, deepmerge_1.default)(defaultPoseOptions, options);
    pose.setOptions(poseOptions);
    return pose;
}
function useMediapipePose({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = defaultPoseOptions) => getMediapipePose(options),
        onReady: (model, stream) => model.onResults((res) => onResults === null || onResults === void 0 ? void 0 : onResults(res, stream)),
        onFrame: (model, video) => model.send({ image: video }),
        onResults,
    });
}