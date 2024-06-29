"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediapipeObjectron = useMediapipeObjectron;
const deepmerge_1 = __importDefault(require("deepmerge"));
const objectron_1 = require("@mediapipe/objectron");
const useVideoModel_1 = require("../useVideoModel");
const defaultObjectronOptions = {
    selfieMode: true,
    maxNumObjects: 5,
    modelName: 'Shoe',
    staticImageMode: false,
    // focalLength: undefined,
    // principalPoint: undefined,
    // imageSize: undefined,
    // minDetectionConfidence: undefined,
    // minTrackingConfidence: undefined,
};
function getMediapipeObjectron(options = defaultObjectronOptions) {
    const objectron = new objectron_1.Objectron({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`,
    });
    const objectronOptions = (0, deepmerge_1.default)(defaultObjectronOptions, options);
    objectron.setOptions(objectronOptions);
    return objectron;
}
function useMediapipeObjectron({ onResults, }) {
    return (0, useVideoModel_1.useVideoModel)({
        setModel: (options = defaultObjectronOptions) => getMediapipeObjectron(options),
        onReady: (model, stream) => model.onResults((res) => onResults === null || onResults === void 0 ? void 0 : onResults(res, stream)),
        onFrame: (model, video) => model.send({ image: video }),
        onResults,
    });
}
