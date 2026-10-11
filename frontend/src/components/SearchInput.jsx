import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchInput({ value, onChange, placeholder = 'Search', label = 'Search' }) {
  return (
    <div className="search">
      <FiSearch aria-hidden="true" />
      <input
        className="input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange('')} aria-label="Clear search">
          <FiX />
        </button>
      )}
    </div>
  );
}
