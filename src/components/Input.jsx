import { forwardRef } from "react";

import PropTypes from "prop-types";

const Input = forwardRef((props, ref) => {
  const handleOnBlur = (event) => {
    const { value } = event.target;
    const { onBlur, name } = props;
    onBlur && onBlur({ value, name, event });
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const { onChange, name } = props;
    onChange && onChange({ value, name, event });
  };

  const handleFocus = (event) => {
    const { name, onFocus, value } = props;

    // To fix the issue with cursor at beginning
    if (value) {
      event.target.value = "";
      event.target.value = value;
    }

    onFocus && onFocus({ event, name, value });
  };

  const handleKeyDown = (event) => {
    const { name, onKeyDown } = props;
    const { value } = event.target;
    onKeyDown && onKeyDown({ value, name, event });
  };

  const {
    className,
    type,
    label,
    placeholder,
    readOnly,
    maxLength,
    autoFocus,
    value,
    id,
    helperText,
  } = props;

  let _props = {
    autoFocus,
    placeholder,
    value,
    readOnly,
    maxLength,
    className,
    onChange: handleOnChange,
    onFocus: handleFocus,
    onBlur: handleOnBlur,
    onKeyDown: handleKeyDown,
  };

  return (
    <div className="form-control">
      {label ? (
        <span className="flex items-center gap-2">
          <label
            htmlFor={id}
            className="form-label inline-block mb-1 text-gray-700"
          >
            {label}
          </label>
          {helperText && helperText.length ? (
            <span className="text-xs">{helperText}</span>
          ) : null}
        </span>
      ) : null}
      <input
        {..._props}
        type={type}
        id={id}
        ref={ref}
        className={`
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 
          focus:bg-white focus:border-blue-600 
          focus:outline-none
          ${className}
        `}
      />
    </div>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "date",
    "email",
    "tel",
    "url",
    "search",
    "datetime-local",
  ]).isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  /* Value */
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

Input.defaultProps = {
  className: "",
  inputClassName: "",
  labelClassName: "",
  type: "text",
  label: "",
  placeholder: "",
  readOnly: false,
};

export { Input };
