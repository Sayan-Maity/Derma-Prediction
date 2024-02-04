/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button, Checkbox, Flex, Heading, Image, Input, useDisclosure, useTheme, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { IconStar } from '../../assets/svgs/Icons'
import DashboardWrapper from '../../components/DashboardWrapper'
import WaterIntakeImage from '../../assets/svgs/WaterIntake.png'
import Diet from '../../assets/svgs/Diet.png'
import Lifestyle from '../../assets/svgs/Lifestyle.png'
import SkinCare from '../../assets/svgs/SkinCare.png'

const HealthAnalytics = () => {
    const theme = useTheme()
    const toast = useToast()
    const [lifestyleSleepValue, setLifestyleSleepValue] = useState(null)
    const [lifestyleExerciseValue, setLifestyleExerciseValue] = useState(null)
    const [lifestyleSunlightValue, setLifestyleSunlightValue] = useState(null)

    const [waterQuantity, setWaterQuantity] = useState(null)

    const [fruitValue, setFruitValue] = useState(0)
    const [vegetableValue, setVegetableValue] = useState(0)
    const [meatValue, setMeatValue] = useState(0)

    const [cleanserValue, setCleanserValue] = useState(0)
    const [moisurizerValue, setMoisurizerValue] = useState(0)
    const [tonerValue, setTonerValue] = useState(0)

    const { isOpen: isOpenLifestyleModal, onOpen: onOpenLifestyleModal, onClose: onCloseLifestyleModal } = useDisclosure()
    const { isOpen: isOpenWaterIntakeModal, onOpen: onOpenWaterIntakeModal, onClose: onCloseWaterIntakeModal } = useDisclosure()
    const { isOpen: isOpenDietModal, onOpen: onOpenDietModal, onClose: onCloseDietModal } = useDisclosure()
    const { isOpen: isOpenSkinCareModal, onOpen: onOpenSkinCareModal, onClose: onCloseSkinCareModal } = useDisclosure()

    const [buttonInfoArray, setButtonInfoArray] = useState([]);

    const [isButtonActive, setIsButtonActive] = useState(true);
    const [isButtonActive2, setIsButtonActive2] = useState(true);
    const [isButtonActive3, setIsButtonActive3] = useState(true);
    const [isButtonActive4, setIsButtonActive4] = useState(true);

    const submitLifestyleData = async () => {
        if (isButtonActive) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/postLifestyleAnalyticsData`, {
                    sleep: lifestyleSleepValue,
                    exercise: lifestyleExerciseValue,
                    sunlight: lifestyleSunlightValue
                }, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })
                if (res.status === 200) {
                    setLifestyleExerciseValue(null)
                    setLifestyleSleepValue(null)
                    setLifestyleSunlightValue(null)
                    onCloseLifestyleModal()
                    toast({
                        title: "Data saved successfully !",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                }
            } catch (err) {
                console.log(err)
            }

            const today = new Date();
            localStorage.setItem('buttonClickedDate', today.toDateString());
            setIsButtonActive(false);
        }
    }

    const submitDietData = async () => {
        if (isButtonActive2) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/postDietData`, {
                    fruit: fruitValue,
                    vegetable: vegetableValue,
                    meat: meatValue,
                }, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })

                if (res.status === 200) {
                    setFruitValue(0)
                    setVegetableValue(0)
                    setMeatValue(0)
                    onCloseDietModal()
                    toast({
                        title: "Data saved successfully !",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                }
            } catch (err) {
                console.log(err)
            }
            const today = new Date();
            localStorage.setItem('buttonClickedDate', today.toDateString());
            setIsButtonActive2(false);
        }
    }

    const submitWaterIntakeData = async () => {
        if (isButtonActive3) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/postWaterIntakeData`, {
                    water: waterQuantity,
                }, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })

                if (res.status === 200) {
                    setWaterQuantity(null)
                    onCloseWaterIntakeModal()
                    toast({
                        title: "Data saved successfully !",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                }
            } catch (err) {
                console.log(err)
            }
            const today = new Date();
            localStorage.setItem('buttonClickedDate', today.toDateString());
            setIsButtonActive3(false); // Deactivate the button
        }
    }

    const submitSkinCareData = async () => {
        if (isButtonActive4) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/postSkinCareRoutineData`, {
                    moisurizer: moisurizerValue,
                    cleanser: cleanserValue,
                    toner: tonerValue,
                }, {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token")
                    }
                })

                if (res.status === 200) {
                    setCleanserValue(0)
                    setMoisurizerValue(0)
                    setTonerValue(0)
                    onCloseSkinCareModal()
                    toast({
                        title: "Data saved successfully !",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                }
            } catch (err) {
                console.log(err)
            }

            const today = new Date();
            localStorage.setItem('buttonClickedDate', today.toDateString());
            setIsButtonActive4(false);
        }
    }

    // Get Email of the user :
    const [profile, setProfile] = useState({});
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function getUserInfo() {
            try {
                let resp = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/user/getUserInfo`,
                    {
                        headers: {
                            Authorization: "Bearer " + Cookies.get("token"),
                        },
                    }
                );
                setProfile(resp.data);
                setEmail(resp.data.data.email);
                setUserName(resp.data.data.firstname + " " + resp.data.data.lastname);
            } catch (err) {
                console.log(err);
            }
        }
        getUserInfo();
    }, []);

    // Send email of the whole data to user :
    const handleSendEmail = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/user/sendEmail`,
                {
                    email: email,
                    userName: userName,
                },
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("token"),
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    // checks if the length is 4, then send the email :
    useEffect(() => {
        saveToLocalStorage('buttonInfoArray', buttonInfoArray);
        if (buttonInfoArray.length === 4) {
            handleSendEmail();
        }
    }, [buttonInfoArray]);

    // Check if the button should be active based on the stored date :
    const checkButtonActivity = () => {
        const lastClickedDate = localStorage.getItem('buttonClickedDate');
        if (lastClickedDate) {
            const today = new Date();
            const storedDate = new Date(lastClickedDate);

            // If the stored date is not today, activate the button
            if (today.toDateString() !== storedDate.toDateString()) {
                setIsButtonActive(true);
                setIsButtonActive2(true);
                setIsButtonActive3(true);
                setIsButtonActive4(true);
            }
        }
    };

    // Check button activity when the component mounts
    useEffect(() => {
        checkButtonActivity();
    }, []);

    const handleButtonClick = (buttonNumber) => {
        const today = new Date();
        const info = `Button ${buttonNumber}`;

        const buttonInfoObject = {
            buttonNumber,
            info,
            date: today.toISOString(),
        };

        setButtonInfoArray((prevArray) => [...prevArray, buttonInfoObject]);
        localStorage.setItem('buttonClickedDate', today.toISOString());
    };

    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    useEffect(() => {
        saveToLocalStorage('buttonInfoArray', buttonInfoArray);
    }, [buttonInfoArray]);

    useEffect(() => {
        const storedButtonInfoArray = JSON.parse(localStorage.getItem('buttonInfoArray')) || [];
        setButtonInfoArray(storedButtonInfoArray);
    }, []);


    return (
        <DashboardWrapper>
            <Flex flexDir="row" width="100%" alignItems="flex-start" justifyContent="flex-start" gap="2rem" flexWrap="wrap">

                <Flex onClick={onOpenLifestyleModal} backgroundColor={theme.colors.brand.primary_green_light} borderRadius="1rem" overflow="hidden" cursor="pointer">
                    <Image src={Lifestyle} h="full" w="full" />
                </Flex>

                <Flex onClick={onOpenWaterIntakeModal} backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="1rem" overflow="hidden" cursor="pointer">
                    <Image src={WaterIntakeImage} h="full" w="full" />
                </Flex>

                <Flex onClick={onOpenDietModal} backgroundColor={theme.colors.brand.primary_blue_light} borderRadius="1rem" overflow="hidden" cursor="pointer">
                    <Image src={Diet} h="full" w="full" />
                </Flex>

                <Flex onClick={onOpenSkinCareModal} backgroundColor={theme.colors.brand.primary_green_light} borderRadius="1rem" overflow="hidden" cursor="pointer">
                    <Image src={SkinCare} h="full" w="full" />
                </Flex>

            </Flex>

            <Modal isOpen={isOpenLifestyleModal} onClose={onCloseLifestyleModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="1rem">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">LifeStyle Analytics</Heading>
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleSleepValue} onChange={(e) => setLifestyleSleepValue(e.target.value)} placeholder="Sleep (in hours)" />
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleExerciseValue} onChange={(e) => setLifestyleExerciseValue(e.target.value)} placeholder="Exercise (in hours)" />
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={lifestyleSunlightValue} onChange={(e) => setLifestyleSunlightValue(e.target.value)} placeholder="Exposure to Sunlight (in hours)" />
                        <Button
                            onClick={() => { submitLifestyleData(); handleButtonClick(0); }}
                            isDisabled={!isButtonActive}
                            backgroundColor={theme.colors.brand.primary_green_dark}
                            border="2px solid transparent"
                            _hover={{
                                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                                color: `${theme.colors.button.hover_light_color}`,
                                border: `${theme.colors.button.hover_light_border}`
                            }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenWaterIntakeModal} onClose={onCloseWaterIntakeModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="1rem">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Water Intake Analytics</Heading>
                        <Input _focus={{ border: `2px solid ${theme.colors.brand.primary_green_dark}` }} outline="none" type="number" value={waterQuantity} onChange={(e) => setWaterQuantity(e.target.value)} placeholder="Water (in litres)" />
                        <Button onClick={() => { submitWaterIntakeData(); handleButtonClick(1); }} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenDietModal} onClose={onCloseDietModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="1rem">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Diet Analytics</Heading>
                        <Flex flexDir="column" gap="0.5rem">
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setMeatValue(e.target.checked ? 1 : 0)}>
                                Meat
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setVegetableValue(e.target.checked ? 1 : 0)}>
                                Vegetable
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setFruitValue(e.target.checked ? 1 : 0)}>
                                Fruit
                            </Checkbox>
                        </Flex>
                        <Button onClick={() => { submitDietData(); handleButtonClick(2); }} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenSkinCareModal} onClose={onCloseSkinCareModal} isCentered>
                <ModalOverlay />
                <ModalContent p="2rem 1rem " borderRadius="1rem">
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" gap="1rem">
                        <Heading fontSize="1.2rem" fontWeight="500" mb="1rem">Skin Care Analytics</Heading>
                        <Flex flexDir="column" gap="0.5rem">
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setCleanserValue(e.target.checked ? 1 : 0)}>
                                Cleanser
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setMoisurizerValue(e.target.checked ? 1 : 0)}>
                                Moisturizer
                            </Checkbox>
                            <Checkbox type="checkbox" borderRadius="50%" size='lg' colorScheme="green" onChange={(e) => setTonerValue(e.target.checked ? 1 : 0)}>
                                Toner
                            </Checkbox>
                        </Flex>
                        <Button onClick={() => { submitSkinCareData(); handleButtonClick(3); }} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                            color: `${theme.colors.button.hover_light_color}`,
                            border: `${theme.colors.button.hover_light_border}`
                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </DashboardWrapper>
    )
}

export default HealthAnalytics
