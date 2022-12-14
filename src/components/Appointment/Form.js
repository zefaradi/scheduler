import React, {useState} from "react";
import Button from "components/Button";


import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  // State
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState('');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const { interviewers, onSave, onCancel} = props;

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }

  const cancel = () => {
    onCancel();
    reset();
  }

  // Form validation
  const validate = () => {
    if (!student) return setError('Student name cannot be blank.');

    if (!interviewer) return setError('Please select an interviewer.');
  
    setError("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}