import { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import { UseVideoModelProps } from "../useVideoModel";
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
export type UseGestureRecognizerProps = UseVideoModelProps<GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult>;
export declare function useGestureRecognizer(props: Partial<UseGestureRecognizerProps>): {
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