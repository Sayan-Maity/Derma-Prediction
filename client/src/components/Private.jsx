
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
      minH="100vh"
      flexDir="row"
      justifyContent="center"
      alignItems="flex-start"
      borderRight={`1px solid ${theme.colors.border}`}
      overflowX="hidden"
      w="100%"
    >
      <Sidebar />
      <Flex w="100%" overflow="hidden">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Private;
