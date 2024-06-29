import { Objectron, Options as ObjectronOptions, Results as ObjectronResult } from "@mediapipe/objectron";
export type { Objectron, ObjectronOptions, ObjectronResult };
export declare function useMediapipeObjectron({ onResults, }: {
    onResults: (result: ObjectronResult, stream?: MediaStream | null) => void;
}): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: ObjectronOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: Objectron;
    }>;
    stopModel: () => void;
    getModel: () => Objectron | undefined;
    setOptions: (options: ObjectronOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useMediapipeObjectron.d.ts.map