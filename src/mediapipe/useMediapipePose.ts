import deepmerge from "deepmerge";
import { Pose, InputImage, Options as PoseOptions, Results as PoseResult } from "@mediapipe/pose";
import { UseVideoModelProps, useVideoModel } from "../useVideoModel";

export type { Pose, PoseOptions, PoseResult };

const defaultPoseOptions: PoseOptions = {
    selfieMode: true,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    // minDetectionConfidence: 0.5,
    // minTrackingConfidence: 0.5,
}

function getMediapipePose(options: PoseOptions = defaultPoseOptions) {
    const pose = new Pose({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    const poseOptions = deepmerge(defaultPoseOptions, options);
    pose.setOptions(poseOptions);
    return pose;
}

export type UseMediapipePoseProps = UseVideoModelProps<Pose, PoseOptions, PoseResult>;

export function useMediapipePose(props: Partial<UseMediapipePoseProps>) {
    return useVideoModel<Pose, PoseOptions, PoseResult>({
        ...props as UseMediapipePoseProps,
        setModel: (options = defaultPoseOptions) => getMediapipePose(options),
        onReady: (model: Pose, stream?: MediaStream) => model.onResults((res) => props?.onResults?.(res, stream)),
        onFrame: (model: Pose, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
    });
}