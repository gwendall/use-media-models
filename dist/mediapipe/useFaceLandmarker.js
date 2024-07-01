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
exports.defaultFaceLandmarkerOptions = void 0;
exports.createFaceLandmarker = createFaceLandmarker;
exports.useFaceLandmarker = useFaceLandmarker;
const deepmerge_1 = __importDefault(require("deepmerge"));
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const getVisionTasks_1 = __importDefault(require("./utils/getVisionTasks"));
const zustand_1 = require("zustand");
const useVideoModel_1 = require("../useVideoModel");
exports.defaultFaceLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO',
    numFaces: 1,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
    minFaceDetectionConfidence: 0.8,
    minTrackingConfidence: 0.8,
};
function createFaceLandmarker() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        try {
            const visionTasks = yield (0, getVisionTasks_1.default)();
            const faceLandmarkerOptions = (0, deepmerge_1.default)(exports.defaultFaceLandmarkerOptions, options);
            const faceLandmarker = yield tasks_vision_1.FaceLandmarker.createFromOptions(visionTasks, faceLandmarkerOptions);
            return faceLandmarker;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
function useFaceLandmarker(props) {
    const faceLandmarker = useModelStore((state) => state.faceLandmarker);
    return (0, useVideoModel_1.useVideoModel)(Object.assign(Object.assign({}, props), { setModel: (options = exports.defaultFaceLandmarkerOptions) => {
            if (faceLandmarker) {
                faceLandmarker.setOptions(options);
            }
            else {
                return createFaceLandmarker(options);
            }
        }, onFrame: (model, video, time) => model.detectForVideo(video, time) }));
}
const useModelStore = (0, zustand_1.create)(() => ({
    faceLandmarker: null,
}));
