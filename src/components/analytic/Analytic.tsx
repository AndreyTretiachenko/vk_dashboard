import React from "react";
import {
  addFavouriteItem,
  updateFavouriteList,
} from "../../features/favouriteSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hookStore";
import {FafouriteButton} from "../favouriteButton/FafouriteButton";
import ItemKpi from "../kpi/itemKpi";

export const Analytic = () => {
  const dispatch = useAppDispatch();
  const response = useAppSelector(state => state.stats);
  const favouriteList = useAppSelector(state => state.favourite.items);

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

  return (
    <>
      <div className="container-fluid p-0">
        <div style={{display: "inline-block", width: "100%"}}>
          <div className="card">
            <div className="card-header text-center d-flex align-items-center">
              <div className="d-inline-flex mr-3">
                аналитика: &nbsp;
                <span style={{fontWeight: 500}}>
                  {response.isLoading
                    ? "загрузка ....."
                    : response.groups[0]?.name}
                </span>
              </div>
              {response.count > 0 && (
                <>
                  {/* <FafouriteButton
                    id={response.groups[0]?.id}
                    clickFavourite={handlerToggleFavourite}
                  /> */}
                </>
              )}
            </div>
            <div className="card-body d-flex justify-content-center">
              <div className="row">
                <div className="col-12">
                  <h6 className="card-title">
                    Показатели эффективности группы
                  </h6>

                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
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
                      fixed={1}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
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
                      fixed={1}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"LR"}
                      value={
                        (response.result.likes /
                          response.groups[0]?.members_count /
                          response.items.length) *
                        100
                      }
                      endpoint={"%"}
                      reference={1}
                      fixed={1}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"TR"}
                      value={
                        (response.result.comments /
                          response.groups[0]?.members_count /
                          response.items.length) *
                        100
                      }
                      endpoint={"%"}
                      reference={1}
                      fixed={1}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Posts"}
                      value={response.items.length}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Likes"}
                      value={response.result.likes}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Comments"}
                      value={response.result.comments}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Reposts"}
                      value={response.result.reposts}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Members"}
                      value={response.groups[0]?.members_count}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
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
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
                    <ItemKpi
                      name={"Views"}
                      value={response.result.views}
                      endpoint={""}
                      fixed={0}
                    />
                  </div>
                  <div
                    className="card d-inline-flex m-1"
                    style={{width: "10rem"}}
                  >
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
              </div>
            </div>
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
};
