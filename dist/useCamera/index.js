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
exports.defaultCameraOptions = void 0;
exports.getVideo = getVideo;
exports.useCamera = useCamera;
const react_1 = __importDefault(require("react"));
const deepmerge_1 = __importDefault(require("deepmerge"));
function getVideo(videoRef) {
    return (videoRef === null || videoRef === void 0 ? void 0 : videoRef.current) || document.createElement("video");
}
exports.defaultCameraOptions = {
    audio: false,
    video: {
        facingMode: "user",
    }
};
function useCamera(videoRef, initialFacingMode = "user") {
    const [videoSize, setVideoSize] = react_1.default.useState({ width: 0, height: 0 });
    const [isCameraStarted, setIsCameraStarted] = react_1.default.useState(false);
    const [facingMode, setFacingMode] = react_1.default.useState(initialFacingMode);
    function setVideoStream(stream) {
        return new Promise((resolve) => {
            const video = getVideo(videoRef);
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true;
            video.crossOrigin = "anonymous";
            video.muted = true;
            video.onloadedmetadata = () => {
                video.play();
                if (!(video === null || video === void 0 ? void 0 : video.videoWidth) || !(video === null || video === void 0 ? void 0 : video.videoHeight))
                    return;
                const _videoSize = {
                    width: (video === null || video === void 0 ? void 0 : video.videoWidth) || 0,
                    height: (video === null || video === void 0 ? void 0 : video.videoHeight) || 0,
                };
                setVideoSize(_videoSize);
                setIsCameraStarted(true);
                resolve({
                    stream,
                    videoSize: _videoSize,
                });
            };
        });
    }
    function startCamera() {
        return __awaiter(this, arguments, void 0, function* (cameraOptions = exports.defaultCameraOptions) {
            stopCamera();
            const stream = yield navigator.mediaDevices
                .getUserMedia((0, deepmerge_1.default)(exports.defaultCameraOptions, cameraOptions || {}));
            return setVideoStream(stream);
        });
    }
    function switchCamera(cameraOptions = exports.defaultCameraOptions) {
        const newFacingMode = facingMode === "user" ? "environment" : "user";
        const newCameraOptions = (0, deepmerge_1.default)(cameraOptions, {
            video: {
                facingMode: newFacingMode,
            },
        });
        setFacingMode(newFacingMode);
        return startCamera(newCameraOptions);
    }
    function stopCamera() {
        const video = getVideo(videoRef);
        if (!video || !video.srcObject)
            return;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        video.srcObject = null;
        setIsCameraStarted(false);
    }
    react_1.default.useEffect(() => {
        return () => {
            stopCamera();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        startCamera,
        switchCamera,
        stopCamera,
        videoSize,
        isCameraStarted,
        facingMode,
    };
}
