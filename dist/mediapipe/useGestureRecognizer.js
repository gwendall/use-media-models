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
exports.defaultGestureRecognizerOptions = void 0;
exports.getGestureRecognizer = getGestureRecognizer;
exports.useGestureRecognizer = useGestureRecognizer;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const useVideoModel_1 = require("../useVideoModel");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
exports.defaultGestureRecognizerOptions = {
    baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: "GPU",
    },
    runningMode: 'VIDEO',
    numHands: 2,
};
function getGestureRecognizer() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        const visionTasks = yield (0, getVisionTasks_1.default)();
        const gestureRecognizerOptions = (0, deepmerge_1.default)(exports.defaultGestureRecognizerOptions, options);
        const gestureRecognizer = yield tasks_vision_1.GestureRecognizer.createFromOptions(visionTasks, gestureRecognizerOptions);
        return gestureRecognizer;
    });
}
function useGestureRecognizer({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = exports.defaultGestureRecognizerOptions) => getGestureRecognizer(options),
        onFrame: (model, video, time) => model.recognizeForVideo(video, time),
        onResults,
    });
}
