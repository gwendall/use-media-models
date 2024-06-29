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
exports.useVideoModel = useVideoModel;
const react_1 = __importDefault(require("react"));
const canPlayStream_1 = require("./utils/canPlayStream");
const canReadVideo_1 = require("./utils/canReadVideo");
const createVideo_1 = require("./utils/createVideo");
const createDefaultStream_1 = require("./utils/createDefaultStream");
function useVideoModel({ setModel, modelOptions: _modelOptions, setStream, onReady, onFrame, onResults, }) {
    const videoRef = react_1.default.useRef(null);
    const modelRef = react_1.default.useRef();
    const [isModelRunning, setIsModelRunning] = react_1.default.useState(false);
    const isModelRunningRef = react_1.default.useRef(false);
    const lastPredictTimeRef = react_1.default.useRef(0);
    function predict(time, stream) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!isModelRunningRef.current)
                return;
            try {
                if ((0, canPlayStream_1.canPlayStream)(stream) && (0, canReadVideo_1.canReadVideo)(videoRef.current) && modelRef.current && time > lastPredictTimeRef.current) {
                    const video = videoRef.current;
                    const results = yield onFrame(modelRef.current, video, time);
                    lastPredictTimeRef.current = time;
                    if (onResults && results) {
                        onResults(results, stream, time);
                    }
                }
            }
            catch (err) {
                console.error('Error in useVideoModel predict', err);
            }
            (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.requestVideoFrameCallback((time) => predict(time, stream));
        });
    }
    function startModel() {
        return __awaiter(this, arguments, void 0, function* ({ stream, modelOptions, userMediaOptions, } = {
            stream: undefined,
            modelOptions: undefined,
            userMediaOptions: undefined,
        }) {
            var _a;
            if (isModelRunningRef.current) {
                console.warn("Video model is already running");
                return {
                    stream: (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.srcObject,
                    video: videoRef.current,
                    model: modelRef.current,
                };
            }
            modelRef.current = yield setModel(modelOptions);
            videoRef.current = videoRef.current || (0, createVideo_1.createVideo)();
            videoRef.current.srcObject =
                stream ||
                    (yield (setStream === null || setStream === void 0 ? void 0 : setStream())) ||
                    (yield (0, createDefaultStream_1.createDefaultStream)(userMediaOptions));
            const _stream = videoRef.current.srcObject;
            videoRef.current.requestVideoFrameCallback((time) => { var _a; return predict(time, (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.srcObject); });
            setIsModelRunning(true);
            onReady === null || onReady === void 0 ? void 0 : onReady(modelRef.current, videoRef.current.srcObject);
            return {
                stream: _stream,
                video: videoRef.current,
                model: modelRef.current,
            };
        });
    }
    function stopModel() {
        setIsModelRunning(false);
    }
    function getModel() {
        return modelRef.current;
    }
    function setOptions(options) {
        var _a;
        if (isModelRunningRef.current && modelRef.current && options) {
            const model = modelRef.current;
            (_a = model.setOptions) === null || _a === void 0 ? void 0 : _a.call(model, options);
        }
    }
    function resetStream(stream) {
        if (!videoRef.current)
            return;
        videoRef.current.srcObject = stream;
    }
    react_1.default.useEffect(() => {
        return () => {
            stopModel();
        };
    }, []);
    react_1.default.useEffect(() => {
        isModelRunningRef.current = isModelRunning;
    }, [isModelRunning]);
    react_1.default.useEffect(() => {
        function run() {
            return __awaiter(this, void 0, void 0, function* () {
                modelRef.current = yield setModel(_modelOptions);
            });
        }
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_modelOptions]);
    return { startModel, stopModel, getModel, setOptions, resetStream, isModelRunning };
}
