import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../common';
import { ApplicationState } from '../store';
import { Footer, Header } from '.';

export interface LayoutProps {
  user?: User;
}

export const DisconnectedLayout: React.FC<LayoutProps> = ({
  children,
  user
}) => (
  <div className="layout" id="layout">
    <Header user={user} />
    <div className="layout__content">{children}</div>
    <Footer />
  </div>
);

export const mapStateToProps = (state: ApplicationState) => ({
  user: state.User.response
});

export const Layout = connect(mapStateToProps)(DisconnectedLayout);

export interface ContainerProps {
  className?: any;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className
}) => <div className={`container ${className}`}>{children}</div>;
