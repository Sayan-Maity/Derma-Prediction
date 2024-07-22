
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Abstract from "../../assets/images/abstract.jpg";
import { Radio, RadioGroup } from '@chakra-ui/react'

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const theme = useTheme();
  
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [roleValue, setRoleValue] = useState('user')


  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !firstname || !lastname || !roleValue) {
      toast({
        title: "Please fill all the fields!",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      setLoading(false);
    } else {
      //check valid email
      if (!email.includes("@")) {
        toast({
          title: "Please enter a valid email!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        setLoading(false);
        return;
      }
      try {
        const resp = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
          {
            email: email,
            firstname: firstname,
            lastname: lastname,
            role: roleValue
          }
        );
        if (resp.status === 201) {
          toast({
            title: "Registration Successful!",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "success",
          });
          setLoading(false);
          navigate("/login");
        }
      } catch (err) {
        toast({
          title: "Something went wrong!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        setLoading(false);
        console.log(err);
      }
    }
  };
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      maxH="100vh"
    >
      <Flex
        width="100%"
        // width="1180px"
        alignItems="center"
        justifyContent="center"
        flexDir="row"
      // backgroundColor="yellow.100"
      >
        <Flex
          flexDir="column"
          width="50%"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          <Heading> Register Page </Heading>
          <Flex className="login" flexDir="column" width="25rem" gap="1rem">
            <form
              onSubmit={handleRegistration}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Input
                variant="unstyled"
                type="text"
                placeholder="First Name*"
                p="0.8rem 1rem"
                border={`1px solid ${theme.colors.border}`}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                variant="unstyled"
                type="text"
                placeholder="Last Name*"
                p="0.8rem 1rem"
                border={`1px solid ${theme.colors.border}`}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                variant="unstyled"
                type="email"
                placeholder="Email*"
                p="0.8rem 1rem"
                border={`1px solid ${theme.colors.border}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="role">Select your role </label>
              <RadioGroup onChange={setRoleValue} value={roleValue} id="role">
                <Stack direction='row'>
                  <Radio colorScheme='green' value='doctor'>Doctor</Radio>
                  <Radio colorScheme='green' value='user'>User</Radio>
                </Stack>
              </RadioGroup>

              <Button
                type="submit"
                isLoading={loading}
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
                _hover={{
                  backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                  color: `${theme.colors.button.hover_light_color}`,
                  border: `${theme.colors.button.hover_light_border}`
                }}
                _active={{
                  backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
                }}
              >
                Register
              </Button>
            </form>
            <Flex justifyContent="center" gap="0.5rem" pt="2rem">
              <Text>Already have an account? </Text>
              <Flex>
                <NavLink to="/login" key={<Login />} className="link">
                  <Text color="#206bd1" fontWeight="500" textDecor="underline">
                    Login
                  </Text>
                </NavLink>{" "}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex display={{base: "none", lg: "flex"}} width="50%" height="100vh" backgroundImage={`${Abstract}`} backgroundPosition="center" backgroundSize="cover">
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;

