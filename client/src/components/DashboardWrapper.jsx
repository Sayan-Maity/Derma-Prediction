
import { VStack, useTheme } from "@chakra-ui/react";

const DashboardWrapper = ({
    children,
}) => {
    const theme = useTheme();
    return (
        <VStack
            padding={"0.5rem"}
            h="100vh"
            maxH="100vh"
            width="100%"
            minW="0"
            bgGradient="linear(to-b, #3ce2ad6e, #0078aa78)"
            overflowX={"hidden"}
        >
            <VStack
                width="100%"
                minW="0"
                border={`1px solid ${theme.colors.border}`}
                shadow="md"
                borderRadius={"20px"}
                overflowY={"auto"}
                overflowX={"hidden"}
                p="2rem"
                alignItems="flex-start"
                justifyContent="flex-start"
                color="#74809A"
                height="100%"
                backgroundColor="#fff"
            >
                {children}
            </VStack>
        </VStack>
    );
};

export default DashboardWrapper;
