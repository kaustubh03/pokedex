// React Import
import React from 'react';

// Styles and Asset Import
import s from "./SearchResults.module.scss";

// Component Import
//

const SearchResults = props => {
  return (
    <div className={s.container}>
      <div className={s.resultsParent} id={'resultParent'}>
        {
          props.results.map((item,index)=>{
            return (
              <div onClick={()=>props.handleResultClick(item)} className={s.results} key={`${index}_parent_elem`}>
                {item.name}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

SearchResults.defaultProps = {};

export default SearchResults;
