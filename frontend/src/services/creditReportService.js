import fetch from 'auth/FetchInterceptor'

const creditReportService = {}

creditReportService.getCreditReport = function (params) {
  return fetch({
    url: 'creditsreport/search',
    method: 'get',
    params
  })
}

creditReportService.generateCreditReport = function (params) {
  return fetch({
    url: 'creditsreport/download',
    method: 'get',
    params
  })
}

export default creditReportService