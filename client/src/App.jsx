
import { BrowserRouter as Router} from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { UserContext } from "./utils/userContext";
import { useEffect, useState } from "react";
import { hotjar } from "react-hotjar";
import { Provider } from "react-redux";
// import store from "./redux/store/store";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    hotjar.initialize(
      process.env.REACT_APP_HOTJAR_SITEID,
      process.env.REACT_APP_HOTJAR_VERSION
    );
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {/* <Provider store={store}> */}
      <Router>
        <CustomRoutes />
      </Router>
      {/* </Provider> */}
    </UserContext.Provider>
  );
};

export default App;
