import React, {useEffect, useState} from "react";
import {clearList} from "../../features/findDroupByIdSlice";
import {useAppDispatch} from "../../hooks/hookStore";
import {TselectInputGroup} from "../../models/stats";

interface TselectGroup {
  name: string;
  id: number;
  is_closed?: number;
  photo_100?: string;
}

interface propsFind {
  pressFind: (q: string) => void;
  listFind: TselectGroup[];
  addGroup: (select: {
    name: string;
    id: number;
    is_closed: number;
    photo_100: string;
  }) => void;
}

export default function FindGroupsByID(props: propsFind) {
  const [q, setQ] = useState<string>("");
  const [select, setSelect] = useState({
    name: "",
    id: 0,
    is_closed: 0,
    photo_100: "",
  });
  const dispatch = useAppDispatch();

  const handleFind = () => {
    props.pressFind(q);
  };

  useEffect(() => {
    setSelect({
      name: props.listFind[0]?.name,
      id: props.listFind[0]?.id,
      is_closed: props.listFind[0]?.is_closed,
      photo_100: props.listFind[0]?.photo_100,
    });
  }, [props.listFind]);

  return (
    <>
      <div className="ml-2 d-inline">
        <button
          className="btn btn-sm btn-primary"
          data-toggle="modal"
          data-target="#AddGroupModal"
        >
          Найти группу
        </button>
        <div
          className="modal fade"
          id="AddGroupModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Поиск и добавление группы
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor="#inputFind" className="">
                  Введите часть названия группы:
                </label>
                <input
                  name="inputFind"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  className="form-control form-control-sm d-inline w-75 mr-3"
                  type={"text"}
                />
                <button
                  className="btn btn-sm btn-primary d-inline"
                  onClick={handleFind}
                >
                  Найти
                </button>
                <label htmlFor="#selectFind" className=" mt-2">
                  Выберите необходимую группу из списка:
                </label>
                <select
                  name="selectFind"
                  className="form-control form-control-sm"
                  onChange={e =>
                    setSelect({
                      id: Number(e.target.value),
                      name: e.target.options[
                        e.target.selectedIndex
                      ].getAttribute("data-name-find"),
                      is_closed: Number(
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "data-closed"
                        )
                      ),
                      photo_100:
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "photo-name"
                        ),
                    })
                  }
                >
                  {props.listFind.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      data-name-find={item.name}
                      data-closed={item.is_closed}
                      photo-name={item.photo_100}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="alert-info mt-2 p-2">
                  Если хотите сохранить найденную группу - добавьте ее в
                  избранное
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                  onClick={() => {
                    dispatch(clearList([]));
                    setQ("");
                  }}
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    props.addGroup(select);
                    dispatch(clearList([]));
                    setQ("");
                  }}
                  data-dismiss="modal"
                >
                  Добавить группу
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
