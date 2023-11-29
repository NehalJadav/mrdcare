import fetch from 'auth/FetchInterceptor'

const CancelledUserService = {}

CancelledUserService.getCancelledUser = function (params) {
  return fetch({
    url: 'cancelledUsers/search',
    method: 'get',
    params
  })
}

CancelledUserService.generateCancelledUser = function (params) {
  return fetch({
    url: 'cancelledUsers/download',
    method: 'get',
    params
  })
}

export default CancelledUserService