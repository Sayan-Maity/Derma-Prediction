import { Box, Flex, Image } from '@chakra-ui/react';
import Logo from "../../assets/svgs/Logo.png";
import { useEffect, useRef, useState } from 'react';
import { gsap, Power1 } from 'gsap';

const PageLoader = () => {
  const logoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gsap.fromTo(logoRef.current, 
      { opacity: 0 }, 
      { opacity: 0.8, duration: 0.5, repeat: -1, yoyo: true, ease: Power1.easeInOut }
    );

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null; // or return the actual content of your page
  }

  return (
    <Box 
      w="100vw" 
      h="100vh" 
      position="relative" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      overflow="hidden"
    >
      <Box 
        position="absolute" 
        top="-5rem" 
        left="-10rem" 
        w="25rem" 
        h="25rem" 
        bg="#3ce2ad51" 
        borderRadius="50%" 
        filter="blur(28px)"
      />
      <Box 
        position="absolute" 
        bottom="-5rem" 
        right="-10rem" 
        w="25rem" 
        h="25rem" 
        bg="#0078aa51" 
        borderRadius="50%" 
        filter="blur(28px)"
      />
      <Flex flexDir="column" align="center" justify="center">
        <Image ref={logoRef} src={Logo} alt="Dermify.AI logo" h="6rem" />
      </Flex>
    </Box>
  );
};

export default PageLoader;