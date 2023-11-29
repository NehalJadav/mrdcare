import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/auth/login',
		method: 'post',
		data: data
	})
}

AuthService.signInWithGoogle = function (data) {
	return fetch({
		url: '/auth/googlesignin',
		method: 'post',
		data: data
	})
}

AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.logout = function (data) {
	return fetch({
		url: '/auth/logout',
		method: 'post',
		data: data
	})
}

AuthService.verifyEmail = function (data) {
	return fetch({
		url: '/auth/verifyemail',
		method: 'post',
		data: data
	})
}

AuthService.authData = function (data) {
	return fetch({
		url: '/me',
		method: 'get'
	})
}

export default AuthService;