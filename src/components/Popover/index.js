import { Box, Stack, Popover } from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';

export function StyledPopover(props) {
  /**
   * items有三个元素 [icon, text, onClick]
   */
  const { id, open, anchorEl, handleClose, items, sx, border } = props;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{
        zIndex: 1000,
        boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
        borderRadius: '4px',
        mt: '2px !important',
        ...sx,
      }}
    >
      <Stack
        direction='column'
        sx={{
          border: border ?? '1px solid #FAFAFA',
          width: '100px',
          borderRadius: '5px',
          padding: '8px',
          bgcolor: '#242e42',
          fontSize: '12px',
          fontFamily: fontFamily,
          border
        }}
      >
        {items.map((value, index) => {
          return (
            <Stack
              direction='row'
              onClick={value[3]}
              sx={{
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#36435c',
                },
                p: '0px 8px',
              }}
              justifyContent='flex-start'
              alignItems='center'
              spacing={1}
              key={index}
            >
              {value[0]}
              <Box
                sx={{
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  // textAlign: 'center',
                  height: '30px',
                  lineHeight: '30px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {value[1]}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Popover>
  );
}
