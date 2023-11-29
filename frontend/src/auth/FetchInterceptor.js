import axios from 'axios';
import { API_BASE_URL } from 'configs/AppConfig';
import { signOutSuccess } from 'store/slices/authSlice';
import store from '../store';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import { notification } from 'antd';
import metaVersion from '../metaVersion.json';

//const unauthorizedCode = [400, 401, 403]
const unauthorizedCode = [401, 403]

const service = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;

	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken
	}

	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {
	checkForUpdates()
	return response.data
}, (error) => {
	let notificationParam = {
		message: error?.response?.data?.message || error?.response?.message || "Something went wrong"
	}

	// Remove token and redirect 
	if (unauthorizedCode.includes(error.response.status)) {
		notificationParam.message = notificationParam.message || 'Authentication Fail'
		//notificationParam.description = 'Please login again'
		localStorage.removeItem(AUTH_TOKEN)
		store.dispatch(signOutSuccess())
	}

	if (error.response.status === 404) {
		notificationParam.message = notificationParam.message || 'Not Found'
	}

	if (error.response.status === 500) {
		notificationParam.message = notificationParam.message || 'Internal Server Error'
	}

	if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
	}

	notification.error(notificationParam)
	checkForUpdates()
	return Promise.reject(error?.response?.data || error);
});

async function checkForUpdates() {
	try {
		const response = await axios.get('/meta.json');
		const data = response.data;
		const latestVersion = data.version;
		const currentVersion = metaVersion.version;

		if (latestVersion !== currentVersion) {
			notification.warning({ message: "New version is available reloading app in 3 second." })
			setTimeout(() => {
				window.location.reload();
			}, 4000);
		}
	} catch (error) {
		console.error('Error fetching version:', error);
	}
}
export default service