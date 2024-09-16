import { createRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button, Flex, HStack, Image, Input, Text, Textarea, VStack, useTheme, useToast } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";
import FeaturedCard from "../../components/FeaturedCard";
import { FeaturedCardContent } from "../../constants/FeaturedCardContent";
import SectionTitle from "../../components/SectionTitle";
import { LandingSectionTitle } from "../../constants/LandingSectionTitle";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const LandingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, handleSubmit] = useForm("xvojwqeo");
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const textRef5 = useRef(null);
  const textRef6 = useRef(null);
  const textRef7 = useRef(null);
  const imageRef = useRef(null);

  const featuredCardGroups = [
    [0, 1, 2],
    [3, 4],
    [5, 6, 7]
  ];
  const featureRefs = useRef([...Array(8)].map(() => createRef()));

  const handleComingSoon = () => {
    toast({
      title: "Coming Soon, Stay tuned",
      variant: "left-accent",
      position: "top",
      isClosable: true,
      duration: 2000,
      status: "info",
    });
  }
  useEffect(() => {
    gsap.fromTo(textRef1.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo(textRef2.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1 });
    gsap.fromTo(textRef3.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
    gsap.fromTo(textRef4.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, delay: 0.5 });
    gsap.fromTo(textRef5.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, scrollTrigger: {
        trigger: textRef5.current,
        start: 'top 80%',
      },
    });
    gsap.fromTo(textRef6.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, scrollTrigger: {
        trigger: textRef6.current,
        start: 'top 80%',
      },
    });
    gsap.fromTo(textRef7.current, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, scrollTrigger: {
        trigger: textRef7.current,
        start: 'top 80%',
      },
    });
    gsap.fromTo(imageRef.current, { opacity: 0, x: '100px' }, { opacity: 1, x: 0, duration: 1 });

    const animations = [
      { opacity: 0, x: -100, rotation: -20 },
      { opacity: 0, y: 100, rotation: 0 },
      { opacity: 0, x: 100, rotation: 20 },
      { opacity: 0, x: -100, rotation: 0 },
      { opacity: 0, x: 100, rotation: 0 },
      { opacity: 0, x: -100, rotation: -20 },
      { opacity: 0, y: 100, rotation: 0 },
      { opacity: 0, x: 100, rotation: 20 },
    ];

    featureRefs.current.forEach((ref, index) => {
      gsap.fromTo(ref.current, animations[index], {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    });
  }, []);

  return (
    <Flex flexDir="column" width="100%" alignItems="center">
      <Navbar />

      {/* -------------------------------  Landing Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} marginTop="6rem" p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" h="100vh">
        <Flex width={{ base: "100%", xl: "50%" }} flexDir="column" >
          <Flex flexDir="column" lineHeight="4.5rem" width="fit-content" mb="1.5rem">
            <Text ref={textRef1} fontSize="4rem">AI Powered</Text>
            <Text ref={textRef2} fontSize="4rem" gap="0.5rem" alignItems={{ base: "flex-end", xl: "center" }} width="fit-content">Skin Diagnosis</Text>
          </Flex>
          <Text ref={textRef3} fontSize="1.4rem"> Explore the future of dermatological care with our AI-based tool <span style={{ color: "#3ce2ad", fontWeight: "500" }}>Dermify.AI</span> which harnesses the power of image processing to offer cost-effective and accessible skin condition assessments worldwide.</Text>
          <Flex ref={textRef4} mt="1.5rem">
            <Button
              onClick={() => navigate("/private/derma-detection")}
              loadingText="Please Wait..."
              variant="unstyled"
              gap="0.5rem"
              p="1.5rem"
              width="fit-content"
              display="flex"
              borderRadius="10px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              backgroundColor={theme.colors.button.light_backgroundColor}
              border="2px solid transparent"
              _hover={{
                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                color: `${theme.colors.button.hover_light_color}`,
                border: `${theme.colors.button.hover_light_border}`
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              Explore Now
            </Button>
          </Flex>
        </Flex>
        <Flex width="50%" flexDir="row" alignItems="flex-end" justifyContent="flex-end" display={{ base: "none", xl: "flex" }}>
          <Image
            ref={imageRef}
            src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/LandingVector.png?updatedAt=1714966041467"
            height="35rem"
            alt="doctor-vector" />
        </Flex>
      </Flex>

      {/* -------------------------------  Features Section  -------------------------------- */}
      <Flex flexDir="column" width="100%" backgroundColor="#81efcc" alignItems="center" justifyContent="center">
        <SectionTitle title={LandingSectionTitle[1].title} description={LandingSectionTitle[1].description} />

        <HStack width={{ base: "full", xl: "1280px" }} p="3rem" flexWrap="wrap" gap="2rem 0" justifyContent="center" alignItems="center">
          {featuredCardGroups.map((group, index) => (
            <HStack key={index} w="full" justifyContent="center" gap="3rem 1rem" flexWrap="wrap">
              {group.map((itemIndex) => (
                <FeaturedCard key={itemIndex} ref={featureRefs.current[itemIndex]} featuredItem={FeaturedCardContent[itemIndex]} />
              ))}
            </HStack>
          ))}
        </HStack>
      </Flex>

      {/* -------------------------------  Why Choose Us Section  -------------------------------- */}
      <SectionTitle title={LandingSectionTitle[2].title} description={LandingSectionTitle[2].description} />

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir={{ base: "column", xl: "row" }} alignItems={{ base: "center", xl: "flex-start" }} >
        <Flex width="50%" alignItems="center" justifyContent="center" display={{ base: "none", xl: "block" }}>
          <Image src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/WhyChooseUS.png?updatedAt=1714965959564" height="30rem" alt="choose-us" />
        </Flex>
        <VStack width={{ base: "100%", xl: "50%" }} alignItems="flex-start" >
          <VStack gap="0" alignItems="flex-start">
            <Text color={theme.colors.brand.primary_green_dark} fontSize="1.2rem">Passwordless Authentication</Text>
            <Text ref={textRef5}>Passwordless authentication is an authentication method in which a user can log in to any particular product or system without entering (and having to remember) a password or any other knowledge-based secret.</Text>
          </VStack>
          <VStack gap="0" alignItems="flex-start">
            <Text color={theme.colors.brand.primary_green_dark} fontSize="1.2rem">Google's Bard LLM</Text>
            <Text ref={textRef6}>Elevate your derma disease predictions with the power of Google's Bard Language Model (LLM). Harness cutting-edge natural language processing to obtain comprehensive and accurate information, enhancing the capabilities of our application and ensuring you receive the most up-to-date and relevant insights.</Text>
          </VStack>
          <VStack gap="0" alignItems="flex-start">
            <Text color={theme.colors.brand.primary_green_dark} fontSize="1.2rem">Interactive Charts for Data Visualization</Text>
            <Text ref={textRef7}>Dive into your derma data like never before with our interactive charts. Uncover meaningful insights at a glance, thanks to dynamic visualizations that empower you to understand trends, correlations, and patterns in your data, making informed decisions simpler than ever.</Text>
          </VStack>
        </VStack>
      </Flex>

      {/* -------------------------------  Contact Us Section  -------------------------------- */}
      <SectionTitle title={LandingSectionTitle[4].title} description={LandingSectionTitle[4].description} />

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir={{ base: "column-reverse", xl: "row" }} alignItems="center" gap={{ base: "0", xl: "1rem" }}>
        <Flex width={{ base: "100%", xl: "50%" }} >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "100%", gap: "1rem" }}>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email*"
              _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <Textarea
              id="message"
              name="message"
              placeholder="Write your query here*"
              _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Button
              type="submit"
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
              borderRadius="10px">Submit</Button>
          </form>
        </Flex>
        <Flex width="50%" alignItems="center" justifyContent="center" display={{ base: "none", xl: "flex" }}>
          <Image src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/ContactUs.png?updatedAt=1714965927940" height="30rem" alt="contact-us" />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default LandingPage;
