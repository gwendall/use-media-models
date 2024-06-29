import { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult } from "@mediapipe/tasks-vision";
export type { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult };
export declare const defaultHandLandmarkerOptions: HandLandmarkerOptions;
export declare function getHandLandmarker(options?: HandLandmarkerOptions): Promise<HandLandmarker>;
export declare function useHandLandmarker({ onResults, }: {
    onResults: (result: HandLandmarkerResult, stream?: MediaStream | null) => void;
}): {
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