import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then (() => transition(SHOW));
  }

  const onDelete = function onDelete() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then (() => transition(EMPTY));
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            interiewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form 
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form 
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SAVING && <Status>Saving...</Status>}
        {mode === CONFIRM && (
          <Confirm
            message="Cancel this appointmnet?"
            onCancel={() => back()}
            onConfirm={onDelete}
          />
        )}
        {mode === DELETING && <Status>Deleting</Status>}
      </article>
    </Fragment>
  );
}
