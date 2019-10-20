/*
  @Module : Pokedex
  @Component : Home
  @Type : Screen
  @Description : Entry Screen
  @Author : Kaustubh Saxena 
*/

// React Imports
import React from 'react';

// Component Imports
import DotLoader from "../../shared/DotLoader";

// Stylesheet Imports
import s from "./PokemonDetail.module.scss";

// Asset and Utility Imports
import banner from "../../public/images/banner.png";
import { getLastSegmentFromUrl } from "../../utils/helper";

const keys = ["base_experience", "height", "name", "weight"];

export default class PokemonDetail extends React.Component {
  // State Declaration
  state = {
    showSearch:false,
    searchResults:null,
    showDetails:false
  };

  // Lifecycle Methods
  componentDidMount() {
    const { getPokemonDetails } = this.props;
    let currentUrl = window.location.href;
    // Split URL to obtain lastID
    let nextUrl = getLastSegmentFromUrl(currentUrl);
    nextUrl = atob(nextUrl);
    // Fetch Details form Pokemon
    getPokemonDetails(nextUrl);
  }

  componentDidUpdate = (prevProps, prevState) =>{
    //
  }

  renderStats = () =>{
    const { pokemonDetail } = this.props;
    
    let data = pokemonDetail.data && pokemonDetail.data;
    return <div>
      {
        Object.keys(data).map((item,index)=>{
          let _isArray = Array.isArray(data[item]);
          if (!_isArray && typeof data[item] !== "object" && keys.includes(item)) {
            return (
              <div key={`parent_${item}`} className={s.statSection}>
                <span key={`title_${item}`} className={s.sectionTitle}>
                  {item.replace("_", " ")}
                </span>
                <span key={`item_${item}`} className={s.sectionItem}>
                  {data[item] && data[item]}
                </span>
              </div>
            );
          }
          return null;
        })
      }
      {this.renderAbilities()}
      {this.renderMoves()}
    </div>
  }
  
  /*
    Render Moves for the Pokemon
  */

  renderMoves = () => {
    const { pokemonDetail } = this.props;
    let moves = pokemonDetail.data && pokemonDetail.data.moves;
    let movesName = [];
    moves.map((item, index) => {
      movesName.push(
        <span key={`_itemParent${index}`} className={s.sectionItem}>
          {item.move && item.move.name && `${item.move.name}, `}
        </span>
      );
      return null;
    });

    return (
      <div className={s.statSection}>
        <span className={s.sectionTitle}>Moves</span>
        <div>{movesName}</div>
      </div>
    );
  }

  /*
    Render Abilities for the Pokemon
  */

  renderAbilities = () =>{
    const { pokemonDetail } = this.props;
    let abilities = pokemonDetail.data && pokemonDetail.data.abilities;
    let abilityName = [];
    abilities.map((item,index)=>{
      abilityName.push(
        <span key={`_itemParent${index}`} className={s.sectionItem}>
          {item.ability && item.ability.name && item.ability.name}
        </span>
      );
      return null;
    });

    return <div className={s.statSection}>
      <span className={s.sectionTitle}>Abilities</span>
      {abilityName}
    </div>
  }

moveToHome = () =>{
  const {history} = this.props;
  history.push('/home');
}


  render() {
    const { pokemonDetail } = this.props;
    return (
      <div>
        {pokemonDetail.loading && (
          <div className={s.loaderContainer}>
            <DotLoader />
          </div>
        )}
        {!pokemonDetail.loading && pokemonDetail.data && (
          <div>
            <div className={s.containerPage}>
              <div className={s.homeBanner} onClick={this.moveToHome}>
                <img src={banner} alt={"banner"} />
              </div>
            </div>
            <div className={s.detailParent}>
              <div className={s.pokemonImage}>
                <img
                  src={pokemonDetail.data.sprites.front_default}
                  alt={"pokeImage"}
                />
              </div>
              <div className={s.statsParent}>{this.renderStats()}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
