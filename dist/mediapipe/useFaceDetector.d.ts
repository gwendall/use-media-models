import { FaceDetector, FaceDetectorOptions, FaceDetectorResult } from "@mediapipe/tasks-vision";
export type { FaceDetector, FaceDetectorOptions, FaceDetectorResult };
export declare const defaultFaceDetectorOptions: FaceDetectorOptions;
export declare function getFaceDetector(options?: FaceDetectorOptions): Promise<FaceDetector>;
export declare function useFaceDetector({ onResults, }: {
    onResults: (result: FaceDetectorResult, stream?: MediaStream | null) => void;
}): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: FaceDetectorOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: FaceDetector;
    }>;
    stopModel: () => void;
    getModel: () => FaceDetector | undefined;
    setOptions: (options: FaceDetectorOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useFaceDetector.d.ts.map