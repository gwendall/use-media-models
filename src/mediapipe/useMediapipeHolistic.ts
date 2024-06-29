import deepmerge from "deepmerge";
import { Holistic, InputImage, Options as HolisticOptions, Results as HolisticResult } from "@mediapipe/holistic";
import { useVideoModel } from "../useVideoModel";

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

export function useMediapipeHolistic({
    onResults,
}: {
    onResults: (result: HolisticResult, stream?: MediaStream | null) => void;
}) {
    return useVideoModel<Holistic, HolisticOptions, HolisticResult>({
        setModel: (options = defaultHolisticOptions) => getHolistic(options),
        onReady: (model: Holistic, stream?: MediaStream) => model.onResults((res) => onResults?.(res, stream)),
        onFrame: (model: Holistic, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
        onResults,
    });
}