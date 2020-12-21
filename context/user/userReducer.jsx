import { EDITAR_PERFIL_GUARDIAN, GUARDAR_USUARIO } from "../../types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case GUARDAR_USUARIO:
    case EDITAR_PERFIL_GUARDIAN:
      return {
        ...state,
        usuario: action.payload,
      };

    default:
      return state;
  }
};
export default UserReducer;
