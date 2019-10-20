
// Redux Imports
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllPokemonList,
  rehydratePokemonList,
  getPokeCardDetail
} from "./actions";

// React Imports
import { withRouter } from 'react-router-dom';

// Class To Contain
import Home from './Home';


const mapStateToProps = (state, prevProps) => {
  return {
    pokemons: state.homeReducer.pokemons,
    pokeCard: state.homeReducer.pokeCard
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllPokemonList,
      rehydratePokemonList,
      getPokeCardDetail
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
