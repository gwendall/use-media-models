import { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult };
export declare const defaultPoseLandmarkerOptions: PoseLandmarkerOptions;
export declare function getPoseLandmarker(options?: PoseLandmarkerOptions): Promise<PoseLandmarker>;
export type UsePoseLandmarkerProps = UseVideoModelProps<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>;
export type UsePoseLandmarkerResult = UseVideoModelResult<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>;
export declare function usePoseLandmarker(props: Partial<UsePoseLandmarkerProps>): UseVideoModelResult<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>;
//# sourceMappingURL=usePoseLandmarker.d.ts.map