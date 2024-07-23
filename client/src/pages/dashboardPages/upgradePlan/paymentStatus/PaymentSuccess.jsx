
import DashboardWrapper from '../../../../components/DashboardWrapper'
import { Button, Flex, Heading, useTheme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ReactConfetti from 'react-confetti'
import { BsCheckCircle } from 'react-icons/bs'
import Dashboard from '../../dashboard/Dashboard'
import './PaymentStatus.css'
const PaymentSuccess = () => {
    const location = useLocation();
    const { planType } = location.state || {};
    const navigate = useNavigate()
    const theme = useTheme()
    // const searchQuery = useSearchParams()[0]
    // console.log(searchQuery.get("reference"))
    const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight })

    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
    useEffect(() => {
        window.addEventListener('resize', detectSize)
        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [])

    return (
        <DashboardWrapper>
            <div className="success-donation">
                <ReactConfetti width={windowDimension.width} height={windowDimension.height} tweenDuration={1000} />
                <div className="success">
                    <div className="success-div">
                        <div className="circle-success">
                            <div className="success-icon">
                                <BsCheckCircle className='' />
                            </div>
                        </div>
                    </div>
                    <div className="success-message">
                        <p>Congratulations ! </p>
                        <p> You are now upgraded to <span>{planType}</span> member of Dermify.AI platform</p>
                    </div>
                    <div className="success-home-div">
                        <Button
                            onClick={() => navigate("/private/upgrade")}
                            variant="unstyled"
                            gap="0.5rem"
                            p="1.5rem"
                            display="flex"
                            borderRadius="10px"
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
                            Back to Dashboard
                        </Button>
                    </div>

                </div>

            </div>
        </DashboardWrapper>
    )
}

export default PaymentSuccess
