
/*
  @Module : Pokedex
  @Component : PokeCard
  @Type : Shared Component
  @Description : Poke Card to show beneath Search Bar
  @Author : Kaustubh Saxena 
*/

// React Import
import React, {useState} from 'react';

// Styles and Asset Import
import s from './PokeCard.module.scss';
import banner from "../../public/images/banner.png";
import noimage from "../../public/images/noimage.png";

// Component Import
//

const showCardCallback = cardObj => {
  cardObj.showCard(true);
  localStorage.setItem('pokecard_shown',new Date());
};

const sanitizeObj = (data) =>{
  let obj = {
    "base_experience":data.base_experience, 
    "height":data.height, 
    "name":data.name, 
    "weight":data.weight,
    "image": data.sprites.front_default,
    "stats":{}
  }

  data.stats.map((item,index)=>{
    obj.stats[item.stat.name] = item.base_stat;
    return null;
  });
  return obj;
}

const PokeCard = props => {
  // State Hook Initialization
  const [cardStatus, showCard] = useState(false);

  // Variable Initialization
  let pokecardShown = localStorage.getItem("pokecard_shown");
  
  let pokeCardObj = sanitizeObj(props.data)
  return (
    <div className={s.container}>
      <div className={`${s.pokeCardParent} ${s.blue}`}>
        {(cardStatus || pokecardShown) && (
          <>
            <div className={`${s.header}`}>
              <span className={"name"}>{pokeCardObj.name}</span>
              <span id={"baseExperience"}>{pokeCardObj.base_experience}</span>
            </div>
            <div className={`${s.pokemonImage}`}>
              <img
                src={pokeCardObj.image ? pokeCardObj.image : noimage}
                alt={"pokemonImg"}
              />
            </div>
            <div className={`${s.footer}`}>
              {Object.keys(pokeCardObj.stats).map((item, index) => {
                return (
                  <span key={`${index}_stats`} className={s.statTitle}>
                    {item}:{pokeCardObj.stats[item]}
                  </span>
                );
              })}
            </div>
          </>
        )}
        {!cardStatus && !pokecardShown && (
          <div
            onClick={() => showCardCallback({ cardStatus, showCard })}
            className={s.pokeCardBack}
          >
            <img src={banner} alt={"pokemonImgBannerf"} />
          </div>
        )}
      </div>
    </div>
  );
};

PokeCard.defaultProps = {
  data:{}
};
export default PokeCard;
