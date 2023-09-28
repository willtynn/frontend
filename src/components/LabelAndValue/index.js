import React, { useState, useEffect } from 'react';
import { Link, Tooltip, styled, tooltipClasses } from '@mui/material';

import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { handleLinkWithoutProtocol } from '@/utils/commonUtils';

export default function LabelAndValue(props) {
  const { id, labels, value, isUrl } = props;


  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      background: '#596A7C',
      fontWeight: 400,
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      maxWidth: '385px',
      lineHeight: '20px',
      fontSize: '14px',
    },
    [`& .${tooltipClasses.tooltip} .MuiTooltip-tooltip`]: {

      maxWidth: '353px',
      lineHeight: '20px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      '&::before': {
        width: '6px',
        height: '3px',
        backgroundColor: '#596A7C',
      },
    },
  });

  const ValueFrameStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px 16px 0px 0px',
    gap: '8px',
  };

  const labelFrameStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px 16px 0px 0px',
    gap: '8px',
  };

  const labelStyle = {
    height: '20px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#596A7C',
    flex: 'none',
    alignSelf: 'stretch',
  };

  const valueStyle = {
    height: '20px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    /* identical to box height, or 143% */
    /* Gray/600 */
    color: '#262E35',
    /* Inside auto layout */
    alignSelf: 'stretch',
  };

  return (
    <Box id={id}>
      <Stack direction='row' spacing={4}>
        <Stack sx={{ ...labelFrameStyle, width: '224px' }}>
          {labels.map((label, index) => {
            return (
              <Box
                sx={{
                  width: '224px',
                  height: '20px',
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#596A7C',
                }}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                }}
                key={index}
              >
                {label}
              </Box>
            );
          })}
        </Stack>

        <Stack sx={{ ...ValueFrameStyle, width: '286px' }}>
          {value.map((v, index) => {
            if (isUrl && v && index < isUrl.length && isUrl[index]) {
              return (
                <StyledTooltip
                  // open={true}
                  title={v}
                  placement='top'
                  arrow
                  PopperProps={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  }}
                >
                  <Link
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                    }}
                    target='_blank'
                    sx={{
                      ...valueStyle,
                      width: '286px',
                      height: '20px',
                      fontFamily: 'Open Sans',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#154AB6',
                      "&.MuiTypography-root": {
                        '&:hover': {
                          color: '#113D95',
                        },
                        '&:active': {
                          color: '#113D95',
                        }
                      }
                    }}
                    href={handleLinkWithoutProtocol(v)}
                    key={index}
                  >
                    {v}
                  </Link>
                </StyledTooltip>
              );
            }
            return (
              <Box
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                sx={{
                  width: '286px',
                  height: '20px',
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#262E35',
                  flex: 'none',
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}

                key={index}
              >
                {v}
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}