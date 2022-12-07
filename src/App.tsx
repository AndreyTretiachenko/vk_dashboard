import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Groups from './components/Groups';

function App() {
  return (
    <>
    <Routes>
      <Route path='/callback-vk' element={<Groups />} />
    </Routes>
    </>
  );
}

export default App;