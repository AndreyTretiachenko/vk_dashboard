import React, { useEffect, useRef, useState } from "react";
import { findGroup } from "../features/findDroupByIdSlice";
import {
  getDataUser,
  getLogin,
  getStatus,
  updateData,
} from "../features/loginSlice";
import { addGroup, getParseMember } from "../features/parseSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hookStore";
import { TselectInputGroup } from "../models/stats";
import FindGroupsByID from "./findGroup/FindGroupsByID";

export const ParseMember = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.login);
  const listGroup = useAppSelector((state) => state.parse.groups);
  const findListGroup = useAppSelector((state) => state.search);
  const [inputGroupParse, setinputGroupParse] = useState([]);

  const [selectInputGroupParse, setSelectInputGroupParse] = useState(
    {} as TselectInputGroup
  );
  const selectRef = useRef(null);

  const handlerSelectGroup = (idGroup) => {
    dispatch(getParseMember({ id: idGroup }));
  };

  const handlerOverGroup = (e: React.MouseEvent) => {
    e.currentTarget.classList.add(...["bg-primary", "text-white"]);
  };
  const handlerLeaveGroup = (e: React.MouseEvent) => {
    e.currentTarget.classList.remove(...["bg-primary", "text-white"]);
  };

  const handlerAddGroup = (select: TselectInputGroup) => {
    console.log(select);
    if (select.name.length !== 0) {
      setinputGroupParse((prev) => [select, ...prev]);
      selectRef.current.value = select.name;
      setSelectInputGroupParse({
        id: select.id,
        name: select.name,
      });
    } else alert("группа не выбрана");
  };

  const handlePressFind = (query: string) => {
    dispatch(findGroup({ q: query, offset: 0, count: 20 }));
  };

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  const handlerAddToList = () => {
    if (selectInputGroupParse.name) {
      dispatch(
        addGroup({
          groupName: selectInputGroupParse.name,
          groupId: selectInputGroupParse.id,
          screenName: "",
          isLoading: false,
          error: "",
          type: "",
          isClosed: false,
        })
      );
    } else {
      alert("группа не выбрана");
    }
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
          <div className="col-3 p-0 m-0 mt-2">
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
          <div className="col p-0 m-0 d-inline mt-3">
            <select
              ref={selectRef}
              onChange={(e) => {
                setSelectInputGroupParse({
                  id: Number(e.target.value),
                  name: e.target.options[e.target.selectedIndex].getAttribute(
                    "data-name"
                  ),
                });
              }}
              className="form-control form-control-sm d-inline-flex"
              style={{ width: 400 }}
              aria-describedby="basic-addon3"
            >
              {inputGroupParse.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  data-name={item.name.toString()}
                >
                  {item.name.trim()}
                </option>
              ))}
            </select>
            <FindGroupsByID
              listFind={findListGroup.search}
              pressFind={handlePressFind}
              addGroup={handlerAddGroup}
            />
            <button
              onClick={handlerAddToList}
              className="btn btn-sm btn-primary ml-2"
            >
              добавить в список
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col m-2">
            <ul className="list-group">
              {listGroup.map((item) => (
                <li
                  key={item.groupId}
                  className="list-group-item"
                  id={item.groupId}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlerSelectGroup(item.groupId)}
                  onMouseOver={(e) => handlerOverGroup(e)}
                  onMouseLeave={(e) => handlerLeaveGroup(e)}
                >
                  {item.groupName}
                </li>
              ))}
            </ul>
          </div>
          <div className="col m-2">Информация по группе</div>
        </div>
      </div>
    </>
  );
};
