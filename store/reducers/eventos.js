import {
  DELETE_EVENTO,
  CREATE_EVENTO,
  UPDATE_EVENTO,
  SET_EVENTOS
} from "../actions/eventos";

const initialState = {
  eventos: [],
  userEventos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTOS:
      return {
        eventos: action.eventos,
        userEventos: action.userEventos
      };
    case CREATE_EVENTO:
      break;
    case UPDATE_EVENTO:
      // const productIndex = state.userProducts.findIndex(
      //   prod => prod.id === action.pid
      // );

      // const updatedUserProducts = [...state.userProducts];
      // updatedUserProducts[productIndex] = updatedProduct;
      // const availableProductIndex = state.availableProducts.findIndex(
      //   prod => prod.id === action.pid
      // );
      // const updatedAvailableProducts = [...state.availableProducts];
      // updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state
        // availableProducts: updatedAvailableProducts,
        // userProducts: updatedUserProducts
      };
    case DELETE_EVENTO:
      return {
        ...state
        // userProducts: state.userProducts.filter(
        //   product => product.id !== action.pid
        // ),
        // availableProducts: state.availableProducts.filter(
        //   product => product.id !== action.pid
        // )
      };
  }
  return state;
};
