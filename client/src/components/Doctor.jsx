/* eslint-disable prettier/prettier */
import {
  Flex,
  useTheme,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";


const Doctor = () => {
  const theme = useTheme();
  return (
    <Flex
      h="100vh"
      flexDir="row"
      justifyContent="center"
      alignItems="flex-start"
      borderRight={`1px solid ${theme.colors.border}`}
    >
      <DoctorSidebar />
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Doctor;
