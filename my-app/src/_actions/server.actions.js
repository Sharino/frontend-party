import { serverConstants } from '../_constants'
import { serverService } from '../_services'
import { alertActions } from './'

export const serverActions = {
    getList
};

function getList() {
    return dispatch => {
        let token =  localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')).token : {}
        dispatch(request({ token }))

        serverService.getList(token)
            .then(
                list => { 
                    dispatch(success(list))
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request(token) { return { type: serverConstants.GETALL_REQUEST, token } }
    function success(list) { return { type: serverConstants.GETALL_SUCCESS, list } }
    function failure(error) { return { type: serverConstants.GETALL_FAILURE, error } }
}