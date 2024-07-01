import deepmerge from "deepmerge";
import { Objectron, InputImage, Options as ObjectronOptions, Results as ObjectronResult } from "@mediapipe/objectron";
import { UseVideoModelProps, UseVideoModelResult, useVideoModel } from "../useVideoModel";

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

export type UseMediapipeObjectronProps = UseVideoModelProps<Objectron, ObjectronOptions, ObjectronResult>;
export type UseMediapipeObjectronResult = UseVideoModelResult<Objectron, ObjectronOptions, ObjectronResult>;

export function useMediapipeObjectron(props: Partial<UseMediapipeObjectronProps>) {
    return useVideoModel<Objectron, ObjectronOptions, ObjectronResult>({
        ...props as UseMediapipeObjectronProps,
        setModel: (options = defaultObjectronOptions) => getMediapipeObjectron(options),
        onReady: (model: Objectron, stream?: MediaStream) => model.onResults((res) => props?.onResults?.(res, stream)),
        onFrame: (model: Objectron, video: HTMLVideoElement) => model.send({ image: video as InputImage }),
    });
}