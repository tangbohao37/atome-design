import {
  IconArrowFall,
  IconCalendar,
  IconExport,
  IconFile,
  IconFolder,
  IconGift,
  IconLeft,
  IconPoweroff,
  IconScan,
  IconToTop,
} from "@arco-design/web-react/icon";
import { Message } from "@arco-design/web-react";
import "@/components/icon/eg/index.css";

const Demo = () => {
  const msg = (str) => {
    Message.info(`click ${str} !`);
  };

  return (
    <div className="wrapper">
      <div
        onClick={() => {
          msg("IconCalendar");
        }}
        className="item"
      >
        <p>IconCalendar</p>
        <IconCalendar className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconArrowFall");
        }}
        className="item"
      >
        <p>IconArrowFall</p>
        <IconArrowFall className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconLeft");
        }}
        className="item"
      >
        <p>IconLeft</p>
        <IconLeft className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconFolder");
        }}
        className="item"
      >
        <p>IconFolder</p>
        <IconFolder className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconGift");
        }}
        className="item"
      >
        <p>IconGift</p>
        <IconGift className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconExport");
        }}
        className="item"
      >
        <p>IconExport</p>
        <IconExport className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconFile");
        }}
        className="item"
      >
        <p>IconFile</p>
        <IconFile className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconScan");
        }}
        className="item"
      >
        <p>IconScan</p>
        <IconScan className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconPoweroff");
        }}
        className="item"
      >
        <p>IconPoweroff</p>
        <IconPoweroff className="icon" />
      </div>
      <div
        onClick={() => {
          msg("IconToTop");
        }}
        className="item"
      >
        <p>IconToTop</p>
        <IconToTop className="icon" />
      </div>
    </div>
  );
};

render(<Demo />);
