import { FilesetResolver } from "@mediapipe/tasks-vision";

// export const defaultVisionTasksVersion = 'latest';
export const defaultVisionTasksVersion = '0.10.9';

type WasmFileset = {
    /** The path to the Wasm loader script. */
    wasmLoaderPath: string;
    /** The path to the Wasm binary. */
    wasmBinaryPath: string;
    /** The optional path to the asset loader script. */
    assetLoaderPath?: string;
    /** The optional path to the assets binary. */
    assetBinaryPath?: string;
}

export default async function getVisionTasks(version: string = defaultVisionTasksVersion): Promise<WasmFileset> {
    return FilesetResolver.forVisionTasks(
        `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${version}/wasm`
    );
}