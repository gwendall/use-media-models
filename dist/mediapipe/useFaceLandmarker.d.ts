import { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps } from "../useVideoModel";
export type { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult };
export declare const defaultFaceLandmarkerOptions: FaceLandmarkerOptions;
export declare function createFaceLandmarker(options?: FaceLandmarkerOptions): Promise<FaceLandmarker | null>;
export type UseFaceLandmarkerProps = UseVideoModelProps<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;
export declare function useFaceLandmarker(props: Partial<UseFaceLandmarkerProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: FaceLandmarkerOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: FaceLandmarker;
    }>;
    stopModel: () => void;
    getModel: () => FaceLandmarker | undefined;
    setOptions: (options: FaceLandmarkerOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useFaceLandmarker.d.ts.map