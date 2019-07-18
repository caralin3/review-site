import classNames from 'classnames';
import React from 'react';
import { User } from '../../../common';
import { routes } from '../routes';
import { NavLink } from 'react-router-dom';
import { Container } from '.';

export interface HeaderProps {
  user?: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const nonAuthLinks = [routes.home, routes.login, routes.register];

  const generalLinks = [
    routes.home,
    routes.settings,
    { path: `/profile/${user && user.username}`, name: user && user.username }
  ];

  const adminLinks = [
    routes.home,
    routes.editor,
    routes.settings,
    { path: `/profile/${user && user.username}`, name: user && user.username }
  ];

  const links = user
    ? user.role === 'admin'
      ? adminLinks
      : generalLinks
    : nonAuthLinks;

  return (
    <header className="header">
      <Container className="header__nav">
        <nav className="header__nav">
          <NavLink className="header__brand" to={routes.home.path}>
            reviewer
          </NavLink>
          <ul className="header__links show-medium-flex">
            {links.map(link => (
              <li className="header__link" key={link.name}>
                <NavLink activeClassName="header__link--active" to={link.path}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <i
            className="fas fa-bars header__mobile-menu show-small"
            onClick={() => setShowMenu(!showMenu)}
          />
          <ul
            className={classNames('header__mobile-links show-small', {
              'header__mobile-links--open': showMenu
            })}
          >
            {links.map(link => (
              <li className="header__mobile-link" key={link.name}>
                <NavLink
                  activeClassName="header__mobile-link--active"
                  to={link.path}
                  onClick={() => setShowMenu(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
