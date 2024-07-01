import { FaceDetector, FaceDetectorOptions, FaceDetectorResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps } from "../useVideoModel";
export type { FaceDetector, FaceDetectorOptions, FaceDetectorResult };
export declare const defaultFaceDetectorOptions: FaceDetectorOptions;
export declare function getFaceDetector(options?: FaceDetectorOptions): Promise<FaceDetector>;
export type UseFaceDetectorProps = UseVideoModelProps<FaceDetector, FaceDetectorOptions, FaceDetectorResult>;
export declare function useFaceDetector(props: Partial<UseFaceDetectorProps>): {
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