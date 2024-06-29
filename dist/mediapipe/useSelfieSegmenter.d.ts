import { SelfieSegmentation, Options as SelfieSegmentationOptions, Results as SelfieSegmentationResult } from "@mediapipe/selfie_segmentation";
import { UseVideoModelProps } from "../useVideoModel";
export type { SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult };
export type UseSelfieSegmenterProps = UseVideoModelProps<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;
export declare function useSelfieSegmenter({ onResults, ...props }: Partial<UseSelfieSegmenterProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: SelfieSegmentationOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: SelfieSegmentation;
    }>;
    stopModel: () => void;
    getModel: () => SelfieSegmentation | undefined;
    setOptions: (options: SelfieSegmentationOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useSelfieSegmenter.d.ts.map