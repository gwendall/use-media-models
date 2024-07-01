import { SelfieSegmentation, Options as SelfieSegmentationOptions, Results as SelfieSegmentationResult } from "@mediapipe/selfie_segmentation";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult };
export type UseSelfieSegmenterProps = UseVideoModelProps<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;
export type UseSelfieSegmenterResult = UseVideoModelResult<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;
export declare function useSelfieSegmenter(props: Partial<UseSelfieSegmenterProps>): UseVideoModelResult<SelfieSegmentation, SelfieSegmentationOptions, SelfieSegmentationResult>;
//# sourceMappingURL=useSelfieSegmenter.d.ts.map