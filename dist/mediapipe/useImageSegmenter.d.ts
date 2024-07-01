import { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult } from "@mediapipe/tasks-vision";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult };
export declare const defaultImageSegmenterOptions: ImageSegmenterOptions;
export declare function getImageSegmenter(options?: ImageSegmenterOptions): Promise<ImageSegmenter>;
export type UseImageSegmenterProps = UseVideoModelProps<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;
export type UseImageSegmenterResult = UseVideoModelResult<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;
export declare function useImageSegmenter(props: Partial<UseImageSegmenterProps>): UseVideoModelResult<ImageSegmenter, ImageSegmenterOptions, ImageSegmenterResult>;
//# sourceMappingURL=useImageSegmenter.d.ts.map