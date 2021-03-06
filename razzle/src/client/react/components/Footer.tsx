import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import { Container } from '.';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => (
  <footer className="footer">
    <Container className="footer">
      <NavLink className="footer__brand" to={routes.home.path}>
        reviewer
      </NavLink>
      <span className="footer__content">
        A sample learning project &copy; 2019
      </span>
    </Container>
  </footer>
);
