import React from 'react';
import { Button } from '.';
import { Header } from './Header';

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Header />
        <div className="Home-header">
          <img
            src={require('../../appearance/images/react.svg')}
            className="Home-logo"
            alt="logo"
          />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
        <Button onClick={() => null} variant="primary">
          Hello Button
        </Button>
      </div>
    );
  }
}