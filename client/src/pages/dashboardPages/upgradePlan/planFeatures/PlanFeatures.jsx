import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { BasicPlanBenifits, GoldPlanBenifits } from '../../../../constants/UpgradePlanBenifits'

const PlanFeatures = ({ planType }) => {
    const benefits = planType === "Basic" ? BasicPlanBenifits : GoldPlanBenifits;

    return (
        <VStack mt="2rem" alignItems="flex-start" w="full" gap="0.5rem">
            {benefits.map((feature, index) => (
                <Flex flexDir="row" gap="1rem" alignItems="center" key={index}>
                    <FaCheck color='#475569' fontSize="0.9rem" />
                    <Text>{feature}</Text>
                </Flex>
            ))}
        </VStack>
    )
}

export default PlanFeatures
