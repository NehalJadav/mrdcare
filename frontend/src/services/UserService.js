import fetch from 'auth/FetchInterceptor'

const UserService = {}

UserService.serach = function (data) {
  return fetch({
    url: '/allAdminUsers?searchUsers=' + `${data}`,
    method: 'get',
    data: data
  })
}


UserService.serachData = function (params, searchUserId) {
  return fetch({
    url: `/userProfile/${searchUserId}`,
    method: 'get',
    params
  })
}

UserService.userActivities = function (data) {
  return fetch({
    url: '/userProfile/' + `${data.userId}` + '?moduleName=userActivities&numberDeleteStatus=false&skip=5&userDelete=false',
    method: 'get',
    data: data
  })
}

UserService.loginHistory = function (params, userId) {
  return fetch({
    url: '/userProfile/' + `${userId}`,
    method: 'get',
    params
  })
}

UserService.inactiveUser = function (data) {
  return fetch({
    url: '/userProfile/' + `${data}` + '?moduleName=subUsers&numberDeleteStatus=false&skip=0&userDelete=true',
    method: 'get',
    data: data
  })
}
UserService.activeUser = function (data) {
  return fetch({
    url: '/userProfile/' + `${data}` + '?moduleName=subUsers&numberDeleteStatus=false&skip=0&userDelete=false',
    method: 'get',
    data: data
  })
}

UserService.inactiveNUmber = function (data) {
  return fetch({
    url: '/userProfile/' + `${data}` + '?moduleName=numbers&numberDeleteStatus=true&skip=0&userDelete=false',
    method: 'get',
    data: data
  })
}

UserService.getNumbers = function (params, userId) {
  return fetch({
    url: `/userProfile/${userId}`,
    method: 'get',
    params
  })
}

UserService.getAddressDocument = function (data) {
  return fetch({
    url: '/getAddressDocument/' + `${data}`,
    method: 'get',
    data: data
  })
}

UserService.generateUserData = function (data) {
  return fetch({
    url: '/generateUserData/' + `${data.userId}`,
    method: 'get',
  })
}

UserService.numbersreport = function (params) {
  return fetch({
    url: '/numbersreport/download',
    method: 'get',
    params
  })
}

UserService.getNumberDetails = function (numberId, userId) {
  return fetch({
    url: '/getNumberDetails/' + `${numberId}?` + `userId=${userId}`,
    method: 'get',
  })
}

UserService.getUserDetails = function (userId) {
  return fetch({
    url: '/getUserDetails/' + `${userId}`,
    method: 'get',
  })
}

UserService.getAvailabilityTime = function (numberId) {
  return fetch({
    url: '/number/' + `${numberId}/setting/time`,
    method: 'get',
  })
}

UserService.getUserAvailabilityTime = function (userId) {
  return fetch({
    url: '/user/' + `${userId}/setting/time`,
    method: 'get',
  })
}

UserService.getModules = function () {
  return fetch({
    url: '/getModules',
    method: 'get',
  })
}

UserService.getTeams = function (parentId) {
  return fetch({
    url: '/team/list/' + `${parentId}`,
    method: 'get',
  })
}

UserService.commonApi = function (data, payLoadData, api) {
  return fetch({
    url: '/user/' + api + '/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.isFreeTrail = function (data, payLoadData, api) {
  return fetch({
    url: '/user/' + api + '/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.AddCredit = function (data, payLoadData) {
  return fetch({
    url: '/user/prepaid/credits/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.searchNumberPrices = function (payLoadData) {
  return fetch({
    url: '/searchNumberPrices',
    method: 'put',
    data: payLoadData
  })
}

UserService.smsLimit = function (data, payLoadData, api) {
  return fetch({
    url: '/user/' + api + '/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.disableSMS = function (data, payLoadData, api) {
  return fetch({
    url: '/disableSMS/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.editEmail = function (data, payLoadData, api) {
  return fetch({
    url: '/subuser/email/' + `${data}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.attemptfailed = function (data, payLoadData, api) {
  return fetch({
    url: '/user/attemptfailed/' + `${data}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.restrictedCountries = function (data, payLoadData, api) {
  return fetch({
    url: '/user/restrictedCountries/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.updateTwilioVerificationStatus = function (data, payLoadData, api) {
  return fetch({
    url: '/updateTwilioVerificationStatus/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.updateNumberVerificationStatus = function (data, payLoadData, api) {
  return fetch({
    url: '/updateNumberVerificationStatus/',
    method: 'put',
    data: payLoadData
  })
}
UserService.updateSmsStatus = function (data, payLoadData, api) {
  return fetch({
    url: '/updateSmsStatus/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}
UserService.updateWhatsappVerificationStatus = function (data, payLoadData, api) {
  return fetch({
    url: '/updateWhatsappVerificationStatus/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.updateUserProvider = function (data, payLoadData, api) {
  return fetch({
    url: 'user/updateUserProvider/' + `${data}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.blockUnblockAccount = function (userId, payLoadData) {
  return fetch({
    url: '/block/' + `${userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.cancelAccount = function (data, payLoadData, api) {
  return fetch({
    url: '/delete/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}

UserService.deleteDocument = function (data) {
  return fetch({
    url: '/address/' + `${data}` + '/delete',
    method: 'delete',
  })
}



UserService.prePaid = function (data, payLoadData, api) {
  return fetch({
    url: '/user/prepaid/' + `${data.userId}`,
    method: 'put',
    data: payLoadData
  })
}
UserService.updatePlanFeatures = function (userId, finalArray) {
  return fetch({
    url: '/updatePlanFeatures/' + userId,
    method: 'put',
    data: finalArray
  })
}

UserService.updateChadminUserType = function (data, payLoadData) {
  return fetch({
    url: '/updateChadminUserType',
    method: 'post',
    data: payLoadData
  })
}

UserService.executiveChange = function (data, payLoadData) {
  let executivenameChange = {
    executivename: payLoadData,
    userId: data.user.id
  }
  return fetch({
    url: '/user/executivename/undefined',
    method: 'put',
    data: executivenameChange
  })
}

UserService.hangupLiveCalls = function (data) {
  return fetch({
    url: '/hangup/livecalls/' + `${data.userId}`,
    method: 'post',
    // data: payLoadData
  })
}

UserService.resendVerification = function (data) {
  return fetch({
    url: '/resendVerification/' + `${data.user.email}`,
    method: 'get',
    // data: payLoadData
  })
}

UserService.createPhoneSipEndpoint = function (userId, data) {
  return fetch({
    url: '/createPhoneSipEndpoint',
    method: 'post',
    data: data
  })
}

UserService.update = function (data, payLoadData) {
  return fetch({
    url: '/update/' + `${data.userId}`,
    method: 'post',
    data: payLoadData
  })
}

UserService.address = function (data, payLoadData) {
  return fetch({
    url: '/address/' + `${data}`,
    method: 'post',
    data: payLoadData
  })
}

UserService.addnumber = function (payLoadData) {
  return fetch({
    url: '/addnumber',
    method: 'post',
    data: payLoadData
  })
}

UserService.updateMessagingSid = function (data, payLoadData) {
  return fetch({
    url: '/smsVerification/' + `${data.userId}`,
    method: 'post',
    data: payLoadData
  })
}

UserService.addStripeId2 = function (userId, payLoadData) {
  return fetch({
    url: '/addStripeId/' + `${userId}`,
    method: 'post',
    data: payLoadData
  })
}

UserService.addCustomPlan = function (payLoadData) {
  return fetch({
    url: '/addCustomPlan',
    method: 'post',
    data: payLoadData
  })
}
UserService.updateCustomPlan = function (payLoadData) {
  return fetch({
    url: '/updateCustomPlan',
    method: 'post',
    data: payLoadData
  })
}
UserService.updateNumberUserBillingAddons = function (data, payLoadData) {
  return fetch({
    url: '/updateNumberUserBillingAddons',
    method: 'post',
    data: payLoadData
  })
}

UserService.removeBenefitsofUser = function (data) {
  return fetch({
    url: '/removeBenefitsofUser/' + `${data.userId}`,
    method: 'post',
  })
}

UserService.addStripeId = function (data, payLoadData) {
  return fetch({
    url: '/addStripeId/' + `${data.userId}`,
    method: 'post',
    data: payLoadData
  })
}

UserService.register = function (data) {
  return fetch({
    url: '/auth/register',
    method: 'post',
    data: data
  })
}

UserService.logout = function (data) {
  return fetch({
    url: '/auth/logout',
    method: 'post',
    data: data
  })
}

UserService.verifyEmail = function (data) {
  return fetch({
    url: '/auth/verifyemail',
    method: 'post',
    data: data
  })
}

UserService.userData = function (data) {
  return fetch({
    url: '/auth/authdata',
    method: 'post',
    data: data
  })
}
UserService.verifyWhatsappActivation = function (data) {
  return fetch({
    url: '/verifyBusinness',
    method: 'post',
    data: data
  })
}
UserService.updateBrandId = function (payLoadData) {
  return fetch({
    url: '/user/updateBrandId/' + `${payLoadData.userId}`,
    method: 'put',
    data: payLoadData
  })
}
UserService.addPartnerPlan = function (payLoadData) {
  return fetch({
    url: '/addPartnerPlan/userProfile',
    method: 'post',
    data: payLoadData
  })
}
UserService.numberDelete = function (payLoadData) {
  return fetch({
    url: '/deleteNumber',
    method: 'post',
    data: payLoadData
  })
}
UserService.numberRestor = function (payLoadData) {
  return fetch({
    url: '/restorNumber',
    method: 'post',
    data: payLoadData
  })
}
UserService.customerSave = function (payLoadData, userId) {
  return fetch({
    url: '/addStripeId/' + userId,
    method: 'post',
    data: payLoadData
  })
}
export default UserService;