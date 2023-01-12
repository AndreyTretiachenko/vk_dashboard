import {useEffect, useState} from "react";
import {groupIDs} from "../../data/groupsIDs";
import {findGroup} from "../../features/findDroupByIdSlice";
import {getLogin} from "../../features/loginSlice";
import {getStats} from "../../features/statSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hookStore";
import {TselectInputGroup} from "../../models/stats";
import FindGroupsByID from "../findGroup/FindGroupsByID";

export const Navigate = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.login);
  const [inputGroup, setinputGroup] = useState<TselectInputGroup[]>([]);
  const [selectInputGroup, setSelectInputGroup] = useState(
    groupIDs[0] as TselectInputGroup
  );
  const findListGroup = useAppSelector(state => state.search);
  const [favourite, setFavourite] = useState(false);
  const favouriteList = useAppSelector(state => state.favourite.items);

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  const handlePressFind = (query: string) => {
    dispatch(findGroup({q: query, offset: 0, count: 20}));
  };

  const handlerAddGroup = (select: TselectInputGroup) => {
    setinputGroup(prev => [select, ...prev]);
  };

  const handlerGetStatGroup = () => {
    dispatch(
      getStats({
        id: -selectInputGroup.id,
        offset: 0,
        count: 100,
        dateEnd: selectInputGroup.dateEnd || "",
        dateStart: selectInputGroup.dateStart || "",
      })
    );
  };

  useEffect(() => {
    if (favourite) setinputGroup(favouriteList);
    else
      setinputGroup(
        groupIDs.sort(({name: a}, {name: b}) => a.localeCompare(b))
      );
  }, [favourite, favouriteList]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2 d-flex align-items-center">
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
          {data.id && (
            <div className="col-8">
              <div className="input-group input-group-sm m-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    Список групп
                  </span>
                </div>
                <select
                  onChange={e => {
                    setSelectInputGroup({
                      id: Number(e.target.value),
                      name: e.target.options[
                        e.target.selectedIndex
                      ].getAttribute("data-name"),
                      dateEnd: "",
                      dateStart: "",
                      photo_100: "",
                    });
                  }}
                  className="form-control"
                  aria-describedby="basic-addon3"
                >
                  {inputGroup.map(item => (
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
                  pressFind={handlePressFind}
                  listFind={findListGroup.search}
                  addGroup={handlerAddGroup}
                />
              </div>

              <button
                className="d-inline btn btn-sm btn-outline-primary m-2"
                onClick={handlerGetStatGroup}
              >
                Загрузить аналитику
              </button>
              <div className="form-group d-inline form-check form-check-sm">
                <input
                  type="checkbox"
                  id="exampleCheck1"
                  checked={favourite}
                  onChange={e => setFavourite(e.target.checked)}
                />
                <label
                  className="form-check-label  ml-2"
                  htmlFor="exampleCheck1"
                >
                  избранное
                </label>
              </div>
              <div className="d-inline">
                <label className="d-inline pl-4 mx-1">период:</label>
                <input
                  className="form-control d-inline"
                  style={{width: "20%"}}
                  type="date"
                  value={selectInputGroup.dateStart}
                  onChange={e =>
                    setSelectInputGroup({
                      ...selectInputGroup,
                      dateStart: e.target.value,
                    })
                  }
                />
                <span className="mx-3">-</span>
                <input
                  className="form-control d-inline"
                  style={{width: "20%"}}
                  type="date"
                  value={selectInputGroup.dateEnd}
                  onChange={e =>
                    setSelectInputGroup({
                      ...selectInputGroup,
                      dateEnd: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
