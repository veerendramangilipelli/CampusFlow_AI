import { cloneElement } from 'react';

// Wraps one input/select/textarea with label, hint and error. Pass the control as children.
export default function Field({ label, id, error, hint, children }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, {
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
        className: `${children.props.className || ''} ${error ? 'error' : ''}`.trim(),
      })}
      {error && <p className="field-error" id={`${id}-error`} role="alert">{error}</p>}
      {!error && hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
    </div>
  );
}
