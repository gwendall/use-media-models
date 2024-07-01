import { Objectron, Options as ObjectronOptions, Results as ObjectronResult } from "@mediapipe/objectron";
import { UseVideoModelProps, UseVideoModelResult } from "../useVideoModel";
export type { Objectron, ObjectronOptions, ObjectronResult };
export type UseMediapipeObjectronProps = UseVideoModelProps<Objectron, ObjectronOptions, ObjectronResult>;
export type UseMediapipeObjectronResult = UseVideoModelResult<Objectron, ObjectronOptions, ObjectronResult>;
export declare function useMediapipeObjectron(props: Partial<UseMediapipeObjectronProps>): UseVideoModelResult<Objectron, ObjectronOptions, ObjectronResult>;
//# sourceMappingURL=useMediapipeObjectron.d.ts.map