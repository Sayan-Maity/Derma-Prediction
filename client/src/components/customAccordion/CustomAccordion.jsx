import { Accordion, Box } from '@chakra-ui/react'
import React from 'react'
import { HealthAnalyticsAccordionItems } from '../../constants/HealthAnalyticsAccordionItems'
import CustomAccordionItem from './customAccordionItem/CustomAccordionItem'

const CustomAccordion = ({}) => {
  return (
    <Accordion width="100%">
      {HealthAnalyticsAccordionItems.map((item, index) => (
        <CustomAccordionItem key={index} title={item.title} defaultIndex={[0]}>
          {item.content}
        </CustomAccordionItem>
      ))}
    </Accordion>
  )
}

export default CustomAccordion
