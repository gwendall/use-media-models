import { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps } from "../useVideoModel";
export type { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult };
export declare const defaultImageSegmenterOptions: ImageSegmenterOptions;
export declare function getImageSegmenter(options?: ImageSegmenterOptions): Promise<ImageSegmenter>;
export type UseImageSegmenterProps = UseVideoModelProps<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;
export declare function useImageSegmenter(props: Partial<UseImageSegmenterProps>): {
    startModel: (p?: {
        stream?: MediaStream;
        modelOptions?: ImageSegmenterOptions | undefined;
        userMediaOptions?: MediaStreamConstraints;
    } | undefined) => Promise<{
        stream: MediaStream;
        video: HTMLVideoElement;
        model: ImageSegmenter;
    }>;
    stopModel: () => void;
    getModel: () => ImageSegmenter | undefined;
    setOptions: (options: ImageSegmenterOptions) => void;
    resetStream: (stream: MediaStream) => void;
    isModelRunning: boolean;
};
//# sourceMappingURL=useImageSegmenter.d.ts.map