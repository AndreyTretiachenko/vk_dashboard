import React from "react";
import {useAppSelector} from "../../hooks/hookStore";

export const TopRecords = () => {
  const response = useAppSelector(state => state.stats);

  return (
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
                (b.likes.count + b.comments.count + b.reposts.count) /
                  b.views.count -
                (a.likes.count + a.comments.count + a.reposts.count) /
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
                    {new Date(item.date * 1000).toLocaleDateString("ru")}
                    ,&nbsp;тип контента:{" "}
                    {
                      new Array(
                        new Set([...item.attachments].map(i => i.type + "; "))
                      )
                    }
                    <span>&nbsp;длина текста: {item.text.length}</span>
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
                            ? item.attachments[0]?.photo?.sizes[0]?.url
                            : item.attachments[0]?.type === "market_album"
                            ? item.attachments[0]?.market_album?.photo?.sizes[0]
                                ?.url
                            : item.attachments[0]?.type === "link"
                            ? item.attachments[0]?.link?.photo?.sizes[0].url
                            : ""
                        }
                        alt={item.hash}
                      />
                    </div>
                    <div className="d-inline-flex " style={{width: "40%"}}>
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
  );
};
