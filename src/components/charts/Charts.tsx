import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {useAppSelector} from "../../hooks/hookStore";

export const Charts = () => {
  const response = useAppSelector(state => state.stats);
  return (
    <>
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
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#8884d8" stopOpacity={0.8} />
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
              .map(item => {
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
                <stop offset="50%" stopColor="#8884d8" stopOpacity={0.8} />
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
    </>
  );
};