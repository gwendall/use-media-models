import deepmerge from "deepmerge";
import { SelfieSegmentation, InputImage, Options as SelfieSegmentationOptions, Results as SelfieSegmentationResult } from "@mediapipe/selfie_segmentation";
import { OnVideoModelResults, UseVideoModelProps, UseVideoModelResult, useVideoModel } from "../useVideoModel";

export type { SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult };

const defaultSelfieSegmentationOptions: SelfieSegmentationOptions = {
    modelSelection: 1,
    selfieMode: true,
}

function getSelfieSegmenter(options: SelfieSegmentationOptions = defaultSelfieSegmentationOptions) {
    const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
    const selfieSegmenterOptions = deepmerge(defaultSelfieSegmentationOptions, options);
    selfieSegmentation.setOptions(selfieSegmenterOptions);
    return selfieSegmentation;
}

export type UseSelfieSegmenterProps = UseVideoModelProps<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;
export type UseSelfieSegmenterResult = UseVideoModelResult<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;

export function useSelfieSegmenter(props: Partial<UseSelfieSegmenterProps>) {
    return useVideoModel<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>({
        ...props,
        setModel: (options = defaultSelfieSegmentationOptions) => getSelfieSegmenter(options),
        onReady: (model: SelfieSegmentation, stream?: MediaStream) => model.onResults((res) => props?.onResults?.(res, stream)),
        onFrame: (model: SelfieSegmentation, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
        onResults: props?.onResults as OnVideoModelResults<SelfieSegmentationResult>,
    });
}