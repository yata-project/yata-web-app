import { CreateList } from "../YataClient";
import React, { useState } from "react";

const TITLE_HINT = {
  EMPTY: {
    style: "help",
    text: "Type in a list title between 0 and 100 characters",
  },
  TOO_LONG: {
    style: "help is-danger",
    text: "Title must be less than 100 characters",
  },
  VALID: {
    style: "help is-success",
    text: "Press enter to create the new list",
  },
};

const DEFAULT_FORM_STATE = {
  newListTitle: "",
  hint: TITLE_HINT.EMPTY,
  valid: false,
  error: null,
};

function CreateListForm(props) {
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);

  const handleSubmit = createListFormSubmittedHandler(
    formState,
    setFormState,
    props.onSuccess,
    (err) => {
      setFormState({
        newListTitle: formState.newListTitle,
        hint: formState.hint,
        valid: formState.valid,
        error: err,
      });
    }
  );

  const handleTitleUpdated = createListFormTitleUpdatedHandler(setFormState);

  return (
    <form onSubmit={handleSubmit} data-testid="createListForm">
      <div className="field">
        <label className="label" htmlFor="listTitle">
          Create List
        </label>
        <div className="control">
          <input
            id="listTitle"
            className="input"
            type="text"
            placeholder="List Title"
            value={formState.newListTitle}
            onChange={handleTitleUpdated}
          />
          <p className={formState.hint.style}>{formState.hint.text}</p>
        </div>
      </div>
      {formState.error && (
        <div>
          Error {formState.error.name}: {formState.error.message}
        </div>
      )}
    </form>
  );
}

function createListFormTitleUpdatedHandler(setFormState) {
  return (event) => {
    const newTitle = event.target.value;
    const isTitleValid = newTitle.length > 0 && newTitle.length <= 100;
    let titleHint;
    if (newTitle.length > 100) {
      titleHint = TITLE_HINT.TOO_LONG;
    } else if (newTitle.length === 0) {
      titleHint = TITLE_HINT.EMPTY;
    } else {
      titleHint = TITLE_HINT.VALID;
    }
    setFormState({
      newListTitle: newTitle,
      hint: titleHint,
      valid: isTitleValid,
      error: null,
    });
  };
}

function createListFormSubmittedHandler(
  formState,
  setFormState,
  onSuccess,
  onError
) {
  return (event) => {
    event.preventDefault();
    if (!formState.valid) {
      return;
    }
    CreateList(formState.newListTitle)
      .then((data) => {
        clearForm(setFormState);
        onSuccess(data.ListID, formState.newListTitle);
      })
      .catch((error) => {
        console.log("Could not create list ", error);
        onError(error);
      });
  };
}

function clearForm(setFormState) {
  setFormState(DEFAULT_FORM_STATE);
}

export default CreateListForm;
