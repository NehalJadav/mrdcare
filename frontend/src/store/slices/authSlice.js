import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import AuthService from 'services/AuthService';

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	messageType: 'error',
	redirect: '',
	otpSent: false,
	userData: null,
	token: localStorage.getItem(AUTH_TOKEN) || null
}

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.verifyEmail(data)
		if (response.success) {
			return response.message;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signIn = createAsyncThunk('auth/signIn', async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.login(data)
		if (response.tokens) {
			console.log(`🚀 ~ file: authSlice.js:33 ~ signIn ~ response:`, response)
			localStorage.setItem(AUTH_TOKEN, response.tokens.access.token);
			return { token: response.tokens.access.token, userData: response.user };
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const authData = createAsyncThunk('auth/authData', async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.authData()
		if (response) {
			console.log(`🚀 ~ file: authSlice.js:47 ~ authData ~ response:`, response)
			return response;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signUp = createAsyncThunk('auth/signUp', async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.register(data)
		if (response.user) {
			const token = response.user.refreshToken;
			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
			return token;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signOut = createAsyncThunk('auth/signOut', async () => {
	console.log(`🚀 ~ file: authSlice.js:75 ~ signOut ~ initialState.token:`, initialState.token)
	const response = await AuthService.logout({ refreshToken: { value: initialState.token } })
	localStorage.removeItem(AUTH_TOKEN);
	return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (data, { rejectWithValue }) => {
	try {
		const response = await AuthService.signInWithGoogle(data)
		if (response.data) {
			const data = response.data;
			localStorage.setItem(AUTH_TOKEN, data.authToken);
			return { token: data.authToken, userData: data };
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(verifyEmail.pending, (state) => {
				state.loading = true
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
				state.messageType = 'success'
				state.otpSent = true
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
				state.messageType = 'error'
			})
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload.token
				state.userData = action.payload.userData
				state.messageType = 'error'
				state.otpSent = false
			})
			.addCase(signIn.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
				state.messageType = 'error'
			})
			.addCase(authData.pending, (state) => {
				state.loading = true
			})
			.addCase(authData.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.userData = action.payload
				state.messageType = 'error'
				state.otpSent = false
			})
			.addCase(authData.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
				state.messageType = 'error'
			})
			.addCase(signOut.fulfilled, (state) => {
				state.showMessage = false
				state.loading = false
				state.token = null
				state.userData = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.showMessage = false
				state.loading = false
				state.token = null
				state.userData = null
				state.redirect = '/'
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload.token
				state.userData = action.payload.userData
				state.messageType = 'error'
				state.otpSent = false
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
				state.messageType = 'error'
			})
	},
})

export const {
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer