"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";

const SessionProvider = ({ children, session }) => (
  <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
);

export default SessionProvider;