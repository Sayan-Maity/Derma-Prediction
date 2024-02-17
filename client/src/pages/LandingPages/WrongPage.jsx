
import { Button, Flex, Image, useTheme } from "@chakra-ui/react";
import image from "../../assets/images/wrongPage.png"
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const WrongPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Flex p="2rem"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      maxH="100vh" >
      <Flex width="100%" alignItems="center" justifyContent="center" h="90vh" maxH="100vh" gap="4rem" flexDir="column">
        <Image src={image} height="20rem" draggable="false" />

        <Button
          type="submit"
          onClick={() => navigate("/")}
          loadingText="Please Wait..."
          variant="unstyled"
          gap="0.5rem"
          p="1.5rem"
          display="flex"
          borderRadius="10px"
          transition={"all 0.3s ease"}
          color={theme.colors.button.light_color}
          backgroundColor={theme.colors.button.light_backgroundColor}
          border="2px solid transparent"
          alignItems="center"
          _hover={{
            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
            color: `${theme.colors.button.hover_light_color}`,
            border: `${theme.colors.button.hover_light_border}`
          }}
          _active={{
            backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
          }}
        >
          <IoMdArrowRoundBack fontSize="1.2rem" /> Go Back 
        </Button>
      </Flex>
    </Flex>
  );
};

export default WrongPage;
