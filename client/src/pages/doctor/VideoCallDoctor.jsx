/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhoneAlt,
  faPhoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';

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
          setListOfUserIds([...listOfUserIds, ...res.data]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getDoctorPatientId();
  }, [listOfUserIds])

  return (
    <VStack
      w="full"
      alignItems="center"
      justifyContent="center"
    >

      <VStack>
        <Text>List of User Id's</Text>
        {listOfUserIds.map((item, index) => (
          <Text key={index}>{item.userId}</Text>
        ))}

      </VStack>

      <VStack w="full" alignItems="center" justifyContent="center">
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
                  <Button onClick={cancelCall}>
                    <FontAwesomeIcon icon={faPhoneSlash} /> Cancel
                  </Button>
                ) : (
                  <Button onClick={() => callUser(userToCallId)}>
                    <FontAwesomeIcon icon={faPhoneAlt} /> Make a call
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
            <Button onClick={ToggleAudio}>
              {!isAudioMuted ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}
            </Button>
            <Button onClick={ToggleVideo}>
              {!isVideoMuted ? <FontAwesomeIcon icon={faVideo} /> : <FontAwesomeIcon icon={faVideoSlash} />}
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
