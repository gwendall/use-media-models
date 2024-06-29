import deepmerge from "deepmerge";
import { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import { useVideoModel } from "../useVideoModel";
import getVisionTasks from "./utils/getVisionTasks";

export type { HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult };

export const defaultHandLandmarkerOptions: HandLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO' as RunningMode,
    numHands: 2,
    // minHandDetectionConfidence: 0.2,
    // minHandPresenceConfidence: 0.2,
    // minTrackingConfidence: 0.2,
};

export async function getHandLandmarker(options: HandLandmarkerOptions = {}) {
    const visionTasks = await getVisionTasks();
    const handLandmarkerOptions: HandLandmarkerOptions = deepmerge(defaultHandLandmarkerOptions, options);
    const handLandmarker = await HandLandmarker.createFromOptions(visionTasks, handLandmarkerOptions);
    return handLandmarker;
}

export function useHandLandmarker({
    onResults,
}: {
    onResults: (result: HandLandmarkerResult, stream?: MediaStream | null) => void;
}) {
    return useVideoModel<HandLandmarker, HandLandmarkerOptions, HandLandmarkerResult>({
        setModel: (options = defaultHandLandmarkerOptions) => getHandLandmarker(options),
        onFrame: (model: HandLandmarker, video: HTMLVideoElement, time: number) => model.detectForVideo(video, time),
        onResults,
    });
}