
import { BrowserRouter as Router} from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { UserContext } from "./utils/userContext";
import { useEffect, useState } from "react";
import { hotjar } from "react-hotjar";

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
      <Router>
        <CustomRoutes />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
