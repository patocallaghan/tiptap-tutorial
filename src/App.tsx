import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/layout';
import { HomePage } from './features/home/home-page';

// Lesson imports - will be created next
import { Lesson01 } from './features/lesson-01/lesson-01';
import { Lesson02 } from './features/lesson-02/lesson-02';
import { Lesson03 } from './features/lesson-03/lesson-03';
import { Lesson04 } from './features/lesson-04/lesson-04';
import { Lesson05 } from './features/lesson-05/lesson-05';
import { Lesson06 } from './features/lesson-06/lesson-06';
import { Lesson07 } from './features/lesson-07/lesson-07';
import { Lesson08 } from './features/lesson-08/lesson-08';
import { Lesson09 } from './features/lesson-09/lesson-09';
import { Lesson10 } from './features/lesson-10/lesson-10';
import { Lesson11 } from './features/lesson-11/lesson-11';
import { Lesson12 } from './features/lesson-12/lesson-12';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lesson-01" element={<Lesson01 />} />
          <Route path="lesson-02" element={<Lesson02 />} />
          <Route path="lesson-03" element={<Lesson03 />} />
          <Route path="lesson-04" element={<Lesson04 />} />
          <Route path="lesson-05" element={<Lesson05 />} />
          <Route path="lesson-06" element={<Lesson06 />} />
          <Route path="lesson-07" element={<Lesson07 />} />
          <Route path="lesson-08" element={<Lesson08 />} />
          <Route path="lesson-09" element={<Lesson09 />} />
          <Route path="lesson-10" element={<Lesson10 />} />
          <Route path="lesson-11" element={<Lesson11 />} />
          <Route path="lesson-12" element={<Lesson12 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
