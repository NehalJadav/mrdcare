import fetch from 'auth/FetchInterceptor'
const ReactivatedCustomerService = {}
ReactivatedCustomerService.getReactivedCustomer = function (params) {
  return fetch({
    url: 'reactivatedCustomers/search',
    method: 'get',
    params
  })
}
ReactivatedCustomerService.getReactivedCustomerDownload = function (params) {
  return fetch({
    url: '/reactivatedCustomers/download',
    method: 'get',
    params
  })
}
export default ReactivatedCustomerService