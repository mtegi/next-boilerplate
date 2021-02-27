import { NextSeo } from 'next-seo';
import React from 'react';
import Home from 'containers/HomePage';

const Page = () => (
  <>
    <NextSeo title="Home" description="This simple demo page" />
    <Home />
  </>
);

export default Page;
