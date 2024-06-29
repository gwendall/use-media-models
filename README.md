A toolset to use AI media models in React.

## Install
`yarn add use-media-models` or `npm install use-media-models --save`.

## Use a model (example: useFaceLandmarker)

### useFaceLandmarker
```typescript
import React from "react";
import { useCamera, useFaceLandmarker } from "use-media-models";

export default function ExamplePage() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const { startCamera } = useCamera(videoRef);
  const { startModel, } = useFaceLandmarker({
    onResults: (results, stream) => {
      console.log('Got results.', results.faceLandmarks);
    },
  });
  React.useEffect(() => {
    startCamera().then(({ stream }) => startModel({ stream }));
  }, []);
  return (
    <video
      ref={videoRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        backgroundColor: 'black',
      }}
    />
  );
}
```