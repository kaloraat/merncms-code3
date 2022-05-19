import React from "react";
import UploadFile from "./UploadFile";
import MediaLibrary from "./MediaLibrary";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Media = ({ page }) => {
  return (
    <Tabs>
      <TabPane tab="Upload File" key="1">
        <UploadFile />
      </TabPane>
      <TabPane tab="Media Library" key="2">
        <MediaLibrary />
      </TabPane>
    </Tabs>
  );
};

export default Media;
