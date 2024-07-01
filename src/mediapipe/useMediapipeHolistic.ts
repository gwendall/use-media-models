import deepmerge from "deepmerge";
import { Holistic, InputImage, Options as HolisticOptions, Results as HolisticResult } from "@mediapipe/holistic";
import { UseVideoModelProps, useVideoModel } from "../useVideoModel";

export type { Holistic, HolisticOptions, HolisticResult };

const defaultHolisticOptions: HolisticOptions = {
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    // minDetectionConfidence: 0.5,
    // minTrackingConfidence: 0.5
}

function getHolistic(options: HolisticOptions = defaultHolisticOptions) {
    const holistic = new Holistic({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });
    const holisticOptions = deepmerge(defaultHolisticOptions, options);
    holistic.setOptions(holisticOptions);
    return holistic;
}

export type UseMediapipeHolisticProps = UseVideoModelProps<Holistic, HolisticOptions, HolisticResult>;

export function useMediapipeHolistic(props: Partial<UseMediapipeHolisticProps>) {
    return useVideoModel<Holistic, HolisticOptions, HolisticResult>({
        ...props as UseMediapipeHolisticProps,
        setModel: (options = defaultHolisticOptions) => getHolistic(options),
        onReady: (model: Holistic, stream?: MediaStream) => model.onResults((res) => props?.onResults?.(res, stream)),
        onFrame: (model: Holistic, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
    });
}