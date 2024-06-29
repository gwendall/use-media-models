import { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
export type { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult };
export declare const defaultGestureRecognizerOptions: {
    baseOptions: {
        modelAssetPath: string;
        delegate: "GPU" | "CPU";
    };
    runningMode: RunningMode;
    numHands: number;
};
export declare function getGestureRecognizer(options?: GestureRecognizerOptions): Promise<GestureRecognizer>;
export declare function useGestureRecognizer({ onResults, }: {
    onResults: (result: GestureRecognizerResult, stream?: MediaStream | null) => void;
}): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: GestureRecognizerOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: GestureRecognizer;
    }>;
    stopModel: () => void;
    getModel: () => GestureRecognizer | undefined;
    setOptions: (options: GestureRecognizerOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useGestureRecognizer.d.ts.map