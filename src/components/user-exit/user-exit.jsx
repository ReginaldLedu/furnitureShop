import React from "react";
import { useDispatch } from "react-redux";
import { clearUser, clearChosen } from "../../store/slice";

export const UserExit = () => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(clearUser());
        dispatch(clearChosen());
      }}
      className="breadcrumbs_exit"
    >
      <img className="breadcrumbs_exit" src="./IMG/exit.png" alt="exit" />
    </div>
  );
};
