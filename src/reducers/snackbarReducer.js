import * as actions from '../actions/snackbarAction';

const initState = {
  open: false,
  severity: null,
  messageId: '',
  values: {},
  position: { vertical: 'top', horizontal: 'right' },
  action: { actionLink: null, actionTitle: null },
};

export default function SnackbarReducer(state = initState, action) {
  const { type, data } = action;

  switch (type) {
    case actions.SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        messageId: data.messageId,
        values: data.values,
      };
    case actions.SET_SNACKBAR_AND_OPEN:
      return {
        ...state,
        messageId: data.messageId,
        values: data.values,
        severity: data.severity,
        position: data.position,
        action: data.action,
        open: true,
      };
    case actions.SET_SNACKBAR_OPEN:
      return {
        ...state,
        open: data,
      };
    default:
      return state;
  }
}