import { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
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
export type UseGestureRecognizerResult = UseVideoModelResult<GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult>;
export declare function useGestureRecognizer(props: Partial<UseGestureRecognizerProps>): UseVideoModelResult<GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult>;
//# sourceMappingURL=useGestureRecognizer.d.ts.map