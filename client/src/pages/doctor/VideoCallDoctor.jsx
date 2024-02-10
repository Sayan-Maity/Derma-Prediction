import React, { useEffect, useState } from 'react';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaPhoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa6";

const VideoCallDoctor = ({
  callUser,
  // myUserId,
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
  const [userToCallId, setUserToCallId] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [listOfUserIds, setListOfUserIds] = useState([]);

  // const dispatch = useDispatch();

  const ToggleVideo = () => {
    stream.getVideoTracks()[0].enabled = isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const ToggleAudio = () => {
    stream.getAudioTracks()[0].enabled = isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
  };

  useEffect(() => {
    const getDoctorPatientId = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/getDoctorPatientId`,
        );

        if (res.status === 200) {
          console.log("data here =>", res.data);
          setListOfUserIds(res.data);

        }
      } catch (error) {
        console.log(error);
      }
    }

    getDoctorPatientId();
  }, [])
  console.log("listOfUserIds =>", listOfUserIds)

  return (
    <VStack
      w="full"
      alignItems="center"
      justifyContent="center"
    >

      <VStack>
        <Text>List of User Id's</Text>
        {listOfUserIds.map((item, index) => (
          <Text key={index} color="#333">{item.userId}</Text>
        ))}

      </VStack>

      <VStack w="full" alignItems="center" justifyContent="center">
        <HStack w="full">
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              border: '2px solid #3ce2ad',
            }}
          />

          {isCallAccepted && (
            <HStack w="full">
              <video
                ref={userVideoRef}
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                  border: '2px solid #0078aa',
                }} />
            </HStack>
          )}
        </HStack>

        {!isCallAccepted ? (
          <HStack w="full">
            <VStack>
              <HStack>
                <Input
                  placeholder="Enter call ID"
                  onChange={(e) => setUserToCallId(e.target.value)}
                />
              </HStack>
              <HStack>
                {calling ? (
                  <Button
                    onClick={cancelCall}
                    gap="0.5rem"
                  >
                    <FaPhoneSlash />
                    Cancel
                  </Button>
                ) : (
                  <Button
                    onClick={() => callUser(userToCallId)}
                    gap="0.5rem"
                  >
                    <FaPhone />
                    Make a call
                  </Button>
                )}
              </HStack>
            </VStack>
          </HStack>
        ) : (
          <HStack>
            <Button onClick={LeaveCall}>
              Leave call
            </Button>
            <Button
              onClick={ToggleAudio}
              gap="0.5rem"
            >
              {!isAudioMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>
            <Button
              onClick={ToggleVideo}
              gap="0.5rem"
            >
              {!isVideoMuted ? <FaVideo /> : <FaVideoSlash />}
            </Button>
            <Button onClick={shareScreen}>
              Share screen
            </Button>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default VideoCallDoctor;
