import fetch from 'auth/FetchInterceptor'

const SmsLogService = {}

SmsLogService.getSmsLog = function (params) {
  return fetch({
    url: 'smsLogsReport/search',
    method: 'get',
    params
  })
}

SmsLogService.generateSmsLogReport = function (params) {
  return fetch({
    url: 'smsLogsReport/download',
    method: 'get',
    params
  })
}

export default SmsLogService