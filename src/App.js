import Layout from "./components/Layout";
import { Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import SensorList from "./components/SensorList";
import Performance from "./components/Performance";
import NotFound from "./components/NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<SensorList />} />
          <Route path="performance" element={<Performance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
