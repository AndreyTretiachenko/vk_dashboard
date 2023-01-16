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
  const [selectInputGroup, setSelectInputGroup] = useState({
    ...groupIDs[0],
    dateEnd: new Date(Date.now()).toLocaleDateString("en-CA"),
    dateStart: new Date(Date.now()).toLocaleDateString("en-CA"),
  } as TselectInputGroup);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-sm-center">
        <div className="mx-1 my-1 d-flex w-20">
          <img
            alt="0_0"
            src={data.photo}
            style={{border: "1px solid", borderRadius: "100px"}}
          />
          {data.id ? (
            <>
              <span className="m-2 h6">
                {data.first_name} {data.last_name}
              </span>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary m-2"
              onClick={handlerOAuthVK}
            >
              Войти
            </button>
          )}
        </div>

        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div>
            {data.id && (
              <>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div
                          className="col-12 col-md-6 col-lg-6 p-0"
                          // style={{border: "1px solid"}}
                        >
                          <div className="row">
                            <div className="col-12 my-1">
                              <div className="input-group">
                                <select
                                  name="selectGroup"
                                  onChange={e => {
                                    setSelectInputGroup({
                                      id: Number(e.target.value),
                                      name: e.target.options[
                                        e.target.selectedIndex
                                      ].getAttribute("data-name"),
                                      dateEnd: new Date(
                                        Date.now()
                                      ).toLocaleDateString("en-CA"),
                                      dateStart: new Date(
                                        Date.now()
                                      ).toLocaleDateString("en-CA"),
                                      photo_100: "",
                                    });
                                  }}
                                  className="form-control form-control-sm"
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
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 my-1">
                              <div className="float-start mb-2">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="exampleCheck1"
                                    checked={favourite}
                                    onChange={e =>
                                      setFavourite(e.target.checked)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                  >
                                    избранное
                                  </label>
                                </div>
                              </div>
                              <div className="float-end">
                                <FindGroupsByID
                                  pressFind={handlePressFind}
                                  listFind={findListGroup.search}
                                  addGroup={handlerAddGroup}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-12 col-md-6 col-lg-6"
                          // style={{border: "1px solid"}}
                        >
                          <div className="row">
                            <div className="col-12 my-1 d-flex p-0">
                              <input
                                className="form-control form-control-sm d-inline"
                                style={{width: "auto"}}
                                type="date"
                                value={selectInputGroup.dateStart}
                                defaultValue={new Date(
                                  Date.now()
                                ).toLocaleDateString("en-CA")}
                                onChange={e =>
                                  setSelectInputGroup({
                                    ...selectInputGroup,
                                    dateStart: e.target.value,
                                  })
                                }
                              />
                              <span className="mx-1 d-flex align-items-center">
                                по:
                              </span>
                              <input
                                className="form-control form-control-sm d-inline"
                                style={{width: "auto"}}
                                type="date"
                                value={selectInputGroup.dateEnd}
                                defaultValue={new Date(
                                  Date.now()
                                ).toLocaleDateString("en-CA")}
                                onChange={e =>
                                  setSelectInputGroup({
                                    ...selectInputGroup,
                                    dateEnd: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12 p-0">
                              <div className="">
                                <button
                                  className="btn btn-primary btn-sm my-2"
                                  onClick={handlerGetStatGroup}
                                >
                                  Загрузить аналитику
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
