import React, { useEffect, useState } from "react";
import {
  getDataUser,
  getLogin,
  getStatus,
  updateData,
} from "../features/loginSlice";
import { getStats } from "../features/statSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hookStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { getGroupInfo } from "../features/membersSlice";
import { TselectInputGroup } from "../models/stats";
import { groupIDs } from "../data/groupsIDs";

function Groups() {
  const dispatch = useAppDispatch();

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  const { data } = useAppSelector((state) => state.login);
  const members = useAppSelector((state) => state.members);
  const response = useAppSelector((state) => state.stats);
  const [favourite, setFavourite] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);
  const [inputGroup, setinputGroup] = useState([]);
  const [selectInputGroup, setSelectInputGroup] = useState({
    id: 173281049,
    name: "Аскона Север / Территория здорового сна",
  } as TselectInputGroup);

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
    const res = groupIDs.sort(({ name: a }, { name: b }) => a.localeCompare(b));
    setinputGroup(res);
    if (localStorage.getItem("favourite"))
      setFavouriteList(JSON.parse(localStorage.getItem("favourite")));
    else
      localStorage.setItem(
        "favourite",
        JSON.stringify([
          {
            id: 173281049,
            name: "Аскона Север / Территория здорового сна",
          },
        ])
      );
    setFavouriteList(JSON.parse(localStorage.getItem("favourite")));
  }, []);

  useEffect(() => {
    if (favourite) {
      setinputGroup(favouriteList);
    } else {
      setinputGroup(
        groupIDs.sort(({ name: a }, { name: b }) => a.localeCompare(b))
      );
    }
  }, [favourite]);

  const handlerAddFavourite = (data: any) => {};

  const handlerGetStatGroup = () => {
    dispatch(
      getGroupInfo({ id: Number(selectInputGroup.id), offset: 0, count: 100 })
    );
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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2 d-flex align-items-center">
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
          {data.id && (
            <div className="col-8">
              <div className="input-group input-group-sm m-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    ID группы
                  </span>
                </div>
                <select
                  onChange={(e) => {
                    setSelectInputGroup({
                      id: Number(e.target.value),
                      name: e.target.options[
                        e.target.selectedIndex
                      ].getAttribute("data-name"),
                      dateEnd: "",
                      dateStart: "",
                    });
                  }}
                  className="form-control"
                  aria-describedby="basic-addon3"
                >
                  {inputGroup.map((item: TselectInputGroup) => (
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

              <button
                className="d-inline btn btn-sm btn-outline-primary m-2"
                onClick={handlerGetStatGroup}
              >
                Загрузить статистику
              </button>
              <div className="form-group d-inline form-check form-check-sm">
                <input
                  type="checkbox"
                  id="exampleCheck1"
                  checked={favourite}
                  onChange={(e) => setFavourite(e.target.checked)}
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
                  style={{ width: "20%" }}
                  type="date"
                  value={selectInputGroup.dateStart}
                  onChange={(e) =>
                    setSelectInputGroup({
                      ...selectInputGroup,
                      dateStart: e.target.value,
                    })
                  }
                />
                <span className="mx-3">-</span>
                <input
                  className="form-control d-inline"
                  style={{ width: "20%" }}
                  type="date"
                  value={selectInputGroup.dateEnd}
                  onChange={(e) =>
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
        {!response.isLoading &&
        response.error === "" &&
        members.error === "" ? (
          <div style={{ display: "inline-block", width: "100%" }}>
            <div className="card">
              <div className="card-header text-center d-flex align-items-center">
                <div className="d-inline-flex mr-3 ">
                  Общая аналитика группы {response?.groups[0]?.name ?? " - "}
                </div>
                <div
                  className=""
                  style={{ position: "absolute", right: 0, marginRight: 10 }}
                >
                  <button className="btn btn-sm btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    добавить в избранное
                  </button>
                </div>
              </div>

              {response.items.length !== 0 ? (
                <div className="card-body">
                  <h5 className="card-title">
                    Показатели эффективности группы
                  </h5>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">ERpost</h5>
                      <h2 className="card-text d-inline">
                        {(
                          ((response.result.comments +
                            response.result.likes +
                            response.result.reposts) /
                            members.count /
                            response.items.length) *
                          100
                        ).toFixed(3) ?? "-"}
                        %
                      </h2>
                      <div className="d-inline-flex align-items-center">
                        {((response.result.comments +
                          response.result.likes +
                          response.result.reposts) /
                          members.count /
                          response.items.length) *
                          100 <
                        2 ? (
                          <>
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="red"
                              className="bi bi-caret-down d-inline"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                          </>
                        ) : (
                          <>
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="green"
                              className="bi bi-caret-down d-inline"
                              viewBox="0 0 16 16"
                            >
                              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">ERview</h5>
                      <h2 className="card-text d-inline">
                        {(
                          ((response.result.comments +
                            response.result.likes +
                            response.result.reposts) /
                            response.result.views) *
                          100
                        ).toFixed(2) ?? "-"}
                        %
                      </h2>
                      <div className="d-inline-flex align-items-center">
                        {((response.result.comments +
                          response.result.likes +
                          response.result.reposts) /
                          response.result.views) *
                          100 <
                        1 ? (
                          <>
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="red"
                              className="bi bi-caret-down d-inline"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                          </>
                        ) : (
                          <>
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="green"
                              className="bi bi-caret-down d-inline"
                              viewBox="0 0 16 16"
                            >
                              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />{" "}
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Средний ERpost</h5>
                      <h2 className="card-text">
                        {(
                          ((response.result.comments +
                            response.result.likes +
                            response.result.reposts) /
                            members.count /
                            response.items.length) *
                          100
                        ).toFixed(2) ?? "-"}
                        %
                      </h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">LR (Love Rate)</h5>
                      <h2 className="card-text d-inline">
                        {(
                          (response.result.likes /
                            members.count /
                            response.items.length) *
                          100
                        ).toFixed(2) ?? "-"}
                        %
                      </h2>
                      {(response.result.likes /
                        members.count /
                        response.items.length) *
                        100 <
                      1 ? (
                        <>
                          &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="red"
                            className="bi bi-caret-down d-inline"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="green"
                            className="bi bi-caret-down d-inline"
                            viewBox="0 0 16 16"
                          >
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />{" "}
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">TR (Talk Rate)</h5>
                      <h2 className="card-text">
                        {(
                          (response.result.comments /
                            members.count /
                            response.items.length) *
                          100
                        ).toFixed(2) ?? "-"}
                        %
                      </h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Posts</h5>
                      <h2 className="card-text">
                        {response.items.length ?? "-"}
                      </h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Likes</h5>
                      <h2 className="card-text">
                        {response.result.likes ?? "-"}
                      </h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Comments</h5>
                      <h2 className="card-text">{response.result.comments}</h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Reposts</h5>
                      <h2 className="card-text">{response.result.reposts}</h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Members</h5>
                      <h2 className="card-text">{members.count}</h2>
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">CTR</h5>
                      <h2 className="card-text d-inline">
                        {(
                          (response.result.views /
                            members.count /
                            response.items.length) *
                          100
                        ).toFixed(2) ?? "-"}
                        %
                      </h2>
                      {(response.result.views /
                        members.count /
                        response.items.length) *
                        100 <
                      10 ? (
                        <>
                          &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="red"
                            className="bi bi-caret-down d-inline"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="green"
                            className="bi bi-caret-down d-inline"
                            viewBox="0 0 16 16"
                          >
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />{" "}
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{ width: "250px" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Views</h5>
                      <h2 className="card-text">
                        {response.result.views ?? "-"}
                      </h2>
                    </div>
                  </div>

                  <ul>
                    <li>
                      ERpost = (лайки+репосты+комментарии)/кол-во подписчиков.
                      Референс - от 2% хороший реультат
                    </li>
                    <li>
                      ERview = (лайки+репосты+комментарии)/кол-во просмотров
                      публикации. Референс - от 1% хороший реультат
                    </li>
                    <li>
                      LR(love rate) = лайки/кол-во просмотров публикации/кол-во
                      подписчиков. Референс - от 1% хороший реультат
                    </li>
                    <li>
                      TR(talk rate) = комментарии/кол-во просмотров
                      публикации/кол-во подписчиков.
                    </li>
                    <li>
                      Средний ERpost = (Сумма лайков за весь период + сумма
                      репостов за весь период + сумма комментариев за весь
                      период)/кол-во подписчиков/кол-во публикаций за весь
                      период
                    </li>
                    <li>
                      ERpost = (лайки+репосты+комментарии)/кол-во подписчиков
                    </li>
                    <li>
                      CTR = просмотры/кол-во подписчиков. Референс - от 10%
                      хороший реультат
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="p-5">
                  <span>Загрузите данные:</span>
                  <ol>
                    <li>Выберите группу для загрузки данных аналитики</li>
                    <li>Нажмите на кнопку "загрузить аналитику"</li>
                    <li>Наслаждайтесь полученным результатом</li>
                  </ol>
                </div>
              )}

              <div className="card-footer text-muted">
                <p>
                  {" "}
                  Engagement Rate - коэффициент вовлеченности пользователей в
                  публикуемый контент (посты). Иными словами, отображает процент
                  пользователей, которые проявляли активность у публикаций.
                </p>
              </div>
            </div>
            <div className="card text-center mt-2">
              <div className="card-header">Просмотры постов по дням</div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <AreaChart
                  width={1000}
                  height={500}
                  data={response.items
                    .map((item) => {
                      return {
                        дата: new Intl.DateTimeFormat("ru", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }).format(item.date * 1000),
                        просмотры: item.views ? item.views.count : 0,
                      };
                    })
                    .reverse()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="50%"
                        stopColor="#8884d8"
                        stopOpacity={0.8}
                      />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="дата" />
                  <YAxis />
                  <Tooltip />

                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="просмотры"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </div>
              <div className="card-footer text-muted"></div>
            </div>
            <div className="card text-center mt-2">
              <div className="card-header">
                Реакции (лайки, репосты, комментарии) по дням
              </div>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <LineChart
                  width={1000}
                  height={500}
                  data={response.items
                    .map((item) => {
                      return {
                        дата: new Intl.DateTimeFormat("ru", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }).format(item.date * 1000),
                        просмотры: item.views ? item.views.count : 0,
                        лайки: item.likes ? item.likes.count : 0,
                        комментарии: item.comments ? item.comments.count : 0,
                        репосты: item.reposts ? item.reposts.count : 0,
                      };
                    })
                    .reverse()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="50%"
                        stopColor="#8884d8"
                        stopOpacity={0.8}
                      />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="дата" />
                  <YAxis />
                  <Tooltip />

                  <Legend />
                  <Line type="monotone" dataKey="комментарии" stroke="blue" />
                  <Line type="monotone" dataKey="лайки" stroke="red" />
                  <Line type="monotone" dataKey="репосты" stroke="#82ca9d" />
                </LineChart>
              </div>
              <div className="card-footer text-muted"></div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center p-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Groups;
