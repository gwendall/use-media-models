import deepmerge from "deepmerge";
import { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult, useVideoModel } from "../useVideoModel";
import { RunningMode } from "./utils/types";
import getVisionTasks from "./utils/getVisionTasks";

export type { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult };

export const defaultImageSegmenterOptions: ImageSegmenterOptions = {
    baseOptions: {
        // modelAssetPath: "https://storage.googleapis.com/mediapipe-assets/deeplabv3.tflite?generation=1661875711618421",
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite',
    },
    outputCategoryMask: true,
    outputConfidenceMasks: true,
    runningMode: 'VIDEO' as RunningMode,
};

export async function getImageSegmenter(options: ImageSegmenterOptions = {}) {
    const visionTasks = await getVisionTasks();
    const imageSegmenterOptions: ImageSegmenterOptions = deepmerge(defaultImageSegmenterOptions, options);
    const imageSegmenter = await ImageSegmenter.createFromOptions(visionTasks, imageSegmenterOptions);
    return imageSegmenter;
}

export type UseImageSegmenterProps = UseVideoModelProps<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;
export type UseImageSegmenterResult = UseVideoModelResult<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;

export function useImageSegmenter(props: Partial<UseImageSegmenterProps>) {
    return useVideoModel<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>({
        ...props as UseImageSegmenterProps,
        setModel: (options = defaultImageSegmenterOptions) => getImageSegmenter(options),
        onFrame: (model: ImageSegmenter, video: HTMLVideoElement, time: number) => model.segmentForVideo(video, time),
    });
}