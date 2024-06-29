import { Holistic, Options as HolisticOptions, Results as HolisticResult } from "@mediapipe/holistic";
export type { Holistic, HolisticOptions, HolisticResult };
export declare function useMediapipeHolistic({ onResults, }: {
    onResults: (result: HolisticResult, stream?: MediaStream | null) => void;
}): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: HolisticOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: Holistic;
    }>;
    stopModel: () => void;
    getModel: () => Holistic | undefined;
    setOptions: (options: HolisticOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useMediapipeHolistic.d.ts.map