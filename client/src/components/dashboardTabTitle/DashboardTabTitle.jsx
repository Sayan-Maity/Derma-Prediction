
import { Flex, Text } from '@chakra-ui/react'

const DashboardTabTitle = ({ title, desc }) => {
  return (
    <Flex mb="1rem">
      <Text fontSize="1.2rem">{title}</Text>
      <Text>{desc}</Text>
    </Flex>
  )
}

export default DashboardTabTitle
