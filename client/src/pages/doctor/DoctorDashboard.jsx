import axios from 'axios'
import DashboardWrapper from '../../components/DashboardWrapper'
import { Flex, Heading, Text, VStack } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import Peer from 'simple-peer';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import IncomingCallAudio from "../../assets/sounds/incomingCall.mp3"
import VideoCallDoctor from './VideoCallDoctor';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
const socket = io(SERVER_URL);

const DoctorDashboard = () => {
    const [isSubscribed, setIsSubscribed] = useState(false)

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/getUserInfo`, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })

                if (resp.status === 200) {
                    if (resp.data.data.paymentHistory.length > 0) {
                        setIsSubscribed(true)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkSubscription()
    }, [])

    const [userName, setUserName] = useState('');
    const [myUserId, setMyUserId] = useState('');
    const [userCalling, setUserCalling] = useState({});
    const [calling, setCalling] = useState(false);
    const [stream, setStream] = useState('');
    const userVideoRef = useRef(null);
    const peerRef = useRef();
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const videoRef = useRef(null);
    const [isCallAccepted, setIsCallAccepted] = useState(false);

    const [userToCallId, setUserToCallId] = useState('');
    const [screenStream, setScreenStream] = useState('');

    const callUser = (userID) => {
        setUserToCallId(userID);
        setCalling(true);

        var peer = new Peer({ initiator: true, trickle: false, stream: stream });
        peer.on('signal', (data) => {
            console.log(data);
            socket.emit('callUser', {
                from: myUserId,
                to: userID,
                userName,
                isUserCalling: true,
                signal: data,
                isCallAccepted: false,
            });
        });

        peer.on('stream', (currentStream) => {
            console.log(currentStream);
            userVideoRef.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (data) => {
            console.log('callAccepted');
            setIsCallAccepted(true);
            peer.signal(data.signalData);
        });

        peerRef.current = peer;
    };

    const RejectCall = () => {
        socket.emit('rejectCall', {
            to: userToCallId,
            from: myUserId,
            isUserCalling: false,
            isCallAccepted: false,
        });

        setUserCalling({});
    };

    const cancelCall = () => {
        socket.emit('rejectCall', {
            to: userToCallId,
            from: myUserId,
            isUserCalling: false,
            isCallAccepted: false,
        });
        setCalling(false);
        setUserCalling({});

        setIsCallAccepted(false);
    };

    const AnswerCall = () => {
        console.log(userCalling);
        setIsCallAccepted(true);
        var peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            console.log(data);
            socket.emit('answerCall', {
                from: myUserId,
                to: userCalling.from,
                isUserCalling: false,
                isCallAccepted: true,
                signalData: data,
            });
        });

        peer.on('stream', (currentStream) => {
            console.log(currentStream);
            userVideoRef.current.srcObject = currentStream;
        });

        peer.signal(userCalling.signal);

        peerRef.current = peer;
    };

    let incomingCall = new Audio(IncomingCallAudio);

    useEffect(() => {
        if (userCalling.isUserCalling && !isCallAccepted) {
            incomingCall.play();
        }
    }, [userCalling, isCallAccepted]);

    const LeaveCall = () => {
        peerRef.current.destroy();
        window.location.reload();
    };

    const shareScreen = () => {
        if (!isScreenSharing) {
            navigator.mediaDevices
                .getDisplayMedia({ cursor: true })
                .then((screenStream) => {
                    peerRef.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
                    videoRef.current.srcObject = screenStream;
                    setScreenStream(screenStream);
                    screenStream.getTracks()[0].onended = () => {
                        peerRef.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
                        videoRef.current.srcObject = stream;
                    };
                })
                .then(() => setIsScreenSharing(true))
                .catch((err) => {
                    console.log(err);
                    alert('Unable to share screen');
                });
        } else {
            peerRef.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
            videoRef.current.srcObject = stream;
            setIsScreenSharing(false);
        }
    };

    useEffect(() => {
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                // First get ahold of the legacy getUserMedia, if present
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                setStream(stream);
            })
            .catch((err) => {
                console.error('error:', err);
            });

        socket.on('userID', function (data) {
            console.log(data);
            setMyUserId(data);
        });

        socket.on('userCalling', (data) => {
            console.log(data);
            setUserCalling({ ...data });
        });
        socket.on('callRejected', (data) => {
            console.log(data);
            setCalling(false);
            setIsCallAccepted(false);
        });
    }, []);

    return (
        <DashboardWrapper>
            <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
                {/* <Heading fontSize="2rem"> Video Call with Doctor </Heading> */}
                {/* {isSubscribed ? ( */}
                    <VStack>
                        {userCalling.isUserCalling && !isCallAccepted && (
                            <Flex
                                className="modal fade show d-block"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                                data-backdrop="static"
                            >
                                <Flex className="modal-dialog modal-dialog-centered">
                                    <Flex className="modal-content">
                                        <Flex className="modal-header">
                                            <Text className="modal-title" id="exampleModalLabel">
                                                {userCalling.userName || 'Unknown user'} is calling...
                                            </Text>
                                        </Flex>
                                        <Flex className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                data-dismiss="modal"
                                                onClick={() => RejectCall(userCalling.id)}
                                            >
                                                Reject
                                            </button>
                                            <button type="button" className="btn btn-success" onClick={AnswerCall}>
                                                Accept
                                            </button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}

                        <VideoCallDoctor
                            callUser={callUser}
                            myUserId={myUserId}
                            calling={calling}
                            cancelCall={cancelCall}
                            stream={stream}
                            userVideoRef={userVideoRef}
                            isCallAccepted={isCallAccepted}
                            videoRef={videoRef}
                            LeaveCall={LeaveCall}
                            shareScreen={shareScreen}
                            setUserName={setUserName}
                        />
                    </VStack>
                {/* ) : (
                    <VStack w="full">
                        <Text>Please Subscribe! </Text>
                    </VStack>
                )} */}

            </Flex>
        </DashboardWrapper>
    )
}

export default DoctorDashboard
