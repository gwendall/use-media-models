import { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps } from "../useVideoModel";
export type { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult };
export declare const defaultPoseLandmarkerOptions: PoseLandmarkerOptions;
export declare function getPoseLandmarker(options?: PoseLandmarkerOptions): Promise<PoseLandmarker>;
export type UsePoseLandmarkerProps = UseVideoModelProps<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>;
export declare function usePoseLandmarker(props: Partial<UsePoseLandmarkerProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: PoseLandmarkerOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: PoseLandmarker;
    }>;
    stopModel: () => void;
    getModel: () => PoseLandmarker | undefined;
    setOptions: (options: PoseLandmarkerOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=usePoseLandmarker.d.ts.map