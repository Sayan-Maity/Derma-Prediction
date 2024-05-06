
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios'
import DashboardWrapper from '../../components/DashboardWrapper'
import { Button, Flex, HStack, Heading, Text, VStack, useTheme } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsStars } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

const UpgradePlan = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
    })
    const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_ID_KEY

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user/getUserInfo`, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })

                if (resp.status === 200) {
                    setIsSubscribed(true)
                    const updatedUserDetails = {
                        name: resp.data.data.firstname + " " + resp.data.data.lastname,
                        email: resp.data.data.email,
                    };
                    setUserDetails(updatedUserDetails)
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkSubscription()
    }, [])

    const handleUpgradePlan = async (amt) => {
        let tempAmount = Number(amt)
        const amount = amt * 100;
        try {
            const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/checkout`, {
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("token")
                }
            })
            console.log(resp.data)

            const options = {
                key: RAZORPAY_KEY,
                amount: resp.data.order.amount,
                currency: "INR",
                name: "Sayan Maity",
                description: "Test Transaction",
                // callback_url: `${process.env.REACT_APP_SERVER_URL}/api/paymentVerification`,
                handler: async function (resp) {
                    console.log("Payment Successful", resp)
                    try {
                        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/paymentVerification`, {
                            razorpay_order_id: resp.razorpay_order_id,
                            razorpay_payment_id: resp.razorpay_payment_id,
                            razorpay_signature: resp.razorpay_signature,
                            amount: amount,
                            plan_type: "Basic"
                        }, {
                            headers: {
                                Authorization: "Bearer " + Cookies.get("token")
                            }
                        })

                        if (res.data.success === true) {
                            navigate("/payment-success")
                        }
                        console.log("success payment console", res.data)
                    } catch (error) {
                        console.log(error)
                    }
                },
                order_id: resp.data.order.id,
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: "9000090000"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3ce2ad"
                    // color: "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
        

    // }, [])



    return (
        <DashboardWrapper>
            <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
                <Heading fontSize="2rem"> Upgrade your Plan </Heading>
                <HStack w="full" alignItems="center" justifyContent="center" gap="1.5rem">

                    <VStack
                        borderRadius="0.5rem"
                        border="1px solid #74809a"
                        w="22rem"
                        h="30rem"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        p="1rem 2rem"
                    >
                        <VStack w="full">
                            <VStack alignItems="flex-start" w="full">
                                <Flex
                                    borderRadius="0.5rem"
                                    p="0.5rem"
                                    boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                                >
                                    <BsStars fontSize="2rem" />
                                </Flex>
                                <Heading>Basic Plan</Heading>
                            </VStack>

                            <VStack mt="2rem" alignItems="flex-start" w="full" gap="0">
                                <HStack alignItems="center">
                                    <Flex mt="-0.5rem" p="0.2rem" bg="#e2e8f0" borderRadius="50%"><FaCheck color='#475569' fontSize="0.9rem" /></Flex>
                                    <Text>Get 1 consultation</Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <Flex mt="-0.5rem" p="0.2rem" bg="#e2e8f0" borderRadius="50%"><FaCheck color='#475569' fontSize="0.9rem" /></Flex>
                                    <Text>Rs. 500 only per consultation</Text>
                                </HStack>
                            </VStack>
                        </VStack>
                        <VStack w="full">
                            <Button
                                w="full"
                                onClick={() => handleUpgradePlan(500)}
                                // isDisabled={isSubscribed}
                                backgroundColor={theme.colors.brand.primary_green_dark}
                                border="2px solid transparent"
                                _hover={{
                                    backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                                    color: `${theme.colors.button.hover_light_color}`,
                                    border: `${theme.colors.button.hover_light_border}`
                                }}
                                variant="unstyled"
                                p="1.5rem"
                                display="flex"
                                color="#fff"
                                borderRadius="0.5rem"
                            >Upgrade (Pay 500)</Button>
                        </VStack>
                    </VStack>
                    <VStack
                        borderRadius="0.5rem"
                        border="1px solid #74809a"
                        w="22rem"
                        h="30rem"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        p="1rem 2rem"
                    >
                        <VStack w="full">
                            <VStack alignItems="flex-start" w="full">
                                <Flex
                                    borderRadius="0.5rem"
                                    p="0.5rem"
                                    boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                                >
                                    <BsStars fontSize="2rem" />
                                </Flex>
                                <Heading>Gold Plan</Heading>
                            </VStack>

                            <VStack mt="2rem" alignItems="flex-start" w="full" gap="0">
                                <HStack alignItems="center">
                                    <Flex mt="-0.5rem" p="0.2rem" bg="#e2e8f0" borderRadius="50%"><FaCheck color='#475569' fontSize="0.9rem" /></Flex>
                                    <Text>Get 12 consultations</Text>
                                </HStack>
                                <HStack alignItems="center">
                                    <Flex mt="-0.5rem" p="0.2rem" bg="#e2e8f0" borderRadius="50%"><FaCheck color='#475569' fontSize="0.9rem" /></Flex>
                                    <Text>Rs. 3000  only for 6 months</Text>
                                </HStack>
                            </VStack>
                        </VStack>
                        <VStack w="full">
                            <Button
                                w="full"
                                onClick={() => handleUpgradePlan(3000)}
                                // isDisabled={isSubscribed}
                                backgroundColor={theme.colors.brand.primary_green_dark}
                                border="2px solid transparent"
                                _hover={{
                                    backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                                    color: `${theme.colors.button.hover_light_color}`,
                                    border: `${theme.colors.button.hover_light_border}`
                                }}
                                variant="unstyled"
                                p="1.5rem"
                                display="flex"
                                color="#fff"
                                borderRadius="0.5rem"
                            >Upgrade (Pay 3000)</Button>
                        </VStack>
                    </VStack>

                </HStack>

            </Flex>
        </DashboardWrapper>
    )
}

export default UpgradePlan
