
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { HStack, VStack, Button, Input, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { MdContentCopy } from "react-icons/md";
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaPhoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa6";

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
  // setUserName,
}) => {
  const toast = useToast()
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [userName, setUserName] = useState('');

  // const handleCopy = (text, result) => {
  //   if (result) {
  //     // The text has been successfully copied
  //     setCopiedText(text);
  //     console.log('Copied:', text);
  //   } else {
  //     console.error('Copy failed');
  //   }
  // };

  // const dispatch = useDispatch();

  const ToggleVideo = () => {
    stream.getVideoTracks()[0].enabled = isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const ToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
  };


  const handleConnectToDoctor = async (text, result) => {
    if (userName === '') {
      toast({
        title: "Please enter your name",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return;
    }
    if (result) {
      const userGeneratedId = text;

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/postDoctorPatientId`,
          {
            userId: userGeneratedId,
            patientName: userName
          },
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

    } else {
      console.error('Copy failed');
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
                  onChange={(e) => setUserName(e.target.value)}
                />
              </HStack>
              <HStack>
                <CopyToClipboard text={myUserId} onCopy={handleConnectToDoctor}>
                  <Button
                    disabled={!myUserId}
                    gap="0.5rem"
                  >
                    {/* <MdContentCopy /> */}
                    Connect to Doctor
                  </Button>
                </CopyToClipboard>
              </HStack>
              {/* <Button onClick={handleConnectToDoctor}>Connect to Doctor</Button> */}
            </VStack>

            <VStack>
              <HStack>
                {calling && (
                  <Button
                    onClick={cancelCall}
                    gap="0.5rem"
                  >
                    <FaPhoneSlash />
                    Cancel
                  </Button>)}
              </HStack>
            </VStack>

          </HStack>
        ) : (
          <div>
            <Button onClick={LeaveCall}>
              Leave call
            </Button>
            <Button
              onClick={ToggleAudio}
              gap="0.5rem">
              {!isAudioMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>
            <Button
              onClick={ToggleVideo}
              gap="0.5rem">
              {!isVideoMuted ? <FaVideo /> : <FaVideoSlash />}
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
