import classNames from 'classnames';
import React from 'react';

export interface TabListProps { }

export const TabList: React.FC<TabListProps> = ({ children }) => (
  <div className="tablist" role="tablist">
    {children}
  </div>
);

export interface TabPanelProps {
  id: string;
  selected: string;
  tabId: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  id,
  selected,
  tabId
}) => (
    <div
      className="tabPanel"
      role="tabpanel"
      id={id}
      tabIndex={0}
      aria-labelledby={tabId}
      hidden={selected !== tabId}
    >
      {children}
    </div>
  );

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  innerRef?: any;
  panelId: string;
  selected: string;
}

export const Tab: React.FC<TabProps> = ({
  children,
  id,
  innerRef,
  panelId,
  selected,
  ...props
}) => (
    <button
      className={classNames(props.className, 'tab', {
        'tab--selected': selected === id
      })}
      ref={innerRef}
      role="tab"
      aria-selected={selected === id}
      aria-controls={panelId}
      id={id}
      tabIndex={selected === id ? 0 : -1}
      {...props}
    >
      {children}
    </button>
  );
