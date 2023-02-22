import "./App.css";
import { Banner } from "./components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import {
  createBrowserRouter,
  Route,
  useNavigate,
  RouterProvider,
} from "react-router-dom";
//import { Router } from "react-bootstrap-icons";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

// const router = createBrowserRouter([
//   {
//     path: "/Login",
//     element: <Login />,
//   },
// ]);

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <Banner />

//       <Skills />
//       <Projects />
//       <Contact />
//       <Footer />

//       <RouterProvider router={router} />
//     </div>
//   );
// }
export default App;
