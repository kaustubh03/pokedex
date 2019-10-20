import React from 'react';
import s from './DotLoader.module.scss';
import pokeball from "../../public/images/pokeball.gif";


export default class DotLoader extends React.PureComponent {
  render() {
    return (
      <div className={s.wrapper}>
        <img src={pokeball} alt={'loader'}/>
      </div>
    );
  }
}
