
import { BrowserRouter as Router} from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { UserContext } from "./utils/userContext";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <CustomRoutes />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
