import React from 'react';
import { SearchInput } from '.';

export interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
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
      onChange={onChange}
      defaultValue={query}
      placeholder="Search..."
    />
    <i
      className="fas fa-search search__icon"
      tabIndex={0}
      onClick={onSearch}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          onSearch();
        }
      }}
    />
  </div>
);
