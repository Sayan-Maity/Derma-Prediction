/* eslint-disable prettier/prettier */
import { Flex, Text } from '@chakra-ui/react'

const SectionTitle = ({ title, description }) => {
    return (
        <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
            <Text fontSize="3rem" fontWeight="500" textAlign="center" >{title}</Text>
            <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >{description}</Text>
        </Flex>
    )
}

export default SectionTitle
