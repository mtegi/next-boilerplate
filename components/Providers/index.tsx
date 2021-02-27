import * as React from 'react';

export type SingleProviderType = {
  ProviderComponent: React.JSXElementConstructor<React.PropsWithChildren<any>>;
  props?: any;
};

export type ProvidersProps = {
  children: React.ReactNode;
  providers: SingleProviderType[];
};

const Providers = ({ children, providers }: ProvidersProps) => (
  <>
    {providers.reduceRight(
      (acc, { ProviderComponent, props = {} }) => (
        <ProviderComponent {...props}>{acc}</ProviderComponent>
      ),
      children
    )}
  </>
);

Providers.displayName = 'Providers';

export default Providers;
