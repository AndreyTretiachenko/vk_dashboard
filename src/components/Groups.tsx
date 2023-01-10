import React, {useEffect, useState} from "react";
import {
  getDataUser,
  getLogin,
  getStatus,
  updateData,
} from "../features/loginSlice";
import {getStats} from "../features/statSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hookStore";
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
import {getGroupInfo} from "../features/membersSlice";
import {TselectInputGroup} from "../models/stats";
import {groupIDs} from "../data/groupsIDs";
import {FafouriteButton} from "./favouriteButton/FafouriteButton";
import {
  addFavouriteItem,
  updateFavouriteList,
} from "../features/favouriteSlice";
import FindGroupsByID from "./findGroup/FindGroupsByID";
import {findGroup} from "../features/findDroupByIdSlice";
import ItemKpi from "./kpi/itemKpi";

function Groups() {
  const dispatch = useAppDispatch();
  const date = new Date();

  const handlerOAuthVK = () => {
    dispatch(getLogin());
  };

  const {data} = useAppSelector(state => state.login);
  const members = useAppSelector(state => state.stats);
  const response = useAppSelector(state => state.stats);
  const favouriteList = useAppSelector(state => state.favourite.items);
  const findListGroup = useAppSelector(state => state.search);
  const [favourite, setFavourite] = useState(false);
  const [inputGroup, setinputGroup] = useState<TselectInputGroup[]>([]);
  const [selectInputGroup, setSelectInputGroup] = useState(
    groupIDs[0] as TselectInputGroup
  );

  const handlerAddGroup = (select: TselectInputGroup) => {
    setinputGroup(prev => [select, ...prev]);
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

  const handlePressFind = (query: string) => {
    dispatch(findGroup({q: query, offset: 0, count: 20}));
  };

  const handlerToggleFavourite = () => {
    const find = favouriteList.find(
      items => items.id === response.groups[0]?.id
    )?.name;
    if (find === undefined) {
      dispatch(
        addFavouriteItem({
          id: response.groups[0]?.id,
          name: response.groups[0]?.name,
        })
      );
    } else {
      dispatch(updateFavouriteList(response.groups[0]?.id));
    }
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

        <div style={{display: "inline-block", width: "100%"}}>
          <div className="card">
            <div className="card-header text-center d-flex align-items-center">
              <div className="d-inline-flex mr-3 ">
                Общая аналитика группы: &nbsp;
                <span style={{fontWeight: 500}}>
                  {response.isLoading
                    ? "загрузка ....."
                    : response.groups[0]?.name}
                </span>
              </div>
              {response.count > 0 && (
                <>
                  <FafouriteButton
                    id={response.groups[0]?.id}
                    clickFavourite={handlerToggleFavourite}
                  />
                </>
              )}
            </div>

            <div className="card-body">
              <h5 className="card-title">Показатели эффективности группы</h5>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"ERpost"}
                  value={
                    ((response.result.comments +
                      response.result.likes +
                      response.result.reposts) /
                      response.groups[0]?.members_count /
                      response.items.length) *
                    100
                  }
                  endpoint={"%"}
                  reference={2}
                  fixed={2}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"ERview"}
                  value={
                    ((response.result.comments +
                      response.result.likes +
                      response.result.reposts) /
                      response.result.views) *
                    100
                  }
                  endpoint={"%"}
                  reference={1}
                  fixed={2}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"LR (Love Rate)"}
                  value={
                    (response.result.likes /
                      response.groups[0]?.members_count /
                      response.items.length) *
                    100
                  }
                  endpoint={"%"}
                  reference={1}
                  fixed={2}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"TR (Talk Rate)"}
                  value={
                    (response.result.comments /
                      response.groups[0]?.members_count /
                      response.items.length) *
                    100
                  }
                  endpoint={"%"}
                  reference={1}
                  fixed={2}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Posts"}
                  value={response.items.length}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Likes"}
                  value={response.result.likes}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Comments"}
                  value={response.result.comments}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Reposts"}
                  value={response.result.reposts}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Members"}
                  value={response.groups[0]?.members_count}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"CTR"}
                  value={
                    (response.result.views /
                      response.groups[0]?.members_count /
                      response.items.length) *
                    100
                  }
                  endpoint={"%"}
                  reference={10}
                  fixed={2}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Views"}
                  value={response.result.views}
                  endpoint={""}
                  fixed={0}
                />
              </div>
              <div className="card d-inline-flex m-1" style={{width: "250px"}}>
                <ItemKpi
                  name={"Views/Posts"}
                  value={response.result.views / response.items.length}
                  endpoint={""}
                  fixed={0}
                />
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
                  Средний ERpost = (Сумма лайков за весь период + сумма репостов
                  за весь период + сумма комментариев за весь период)/кол-во
                  подписчиков/кол-во публикаций за весь период
                </li>
                <li>ERpost = (лайки+репосты+комментарии)/кол-во подписчиков</li>
                <li>
                  CTR = просмотры/кол-во подписчиков. Референс - от 10% хороший
                  реультат
                </li>
              </ul>
            </div>

            {!response.isLoading && response.error === "" ? (
              <>
                <div className="card text-center">
                  <div className="card-header text-center d-flex align-items-center">
                    <div className="d-inline-flex mr-3">
                      Топ записей по ER (за выбранный период)
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-inline">
                      {[...response.items]
                        .sort(
                          (a, b) =>
                            (b.likes.count +
                              b.comments.count +
                              b.reposts.count) /
                              b.views.count -
                            (a.likes.count +
                              a.comments.count +
                              a.reposts.count) /
                              a.views.count
                        )
                        .slice(0, 20)
                        .filter(item => item.attachments.length !== 0)
                        .map(item => (
                          <div
                            key={item.hash}
                            className="d-inline m-3"
                            style={{width: 300}}
                          >
                            <div className="card">
                              <div className="card-header d-flex">
                                Запись от{" "}
                                {new Date(item.date * 1000).toLocaleDateString(
                                  "ru"
                                )}
                                ,&nbsp;тип контента:{" "}
                                {
                                  new Array(
                                    new Set(
                                      [...item.attachments].map(
                                        i => i.type + "; "
                                      )
                                    )
                                  )
                                }
                                <span>
                                  &nbsp;длина текста: {item.text.length}
                                </span>
                              </div>
                              <div className="card-body d-inline-flex">
                                <div className="d-inline-flex mr-3">
                                  <img
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      border: "1px solid",
                                      borderRadius: "100px",
                                    }}
                                    src={
                                      item.attachments[0]?.type === "video"
                                        ? item.attachments[0]?.video?.photo_130
                                        : item.attachments[0]?.type === "photo"
                                        ? item.attachments[0]?.photo?.sizes[0]
                                            ?.url
                                        : item.attachments[0]?.type ===
                                          "market_album"
                                        ? item.attachments[0]?.market_album
                                            ?.photo?.sizes[0]?.url
                                        : item.attachments[0]?.type === "link"
                                        ? item.attachments[0]?.link?.photo
                                            ?.sizes[0].url
                                        : ""
                                    }
                                    alt={item.hash}
                                  />
                                </div>
                                <div
                                  className="d-inline-flex "
                                  style={{width: "40%"}}
                                >
                                  <a
                                    href={`https://vk.com/${response.groups[0]?.screen_name}?w=wall${item.from_id}_${item.id}`}
                                    target="blank"
                                    className="m-0 mr-3"
                                    style={{textAlign: "justify"}}
                                  >
                                    {item.text.slice(0, 100)}...
                                  </a>
                                </div>
                                <div className="d-inline-flex mr-1">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">ER</h5>
                                      <h5 className="card-subtitle text-muted">
                                        {(
                                          ((item.likes.count +
                                            item.reposts.count +
                                            item.comments.count) /
                                            item.views.count) *
                                          100
                                        ).toFixed(2)}
                                        %
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-inline-flex  mr-1">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">Views</h5>
                                      <h5 className="card-subtitle text-muted">
                                        {item.views.count}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-inline-flex w-10  mr-1">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">Comments</h5>
                                      <h5 className="card-subtitle text-muted">
                                        {item.comments.count}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-inline-flex  mr-1">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">Likes</h5>
                                      <h5 className="card-subtitle text-muted">
                                        {item.likes.count}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-inline-flex  mr-1">
                                  <div className="card">
                                    <div className="card-body">
                                      <h5 className="card-title">Reposts</h5>
                                      <h5 className="card-subtitle text-muted">
                                        {item.reposts.count}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="card-footer text-muted"></div>
                </div>

                <div className="card text-center mt-2">
                  <div className="card-header">Просмотры постов по дням</div>
                  <div className="card-body">
                    <h5 className="card-title"></h5>
                    <AreaChart
                      width={1000}
                      height={500}
                      data={response.items
                        .map(item => {
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
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="50%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
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
                        .map(item => {
                          return {
                            дата: new Intl.DateTimeFormat("ru", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }).format(item.date * 1000),
                            просмотры: item.views ? item.views.count : 0,
                            лайки: item.likes ? item.likes.count : 0,
                            комментарии: item.comments
                              ? item.comments.count
                              : 0,
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
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="50%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="дата" />
                      <YAxis />
                      <Tooltip />

                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="комментарии"
                        stroke="blue"
                      />
                      <Line type="monotone" dataKey="лайки" stroke="red" />
                      <Line
                        type="monotone"
                        dataKey="репосты"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </div>
                  <div className="card-footer text-muted"></div>
                </div>
              </>
            ) : (
              <></>
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
        </div>
      </div>
    </>
  );
}

export default Groups;
