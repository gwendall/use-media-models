import React from "react";
import deepmerge from "deepmerge";

export type ElementSize = {
    width: number;
    height: number;
};

export function getVideo(videoRef?: React.MutableRefObject<HTMLVideoElement | null>) {
    return videoRef?.current || document.createElement("video");
}

export const defaultCameraOptions: MediaStreamConstraints = {
    audio: false,
    video: {
        facingMode: "user",
    }
};

export function useCamera(videoRef?: React.MutableRefObject<HTMLVideoElement | null>, initialFacingMode: "user" | "environment" = "user") {
    const [videoSize, setVideoSize] = React.useState<ElementSize>({ width: 0, height: 0 });
    const [isCameraStarted, setIsCameraStarted] = React.useState<boolean>(false);
    const [facingMode, setFacingMode] = React.useState<"user" | "environment">(initialFacingMode);
    function setVideoStream(stream: MediaStream): Promise<{
        stream: MediaStream;
        videoSize: ElementSize;
    }> {
        return new Promise((resolve) => {
            const video = getVideo(videoRef);
            video.srcObject = stream;
            video.autoplay = true;
            video.playsInline = true;
            video.crossOrigin = "anonymous";
            video.muted = true;
            video.onloadedmetadata = () => {
                video!.play();
                if (!video?.videoWidth || !video?.videoHeight) return;
                const _videoSize = {
                    width: video?.videoWidth || 0,
                    height: video?.videoHeight || 0,
                };
                setVideoSize(_videoSize);
                setIsCameraStarted(true);
                resolve({
                    stream,
                    videoSize: _videoSize,
                })
            };
        });
    }
    async function startCamera(cameraOptions: MediaStreamConstraints = defaultCameraOptions): Promise<{
        stream: MediaStream;
        videoSize: ElementSize;
    }> {
        stopCamera();
        const stream = await navigator.mediaDevices
            .getUserMedia(
                deepmerge(defaultCameraOptions, cameraOptions || {})
            );
        return setVideoStream(stream);
    }
    function switchCamera(cameraOptions: MediaStreamConstraints = defaultCameraOptions) {
        const newFacingMode = facingMode === "user" ? "environment" : "user";
        const newCameraOptions = deepmerge(cameraOptions, {
            video: {
                facingMode: newFacingMode,
            },
        });
        setFacingMode(newFacingMode);
        return startCamera(newCameraOptions);
    }
    function stopCamera() {
        const video = getVideo(videoRef);
        if (!video || !video.srcObject) return;
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        video.srcObject = null;
        setIsCameraStarted(false);
    }
    React.useEffect(() => {
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