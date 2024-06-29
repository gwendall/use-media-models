import React from "react";
import { canPlayStream } from "./utils/canPlayStream";
import { canReadVideo } from "./utils/canReadVideo";
import { createVideo } from "./utils/createVideo";
import { createDefaultStream } from "./utils/createDefaultStream";

export type OnVideoModelResults<ModelResult> = (result: ModelResult, stream?: MediaStream, time?: number) => void;

export type UseVideoModelProps<Model, ModelOptions, ModelResult> = {
    setModel: (options?: ModelOptions) => Model | Promise<Model>;
    modelOptions?: ModelOptions;
    setStream?: () => Promise<MediaStream>;
    onReady?: (model: Model, stream?: MediaStream) => void;
    onFrame: (model: Model, video: HTMLVideoElement, time: number) => ModelResult | void | Promise<ModelResult | void>;
    onResults: OnVideoModelResults<ModelResult>;
};

export function useVideoModel<Model, ModelOptions, ModelResult>({
    setModel,
    modelOptions: _modelOptions,
    setStream,
    onReady,
    onFrame,
    onResults,
}: UseVideoModelProps<Model, ModelOptions, ModelResult>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: ModelOptions;
        userMediaOptions?: MediaStreamConstraints;
    }) => Promise<{
        stream: MediaStream,
        video: HTMLVideoElement,
        model: Model,
    }>,
    stopModel: () => void,
    getModel: () => Model | undefined,
    setOptions: (options: ModelOptions) => void,
    resetStream: (stream: MediaStream) => void,
    isModelRunning: boolean,
} {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const modelRef = React.useRef<Model>();
    const [isModelRunning, setIsModelRunning] = React.useState<boolean>(false);
    const isModelRunningRef = React.useRef<boolean>(false);
    const lastPredictTimeRef = React.useRef<number>(0);

    async function predict(time: number, stream: MediaStream | null) {
        if (!isModelRunningRef.current) return;
        try {
            if (canPlayStream(stream) && canReadVideo(videoRef.current) && modelRef.current && time > lastPredictTimeRef.current) {
                const video = videoRef.current as HTMLVideoElement;
                const results = await onFrame(modelRef.current, video, time);
                lastPredictTimeRef.current = time;
                if (onResults && results) {
                    onResults(results, stream as MediaStream, time);
                }
            }
        } catch (err) {
            console.error('Error in useVideoModel predict', err);
        }
        videoRef.current?.requestVideoFrameCallback((time) => predict(time, stream));
    }

    async function startModel({
        stream,
        modelOptions,
        userMediaOptions,
    }: {
        stream?: MediaStream;
        modelOptions?: ModelOptions;
        userMediaOptions?: MediaStreamConstraints;
    } = {
            stream: undefined,
            modelOptions: undefined,
            userMediaOptions: undefined,
        }): Promise<{
            stream: MediaStream,
            video: HTMLVideoElement,
            model: Model,
        }> {
        if (isModelRunningRef.current) {
            console.warn("Video model is already running");
            return {
                stream: videoRef.current?.srcObject as MediaStream,
                video: videoRef.current as HTMLVideoElement,
                model: modelRef.current as Model,
            };
        }
        modelRef.current = await setModel(modelOptions);

        videoRef.current = videoRef.current || createVideo();
        videoRef.current.srcObject =
            stream ||
            (await setStream?.()) ||
            (await createDefaultStream(userMediaOptions));
        const _stream = videoRef.current.srcObject as MediaStream;
        videoRef.current.requestVideoFrameCallback((time) => predict(time, videoRef.current?.srcObject as MediaStream));
        setIsModelRunning(true);
        onReady?.(modelRef.current, videoRef.current.srcObject as MediaStream);
        return {
            stream: _stream,
            video: videoRef.current,
            model: modelRef.current,
        };
    }

    function stopModel() {
        setIsModelRunning(false);
    }

    function getModel() {
        return modelRef.current;
    }

    function setOptions(options?: ModelOptions) {
        if (isModelRunningRef.current && modelRef.current && options) {
            const model = modelRef.current as unknown as { setOptions: (options: ModelOptions) => void };
            model.setOptions?.(options);
        }
    }

    function resetStream(stream: MediaStream) {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
    }

    React.useEffect(() => {
        return () => {
            stopModel();
        }
    }, []);

    React.useEffect(() => {
        isModelRunningRef.current = isModelRunning;
    }, [isModelRunning]);

    React.useEffect(() => {
        async function run() {
            modelRef.current = await setModel(_modelOptions);
        }
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_modelOptions]);
    return { startModel, stopModel, getModel, setOptions, resetStream, isModelRunning };

}