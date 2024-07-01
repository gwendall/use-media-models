import { Holistic, Options as HolisticOptions, Results as HolisticResult } from "@mediapipe/holistic";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { Holistic, HolisticOptions, HolisticResult };
export type UseMediapipeHolisticProps = UseVideoModelProps<Holistic, HolisticOptions, HolisticResult>;
export type UseMediapipeHolisticResult = UseVideoModelResult<Holistic, HolisticOptions, HolisticResult>;
export declare function useMediapipeHolistic(props: Partial<UseMediapipeHolisticProps>): UseVideoModelResult<Holistic, HolisticOptions, HolisticResult>;
//# sourceMappingURL=useMediapipeHolistic.d.ts.map