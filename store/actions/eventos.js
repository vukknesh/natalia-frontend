import axios from "axios";
import { getCurrentProfile } from "./profiles";
export const DELETE_EVENTO = "DELETE_EVENTO";
export const CREATE_EVENTO = "CREATE_EVENTO";
export const UPDATE_EVENTO = "UPDATE_EVENTO";
export const SET_EVENTOS = "SET_EVENTOS";

export const fetchEventos = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const user_id = getState().auth.user?.id;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .post("http://67.207.91.188:3333/api/eventos/", { user_id }, config)
      .then(res => {
        dispatch({
          type: SET_EVENTOS,
          eventos: res.data?.eventos
        });
      })
      .catch(err => {
        alert(err.response?.data);
      });
  };
};

export const deleteEvento = eventoId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `http://67.207.91.188:3333/api/eventos/${eventoId}`,
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

export const updateEvento = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const my_id = getState().auth.myprofile?.id;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    await axios
      .patch(
        `http://67.207.91.188:3333/api/eventos/${id}/edit/`,
        { desmarcado: true },
        config
      )
      .then(res => {
        alert("Aula desmarcada com sucesso!");
        dispatch(getCurrentProfile(my_id));
      })
      .catch(err => {
        alert(err.response.data.message);
      });

    //   const response = await fetch(
    //     `http://67.207.91.188:3333/api/eventos/${id}/edit/`,
    //     {
    //       method: "PUT",
    //       headers: new Headers({
    //         Authorization: `Token ${token}`,
    //         "Content-Type": "application/json"
    //       }),
    //       body: JSON.stringify({ desmarcado: true })
    //     }
    //   );

    //   console.log(response, "response");
    //   if (!response.ok) {
    //     response
    //       .json()
    //       .then(res => {
    //         alert(response.message);
    //       })
    //       .catch(function(err) {
    //         throw new Error(err);
    //       });
    //     console.log(response, "response");
    // }
  };
};
