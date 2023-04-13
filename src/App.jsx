import { useState } from "react";
import OTPInput from "./components/OTPInput";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const onChange = (value) => setOtp(value);
  const onSubmit = ()=>{
    if(otp.length === 6) setShowOTP(true)
  }

  return (
    <div className="app">
      <div className="container">
        <ErrorBoundary>
          <div className="otp-text"> Enter OTP : </div>
          <OTPInput otpSize={6} onChange={onChange} value={otp} />
        </ErrorBoundary>
        <button class="button" role="button" onClick={onSubmit}>
          Verify
        </button>
        {showOTP && <div>
          <span>OTP is: {otp}</span>
        </div>}
      </div>
    </div>
  );
}

export default App;
