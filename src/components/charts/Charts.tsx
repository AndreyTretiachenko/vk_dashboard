import React, {useEffect} from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {useAppSelector} from "../../hooks/hookStore";
import moment from "moment";

export const Charts = () => {
  const response = useAppSelector(state => state.stats);
  let arrDate = new Array(
    Math.abs(
      moment.unix(response.end).diff(moment.unix(response.start), "days")
    )
  );

  arrDate = [...arrDate].map((item, index) => {
    return {
      date: moment.unix(response.start).add({day: index}).format("DD-MM-YYYY"),
    };
  });

  const resDate = [...arrDate].map(item => {
    return {
      ...item,

      posts: response.items.filter(
        (post: any) => moment.unix(post.date).format("DD-MM-YYYY") === item.date
      ).length,
    };
  });

  return (
    <>
      <div className="card text-center mt-2">
        <div className="card-header">Динамика размещения постов за период</div>
        <div className="card-body p-0 mr-3 mt-3 pt-1">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              width={730}
              height={250}
              data={resDate}
              margin={{
                top: 5,
                right: 0,
                left: -15,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="date"
                style={{fontSize: "0.75rem"}}
                padding={{right: 10, left: 15}}
              />
              <YAxis
                interval={1}
                dataKey="posts"
                style={{fontSize: "0.85rem"}}
                padding={{bottom: 10, top: 30}}
              />
              <Tooltip />
              <Bar
                dataKey="posts"
                fill="#017BFE"
                label={{position: "top", fontSize: "0.75rem"}}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="card-footer text-muted"></div> */}
      </div>
      <div className="card text-center mt-2">
        <div className="card-header">Просмотры постов по дням</div>
        <div className="card-body p-0 mr-3 mt-3 pt-1">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              width={800}
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
                right: 0,
                left: -15,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="6 6" /> */}
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="#017BFE" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#017BFE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="дата"
                style={{fontSize: "0.85rem"}}
                padding={{right: 10, left: 15}}
              />
              <YAxis
                style={{fontSize: "0.85rem"}}
                padding={{top: 10, bottom: 0}}
              />
              <Tooltip />

              {/* <Legend /> */}
              <Area
                type="monotone"
                dataKey="просмотры"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorUv)"
                label={{position: "top", fontSize: "0.75rem"}}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* <div className="card-footer text-muted"></div> */}
      </div>
      <div className="card text-center mt-2">
        <div className="card-header">
          Реакции (лайки, репосты, комментарии) по дням
        </div>
        <div className="card-body p-0 pt-1 mr-3 mt-3">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              width={800}
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
                right: 0,
                left: -15,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="дата"
                style={{fontSize: "0.85rem"}}
                padding={{right: 10, left: 15}}
              />
              <YAxis
                style={{fontSize: "0.85rem"}}
                padding={{top: 10, bottom: 10}}
              />
              <Tooltip contentStyle={{fontSize: "0.85rem"}} />

              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="комментарии"
                stroke="blue"
                dot={false}
                label={{position: "top", fontSize: "0.65rem"}}
              />
              <Line
                type="monotone"
                dataKey="лайки"
                stroke="red"
                dot={false}
                label={{position: "top", fontSize: "0.65rem"}}
              />
              <Line
                type="monotone"
                dataKey="репосты"
                stroke="#82ca9d"
                dot={false}
                label={{position: "top", fontSize: "0.65rem"}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
