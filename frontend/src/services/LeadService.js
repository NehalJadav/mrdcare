import fetch from 'auth/FetchInterceptor'

const LeadService = {}

LeadService.addProspect = function (data) {
  return fetch({
    url: 'addProspect/',
    method: 'post',
    data: data
  })
}
LeadService.getProspect = function () {
  return fetch({
    url: 'getProspect/',
    method: 'get'
  })
}
LeadService.deleteLead = function (params) {
  return fetch({
    url: 'prospect/' + `${params}`,
    method: 'PUT',
  })
}
LeadService.updateProspect = function (data) {
  return fetch({
    url: 'updateProspect/' + `${data._id}`,
    method: 'PUT',
    data: data
  })
}
export default LeadService