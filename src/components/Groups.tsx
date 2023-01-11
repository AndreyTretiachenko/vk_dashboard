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
import {Navigate} from "./navigate/Navigate";
import {Analytic} from "./analytic/Analytic";
import {TopRecords} from "./topRecords/TopRecords";
import {Charts} from "./charts/Charts";

function Groups() {
  const dispatch = useAppDispatch();
  const date = new Date();
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

  useEffect(() => {
    if (favourite) setinputGroup(favouriteList);
    else
      setinputGroup(
        groupIDs.sort(({name: a}, {name: b}) => a.localeCompare(b))
      );
  }, [favourite, favouriteList]);

  return (
    <>
      <Navigate />
      <Analytic />
      {!response.isLoading && response.error === "" ? (
        <>
          <TopRecords />
        </>
      ) : (
        <>
          <Charts />
        </>
      )}
    </>
  );
}

export default Groups;
