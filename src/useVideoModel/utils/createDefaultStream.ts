import deepmerge from "deepmerge";

export const defaultUserMediaOptions: MediaStreamConstraints = {
    audio: false,
    video: {
        facingMode: "user",
    },
};

export async function createDefaultStream(options?: MediaStreamConstraints) {
    return await navigator.mediaDevices.getUserMedia(
        deepmerge(defaultUserMediaOptions, options || {}),
    );
}
