import { Pose, Options as PoseOptions, Results as PoseResult } from "@mediapipe/pose";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { Pose, PoseOptions, PoseResult };
export type UseMediapipePoseProps = UseVideoModelProps<Pose, PoseOptions, PoseResult>;
export type UseMediapipePoseResult = UseVideoModelResult<Pose, PoseOptions, PoseResult>;
export declare function useMediapipePose(props: Partial<UseMediapipePoseProps>): UseVideoModelResult<Pose, PoseOptions, PoseResult>;
//# sourceMappingURL=useMediapipePose.d.ts.map