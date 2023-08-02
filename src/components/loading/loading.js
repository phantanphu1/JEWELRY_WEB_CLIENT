import React from "react";
import { Alert, Space, Spin } from "antd";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: 240,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin />
    </div>
  );
}

export default React.memo(Loading);
