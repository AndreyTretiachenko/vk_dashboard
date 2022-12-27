import React from "react";
import { useAppSelector } from "../hooks/hookStore";

interface ItemProps {
  name: string;
  value: number;
  reference?: number;
  endpoint: string;
  fixed: number;
}

function ItemKpi({ name, value, reference, endpoint, fixed }: ItemProps) {
  const loading = useAppSelector((state) => state.stats.isLoading);
  const errorStats = useAppSelector((state) => state.stats.error);
  const errorMembers = useAppSelector((state) => state.members.error);

  return (
    <>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {!errorStats ? (
          !loading ? (
            <>
              <h2 className="card-text d-inline">
                {value.toFixed(fixed) ?? "-"} {endpoint}
              </h2>
              <div className="d-inline-flex align-items-center">
                {reference !== undefined &&
                  (value < reference ? (
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
                  ))}
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Загрузка...</span>
              </div>
            </div>
          )
        ) : (
          <div>Ошибка доступа</div>
        )}
      </div>
    </>
  );
}

export default ItemKpi;
