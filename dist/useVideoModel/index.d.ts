export type OnVideoModelResults<ModelResult> = (result: ModelResult, stream?: MediaStream, time?: number) => void;
export type UseVideoModelProps<Model, ModelOptions, ModelResult> = {
    setModel: (options?: ModelOptions) => Model | Promise<Model>;
    modelOptions?: ModelOptions;
    setStream?: () => Promise<MediaStream>;
    onReady?: (model: Model, stream?: MediaStream) => void;
    onFrame: (model: Model, video: HTMLVideoElement, time: number) => ModelResult | void | Promise<ModelResult | void>;
    onResults: OnVideoModelResults<ModelResult>;
};
export type UseVideoModelResult<Model, ModelOptions, ModelResult> = {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: ModelOptions;
        userMediaOptions?: MediaStreamConstraints;
    }) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: Model;
    }>;
    stopModel: () => void;
    getModel: () => Model | undefined;
    setOptions: (options: ModelOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
export declare function useVideoModel<Model, ModelOptions, ModelResult>({ setModel, modelOptions: _modelOptions, setStream, onReady, onFrame, onResults, }: UseVideoModelProps<Model, ModelOptions, ModelResult>): UseVideoModelResult<Model, ModelOptions, ModelResult>;
//# sourceMappingURL=index.d.ts.map