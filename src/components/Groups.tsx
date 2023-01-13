import {useEffect} from "react";
import {getDataUser, getStatus, updateData} from "../features/loginSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hookStore";
import {Navigate} from "./navigate/Navigate";
import {Analytic} from "./analytic/Analytic";
import {TopRecords} from "./topRecords/TopRecords";
import {Charts} from "./charts/Charts";

function Groups() {
  const dispatch = useAppDispatch();
  const response = useAppSelector(state => state.stats);

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

  return (
    <>
      <Navigate />
      <Analytic />
      {!response.isLoading && response.error === "" ? (
        <>{/* <TopRecords /> */}</>
      ) : (
        <>{/* <Charts /> */}</>
      )}
    </>
  );
}

export default Groups;
