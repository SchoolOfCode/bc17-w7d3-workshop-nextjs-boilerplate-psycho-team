"use client";

import { useReducer } from "react";

import styles from "./styles.module.css";

const initialState = {
  data: {
    fullName: "",
    postcode: "",
    House: "",
  },
  status: "editing",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };
    case "ERROR":
      return {
        ...state,
        status: "There was an error because you didn't fill in all the fields.",
      };
    case "FORM_SUBMITTING":
      return {
        ...state,
        status: "Submitting, just wait a sec :)",
      };
    case "FORM_SUCCESS":
      return {
        ...state,
        status: `Well done, your request has been accepted, and you'll be contacted within 24 hours for an assistant to visit your home.`
      };
    default:
      return state;
  }
}

export default function ContactFormOne() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  function handleChange(event) {
    dispatch({
      type: "CHANGE_FIELD",
      payload: {
        fieldName: event.target.name,
        fieldValue: event.target.value,
      },
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({
      type: "FORM_SUBMITTING",
    });

    setTimeout(() => {
      // if - any field is empty error ✅

      // if phone number is not a number error

      // if email is not an email error

      if (!state.data.fullName || !state.data.postcode) {
        dispatch({
          type: "ERROR",
        });
        return;
      }

      // if (/*not a number phoneNumber is a number not a string */) {
      //     dispatch({
      //         type: "ERROR"
      //     });
      //     return;
      // }

      // if (/*not a postcode*/) {
      //     dispatch({
      //         type: "ERROR",
      //     });
      //     return;
      // }

      dispatch({
        type: "FORM_SUCCESS",
      });

      console.log("Data!!!!!!");
    }, 5000);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>Personal Info:</legend>

        <label className={styles.inputGroup}>
          Full Name:
          <input
            type="text"
            name="fullName"
            onChange={(event) => handleChange(event)}
            value={state.data.fullName}
            className={styles.input}
          />
        </label>

        <label className={styles.inputGroup}>
          Postcode:
          <input
            type="text"
            name="postcode"
            onChange={(event) => handleChange(event)}
            value={state.data.postcode}
            className={styles.input}
          />
        </label>
        <label className={styles.inputGroup}>
          House/flat number and Street Name:
          <input
            type="text"
            name="House"
            onChange={(event) => handleChange(event)}
            value={state.data.House}
            className={styles.input}
          />
        </label>
        <label className={styles.inputGroup}>
          City:
          <input
            type="text"
            name="City"
            onChange={(event) => handleChange(event)}
            value={state.data.City}
            className={styles.input}
          />
        </label>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupTitle}>Contact Info:</legend>

        <label className={styles.inputGroup}>
          Phone number:
          <input
            type="number"
            name="PhoneNumber"
            onChange={(event) => handleChange(event)}
            value={state.data.PhoneNumber}
            className={styles.input}
          />
        </label>

        <label className={styles.inputGroup}>
          Email:
          <input
            type="email"
            name="Email"
            onChange={(event) => handleChange(event)}
            value={state.data.Email}
            className={styles.input}
          />
        </label>

      </fieldset>

      {state.status === "error" && <p className={styles.error}>Error</p>}

      <button type="submit" className={styles.button}>
        Request Design Consultation
      </button>

      <div className={styles.statusDisplay}>
  {state.status}
</div>
    </form>
  );
}
