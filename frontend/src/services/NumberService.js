import fetch from 'auth/FetchInterceptor'
import moment from 'moment';
const NumberService = {}

NumberService.getNumber = function (params) {
  return fetch({
    url: 'numbersreport/search',
    method: 'get',
    params
  })
}

NumberService.generateNumberReport = function (params) {
  return fetch({
    url: 'numbersreport/download',
    method: 'get',
    params
  })
}
NumberService.searchNumberLog = function (search) {
  const deletedStatus = false
  const limit = 50;
  const endDate = moment(new Date()).format("DD-MMMM-YYYY 23:59:59");
  return fetch({
    url: 'numbersreport/search?startDate=0&endDate=' + endDate + '&search=' + search + '&skip=0&deletedStatus=' + deletedStatus + '&limit=' + limit,
    method: 'get'
  });
};
NumberService.updateCustomCallerId = function (payLoadData) {
  return fetch({
    url: '/updateCustomCallerId/'+payLoadData.numberId,
    method: 'POST',
    data: payLoadData
  });
};

export default NumberService