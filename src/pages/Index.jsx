import React, { useState } from "react";
import { Container, Input, Button, VStack, Text, List, ListItem, IconButton, HStack } from "@chakra-ui/react";
import { FaPlay, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Index = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchPlaylist = async () => {
    // Simulate fetching playlist data from YouTube API
    const fetchedPlaylist = [
      { id: "1", title: "Song 1" },
      { id: "2", title: "Song 2" },
      { id: "3", title: "Song 3" },
    ];
    setPlaylist(fetchedPlaylist);
    setCurrentVideo(fetchedPlaylist[0]);
  };

  const handlePlay = (video) => {
    setCurrentVideo(video);
  };

  const moveItem = (index, direction) => {
    const newPlaylist = [...playlist];
    const [movedItem] = newPlaylist.splice(index, 1);
    newPlaylist.splice(index + direction, 0, movedItem);
    setPlaylist(newPlaylist);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">YouTube Playlist Player</Text>
        <Input placeholder="Enter YouTube Playlist URL" value={playlistUrl} onChange={(e) => setPlaylistUrl(e.target.value)} />
        <Button onClick={fetchPlaylist}>Load Playlist</Button>
        {currentVideo && (
          <VStack spacing={2} width="100%">
            <Text fontSize="lg">Now Playing: {currentVideo.title}</Text>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVideo.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </VStack>
        )}
        <List spacing={3} width="100%">
          {playlist.map((video, index) => (
            <ListItem key={video.id}>
              <HStack justifyContent="space-between">
                <Text>{video.title}</Text>
                <HStack>
                  <IconButton aria-label="Play" icon={<FaPlay />} onClick={() => handlePlay(video)} />
                  <IconButton aria-label="Move Up" icon={<FaArrowUp />} onClick={() => moveItem(index, -1)} isDisabled={index === 0} />
                  <IconButton aria-label="Move Down" icon={<FaArrowDown />} onClick={() => moveItem(index, 1)} isDisabled={index === playlist.length - 1} />
                </HStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
