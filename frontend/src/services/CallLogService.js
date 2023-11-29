import fetch from 'auth/FetchInterceptor'

const CallLogService = {}

CallLogService.getCallLog = function (params) {
  return fetch({
    url: 'callLogReport/search',
    method: 'get',
    params
  })
}

CallLogService.generateCallLogReport = function (params) {
  return fetch({
    url: 'callLogReport/download',
    method: 'get',
    params
  })
}

CallLogService.getCampaignData = function (params) {
  return fetch({
    url: 'campaigns/list',
    method: 'get',
    params
  })
}

CallLogService.downloadCampaignData = function (params) {
  return fetch({
    url: 'campaigns/download',
    method: 'get',
    params
  })
}

export default CallLogService