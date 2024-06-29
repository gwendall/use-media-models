import React from "react";
type ElementSize = {
    width: number;
    height: number;
};
export default function useCamera(videoRef?: React.MutableRefObject<HTMLVideoElement | null>, initialFacingMode?: "user" | "environment"): {
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
export {};
//# sourceMappingURL=index.d.ts.map