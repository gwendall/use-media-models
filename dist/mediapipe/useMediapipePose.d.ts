import { Pose, Options as PoseOptions, Results as PoseResult } from "@mediapipe/pose";
import { UseVideoModelProps } from "../useVideoModel";
export type { Pose, PoseOptions, PoseResult };
export type UseMediapipePoseProps = UseVideoModelProps<Pose, PoseOptions, PoseResult>;
export declare function useMediapipePose(props: Partial<UseMediapipePoseProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: PoseOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: Pose;
    }>;
    stopModel: () => void;
    getModel: () => Pose | undefined;
    setOptions: (options: PoseOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useMediapipePose.d.ts.map