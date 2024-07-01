import { Objectron, Options as ObjectronOptions, Results as ObjectronResult } from "@mediapipe/objectron";
import { UseVideoModelProps } from "../useVideoModel";
export type { Objectron, ObjectronOptions, ObjectronResult };
export type UseMediapipeObjectronProps = UseVideoModelProps<Objectron, ObjectronOptions, ObjectronResult>;
export declare function useMediapipeObjectron(props: Partial<UseMediapipeObjectronProps>): {
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