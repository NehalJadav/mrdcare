import fetch from 'auth/FetchInterceptor'

const DataMiningService = {}

DataMiningService.uploadSheet = function (data) {
  return fetch({
    url: '/dataMining/uploadSheet',
    method: 'post',
    data: data
  })
}

export default DataMiningService