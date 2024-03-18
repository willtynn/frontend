const fontStyle = (color, textTransform) => {
  return {
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: ' 18px',
    letterSpacing: '0.08em',
    textTransform: textTransform,
    color: color,
  };
};

export const titleStyle = fontStyle('#596A7C', 'none');
export const asteriskStyle = fontStyle('#C40000', 'uppercase');

export const stepLabel = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.08em',
  textTransform: 'capitalize',
};

export const ErrVars = {
  '--color': '#EE5350',
  '--focus-border': '2px solid #EE5350',
  '--focus-color': '#EE5350',
  '--width': '100%',
};

export const defaultVars = {
  '--color': '#DFE4E8',
  '--focus-border': '2px solid #154AB6',
  '--focus-color': '#154AB6',
  '--width': '100%',
};

export const textErrorStyle = {
  fontFamily: 'Arial',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '-0.084px',
  color: '#DE350B',
};

export const siCreateTextErrorStyle = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '16px',
  color: '#EE5350',
  marginLeft: '1px'
};
