import React from "react";
import classNames from "classnames";

import "components/Button.scss";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default function Button(props) {

  // let buttonClass = "button";

  const buttonClass = classNames("button",{" button--confirm":props.confirm}, {" button--danger":props.danger})

  return (
    <button 
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      >
      {props.children}
    </button>
  );
}
