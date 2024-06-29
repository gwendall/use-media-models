"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPoseLandmarkerOptions = void 0;
exports.getPoseLandmarker = getPoseLandmarker;
exports.usePoseLandmarker = usePoseLandmarker;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const useVideoModel_1 = require("../useVideoModel");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
exports.defaultPoseLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task',
        delegate: "GPU"
    },
    runningMode: 'VIDEO',
    numPoses: 1,
    outputSegmentationMasks: true,
    // minPoseDetectionConfidence: 0.5,
    // minPosePresenceConfidence: 0.5,
    // minTrackingConfidence: 0.5,
};
function getPoseLandmarker() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        const visionTasks = yield (0, getVisionTasks_1.default)();
        const poseLandmarkerOptions = (0, deepmerge_1.default)(exports.defaultPoseLandmarkerOptions, options);
        const poseLandmarker = yield tasks_vision_1.PoseLandmarker.createFromOptions(visionTasks, poseLandmarkerOptions);
        return poseLandmarker;
    });
}
function usePoseLandmarker({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = exports.defaultPoseLandmarkerOptions) => getPoseLandmarker(options),
        onFrame: (model, video, time) => model.detectForVideo(video, time),
        onResults,
    });
}
