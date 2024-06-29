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
exports.defaultImageSegmenterOptions = void 0;
exports.getImageSegmenter = getImageSegmenter;
exports.useImageSegmenter = useImageSegmenter;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const useVideoModel_1 = require("../useVideoModel");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
exports.defaultImageSegmenterOptions = {
    baseOptions: {
        // modelAssetPath: "https://storage.googleapis.com/mediapipe-assets/deeplabv3.tflite?generation=1661875711618421",
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite',
    },
    outputCategoryMask: true,
    outputConfidenceMasks: true,
    runningMode: 'VIDEO',
};
function getImageSegmenter() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        const visionTasks = yield (0, getVisionTasks_1.default)();
        const imageSegmenterOptions = (0, deepmerge_1.default)(exports.defaultImageSegmenterOptions, options);
        const imageSegmenter = yield tasks_vision_1.ImageSegmenter.createFromOptions(visionTasks, imageSegmenterOptions);
        return imageSegmenter;
    });
}
function useImageSegmenter({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = exports.defaultImageSegmenterOptions) => getImageSegmenter(options),
        onFrame: (model, video, time) => model.segmentForVideo(video, time),
        onResults,
    });
}
