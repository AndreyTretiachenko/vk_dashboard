import React, {useEffect, useState} from "react";
import {findGroup} from "../features/findDroupByIdSlice";
import {
  getDataUser,
  getLogin,
  getStatus,
  updateData,
} from "../features/loginSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hookStore";
import {TselectInputGroup} from "../models/stats";
import FindGroupsByID from "./FindGroupsByID";

function ParseMember() {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.login);
  const findListGroup = useAppSelector(state => state.search);
  const [inputGroupParse, setinputGroupParse] = useState([]);
  const [selectInputGroupParse, setSelectInputGroupParse] = useState(
    {} as TselectInputGroup
  );

  const handlerAddGroup = (select: TselectInputGroup) => {
    setinputGroupParse(prev => [select, ...prev]);
  };

  const handlePressFind = (query: string) => {
    dispatch(findGroup({q: query, offset: 0, count: 20}));
  };

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  useEffect(() => {
    dispatch(getStatus())
      .then((res: any) => {
        dispatch(getDataUser()).then(res => {
          dispatch(updateData(res.payload[0]));
        });
      })
      .catch(res => {
        alert("авторизуйтесь пожалуйста");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <img
              alt=""
              src={data.photo}
              style={{border: "1px solid", borderRadius: "100px"}}
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
          <div className="col m-2 d-inline-flex">
            <select
              onChange={e => {
                setSelectInputGroupParse({
                  id: Number(e.target.value),
                  name: e.target.options[e.target.selectedIndex].getAttribute(
                    "data-name"
                  ),
                  dateEnd: "",
                  dateStart: "",
                });
              }}
              className="form-control form-control-sm d-inline-flex"
              style={{width: 400}}
              aria-describedby="basic-addon3"
            >
              {inputGroupParse.map(item => (
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
          </div>
        </div>
        <div className="row">
          <div className="col m-2">
            <ul className="list-group">
              <li className="list-group-item active" aria-current="true">
                An active item
              </li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>
          <div className="col m-2">Информация по группе</div>
        </div>
      </div>
    </>
  );
}

export default ParseMember;
