import fetch from 'auth/FetchInterceptor'

const InvoiceService = {}

InvoiceService.getInvoiceList = function (data, filttervalue) {
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
    url: 'getInvoiceData/search',
    method: 'get',
    params
  })
}
InvoiceService.invoiceDownload = function (params) {
  return fetch({
    url: 'getPDFInvoice/' + params.email + '/' + params.invoiceId,
    method: 'get'
  })
}
export default InvoiceService