"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediapipe = useMediapipe;
const useFaceDetector_1 = require("./useFaceDetector");
const useFaceLandmarker_1 = require("./useFaceLandmarker");
const useGestureRecognizer_1 = require("./useGestureRecognizer");
const useHandLandmarker_1 = require("./useHandLandmarker");
const useImageSegmenter_1 = require("./useImageSegmenter");
const useMediapipeHolistic_1 = require("./useMediapipeHolistic");
const useMediapipeObjectron_1 = require("./useMediapipeObjectron");
const useMediapipePose_1 = require("./useMediapipePose");
const usePoseLandmarker_1 = require("./usePoseLandmarker");
const useSelfieSegmenter_1 = require("./useSelfieSegmenter");
// Map each model to its corresponding hook
const modelMap = {
    faceDetector: useFaceDetector_1.useFaceDetector,
    faceLandmarker: useFaceLandmarker_1.useFaceLandmarker,
    gestureRecognizer: useGestureRecognizer_1.useGestureRecognizer,
    handLandmarker: useHandLandmarker_1.useHandLandmarker,
    imageSegmenter: useImageSegmenter_1.useImageSegmenter,
    holistic: useMediapipeHolistic_1.useMediapipeHolistic,
    objectron: useMediapipeObjectron_1.useMediapipeObjectron,
    pose: useMediapipePose_1.useMediapipePose,
    poseLandmarker: usePoseLandmarker_1.usePoseLandmarker,
    selfieSegmenter: useSelfieSegmenter_1.useSelfieSegmenter,
};
function useMediapipe(model, modelProps) {
    const modelHook = modelMap[model];
    return modelHook === null || modelHook === void 0 ? void 0 : modelHook(modelProps);
}
