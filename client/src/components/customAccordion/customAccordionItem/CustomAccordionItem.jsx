import { Box, Button, Collapse, useDisclosure, useTheme, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import React from 'react'

const CustomAccordionItem = ({ title, children }) => {
    const { isOpen, onToggle } = useDisclosure();
    const theme = useTheme();

    return (
        <AccordionItem width="100%" mb="1rem" border="1px solid" borderColor={theme.colors.brand.primary_blue_light} borderRadius="10px">
            <h2>
                <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                        {title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {children}
            </AccordionPanel>
        </AccordionItem>
    )
}

export default CustomAccordionItem
