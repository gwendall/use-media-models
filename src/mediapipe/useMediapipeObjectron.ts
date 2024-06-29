import deepmerge from "deepmerge";
import { Objectron, InputImage, Options as ObjectronOptions, Results as ObjectronResult } from "@mediapipe/objectron";
import { useVideoModel } from "../useVideoModel";

export type { Objectron, ObjectronOptions, ObjectronResult };

const defaultObjectronOptions: ObjectronOptions = {
    selfieMode: true,
    maxNumObjects: 5,
    modelName: 'Shoe',
    staticImageMode: false,
    // focalLength: undefined,
    // principalPoint: undefined,
    // imageSize: undefined,
    // minDetectionConfidence: undefined,
    // minTrackingConfidence: undefined,
}

function getMediapipeObjectron(options: ObjectronOptions = defaultObjectronOptions) {
    const objectron = new Objectron({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/objectron/${file}`,
    });
    const objectronOptions = deepmerge(defaultObjectronOptions, options);
    objectron.setOptions(objectronOptions);
    return objectron;
}

export function useMediapipeObjectron({
    onResults,
}: {
    onResults: (result: ObjectronResult, stream?: MediaStream | null) => void;
}) {
    return useVideoModel<Objectron, ObjectronOptions, ObjectronResult>({
        setModel: (options = defaultObjectronOptions) => getMediapipeObjectron(options),
        onReady: (model: Objectron, stream?: MediaStream) => model.onResults((res) => onResults?.(res, stream)),
        onFrame: (model: Objectron, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
        onResults,
    });
}