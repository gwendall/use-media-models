"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
function useSelfieSegmenter(_a) {
    var { onResults } = _a, props = __rest(_a, ["onResults"]);
    return (0, useVideoModel_1.useVideoModel)(Object.assign(Object.assign({}, props), { setModel: (options = defaultSelfieSegmentationOptions) => getSelfieSegmenter(options), onReady: (model, stream) => model.onResults((res) => onResults === null || onResults === void 0 ? void 0 : onResults(res, stream)), onFrame: (model, video) => model.send({ image: video }), onResults: onResults }));
}
