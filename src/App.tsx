import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import { Containers } from "./pages/Containers";

export function App() {
  const [dark, setDark] = useState(false);

  return (
    <ConfigProvider
      theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
    >
      {/* вынести в хедер и допилить смену темы */}
      <div className="flex w-full justify-between p-3">
        TEST
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
      <Containers />
    </ConfigProvider>
  );
}
