/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import {
  faCopy,
  faMicrophone,
  faMicrophoneSlash,
  // faPhoneAlt,
  faPhoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HStack, VStack, Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';

const VideoCall = ({
  // callUser,
  myUserId,
  calling,
  cancelCall,
  stream,
  userVideoRef,
  isCallAccepted,
  videoRef,
  LeaveCall,
  shareScreen,
  setUserName,
}) => {
  const toast = useToast()
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text, result) => {
    if (result) {
      // The text has been successfully copied
      setCopiedText(text);
      console.log('Copied:', text);
    } else {
      console.error('Copy failed');
    }
  };

  // const dispatch = useDispatch();

  const ToggleVideo = () => {
    stream.getVideoTracks()[0].enabled = isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const ToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
  };


  const handleConnectToDoctor = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/postDoctorPatientId`,
        { userId: copiedText },
      );

      if (res.status === 200) {
        toast({
          title: "Id sent to Doctor successfully!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Internal Server error",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
    }
  };

  return (
    <VStack
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <VStack w="full">
        <HStack w="full">
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: '30rem',
              height: '30rem',
              borderRadius: '10px',
              border: '2px solid #3ce2ad',
              borderColor: "red"
            }}
          />

          {isCallAccepted && (
            <HStack w="full">
              <video
                ref={userVideoRef}
                autoPlay
                style={{
                  width: '30rem',
                  height: '30rem',
                  borderRadius: '10px',
                  border: '2px solid #3ce2ad',
                }} />
            </HStack>
          )}
        </HStack>

        {!isCallAccepted ? (
          <HStack w="full">

            <VStack>
              <HStack>
                <Input
                  placeholder="Enter your name"
                  onChange={(e) => { setUserName(e.target.value); setUserId(e.target.value) }}
                />
              </HStack>
              <HStack>
                <CopyToClipboard text={myUserId} onCopy={handleCopy}>
                  <Button disabled={!myUserId}>
                    <FontAwesomeIcon icon={faCopy} /> copy your call ID
                  </Button>
                </CopyToClipboard>
              </HStack>
              <Button onClick={handleConnectToDoctor}>Connect to Doctor</Button>
            </VStack>

            <VStack>
              <HStack>
                {calling && (
                  <Button onClick={cancelCall}>
                    <FontAwesomeIcon icon={faPhoneSlash} /> Cancel
                  </Button>)}
              </HStack>
            </VStack>

          </HStack>
        ) : (
          <div>
            <Button onClick={LeaveCall}>
              Leave call
            </Button>
            <Button onClick={ToggleAudio}>
              {!isAudioMuted ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}
            </Button>
            <Button onClick={ToggleVideo}>
              {!isVideoMuted ? <FontAwesomeIcon icon={faVideo} /> : <FontAwesomeIcon icon={faVideoSlash} />}
            </Button>
            <Button onClick={shareScreen}>
              Share screen
            </Button>
          </div>
        )}
      </VStack>
    </VStack>
  );
};

export default VideoCall;
