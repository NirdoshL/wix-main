import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage, Menu, MenuList, RestaurantPage } from "./pages/index";
import { GlobalHeader, GlobalError } from "./pages/Global";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalHeader />}>
      <Route path="/" element={<HomePage />} />
      <Route path="restaurants" element={<RestaurantPage />} />
      <Route path="menus" element={<Menu />} />
      <Route path="menus/:name/:id" element={<MenuList />} />
      <Route path="*" element={<GlobalError />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
