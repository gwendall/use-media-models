import { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult };
export declare const defaultFaceLandmarkerOptions: FaceLandmarkerOptions;
export declare function createFaceLandmarker(options?: FaceLandmarkerOptions): Promise<FaceLandmarker | null>;
export type UseFaceLandmarkerProps = UseVideoModelProps<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;
export type UseFaceLandmarkerResult = UseVideoModelResult<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;
export declare function useFaceLandmarker(props: Partial<UseFaceLandmarkerProps>): UseVideoModelResult<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;
//# sourceMappingURL=useFaceLandmarker.d.ts.map