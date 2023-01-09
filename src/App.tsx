import React from "react";
import {Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Groups from "./components/Groups";
import {store} from "./store/store";
import {ParseMember} from "./components/parseMember";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

let persister = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <Routes>
            <Route path="/callback-vk" element={<Groups />} />
            <Route path="/parse" element={<ParseMember />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
