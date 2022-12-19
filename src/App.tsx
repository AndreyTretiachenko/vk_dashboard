import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Groups from "./components/Groups";
import { store } from "./store/store";
import ParseMember from "./components/parseMember";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/callback-vk" element={<Groups />} />
          <Route path="/parse" element={<ParseMember />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
