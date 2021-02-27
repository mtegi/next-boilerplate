import { textIntro } from 'containers/HomePage/animate';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useRef } from 'react';
import { HomeContainer, WelcomeText } from './styled';

const Home = () => {
  const text = useRef();
  const { t } = useTranslation('home');

  useEffect(() => {
    textIntro(text.current);
  }, []);

  return (
    <HomeContainer>
      <WelcomeText ref={text}>{t('hello').toUpperCase()}</WelcomeText>;
    </HomeContainer>
  );
};

export default Home;
