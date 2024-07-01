import { FaceDetector, FaceDetectorOptions, FaceDetectorResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { FaceDetector, FaceDetectorOptions, FaceDetectorResult };
export declare const defaultFaceDetectorOptions: FaceDetectorOptions;
export declare function getFaceDetector(options?: FaceDetectorOptions): Promise<FaceDetector>;
export type UseFaceDetectorProps = UseVideoModelProps<FaceDetector, FaceDetectorOptions, FaceDetectorResult>;
export type UseFaceDetectorResult = UseVideoModelResult<FaceDetector, FaceDetectorOptions, FaceDetectorResult>;
export declare function useFaceDetector(props: Partial<UseFaceDetectorProps>): UseVideoModelResult<FaceDetector, FaceDetectorOptions, FaceDetectorResult>;
//# sourceMappingURL=useFaceDetector.d.ts.map