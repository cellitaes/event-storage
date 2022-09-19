import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Button from "../shared/components/FormElements/Button";
import Card from "../shared/components/UIElements/Card";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import EventInput from "../shared/components/FormElements/EventInput";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../shared/hooks/httpHook";
import { URL } from "../shared/config/urls";
import "./EventForm.css";
import Modal from "../shared/components/UIElements/Modal";

const minDate = new Date()
  .toLocaleDateString("pl", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
  .split(/[./-]/)
  .reverse()
  .join("-");

const EventSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Please enter a name with at least 2 characters.")
    .required("Please enter name."),
  lastName: Yup.string()
    .min(2, "Please enter a name with at least 2 characters.")
    .required("Please enter last name."),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email."),
  eventDate: Yup.date()
    .min(minDate, "Please enter event date that is not from past.")
    .required("Plese pick date"),
});

const formFields = [
  {
    name: "firstName",
    label: "First Name:",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name:",
    type: "text",
  },
  {
    name: "email",
    label: "Emial:",
    type: "text",
  },
  {
    name: "eventDate",
    label: "Event date:",
    type: "date",
    min: minDate,
  },
];

const hasValue = (value) => value !== "";

export const EventForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);

  const handleEventFormSubmit = async (formValues, actions) => {
    const apiURL = `${URL}/api/event/addEvent`;
    const resData = await sendRequest(
      apiURL,
      "POST",
      JSON.stringify(formValues),
      {
        "Content-Type": "application/json",
      }
    );
    if (resData.msg === "OK") {
      setShowModal(true);
      actions.setSubmitting(false);
      actions.resetForm({
        values: initFormState,
      });
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const initFormState = {
    firstName: "",
    lastName: "",
    email: "",
    eventDate: "",
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {showModal && (
        <Modal
          onCancel={hideModal}
          header="Event successfully added!"
          show={showModal}
          footer={<Button onClick={hideModal}>Okay</Button>}
        >
          <p>Your event has been successfully added!</p>
        </Modal>
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <Card className={"eventForm"}>
        <h1>Create Event</h1>
        <Formik
          initialValues={initFormState}
          validationSchema={EventSchema}
          onSubmit={(values, actions) => {
            handleEventFormSubmit(values, actions);
          }}
        >
          {(props) => {
            const everyItemHasValue = Object.values(props.values).every(
              hasValue
            );
            return (
              <Form>
                {formFields.map((formField) => (
                  <Field key={formField.name} name={formField.name}>
                    {({ field, form: { touched, errors } }) => (
                      <EventInput
                        formField={formField}
                        touched={touched}
                        errors={errors}
                        field={field}
                      />
                    )}
                  </Field>
                ))}
                <div className="eventForm__button--spacing">
                  <Button
                    disabled={!everyItemHasValue || !props.isValid}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};
