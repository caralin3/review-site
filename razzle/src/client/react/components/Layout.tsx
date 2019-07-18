import React from 'react';
import { User } from '../../../common';
import { Footer, Header } from '.';

export interface LayoutProps {
  user?: User;
}

export const DisconnectedLayout: React.FC<LayoutProps> = ({
  children,
  user
}) => (
  <div className="layout">
    <Header user={user} />
    <div className="layout__content">{children}</div>
    <Footer />
  </div>
);

export const Layout = DisconnectedLayout;
