import fetch from 'auth/FetchInterceptor'

const SmsProfileService = {}

SmsProfileService.getProfiles = function (params) {
  return fetch({
    url: 'smsProfile',
    method: 'GET',
    params
  })
}

SmsProfileService.updateStatus = function (data) {
  return fetch({
    url: 'updateStatus',
    method: 'post',
    data
  })
}

export default SmsProfileService