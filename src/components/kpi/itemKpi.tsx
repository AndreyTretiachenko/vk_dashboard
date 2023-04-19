import React from "react";
import { useAppSelector } from "../../hooks/hookStore";

interface ItemProps {
  name: string;
  value: number;
  reference?: number;
  endpoint: string;
  fixed: number;
  titleTop?: string;
}

function ItemKpi({ name, value, reference, endpoint, fixed, titleTop }: ItemProps) {
  const loading = useAppSelector((state) => state.stats.isLoading);
  const errorStats = useAppSelector((state) => state.stats.error);

  return (
    <>
      <div className="card-body btn m-0 pt-3 pb-3" data-toggle="tooltip" data-placement="top" title={titleTop}>
        <h5 className="card-title">{name}</h5>

        {!loading ? (
          <>
            <h4 className="card-text d-inline" style={{ wordWrap: "normal" }}>
              {!errorStats ? (
                <>
                  {value?.toFixed(fixed) ?? "-"}
                  {endpoint}
                </>
              ) : (
                <div style={{ fontSize: 16 }}>нет доступа</div>
              )}
            </h4>

            <div className="d-inline-flex align-items-center">
              {reference !== undefined &&
                !errorStats &&
                (value < reference ? (
                  <>
                    &nbsp;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="red"
                      className="bi bi-caret-down d-inline"
                      viewBox="0 0 16 16">
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
                      viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </>
                ))}
            </div>
          </>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        )}
      </div>
    </>
  );
}

export default ItemKpi;
