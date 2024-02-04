/* eslint-disable prettier/prettier */
import { Button, Flex, Text, useTheme } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const FeaturedCard = ({ featuredItem }) => {
    const theme = useTheme()
    const navigate = useNavigate();
    return (
        <Flex p="2rem" width="20rem" borderRadius="10px" backgroundColor="#fff" flexDir="column" gap="1rem">
            <Text fontSize="1.5rem">{featuredItem.title}</Text>
            <Text fontSize="1rem">{featuredItem.description}</Text>
            <Button
                target="_blank"
                onClick={() => navigate(`${featuredItem.navigateUrl}`)}
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
                Explore
            </Button>

        </Flex>
    )
}

export default FeaturedCard
