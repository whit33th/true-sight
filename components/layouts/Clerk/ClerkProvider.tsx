import React from "react";

interface IClerkProvider {
  children: React.ReactNode;
}

export default function ClerkProvider({ children }: IClerkProvider) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
