
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button, Flex, HStack, Image, Input, Text, Textarea, VStack, useTheme, useToast } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LandingVector from "../../assets/images/LandingVector.png";
import WhyChooseUs from "../../assets/images/WhyChooseUS.png";
import ContactUs from "../../assets/images/ContactUs.png";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";
import { PiStethoscopeFill } from "react-icons/pi";
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
        <Flex width="50%" flexDir="column">
          <Text fontSize="4rem" lineHeight="10">AI Powered</Text>
          <Text fontSize="4rem" display="flex" gap="0.5rem" alignItems="center">Skin Diagnosis <PiStethoscopeFill color="#81efcc" /></Text>
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
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={LandingVector} height="35rem" />
        </Flex>
      </Flex>

      {/* -------------------------------  Features Section  -------------------------------- */}
      <Flex flexDir="column" width="100%" backgroundColor="#81efcc" alignItems="center" justifyContent="center">
        <SectionTitle title={LandingSectionTitle[1].title} description={LandingSectionTitle[1].description} />

        <HStack width={{ base: "full", xl: "1280px" }} p="3rem" flexWrap="wrap" gap="2rem 0" justifyContent="center" alignItems="center">
          
          <HStack w="full" justifyContent="center" gap="3rem 1rem" >
            <FeaturedCard featuredItem={FeaturedCardContent[0]} />
            <FeaturedCard featuredItem={FeaturedCardContent[1]} />
            {/* <FeaturedCard featuredItem={FeaturedCardContent[2]} /> */}
            <FeaturedCard featuredItem={FeaturedCardContent[3]} />
          </HStack>
          <HStack w="full" justifyContent="center" gap="3rem 1rem" >
            <FeaturedCard featuredItem={FeaturedCardContent[4]} />
            <FeaturedCard featuredItem={FeaturedCardContent[5]} />
          </HStack>
          <HStack w="full" justifyContent="center" gap="3rem 1rem" >
            <FeaturedCard featuredItem={FeaturedCardContent[6]} />
            <FeaturedCard featuredItem={FeaturedCardContent[7]} />
            <FeaturedCard featuredItem={FeaturedCardContent[8]} />
          </HStack>

        </HStack>
      </Flex>

      {/* -------------------------------  Why Choose Us Section  -------------------------------- */}
      <SectionTitle title={LandingSectionTitle[2].title} description={LandingSectionTitle[2].description} />

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir="row" alignItems="flex-start" >
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={WhyChooseUs} height="30rem" />
        </Flex>
        <VStack width="50%" alignItems="flex-start" >
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

      <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="space-between" flexDir="row" alignItems="center" >
        <Flex width="50%" >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "90%", gap: "1rem" }}>
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
        <Flex width="50%" alignItems="center" justifyContent="center">
          <Image src={ContactUs} height="30rem" />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default LandingPage;
