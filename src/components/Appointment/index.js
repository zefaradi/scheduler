import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';

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
      .then (() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const onDelete = function onDelete() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then (() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
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
          onCancel={() => back()}
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
        {mode === ERROR_DELETE && (
          <Error message = "Could not delete appointment" onClose={() => back()}/>
        )}
        {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={() => back()} />
      )}
      </article>
    </Fragment>
  );
}
