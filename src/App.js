import "./App.css";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Homepage />} index />
      <Route path="/chats" element={<Chatpage />} index />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
