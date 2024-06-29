import React from "react";
export type ElementSize = {
    width: number;
    height: number;
};
export declare function getVideo(videoRef?: React.MutableRefObject<HTMLVideoElement | null>): HTMLVideoElement;
export declare const defaultCameraOptions: MediaStreamConstraints;
export declare function useCamera(videoRef?: React.MutableRefObject<HTMLVideoElement | null>, initialFacingMode?: "user" | "environment"): {
    startCamera: (cameraOptions?: MediaStreamConstraints) => Promise<{
        stream: MediaStream;
        videoSize: ElementSize;
    }>;
    switchCamera: (cameraOptions?: MediaStreamConstraints) => Promise<{
        stream: MediaStream;
        videoSize: ElementSize;
    }>;
    stopCamera: () => void;
    videoSize: ElementSize;
    isCameraStarted: boolean;
    facingMode: "user" | "environment";
};
//# sourceMappingURL=index.d.ts.map