import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, Form, Input, Divider, Alert, Select } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
	verifyEmail,
	signIn,
	signInWithGoogle,
	showLoading,
	showAuthMessage,
	hideAuthMessage
} from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { GoogleLogin } from '@react-oauth/google';
const { Option, OptGroup } = Select
export const LoginForm = props => {

	const navigate = useNavigate();

	const {
		otherSignIn,
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		signInWithGoogle,
		extra,
		verifyEmail,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect = true
	} = props

	const { otpSent, messageType } = useSelector(state => state.auth)

	const initialCredential = {
		/* email: "scanofficer@printftech.com", */
		password: 'Test@123'
	}

	const onVerifyEmail = values => {
		showLoading()
		verifyEmail(values);
	};

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	const googlesigninresponseSuccess = (googleUser) => {
		signInWithGoogle(googleUser)
	}

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	});

	const renderOtherSignIn = (
		<div>
			<Divider>
				<span className="text-muted font-size-base font-weight-normal">or connect with Google</span>
			</Divider>
			<div className="d-flex justify-content-center">
				<GoogleLogin
					onSuccess={credentialResponse => googlesigninresponseSuccess(credentialResponse)}
					onError={() => {
						console.log('Google Login Failed');
					}}
					useOneTap
				/>
			</div>
		</div>
	)

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginTop: showMessage ? 20 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type={messageType} showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				initialValues={initialCredential}
				//onFinish={otpSent ? onLogin : onVerifyEmail}
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Please input your email',
						},
						{
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					{/* <Input prefix={<MailOutlined className="text-primary" />} disabled={otpSent} /> */}
					<Select>
						<OptGroup label="Client Side Users">
							<Option value="clientadmin@printftech.com">(Client Admin) clientadmin@printftech.com</Option>
							<Option value="mrdofficer@printftech.com">(MRD Officer) mrdofficer@printftech.com</Option>
						</OptGroup>
						<OptGroup label="Vender Side Users">
							<Option value="mrdcare@printftech.com">(Super Admin) mrdcare@printftech.com</Option>
							<Option value="admin@printftech.com">(Admin) admin@printftech.com</Option>
							<Option value="boardmember@printftech.com">(Board Member) boardmember@printftech.com</Option>
							<Option value="scanofficer@printftech.com">(Scan Officer) scanofficer@printftech.com</Option>
							<Option value="salesofficer@printftech.com">(Sales Officer) salesofficer@printftech.com</Option>
							<Option value="collectionofficer@printftech.com">(Collection Officer) collectionofficer@printftech.com</Option>
						</OptGroup>
					</Select>
				</Form.Item>
				{/* {otpSent && */}
				<Form.Item
					name="password"
					label={
						<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword &&
								<span
									onClick={() => onForgetPasswordClick}
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				{/* } */}
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						{otpSent ? "Sign In" : "Submit"}
					</Button>
				</Form.Item>
				{/* {
					otherSignIn ? renderOtherSignIn : null
				} */}
				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	verifyEmail,
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
