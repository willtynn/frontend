export const SET_SNACKBAR_MESSAGE = 'SET_SNACKBAR_MESSAGE';
export const SET_SNACKBAR_AND_OPEN = 'SET_SNACKBAR_AND_OPEN';
export const SET_SNACKBAR_OPEN = 'SET_SNACKBAR_OPEN';


export const setSnackbarMessageAndOpen = (
  messageId,
  values = {},
  severity = null,
  position = { vertical: 'top', horizontal: 'right' },
  // 这么做不好，考虑如何修改？
  // 为了不改变旧代码，action参数不能放到position之前
  // 但是如果我想传入action但不想传入position应该怎么办？
  action = { actionLink: null, actionTitle: null }
) => ({
  type: SET_SNACKBAR_AND_OPEN,
  data: {
    messageId: messageId,
    values: values,
    severity: severity,
    position: position,
    action: action,
  },
});

export const setSnackbarMessage = (
  messageId,
  values = {},
  severity = null
) => ({
  type: SET_SNACKBAR_MESSAGE,
  data: {
    messageId: messageId,
    values: values,
    severity: severity,
  },
});

export const closeSnackbar = () => ({
  type: SET_SNACKBAR_OPEN,
  data: false,
});

export const openSnackbar = () => ({
  type: SET_SNACKBAR_OPEN,
  data: true,
});