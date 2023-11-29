import fetch from 'auth/FetchInterceptor'

const CustomersService = {}

CustomersService.getCustomersList = function (data, filttervalue) {
  var params = {};
  if (filttervalue) {
    params.status = filttervalue;
  } else {
    params.status = data.filterBy;
  }
  if (data && data.userId) {
    params.userId = data.userId;
  }
  return fetch({
    url: 'getCustomersList/search',
    method: 'get',
    params
  })
}
export default CustomersService