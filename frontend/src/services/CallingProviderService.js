import fetch from 'auth/FetchInterceptor'

const CallingProviderService = {}

CallingProviderService.getAllCallingProvider = function (based,id){
    let url=id?`getCallingProvider/${based}/${id}`:`getCallingProvider/${based}`;
    return fetch({
        url: url,
        method: 'get',
    })
}

CallingProviderService.updateProviderData = function (data,id,based){
    return fetch({
        url: `updateCallingProvider/${based}/${id}`,
        method: 'put',
        data: data
    })
}
CallingProviderService.addProviderData = function (data,id){
    return fetch({
        url: `addProviderData/${id}`,
        method: 'put',
        data: data
    })
}
CallingProviderService.createProviderData = function (data){
    return fetch({
        url: `createProviderData`,
        method: 'post',
        data: data
    })
}
CallingProviderService.deleteUserWiseProviderData = function (data){
    return fetch({
        url: `deleteUserWiseProvider`,
        method: 'delete',
        data: data
    })
}

export default CallingProviderService