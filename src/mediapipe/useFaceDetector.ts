import deepmerge from "deepmerge";
import { FaceDetector, FaceDetectorOptions, FaceDetectorResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import getVisionTasks from "./utils/getVisionTasks";
import { useVideoModel } from "../useVideoModel";

export type { FaceDetector, FaceDetectorOptions, FaceDetectorResult };

export const defaultFaceDetectorOptions: FaceDetectorOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO' as RunningMode,
};

export async function getFaceDetector(options: FaceDetectorOptions = defaultFaceDetectorOptions) {
    const visionTasks = await getVisionTasks();
    const faceDetectorOptions = deepmerge(defaultFaceDetectorOptions, options);
    const faceDetector = await FaceDetector.createFromOptions(visionTasks, faceDetectorOptions);
    return faceDetector;
}

export function useFaceDetector({
    onResults,
}: {
    onResults: (result: FaceDetectorResult, stream?: MediaStream | null) => void;
}) {
    return useVideoModel<FaceDetector, FaceDetectorOptions, FaceDetectorResult>({
        setModel: (options = defaultFaceDetectorOptions) => getFaceDetector(options),
        onFrame: (model: FaceDetector, video: HTMLVideoElement, time: number) => model.detectForVideo(video, time),
        onResults,
    });
}