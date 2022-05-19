import { useContext } from "react";
import { AuthContext } from "../context/auth";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>

      <br />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
}

export default Home;
