"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediapipeHolistic = useMediapipeHolistic;
const deepmerge_1 = __importDefault(require("deepmerge"));
const holistic_1 = require("@mediapipe/holistic");
const useVideoModel_1 = require("../useVideoModel");
const defaultHolisticOptions = {
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    // minDetectionConfidence: 0.5,
    // minTrackingConfidence: 0.5
};
function getHolistic(options = defaultHolisticOptions) {
    const holistic = new holistic_1.Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });
    const holisticOptions = (0, deepmerge_1.default)(defaultHolisticOptions, options);
    holistic.setOptions(holisticOptions);
    return holistic;
}
function useMediapipeHolistic(props) {
    return (0, useVideoModel_1.useVideoModel)(Object.assign(Object.assign({}, props), { setModel: (options = defaultHolisticOptions) => getHolistic(options), onReady: (model, stream) => model.onResults((res) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onResults) === null || _a === void 0 ? void 0 : _a.call(props, res, stream); }), onFrame: (model, video) => model.send({ image: video }) }));
}
