
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../utils/userContext";
import { magic } from "../../utils/magic";
import Register from "./Register";
import Abstract from "../../assets/images/abstract.jpg";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  console.log(process.env.REACT_APP_SERVER_URL);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_SERVER_URL);
    setLoading(true);
    if (email === "") {
      toast({
        title: "Please provide your email!",
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
          title: "Please enter a valid email address!",
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
        //checking if user exists
        const resp = await Axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/check`,
          {
            email: email,
          }
        );
        console.log("User Data =>", resp.data);
        if (!resp.data.status) {
          toast({
            title: "Please register first!",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
          setLoading(false);
          return navigate("/register");
        }
        // Trigger Magic link to be sent to user
        let didToken = await magic.auth.loginWithMagicLink({
          email,
        });

        // Validate didToken with server
        try {
          const loginResp = await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
            { email },
            {
              headers: {
                Authorization: "Bearer " + didToken,
              },
            }
          );
          console.log(loginResp)
          if (loginResp.status === 200 && resp.data.doctor === false) {
            let userMetaData = await magic.user.getInfo();
            setUser(userMetaData)
            Cookies.set("token", didToken);
            Cookies.set("doctor", false)
            navigate("/private/derma-detection")
          } else {
            let userMetadata = await magic.user.getInfo();
            setUser(userMetadata);
            Cookies.set("token", didToken);
            Cookies.set("doctor", true);
            navigate("/doctor/doctor-dashboard");
          }
        } catch (err) {
          toast({
            title: "Login attempt failed, please try again later!",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
          setLoading(false);
          console.log(err);
        }
      } catch (err) {
        toast({
          title: "Login attempt failed, please try again later!",
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
          <Heading> Log in. </Heading>
          <Flex
            className="login"
            flexDir="column"
            width="25rem"
            gap="1rem"
          >
            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Input
                type="email"
                placeholder="Email*"
                variant="unstyled"
                p="0.8rem 1rem"
                border={`1px solid ${theme.colors.border}`}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                Log In
              </Button>
            </form>
            <Flex justifyContent="center" gap="0.5rem" pt="2rem">
              <Text>Not registered yet? </Text>
              <Flex>
                <NavLink to="/register" key={<Register />} className="link">
                  <Text color="#206bd1" fontWeight="500" textDecor="underline">
                    Create account
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

export default Login;
