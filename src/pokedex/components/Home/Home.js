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
import Search from "../../shared/Search/Search";
import SearchResults from "../../shared/SearchResults/SearchResults";
import PokeCard from "../../shared/PokeCard/PokeCard";

// Stylesheet Imports
import s from './Home.module.scss';

// Asset and Utility Imports
import banner from "../../public/images/banner.png";
import { performSearch, timeDifference } from "../../utils/helper";


export default class Home extends React.Component {
  // State Declaration
  state = {
    showSearch:false,
    searchResults:null,
    showDetails:false
  };

  // Lifecycle Methods
  componentDidMount() {
    const { getAllPokemonList, rehydratePokemonList } = this.props;
    let savedPokemonList = localStorage.getItem('pokemons');
    let validity = null;
    if(savedPokemonList){
      let _date = JSON.parse(savedPokemonList).date;
      validity = timeDifference(_date);
    }
    // Fetch All Pokemon List Before Search
    if (!localStorage.getItem("pokemons") || validity) {
      // Check Validity and Remove the Stale Data
      if(validity){
        localStorage.removeItem("pokemons");
      }
      getAllPokemonList();
    } else {
      rehydratePokemonList();
    }
  }

  componentDidUpdate = (prevProps, prevState) =>{
    const { pokemons, pokeCard } = this.props;
      if (prevProps.pokemons.loading && !pokemons.loading && pokemons.data) {
        this.setState({ showSearch: true });
        // Append A Date To Result Object and save to Local Storage
        let _pokemons = { ...pokemons };
        _pokemons.data['date'] = new Date();
        localStorage.setItem('pokemons', JSON.stringify(_pokemons.data));
        this.getRandomCardDetail();
      }
      /*
        For Rehydrating Case
      */
      if(!prevProps.pokemons.loading && !pokemons.loading && !prevProps.pokemons.data && pokemons.data && localStorage.getItem('pokemons')){
        this.setState({ showSearch: true });
        this.getRandomCardDetail();
      }
    if (
      prevProps.pokeCard.loading &&
      !pokeCard.loading &&
      pokeCard.data
    ) {
      let _pokeCard = pokeCard.data;
      _pokeCard['date'] = new Date();
      localStorage.setItem("pokeCardData", JSON.stringify(_pokeCard));
    }
  }

  getRandomCardDetail = () =>{
    const { pokemons, getPokeCardDetail } = this.props;
    let count = pokemons.data && pokemons.data.count && pokemons.data.count;
    if(count){
      let random = Math.floor(Math.random() * count) + 1;
      let randomPokemonObj = pokemons.data.results[random];

      let pokeCardValidity = null;
      let savedPokeCardData = localStorage.getItem("pokeCardData");
      if (savedPokeCardData) {
        let _date = JSON.parse(savedPokeCardData).date;
        pokeCardValidity = timeDifference(_date);
      }
      if (!localStorage.getItem("pokeCardData") || pokeCardValidity) {
        getPokeCardDetail(randomPokemonObj.url);
      }
    }
  }

  /*
    Get Body of Screen on the basis of Action.
    Possible cases are Pokecard or Search Results
    @params : none
  */
  getBody = () =>{
    const { pokeCard } = this.props;
    const { searchResults, showDetails } = this.state; 
    let pokeCardData = localStorage.getItem("pokeCardData") ? JSON.parse(localStorage.getItem("pokeCardData")):pokeCard.data 
    if (!searchResults){
      return (
        <div>
          {((!pokeCard.loading && pokeCard.data) ||
            localStorage.getItem("pokeCardData")) && (
            <PokeCard data={pokeCardData} />
          )}
          {pokeCard.loading && <DotLoader />}
        </div>
      );
    }
    else{
      return (
        <div>
          {!showDetails && <SearchResults
            results={searchResults}
            handleResultClick={this.handleResultClick}
          />}
        </div>
      );
    } 
  }

  /*
    Handle Search Result Click Callback
    @params : searchItem = Object
  */
  handleResultClick = (searchItem) =>{
    const { history } = this.props;
    if(searchItem && searchItem.url){
      let url = btoa(searchItem.url);
      history.push(`/detail/${url}`);
    }
  }

  /*
    Handle Change Callback for Search Field
    @params : event = Object
  */
  handleSearch = (e) =>{
    const { pokemons } = this.props;
    let value = e.target.value;
    /*
      If a valid Value is there. It will perform a search if a non empty value is present.
      If a Null Value is given. It will revert back to Pokecard Screen.
    */
    if(value && value!==""){
      let searchResults = performSearch(pokemons.data, value);
      this.setState({ searchResults: searchResults });
    }
    else{
      this.setState({searchResults:null})
    }

  }

  render() {
    const { showSearch } = this.state;
    let parentClassName = showSearch ? 'containerPage':'container';
    return (
      <div>
        <div className={s[parentClassName]}>
            <div className={s.homeBanner}>
              <img src={banner} alt={'banner'}/>
            {!showSearch &&
              <>
                <DotLoader />
              </>
            }
            </div>
            {showSearch && <Search searchCallback={this.handleSearch} />}
        </div>
        {showSearch && this.getBody()}
      </div>
      
    );
  }
}
