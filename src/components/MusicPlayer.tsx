import React, { useRef, useState } from 'react';
import { Container, Image } from '@react-three/uikit';
import { Input } from './apfel/input'
import { Album, albums } from './Albums';
import { Card } from './apfel/card';
import { AlbumArtwork } from './Album';
import { colors } from '../theme';
import { Search } from '@react-three/uikit-lucide';
import { useAlbumStore } from '../useAlbumStore';
import { createWindow } from '@spatialjs/core';
import MusicPlayerWindow from './MusicPlayerWindow';

const MusicPlayer: React.FC = () => {
    const abumConRef = useRef<any>(null);
    const [text, setText] = useState('')
    const setCurrentAlbum = useAlbumStore((state) => state.setCurrentAlbum);    
    const selectAlbum = (album: Album) => {
        
        createWindow(<MusicPlayerWindow  />, {
            title: album.name,
            width: 100,
            height: 100,
        });
        setCurrentAlbum(album);
    };

    return (
        <>
            <Card positionType="absolute" width="95%" height={55} padding={10}>
                <Image src="Spotify.png" width={100} height={60} objectFit="cover" />
                <Container width="100%" height="100%" justifyContent="flex-end" alignItems="center">
                    <Input width={150} height={30} value={text} onValueChange={setText} placeholder="Search..." prefix={<Search />} />
                </Container>
            </Card>
            <Card marginTop={75} paddingLeft={10} width="100%" height={185} justifyContent="center" flexDirection="column">
                
                <Container paddingBottom={12} scrollbarOpacity={0.5} scrollbarWidth={2} scrollbarColor={colors.mutedForeground} ref={abumConRef} width={600} height={200} alignItems="auto" justifyContent="flex-start" flexDirection="row" overflow="scroll" >
                    {albums.map((album) => (
                        <AlbumArtwork key={album.name} album={album} width={100} height={100} onClick={(e) => {
                            e.stopPropagation()
                            selectAlbum(album)
                        }} />
                    ))}
                </Container>
            </Card>
        </>
    );
};
export default MusicPlayer;