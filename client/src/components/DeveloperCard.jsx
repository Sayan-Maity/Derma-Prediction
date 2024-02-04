/* eslint-disable prettier/prettier */
import { Button, Flex, Image, Text, useTheme } from '@chakra-ui/react'
import Sayan from '../assets/images/sayan.jpg'

const DeveloperCard = () => {
    const theme = useTheme()
    return (
        <Flex flexDir="column" width="15rem" borderRadius="10px" alignItems="center" justifyContent="center" border="2px solid #81efcc" p="0.2rem">
            <Flex p="1rem" backgroundColor="#81efcc" width="100%" height="100%" alignItems="center" justifyContent="center" borderTopLeftRadius="10px" borderTopRightRadius="10px">
                <Image src={Sayan} width="8rem" height="8rem" objectFit="cover" borderRadius="50%" border="3px solid #fff" />
            </Flex>
            <Flex p="1rem" flexDir="column" gap="1rem" alignItems="center" justifyContent="center">
                <Text fontSize="1.2rem" >Sayan Maity</Text>
                <Button
                    target="_blank"
                    loadingText="Please Wait..."
                    variant="unstyled"
                    gap="0.5rem"
                    p="1.5rem"
                    width="fit-content"
                    display="flex"
                    borderRadius="30px"
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
                    Meet
                </Button>
            </Flex>
        </Flex>
    )
}

export default DeveloperCard
