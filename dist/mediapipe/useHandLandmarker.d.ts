import { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult };
export declare const defaultHandLandmarkerOptions: HandLandmarkerOptions;
export declare function getHandLandmarker(options?: HandLandmarkerOptions): Promise<HandLandmarker>;
export type UseHandLandmarkerProps = UseVideoModelProps<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult>;
export type UseHandLandmarkerResult = UseVideoModelResult<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult>;
export declare function useHandLandmarker(props: Partial<UseHandLandmarkerProps>): UseVideoModelResult<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult>;
//# sourceMappingURL=useHandLandmarker.d.ts.map