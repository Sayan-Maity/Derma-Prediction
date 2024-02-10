
import DashboardWrapper from '../../components/DashboardWrapper'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'


const PaymentSuccess = () => {
    const navigate = useNavigate()
    const searchQuery = useSearchParams()[0]
    console.log(searchQuery.get("reference"))

    return (
        <DashboardWrapper>
            <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
                <Heading fontSize="2rem"> Payment Success </Heading>

                <Button onClick={() => navigate("/private/upgrade")}>Back to Dashboard</Button>
                
            </Flex>
        </DashboardWrapper>
    )
}

export default PaymentSuccess
