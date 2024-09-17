
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Button, Flex, Image, Text, useTheme } from "@chakra-ui/react";
import Logo from "../assets/svgs/Logo.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef1.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 });
    gsap.fromTo(textRef2.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(textRef3.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, delay: 0.2 });
  }, []);


  return (
    <Flex width="100%" alignItems="center" justifyContent="center" margin="1rem" pos="fixed" zIndex="100">
      <Flex width={{ base: "full", xl: "1280px" }} borderRadius="5px" justifyContent="space-between" p={{ base: "1rem", sm: "0.5rem 2rem" }} boxShadow="0 2px 3px #bebebe" backdropFilter="blur(8px)" >
        <Flex alignItems="center" gap="1rem">
          <Image ref={textRef1} src={Logo} alt="Dermify.AI logo" h="3.5rem" />
        </Flex>
        <Flex >
          {Cookies.get("token") ? (
            <Flex ref={textRef2}>
              <Button
                onClick={() => navigate("/private/derma-detection")}
                backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent"
                _hover={{
                  backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                  color: `${theme.colors.button.hover_light_color}`,
                  border: `${theme.colors.button.hover_light_border}`
                }}
                variant="unstyled"
                p="1.5rem"
                display="flex"
                color="#fff"
                borderRadius="10px">Dashboard</Button>
            </Flex>
          ) : (
            <Flex gap="1rem">
              <Flex ref={textRef2}>
                <Button
                  ref={textRef3}
                  onClick={() => navigate("/login")} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                    backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                    color: `${theme.colors.button.hover_light_color}`,
                    border: `${theme.colors.button.hover_light_border}`
                  }} variant="unstyled"
                  p="1.5rem"
                  display="flex"
                  color="#fff"
                  borderRadius="10px">Login</Button>
              </Flex>
              <Flex ref={textRef3}>
                <Button
                  onClick={() => navigate("/register")} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                    backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                    color: `${theme.colors.button.hover_light_color}`,
                    border: `${theme.colors.button.hover_light_border}`
                  }} variant="unstyled"
                  p="1.5rem"
                  display="flex"
                  color="#fff"
                  borderRadius="10px">Register</Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex >
    </Flex >
  );
};

export default Navbar;