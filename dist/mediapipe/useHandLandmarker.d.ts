import { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps } from "../useVideoModel";
export type { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult };
export declare const defaultHandLandmarkerOptions: HandLandmarkerOptions;
export declare function getHandLandmarker(options?: HandLandmarkerOptions): Promise<HandLandmarker>;
export type UseHandLandmarkerProps = UseVideoModelProps<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult>;
export declare function useHandLandmarker(props: Partial<UseHandLandmarkerProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: HandLandmarkerOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: HandLandmarker;
    }>;
    stopModel: () => void;
    getModel: () => HandLandmarker | undefined;
    setOptions: (options: HandLandmarkerOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useHandLandmarker.d.ts.map