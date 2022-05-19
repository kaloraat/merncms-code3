import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoadingToRedirect = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      router.push(path);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Redirecting in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
