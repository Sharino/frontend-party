import { serverConstants } from '../_constants'

export function servers(state = {}, action) {
  switch (action.type) {
    case serverConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case serverConstants.GETALL_SUCCESS:
      return action.list;
    case serverConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
  }
}