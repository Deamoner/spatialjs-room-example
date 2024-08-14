import React, { useEffect, useRef } from "react";
import { Container, Text, Image, Video } from "@react-three/uikit";
import { Album } from "./Albums";
import { useAlbumStore } from "../useAlbumStore";

interface AlbumWindowProps {
  album: Album;
}

const AlbumWindow: React.FC<AlbumWindowProps> = ({ album }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentAlbum } = useAlbumStore();
  const prevAlbumRef = useRef<Album | null>(null);

  useEffect(() => {
    // Setup code here (e.g., start playing audio/video)

    return () => {
      console.log("window destroyed");
      // Cleanup code here (e.g., stop playing audio/video)
    };
  }, []);

  useEffect(() => {
    if (
      currentAlbum &&
      prevAlbumRef.current &&
      currentAlbum.name !== prevAlbumRef.current.name &&
      videoRef.current
    ) {
      // @ts-ignore
      videoRef.current.element.pause();
      // @ts-ignore
      //videoRef.current.element.currentTime = 0;
    }
    prevAlbumRef.current = currentAlbum;
  }, [currentAlbum]);

  if (!currentAlbum) return null;

  return (
    <>
      <Container
        marginTop={55}
        margin="auto"
        width={150}
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        {currentAlbum && currentAlbum.video ? (
          <Video
            key={album.name}
            src={album.video}
            width="100%"
            height="75%"
            objectFit="cover"
            borderRadius={10}
            autoplay
            loop
            ref={videoRef}
          />
        ) : (
          currentAlbum && (
            <Image
              src={album.cover}
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius={10}
            />
          )
        )}
      </Container>
    </>
  );
};

export default AlbumWindow;
