import { ReactNode, FC } from "react";

type ProviderProps = {
  children: ReactNode;
};

type Provider = FC<ProviderProps>;

export function ProviderRegistry({
  providers,
  children,
}: {
  providers: Provider[];
  children: ReactNode;
}) {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
