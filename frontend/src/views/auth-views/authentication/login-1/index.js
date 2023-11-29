import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundStyle = {
	backgroundImage: `url(${window.env.REACT_APP_AUTH_BACKGROUND})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const cardStyle = {
	boxShadow: `rgba(17, 12, 46, 0.15) 0px 48px 100px 0px`,
	background: `transparent`,
	border: `unset`
}

const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={10} xl={7}>
						<Card style={cardStyle}>
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" src={`${theme === 'light' ? window.env.REACT_APP_LOGO : window.env.REACT_APP_LOGO_WHITE}`} alt="" />
									{/* <p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p> */}
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default LoginOne
