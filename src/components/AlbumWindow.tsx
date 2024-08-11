import React, { useEffect, useRef, useState } from 'react';
import { Container, Text, Image, Video } from '@react-three/uikit';
import { Card } from '../../../../src/components/card';
import { Album } from './Albums';
import { colors } from '../theme';

interface AlbumWindowProps {
    album: Album;
}

const AlbumWindow: React.FC<AlbumWindowProps> = ({ album }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentAlbum, setCurrentAlbum] = useState(album);

    if(!album) return null;

    const handleUnload = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    React.useEffect(() => {
        return () => {
            handleUnload();
        };
    }, []);

    useEffect(() => {
        if(album.name !== currentAlbum.name) {
            if(videoRef.current) {
                // @ts-ignore
                videoRef.current.element.pause();
                // @ts-ignore
                videoRef.current.element.currentTime = 0;
            }
        }
    }, [album]);

    return (
        <>
            <Container marginTop={55} margin="auto" width={150} height="100%" justifyContent="center" alignItems="center">
                {currentAlbum.video ? (
                    <Video
                       
                        src={currentAlbum.video}
                        width="100%"
                        height="75%"
                        objectFit="cover"
                        borderRadius={10}
                        autoplay
                        loop
                        ref={videoRef}
                    />
                ) : (
                    <Image
                        src={currentAlbum.cover}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        borderRadius={10}
                    />
                )}
            </Container>
        </>
    );
};

export default AlbumWindow;