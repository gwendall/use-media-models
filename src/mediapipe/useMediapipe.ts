import { UseFaceDetectorProps, UseFaceDetectorResult, useFaceDetector } from "./useFaceDetector";
import { UseFaceLandmarkerProps, UseFaceLandmarkerResult, useFaceLandmarker } from "./useFaceLandmarker";
import { UseGestureRecognizerProps, UseGestureRecognizerResult, useGestureRecognizer } from "./useGestureRecognizer";
import { UseHandLandmarkerProps, UseHandLandmarkerResult, useHandLandmarker } from "./useHandLandmarker";
import { UseImageSegmenterProps, UseImageSegmenterResult, useImageSegmenter } from "./useImageSegmenter";
import { UseMediapipeHolisticProps, UseMediapipeHolisticResult, useMediapipeHolistic } from "./useMediapipeHolistic";
import { UseMediapipeObjectronProps, UseMediapipeObjectronResult, useMediapipeObjectron } from "./useMediapipeObjectron";
import { UseMediapipePoseProps, UseMediapipePoseResult, useMediapipePose } from "./useMediapipePose";
import { UsePoseLandmarkerProps, UsePoseLandmarkerResult, usePoseLandmarker } from "./usePoseLandmarker";
import { UseSelfieSegmenterProps, UseSelfieSegmenterResult, useSelfieSegmenter } from "./useSelfieSegmenter";

// Define the possible model types
type Model =
    "faceDetector" |
    "faceLandmarker" |
    "gestureRecognizer" |
    "handLandmarker" |
    "imageSegmenter" |
    "holistic" |
    "objectron" |
    "pose" |
    "poseLandmarker" |
    "selfieSegmenter";

// Map each model to its corresponding configuration type
type ModelPropsMap = {
    faceDetector: UseFaceDetectorProps;
    faceLandmarker: UseFaceLandmarkerProps;
    gestureRecognizer: UseGestureRecognizerProps;
    handLandmarker: UseHandLandmarkerProps;
    imageSegmenter: UseImageSegmenterProps;
    holistic: UseMediapipeHolisticProps;
    objectron: UseMediapipeObjectronProps;
    pose: UseMediapipePoseProps;
    poseLandmarker: UsePoseLandmarkerProps;
    selfieSegmenter: UseSelfieSegmenterProps;
};

// Map each model to its corresponding result type
type ModelResultMap = {
    faceDetector: UseFaceDetectorResult;
    faceLandmarker: UseFaceLandmarkerResult;
    gestureRecognizer: UseGestureRecognizerResult;
    handLandmarker: UseHandLandmarkerResult;
    imageSegmenter: UseImageSegmenterResult;
    holistic: UseMediapipeHolisticResult;
    objectron: UseMediapipeObjectronResult;
    pose: UseMediapipePoseResult;
    poseLandmarker: UsePoseLandmarkerResult;
    selfieSegmenter: UseSelfieSegmenterResult;
};

// Map each model to its corresponding hook
const modelMap = {
    faceDetector: useFaceDetector,
    faceLandmarker: useFaceLandmarker,
    gestureRecognizer: useGestureRecognizer,
    handLandmarker: useHandLandmarker,
    imageSegmenter: useImageSegmenter,
    holistic: useMediapipeHolistic,
    objectron: useMediapipeObjectron,
    pose: useMediapipePose,
    poseLandmarker: usePoseLandmarker,
    selfieSegmenter: useSelfieSegmenter,
};

// Define a generic type that extracts the correct config type based on the model
type ModelProps<T extends Model> = T extends keyof ModelPropsMap ? ModelPropsMap[T] : never;

// Define a generic type that extracts the correct result type based on the model
type ModelResult<T extends Model> = T extends keyof ModelResultMap ? ModelResultMap[T] : never;

export function useMediapipe<T extends Model>(model: T, modelProps: Partial<ModelProps<T>>) {
    const modelHook = modelMap[model] as unknown as (props: Partial<ModelProps<T>>) => ModelResult<T>;
    return modelHook?.(modelProps);
}