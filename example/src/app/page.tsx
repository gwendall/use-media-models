"use client";

import React from "react";
import { useCamera, useFaceLandmarker } from "use-media-models";

export default function ExamplePage() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const { startCamera } = useCamera(videoRef);
  const { startModel, } = useFaceLandmarker({
    onResults: (results, stream) => {
      // do something with the results.
      console.log('Got results.', results.faceLandmarks);
    },
  });
  React.useEffect(() => {
    startCamera().then(({ stream }) => startModel({ stream }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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