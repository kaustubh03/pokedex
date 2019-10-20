
// Redux Imports
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemonDetails } from "./actions";

// React Imports
import { withRouter } from 'react-router-dom';

// Class To Contain
import PokemonDetail from "./PokemonDetail";


const mapStateToProps = (state, prevProps) => {
  return {
    pokemonDetail: state.detailReducer.pokemonDetail
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getPokemonDetails
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonDetail)
);
