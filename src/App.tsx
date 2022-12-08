import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import Groups from './components/Groups';
import { store } from './store/store'


function App() {

  return (
    <>
    <Provider store = { store }>
      <Routes>
        <Route path='/callback-vk' element={<Groups />} />
      </Routes>
    </Provider>
    </>
  );
}

export default App;