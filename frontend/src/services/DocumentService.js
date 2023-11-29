import fetch from 'auth/FetchInterceptor'

const DocumentService = {}

DocumentService.create = function (data) {
	return fetch({
		url: '/documents',
		method: 'post',
		data: data
	})
}

DocumentService.fetch = function (params) {
	return fetch({
		url: '/documents',
		method: 'get',
		params
	})
}

DocumentService.show = function (params) {
	return fetch({
		url: '/documents/' + params,
		method: 'get',
	})
}

export default DocumentService;