import deepmerge from "deepmerge";
import { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import { useVideoModel } from "../useVideoModel";
import getVisionTasks from "./utils/getVisionTasks";

export type { GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult };

export const defaultGestureRecognizerOptions = {
    baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: "GPU" as "GPU" | "CPU",
    },
    runningMode: 'VIDEO' as RunningMode,
    numHands: 2,
}

export async function getGestureRecognizer(options: GestureRecognizerOptions = {}): Promise<GestureRecognizer> {
    const visionTasks = await getVisionTasks();
    const gestureRecognizerOptions: GestureRecognizerOptions = deepmerge(defaultGestureRecognizerOptions, options);
    const gestureRecognizer = await GestureRecognizer.createFromOptions(visionTasks, gestureRecognizerOptions);
    return gestureRecognizer;
}

export function useGestureRecognizer({
    onResults,
}: {
    onResults: (result: GestureRecognizerResult, stream?: MediaStream | null) => void;
}) {
    return useVideoModel<GestureRecognizer, GestureRecognizerOptions, GestureRecognizerResult>({
        setModel: (options = defaultGestureRecognizerOptions) => getGestureRecognizer(options),
        onFrame: (model: GestureRecognizer, video: HTMLVideoElement, time: number) => model.recognizeForVideo(video, time),
        onResults,
    });
}