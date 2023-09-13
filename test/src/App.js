import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import Member from './components/Member';
import ChangePWD from './components/ChangePWD';
import ChangePhoto from './components/ChangePhoto';
import ForgetPWD from './components/ForgetPWD';
import ResetPWD from './components/ResetPWD';
import { Routes, Route } from 'react-router-dom';

// 在Layout.js加入Header跟Footer

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 無權限的路由 */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="forgetPWD" element={<ForgetPWD />} />
        <Route path="resetPWD/:user/:resetPWDToken" element={<ResetPWD />} />

        {/* 有權限的路由 */}
        <Route element={<RequireAuth allowedRoles={1} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={1} />}>
          <Route path="/member/:user" element={<Member />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={1} />}>
          <Route path="/member/:user/changePWD" element={<ChangePWD />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={1} />}>
          <Route path="/member/:user/changePhoto" element={<ChangePhoto />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={2} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={3} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={2} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* 只要是未匹配的路由，都會跑到這裡，對應server端檔案app.js第57行 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;