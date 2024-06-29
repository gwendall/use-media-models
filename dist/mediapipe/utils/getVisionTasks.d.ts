export declare const defaultVisionTasksVersion = "0.10.9";
type WasmFileset = {
    /** The path to the Wasm loader script. */
    wasmLoaderPath: string;
    /** The path to the Wasm binary. */
    wasmBinaryPath: string;
    /** The optional path to the asset loader script. */
    assetLoaderPath?: string;
    /** The optional path to the assets binary. */
    assetBinaryPath?: string;
};
export default function getVisionTasks(version?: string): Promise<WasmFileset>;
export {};
//# sourceMappingURL=getVisionTasks.d.ts.map