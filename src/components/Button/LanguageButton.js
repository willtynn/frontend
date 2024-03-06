import Workbench from '@/assets/Workbench.svg';
import { KubeTransparentButton } from '.';
import { fontFamily } from '@/utils/commonUtils';
import { StyledPopover } from '@/components/Popover';
import { useState } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import { UPDATE_LANGUAGE } from '../../actions/langAction';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

const styledButton = {
  borderRadius: '100px',
  backgroundColor: 'transparent',
  color: '#36435C !important',
  fontFamily: fontFamily,
};

export const LanguageButton = () => {
  const [languageSelectionEl, setLanguageSelectionEl] = useState(null);
  const languageSelectionElOpen = Boolean(languageSelectionEl);
  const dispatch = useDispatch();
  const intl = useIntl();

  const { locale } = useSelector(state => {
    return {
      locale: state.Lang.locale,
    };
  });

  const items = [
    [
      <TranslateIcon />,
      '中文',
      () => {
        dispatch({ type: UPDATE_LANGUAGE, data: 'cn' });
      },
    ],
    [
      <TranslateIcon />,
      'English',
      () => {
        dispatch({ type: UPDATE_LANGUAGE, data: 'en' });
      },
    ],
  ];

  const handleLanguageSelection = e => {
    setLanguageSelectionEl(e.currentTarget);
  };


  return (
    <>
      <StyledPopover
        id='language-selection-popover'
        open={languageSelectionElOpen}
        anchorEl={languageSelectionEl}
        handleClose={() => setLanguageSelectionEl(null)}
        items={items}
        sx={{
          mt: '8px !important',
          boxShadow: 'inset 0 4px 8px 0 rgba(36,46,66,.12) !important',
        }}
        border='none'
      />
      <KubeTransparentButton sx={styledButton} onClick={handleLanguageSelection}>
        <Workbench />
        <span
          style={{
            marginLeft: '12px',
            fontStyle: 'normal',
            fontSize: '12px',
            lineHeight: 1.67,
          }}
        >
          {`${intl.messages['lang.language']}: ${locale === "cn"? "中文" : "English"}`}
        </span>
      </KubeTransparentButton>
    </>
  );
};
