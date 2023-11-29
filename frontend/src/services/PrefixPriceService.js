import fetch from 'auth/FetchInterceptor'

const PrefixPriceService = {}
PrefixPriceService.getPrefixData = function (params) {
  return fetch({
    url: 'prefixProviders',
    method: 'get',
    params
  })
}

PrefixPriceService.uploadPrefixFile = function (payLoadData) {
  return fetch({
    url: 'prefixFileUpload',
    method: 'POST',
    data: payLoadData
  })
}

export default PrefixPriceService