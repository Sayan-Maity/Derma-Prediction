
import { Flex, Text } from '@chakra-ui/react'
import AnimatedText from './AnimatedText'

const SectionTitle = ({ title, description }) => {
    return (
        <Flex width={{ base: "full", xl: "1280px" }} p="3rem" justifyContent="center" flexDir="column" alignItems="center" >
            <AnimatedText
              text={title}
              fontSize="3rem"
              fontWeight="500" 
            />
            <Text fontSize="1.5rem" fontWeight="400" textAlign="center" >{description}</Text>
        </Flex>
    )
}

export default SectionTitle
