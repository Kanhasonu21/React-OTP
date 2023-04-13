import React, { useEffect, useMemo, useRef } from "react";
import { RE_DIGIT } from "../utils/validateNumber";

const OTPInput = ({ otpSize = 6, onChange, value = "" }) => {
  const firstInputEle = useRef();

  useEffect((_) => {
    //auto focus for first index
    if (firstInputEle.current) firstInputEle.current.focus();
  }, []);

  const InputValue = useMemo(() => {
    const inputArray = value.split("");
    const item = [];
    for (let i = 0; i < otpSize; i++) {
      const char = inputArray[i];
      if (RE_DIGIT.test(char)) {
        item.push(char);
      } else {
        item.push("");
      }
    }
    return item;
  }, [value, otpSize]);

  const onInputChange = ({ e, idx }) => {
    const target = e.target;
    let inputValue = target.value.trim();

    //get next element
    const nextInputEl = target.nextElementSibling || null;

    //get previous element
    const prevInputSibling = target.previousElementSibling || null;
    if (prevInputSibling && prevInputSibling.value === "")
      return prevInputSibling.focus();

    target.setSelectionRange(0, target.value.length);

    const isTargetValueDigit = RE_DIGIT.test(inputValue);
    if (!isTargetValueDigit && nextInputEl && inputValue !== "") return;

    inputValue = isTargetValueDigit ? inputValue : " ";
    // if user enters manually
    if (inputValue.length === 1) {
      const newInputValue =
        value.substring(0, idx) + inputValue + value.substring(idx + 1);
      onChange(newInputValue);
      if (!isTargetValueDigit) return;
      const nextInputSibling = target.nextElementSibling || null;
      if (nextInputSibling) nextInputSibling.focus();
    }
    // if user tries to copy paste otp
    else if (inputValue.length === otpSize) {
      onChange(inputValue);
    }
  };

  const onInputKeyDown = (e) => {
    const target = e.target;
    let inputValue = target.value;
    target.setSelectionRange(0, inputValue.length);
    if (e.key !== "Backspace" || inputValue !== "") return;
    const prevInputSibling = target.previousElementSibling || null;
    if (prevInputSibling) prevInputSibling.focus();
  };

  const inputOnFocus = (e) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="otp-group">
      {InputValue.map((item, idx) => (
        <input
          ref={idx === 0 ? firstInputEle : null}
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={6}
          className="otp-input"
          value={item}
          onChange={(e) => onInputChange({ e, idx })}
          onKeyDown={onInputKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

OTPInput.defaultProps = {
  otpSize: 6,
  onChange: () => {},
  value: "",
};

export default OTPInput;
