import "./EventInput.css";

const EventInput = ({ formField, touched, errors, field }) => {
  return (
    <div className="form-field--center">
      <label>{formField.label}</label>
      <input
        {...field}
        className={`${touched[field.name] && errors[field.name] && "error"}`}
        type={formField.type}
        min={formField.min}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default EventInput;
