import React, { useEffect } from "react";
import {
  getDataUser,
  getLogin,
  getStatus,
  updateData,
} from "../features/loginSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hookStore";

function ParseMember() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.login);

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  useEffect(() => {
    dispatch(getStatus())
      .then((res: any) => {
        dispatch(getDataUser()).then((res) => {
          dispatch(updateData(res.payload[0]));
        });
      })
      .catch((res) => {
        alert("авторизуйтесь пожалуйста");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              alt=""
              src={data.photo}
              style={{ border: "1px solid", borderRadius: "100px" }}
            />
            {data.id ? (
              <span className="m-2">
                {data.first_name} {data.last_name}
              </span>
            ) : (
              <button
                className="btn btn-sm btn-primary m-2"
                onClick={handlerOAuthVK}
              >
                Войти
              </button>
            )}
          </div>
          <div className="col m-2">Настройка выгрузки</div>
        </div>
        <div className="row">
          <div className="col m-2">Список сохраненных групп</div>
          <div className="col m-2">Информация по группе</div>
        </div>
      </div>
    </>
  );
}

export default ParseMember;
