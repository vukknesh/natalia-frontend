export const DELETE_EVENTO = "DELETE_EVENTO";
export const CREATE_EVENTO = "CREATE_EVENTO";
export const UPDATE_EVENTO = "UPDATE_EVENTO";
export const SET_EVENTOS = "SET_EVENTOS";

export const fetchEventos = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.user.id;
    try {
      const response = await fetch("http://192.168.0.16:8000/api/eventos");

      if (!response.ok) {
        throw new Error("Algo errado!");
      }

      const resData = await response.json();
      console.log("[eventos action resData = ]", resData);
      let eventosArray = [];
      for (key in resData) {
        eventosArray.push(resData[key]);
      }
      console.log("eventosArRAY", eventosArray);
      dispatch({
        type: SET_EVENTOS,
        eventos: eventosArray,
        userEventos: eventosArray.filter(prod => prod.user.id === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteEvento = eventoId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `http://192.168.0.16:8000/api/eventos/${eventoId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Algo errado!");
    }
    dispatch({ type: DELETE_EVENTO, pid: eventoId });
  };
};

export const createEvento = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`http://192.168.0.16:8000/api/eventos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    });
  };
};

export const updateEvento = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`http://192.168.0.16:8000/eventos`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    });

    if (!response.ok) {
      throw new Error("Algo errado!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
