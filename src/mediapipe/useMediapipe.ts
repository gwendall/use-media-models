import {
    FaceDetectorResult, FaceLandmarkerResult,
    GestureRecognizerResult, HandLandmarkerResult,
    ImageSegmenterResult, PoseLandmarkerResult
} from "@mediapipe/tasks-vision";

import {
    HolisticResult, UseMediapipeHolisticProps, useMediapipeHolistic
} from "./useMediapipeHolistic";

import {
    ObjectronResult, UseMediapipeObjectronProps, useMediapipeObjectron
} from "./useMediapipeObjectron";

import {
    PoseResult, UseMediapipePoseProps, useMediapipePose
} from "./useMediapipePose";

import {
    SelfieSegmentationResult, UseSelfieSegmenterProps, useSelfieSegmenter
} from "./useSelfieSegmenter";

import { UseFaceDetectorProps, useFaceDetector } from "./useFaceDetector";
import { UseFaceLandmarkerProps, useFaceLandmarker } from "./useFaceLandmarker";
import { UseGestureRecognizerProps, useGestureRecognizer } from "./useGestureRecognizer";
import { UseHandLandmarkerProps, useHandLandmarker } from "./useHandLandmarker";
import { UseImageSegmenterProps, useImageSegmenter } from "./useImageSegmenter";
import { UsePoseLandmarkerProps, usePoseLandmarker } from "./usePoseLandmarker";

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
    faceDetector: FaceDetectorResult;
    faceLandmarker: FaceLandmarkerResult;
    gestureRecognizer: GestureRecognizerResult;
    handLandmarker: HandLandmarkerResult;
    imageSegmenter: ImageSegmenterResult;
    holistic: HolisticResult;
    objectron: ObjectronResult;
    pose: PoseResult;
    poseLandmarker: PoseLandmarkerResult;
    selfieSegmenter: SelfieSegmentationResult;
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