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
exports.defaultFaceDetectorOptions = void 0;
exports.getFaceDetector = getFaceDetector;
exports.useFaceDetector = useFaceDetector;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
const useVideoModel_1 = require("../useVideoModel");
exports.defaultFaceDetectorOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO',
};
function getFaceDetector() {
    return __awaiter(this, arguments, void 0, function* (options = exports.defaultFaceDetectorOptions) {
        const visionTasks = yield (0, getVisionTasks_1.default)();
        const faceDetectorOptions = (0, deepmerge_1.default)(exports.defaultFaceDetectorOptions, options);
        const faceDetector = yield tasks_vision_1.FaceDetector.createFromOptions(visionTasks, faceDetectorOptions);
        return faceDetector;
    });
}
function useFaceDetector({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = exports.defaultFaceDetectorOptions) => getFaceDetector(options),
        onFrame: (model, video, time) => model.detectForVideo(video, time),
        onResults,
    });
}
