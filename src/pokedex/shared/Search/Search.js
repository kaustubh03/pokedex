// React Import
import React from 'react';

// Styles and Asset Import
import s from './Search.module.scss';


// Component Import
//

const Search = props => {
  return (
    <div className={s.container}>
      <div className={s.searchElement}>
        <input
          onChange={props.searchCallback}
          type={"text"}
          name={"Search"}
          placeholder={"Search"}
        />
      </div>
    </div>
  );
};
Search.defaultProps = {
  
};
export default Search;
