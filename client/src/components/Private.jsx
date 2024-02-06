
import {
  Flex,
  useTheme,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Private = () => {
  const theme = useTheme();
  return (
    <Flex
      h="100vh"
      flexDir="row"
      justifyContent="center"
      alignItems="flex-start"
      borderRight={`1px solid ${theme.colors.border}`}
    >
      <Sidebar />
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Private;
