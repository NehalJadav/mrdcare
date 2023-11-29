import fetch from 'auth/FetchInterceptor'

const AddressVerificationService = {}

AddressVerificationService.getAddressList = function (data) {
  return fetch({
    url: 'addresses',
    method: 'post',
    data: data
  })
}

AddressVerificationService.addressVerify = function (data) {
  return fetch({
    url: 'address/' + data._id + '/verifyAddressData',
    method: 'POST',
    data: data,
  })
}
export default AddressVerificationService