import deepmerge from "deepmerge";
import { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, useVideoModel } from "../useVideoModel";
import { RunningMode } from "./utils/types";
import getVisionTasks from "./utils/getVisionTasks";

export type { PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult };

export const defaultPoseLandmarkerOptions: PoseLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task',
        delegate: "GPU"
    },
    runningMode: 'VIDEO' as RunningMode,
    numPoses: 1,
    outputSegmentationMasks: true,
    // minPoseDetectionConfidence: 0.5,
    // minPosePresenceConfidence: 0.5,
    // minTrackingConfidence: 0.5,
};

export async function getPoseLandmarker(options: PoseLandmarkerOptions = {}) {
    const visionTasks = await getVisionTasks();
    const poseLandmarkerOptions: PoseLandmarkerOptions = deepmerge(defaultPoseLandmarkerOptions, options);
    const poseLandmarker = await PoseLandmarker.createFromOptions(visionTasks, poseLandmarkerOptions);
    return poseLandmarker;
}

export type UsePoseLandmarkerProps = UseVideoModelProps<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>;

export function usePoseLandmarker(props: Partial<UsePoseLandmarkerProps>) {
    return useVideoModel<PoseLandmarker, PoseLandmarkerOptions, PoseLandmarkerResult>({
        ...props as UsePoseLandmarkerProps,
        setModel: (options = defaultPoseLandmarkerOptions) => getPoseLandmarker(options),
        onFrame: (model: PoseLandmarker, video: HTMLVideoElement, time: number) => model.detectForVideo(video, time),
    });
}