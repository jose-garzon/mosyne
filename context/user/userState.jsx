import React, { useReducer } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

import UserContext from "./userContext";
import UserReducer from "./userReducer";

import clienteAxios from "../../config/Axios";
import { GUARDAR_USUARIO, EDITAR_PERFIL_GUARDIAN } from "../../types";

const UserState = (props) => {
  const router = useRouter();

  const initialState = {
    usuario: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const obtenerUsuario = async () => {
    const { data, status } = await clienteAxios.get("/users");
    if (status === 200) {
      dispatch({
        type: GUARDAR_USUARIO,
        payload: data,
      });
    } else {
      router.push("/");
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un error, inicia sesión de nuevo.",
      });
    }
  };

  const editarPerfil = async (usuario) => {
    const { status } = await clienteAxios.put("/users", usuario);
    if (status === 200) {
      dispatch({
        type: EDITAR_PERFIL_GUARDIAN,
        payload: usuario,
      });
      router.push("/profile");
      Swal.fire(
        "¡Perfil actualizado!",
        "Tu perfil ha sido actualizado.",
        "success"
      );
    }
    if (status === 409) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un error.",
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        usuario: state.usuario,
        obtenerUsuario,
        editarPerfil,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
