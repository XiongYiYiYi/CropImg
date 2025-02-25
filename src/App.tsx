import React, { useState, useEffect } from "react";
import "./App.css";
import { ErrorBoundary } from "@sentry/react";

function App() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 组件卸载时清理 URL 对象
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
    };
  }, [croppedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.includes("gif")) {
        setError("请选择 GIF 格式的文件！");
        return;
      }
      setError(null);
      // 清理之前的 URL 对象
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
      setCroppedImage(URL.createObjectURL(file));
    }
  };

  const clear = () => {
    if (croppedImage) {
      URL.revokeObjectURL(croppedImage);
      setCroppedImage(null);
    }
    setError(null);
  };

  return (
    <ErrorBoundary fallback={<div>发生错误了！请刷新页面重试。</div>}>
      <div className="App">
        <header className="App-header">
          <h1>在线GIF裁剪工具</h1>
        </header>
        <main>
          <input
            type="file"
            accept=".gif"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button onClick={() => document.querySelector("input")?.click()}>
            选择GIF
          </button>
          {error && <div className="error-message">{error}</div>}
          {croppedImage && (
            <div>
              <img src={croppedImage} alt="裁剪后的GIF" />
              <button onClick={clear}>清除</button>
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
