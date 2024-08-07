
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Flex, HStack, Image, Input, Text, Textarea, VStack, useTheme, useToast } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";
import FeaturedCard from "../../components/FeaturedCard";
import { FeaturedCardContent } from "../../constants/FeaturedCardContent";
import SectionTitle from "../../components/SectionTitle";
import { LandingSectionTitle } from "../../constants/LandingSectionTitle";

const LandingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, handleSubmit] = useForm("xvojwqeo");
  if (state.succeeded) {
    return <p>Thank you for contacting us, we will get back you soon!</p>;
  }

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


  return (
    <Flex flexDir="column" width="100%" alignItems="center">
      <Navbar />

      {/* -------------------------------  Landing Section  -------------------------------- */}
      <Flex width={{ base: "full", xl: "1280px" }} marginTop="6rem" p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" h="100vh">
        <Flex width={{ base: "100%", xl: "50%" }} flexDir="column" >
          <Flex flexDir="column" lineHeight="4.5rem" width="fit-content" mb="1.5rem">
            <Text fontSize="4rem" >AI Powered</Text>
            <Text fontSize="4rem" gap="0.5rem" alignItems={{ base: "flex-end", xl: "center" }} width="fit-content">Skin Diagnosis</Text>
          </Flex>
          <Text fontSize="1.4rem"> Explore the future of dermatological care with our AI-based tool <span style={{ color: "#3ce2ad", fontWeight: "500" }}>Dermify.AI</span> which harnesses the power of image processing to offer cost-effective and accessible skin condition assessments worldwide.</Text>
          <Button
            onClick={() => navigate("/private/derma-detection")}
            loadingText="Please Wait..."
            variant="unstyled"
            mt="2rem"
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
        <Flex width="50%" flexDir="row" alignItems="flex-end" justifyContent="flex-end" display={{ base: "none", xl: "flex" }}>
          <Image src="https://ik.imagekit.io/sayancr777/tr:w-400/Dermify/LandingVector.png?updatedAt=1714966041467" height="35rem" alt="doctor-vector" />
        </Flex>
      </Flex>

      {/* -------------------------------  Features Section  -------------------------------- */}
      <Flex flexDir="column" width="100%" backgroundColor="#81efcc" alignItems="center" justifyContent="center">
        <SectionTitle title={LandingSectionTitle[1].title} description={LandingSectionTitle[1].description} />

        <HStack width={{ base: "full", xl: "1280px" }} p="3rem" flexWrap="wrap" gap="2rem 0" justifyContent="center" alignItems="center">

          <HStack w="full" justifyContent="center" gap="3rem 1rem" flexWrap="wrap" >
            <FeaturedCard featuredItem={FeaturedCardContent[0]} />
            <FeaturedCard featuredItem={FeaturedCardContent[1]} />
            <FeaturedCard featuredItem={FeaturedCardContent[3]} />
          </HStack>
          <HStack w="full" justifyContent="center" gap="3rem 1rem" flexWrap="wrap" >
            <FeaturedCard featuredItem={FeaturedCardContent[4]} />
            <FeaturedCard featuredItem={FeaturedCardContent[5]} />
          </HStack>
          <HStack w="full" justifyContent="center" gap="3rem 1rem" flexWrap="wrap" >
            <FeaturedCard featuredItem={FeaturedCardContent[6]} />
            <FeaturedCard featuredItem={FeaturedCardContent[7]} />
            <FeaturedCard featuredItem={FeaturedCardContent[8]} />
          </HStack>

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
            <Text>Passwordless authentication is an authentication method in which a user can log in to any particular product or system without entering (and having to remember) a password or any other knowledge-based secret.</Text>
          </VStack>
          <VStack gap="0" alignItems="flex-start">
            <Text color={theme.colors.brand.primary_green_dark} fontSize="1.2rem">Google's Bard LLM</Text>
            <Text>Elevate your derma disease predictions with the power of Google's Bard Language Model (LLM). Harness cutting-edge natural language processing to obtain comprehensive and accurate information, enhancing the capabilities of our application and ensuring you receive the most up-to-date and relevant insights.</Text>
          </VStack>
          <VStack gap="0" alignItems="flex-start">
            <Text color={theme.colors.brand.primary_green_dark} fontSize="1.2rem">Interactive Charts for Data Visualization</Text>
            <Text>Dive into your derma data like never before with our interactive charts. Uncover meaningful insights at a glance, thanks to dynamic visualizations that empower you to understand trends, correlations, and patterns in your data, making informed decisions simpler than ever.</Text>
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
