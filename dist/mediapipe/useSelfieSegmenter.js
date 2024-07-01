"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelfieSegmenter = useSelfieSegmenter;
const deepmerge_1 = __importDefault(require("deepmerge"));
const selfie_segmentation_1 = require("@mediapipe/selfie_segmentation");
const useVideoModel_1 = require("../useVideoModel");
const defaultSelfieSegmentationOptions = {
    modelSelection: 1,
    selfieMode: true,
};
function getSelfieSegmenter(options = defaultSelfieSegmentationOptions) {
    const selfieSegmentation = new selfie_segmentation_1.SelfieSegmentation({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
    const selfieSegmenterOptions = (0, deepmerge_1.default)(defaultSelfieSegmentationOptions, options);
    selfieSegmentation.setOptions(selfieSegmenterOptions);
    return selfieSegmentation;
}
function useSelfieSegmenter(props) {
    return (0, useVideoModel_1.useVideoModel)(Object.assign(Object.assign({}, props), { setModel: (options = defaultSelfieSegmentationOptions) => getSelfieSegmenter(options), onReady: (model, stream) => model.onResults((res) => { var _a; return (_a = props === null || props === void 0 ? void 0 : props.onResults) === null || _a === void 0 ? void 0 : _a.call(props, res, stream); }), onFrame: (model, video) => model.send({ image: video }), onResults: props === null || props === void 0 ? void 0 : props.onResults }));
}
