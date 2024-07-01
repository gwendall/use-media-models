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
exports.defaultHandLandmarkerOptions = void 0;
exports.getHandLandmarker = getHandLandmarker;
exports.useHandLandmarker = useHandLandmarker;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const useVideoModel_1 = require("../useVideoModel");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
exports.defaultHandLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO',
    numHands: 2,
    // minHandDetectionConfidence: 0.2,
    // minHandPresenceConfidence: 0.2,
    // minTrackingConfidence: 0.2,
};
function getHandLandmarker() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        const visionTasks = yield (0, getVisionTasks_1.default)();
        const handLandmarkerOptions = (0, deepmerge_1.default)(exports.defaultHandLandmarkerOptions, options);
        const handLandmarker = yield tasks_vision_1.HandLandmarker.createFromOptions(visionTasks, handLandmarkerOptions);
        return handLandmarker;
    });
}
function useHandLandmarker(props) {
    return (0, useVideoModel_1.useVideoModel)(Object.assign(Object.assign({}, props), { setModel: (options = exports.defaultHandLandmarkerOptions) => getHandLandmarker(options), onFrame: (model, video, time) => model.detectForVideo(video, time) }));
}
