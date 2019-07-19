import React from 'react';
import { SearchInput } from '.';

export interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent<HTMLElement>) => void;
  query: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  onSearch,
  query
}) => (
  <div className="search">
    <SearchInput
      id="search"
      aria-label="Search"
      value={query}
      onChange={onChange}
      placeholder="Search..."
    />
    <i className="fas fa-search search__icon" tabIndex={0} onClick={onSearch} />
  </div>
);
