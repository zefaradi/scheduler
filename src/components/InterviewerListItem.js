import React from "react";
import { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const listItemClasses = classNames("interviewers_item",{"interviewers_item--selected":props.selected})

return (
  <li key={props.id} className={listItemClasses} onClick={props.setInterview}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
    {props.selected && props.name}
  </li>
)  
}