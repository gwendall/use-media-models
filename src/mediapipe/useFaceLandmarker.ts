import deepmerge from "deepmerge";
import { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { RunningMode } from "./utils/types";
import getVisionTasks from "./utils/getVisionTasks";
import { create } from "zustand";
import { UseVideoModelProps, UseVideoModelResult, useVideoModel } from "../useVideoModel";

export type { FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult };

export const defaultFaceLandmarkerOptions: FaceLandmarkerOptions = {
    baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
    },
    runningMode: 'VIDEO' as RunningMode,
    numFaces: 1,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
    minFaceDetectionConfidence: 0.8,
    minTrackingConfidence: 0.8,
};

export async function createFaceLandmarker(options: FaceLandmarkerOptions = {}): Promise<FaceLandmarker | null> {
    try {
        const visionTasks = await getVisionTasks();
        const faceLandmarkerOptions: FaceLandmarkerOptions = deepmerge(defaultFaceLandmarkerOptions, options);
        const faceLandmarker = await FaceLandmarker.createFromOptions(visionTasks, faceLandmarkerOptions);
        return faceLandmarker;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export type UseFaceLandmarkerProps = UseVideoModelProps<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;
export type UseFaceLandmarkerResult = UseVideoModelResult<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>;

export function useFaceLandmarker(props: Partial<UseFaceLandmarkerProps>) {
    const faceLandmarker = useModelStore((state) => state.faceLandmarker);
    return useVideoModel<FaceLandmarker, FaceLandmarkerOptions, FaceLandmarkerResult>({
        ...props,
        setModel: (options = defaultFaceLandmarkerOptions) => {
            if (faceLandmarker) {
                faceLandmarker.setOptions(options);
            } else {
                return createFaceLandmarker(options);
            }
        },
        onFrame: (model: FaceLandmarker, video: HTMLVideoElement, time: number) => model.detectForVideo(video, time),
    } as UseFaceLandmarkerProps);
}

const useModelStore = create<{
    faceLandmarker: FaceLandmarker | null;
}>(() => ({
    faceLandmarker: null,
}));
