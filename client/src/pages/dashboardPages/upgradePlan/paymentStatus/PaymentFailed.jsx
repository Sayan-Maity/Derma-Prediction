import React from 'react'
import DashboardWrapper from '../../../../components/DashboardWrapper'
import { RxCrossCircled } from 'react-icons/rx'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, useTheme } from '@chakra-ui/react'

const PaymentFailed = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation();
    const { planType } = location.state || {};
    return (
        <DashboardWrapper>
            <div className="cancel-donation">
                <div className="cancel">
                    <div className="cancel-div">
                        <div className="circle-cancel">
                            <div className="cancel-icon">
                                <RxCrossCircled className='' />
                            </div>
                        </div>
                    </div>
                    <div className="cancel-message">
                        <p>Oops, Something went Wrong ! </p>
                        <p>Your payment of <span>{planType}</span> to Dermify.AI failed !</p>
                    </div>
                    <div className="cancel-home-div">
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
                            Try Again
                        </Button>
                    </div>

                </div>

            </div>

        </DashboardWrapper>
    )
}

export default PaymentFailed
