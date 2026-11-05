import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff,
  GraduationCap, Mail, ShieldCheck
} from 'lucide-react'
import './free-trial.css'

type Step = 'school' | 'otp' | 'password' | 'success'

type SchoolDetails = {
  schoolName: string
  phone: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

function generateSchoolId() {
  return `SSOS/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`
}

export default function FreeTrial({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('school')
  const [school, setSchool] = useState<SchoolDetails>({
    schoolName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [schoolId, setSchoolId] = useState('')
  const [error, setError] = useState('')
  const [otpNotice, setOtpNotice] = useState('')

  const updateSchool = (field: keyof SchoolDetails, value: string) => {
    setSchool(previous => ({ ...previous, [field]: value }))
    setError('')
  }

  const validSchool = () => {
    if (
      !school.schoolName.trim() ||
      !school.phone.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(school.email) ||
      !school.address1.trim() ||
      !school.city.trim() ||
      !school.state.trim() ||
      !/^\d{6}$/.test(school.pincode)
    ) {
      setError('Complete all required fields and enter a valid email and 6-digit pincode.')
      return false
    }

    if (!/^[+()\d\s-]{8,18}$/.test(school.phone)) {
      setError('Enter a valid mobile number.')
      return false
    }

    return true
  }

  const passwordChecks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /\d/.test(password) },
    { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
  ]

  const strength = passwordChecks.filter(item => item.valid).length
  const strongPassword = strength === passwordChecks.length

  const createAccount = () => {
    if (!strongPassword) {
      setError('Please meet all password requirements.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const now = new Date()
    const expires = new Date(now)
    expires.setDate(expires.getDate() + 7)

    const id = generateSchoolId()
    const session = {
      schoolId: id,
      schoolName: school.schoolName.trim(),
      email: school.email.trim(),
      phone: school.phone.trim(),
      address: {
        line1: school.address1.trim(),
        line2: school.address2.trim(),
        city: school.city.trim(),
        state: school.state.trim(),
        pincode: school.pincode.trim(),
      },
      startedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: 'active',
      trialDays: 7,
      frontendPrototype: true,
    }

    // Prototype workspace data only. No password is stored.
    localStorage.setItem('ssos_trial_session', JSON.stringify(session))
    setSchoolId(id)
    setError('')
    setStep('success')
  }

  const continueToOtp = () => {
    if (!validSchool()) return
    setOtp('')
    setOtpNotice(
      'Frontend preview: email delivery is not connected yet. Backend OTP verification will be added later.'
    )
    setStep('otp')
  }

  const verifyOtpPreview = () => {
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter a 6-digit OTP to continue.')
      return
    }

    // UI-only preview: this does NOT verify an actual email.
    setError('')
    setStep('password')
  }

  const goToTrial = () => {
    window.location.href = '/trial-app'
  }

  const steps = [
    { id: 'school', label: 'School details' },
    { id: 'otp', label: 'Email verification' },
    { id: 'password', label: 'Secure account' },
  ]

  const activeIndex = step === 'school' ? 0 : step === 'otp' ? 1 : 2

  return (
    <main className="free-trial-page">
      <header className="free-trial-header">
        <button className="trial-brand" onClick={onBack} type="button">
          <span><GraduationCap size={23} /></span>
          <strong>Smart School OS</strong>
        </button>
        <div className="trial-header-badge">
          <ShieldCheck size={16} /> 7-Day Free Trial
        </div>
      </header>

      <section className="free-trial-shell">
        {step !== 'success' && (
          <>
            <div className="trial-progress">
              {steps.map((item, index) => (
                <div className="trial-progress-item" key={item.id}>
                  <div
                    className={
                      index < activeIndex
                        ? 'trial-step-number done'
                        : index === activeIndex
                          ? 'trial-step-number active'
                          : 'trial-step-number'
                    }
                  >
                    {index < activeIndex ? <CheckCircle2 size={17} /> : index + 1}
                  </div>
                  <span className={index === activeIndex ? 'current' : ''}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="trial-card">
              {step === 'school' && (
                <>
                  <div className="trial-eyebrow">START YOUR FREE TRIAL</div>
                  <h1>Create your school account.</h1>
                  <p className="trial-subtitle">
                    Tell us about your school to set up your own SSOS trial workspace.
                  </p>

                  <form onSubmit={event => {
                    event.preventDefault()
                    continueToOtp()
                  }}>
                    <div className="trial-form-grid">
                      <div className="full">
                        <label htmlFor="schoolName">School name *</label>
                        <input
                          id="schoolName"
                          autoComplete="organization"
                          value={school.schoolName}
                          onChange={event => updateSchool('schoolName', event.target.value)}
                          placeholder="Enter your school's name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="schoolPhone">School mobile number *</label>
                        <input
                          id="schoolPhone"
                          type="tel"
                          autoComplete="tel"
                          value={school.phone}
                          onChange={event => updateSchool('phone', event.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="schoolEmail">School email address *</label>
                        <input
                          id="schoolEmail"
                          type="email"
                          autoComplete="email"
                          value={school.email}
                          onChange={event => updateSchool('email', event.target.value)}
                          placeholder="admin@school.com"
                          required
                        />
                      </div>

                      <div className="full">
                        <label htmlFor="address1">Address line 1 *</label>
                        <input
                          id="address1"
                          autoComplete="address-line1"
                          value={school.address1}
                          onChange={event => updateSchool('address1', event.target.value)}
                          placeholder="Building, street or area"
                          required
                        />
                      </div>

                      <div className="full">
                        <label htmlFor="address2">Address line 2 <span className="optional">(optional)</span></label>
                        <input
                          id="address2"
                          autoComplete="address-line2"
                          value={school.address2}
                          onChange={event => updateSchool('address2', event.target.value)}
                          placeholder="Landmark or additional address"
                        />
                      </div>

                      <div>
                        <label htmlFor="city">Town / City *</label>
                        <input
                          id="city"
                          autoComplete="address-level2"
                          value={school.city}
                          onChange={event => updateSchool('city', event.target.value)}
                          placeholder="Enter town or city"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="state">State *</label>
                        <select
                          id="state"
                          autoComplete="address-level1"
                          value={school.state}
                          onChange={event => updateSchool('state', event.target.value)}
                          required
                        >
                          <option value="">Select state</option>
                          {[
                            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
                            'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
                            'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
                            'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
                            'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
                            'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
                            'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
                            'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
                            'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
                          ].map(state => <option key={state} value={state}>{state}</option>)}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="pincode">Pincode *</label>
                        <input
                          id="pincode"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={6}
                          value={school.pincode}
                          onChange={event => updateSchool(
                            'pincode',
                            event.target.value.replace(/\D/g, '').slice(0, 6)
                          )}
                          placeholder="6-digit pincode"
                          required
                        />
                      </div>
                    </div>

                    {error && <p className="trial-error" role="alert">{error}</p>}

                    <button className="trial-primary" type="submit">
                      Continue to Email Verification <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              )}

              {step === 'otp' && (
                <>
                  <div className="trial-step-icon"><Mail size={26} /></div>
                  <div className="trial-eyebrow">EMAIL VERIFICATION</div>
                  <h1>Verify your school email.</h1>
                  <p className="trial-subtitle">
                    Verification is the next step for <strong>{school.email}</strong>.
                  </p>

                  <div className="trial-prototype-notice">
                    {otpNotice}
                  </div>

                  <form onSubmit={event => {
                    event.preventDefault()
                    verifyOtpPreview()
                  }}>
                    <label htmlFor="otp">6-digit verification code</label>
                    <input
                      id="otp"
                      className="trial-otp-input"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={otp}
                      onChange={event => {
                        setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))
                        setError('')
                      }}
                      placeholder="000000"
                      required
                    />

                    {error && <p className="trial-error" role="alert">{error}</p>}

                    <button className="trial-primary" type="submit">
                      Continue <ArrowRight size={18} />
                    </button>
                  </form>

                  <button className="trial-back" type="button" onClick={() => {
                    setError('')
                    setStep('school')
                  }}>
                    <ArrowLeft size={16} /> Edit school details
                  </button>
                </>
              )}

              {step === 'password' && (
                <>
                  <div className="trial-step-icon"><ShieldCheck size={26} /></div>
                  <div className="trial-eyebrow">SECURE YOUR ACCOUNT</div>
                  <h1>Create a strong password.</h1>
                  <p className="trial-subtitle">
                    Choose a password to protect your school account.
                  </p>

                  <form onSubmit={event => {
                    event.preventDefault()
                    createAccount()
                  }}>
                    <label htmlFor="password">Password *</label>
                    <div className="trial-password-wrap">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={password}
                        onChange={event => {
                          setPassword(event.target.value)
                          setError('')
                        }}
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        className="trial-eye-button"
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword(value => !value)}
                      >
                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>

                    <div className="trial-strength" aria-live="polite">
                      <div className="trial-strength-bars">
                        {[1, 2, 3, 4, 5].map(level => (
                          <span
                            key={level}
                            className={level <= strength ? `filled strength-${strength}` : ''}
                          />
                        ))}
                      </div>
                      <span>
                        {password.length === 0 ? 'Password strength' :
                          strength <= 2 ? 'Weak' :
                            strength <= 4 ? 'Almost there' : 'Strong password'}
                      </span>
                    </div>

                    <div className="trial-password-checks">
                      {passwordChecks.map(item => (
                        <div key={item.label} className={item.valid ? 'valid' : ''}>
                          <CheckCircle2 size={15} /> {item.label}
                        </div>
                      ))}
                    </div>

                    <label htmlFor="confirmPassword">Confirm password *</label>
                    <div className="trial-password-wrap">
                      <input
                        id="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={event => {
                          setConfirmPassword(event.target.value)
                          setError('')
                        }}
                        placeholder="Enter password again"
                        required
                      />
                      <button
                        className="trial-eye-button"
                        type="button"
                        aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'}
                        onClick={() => setShowConfirm(value => !value)}
                      >
                        {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>

                    <label className="trial-remember">
                      <input
                        type="checkbox"
                        checked={rememberPassword}
                        onChange={event => setRememberPassword(event.target.checked)}
                      />
                      <span>Remember password on this device (optional)</span>
                    </label>
                    <p className="trial-note">
                      Prototype only: this preference is not saved, and your password is never stored in browser storage.
                    </p>

                    {error && <p className="trial-error" role="alert">{error}</p>}

                    <button className="trial-primary" type="submit">
                      Create Account <ArrowRight size={18} />
                    </button>
                  </form>

                  <button className="trial-back" type="button" onClick={() => {
                    setError('')
                    setStep('otp')
                  }}>
                    <ArrowLeft size={16} /> Back to email verification
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="trial-card trial-success-card">
            <div className="success-icon"><CheckCircle2 size={38} /></div>
            <div className="trial-eyebrow">ACCOUNT CREATED</div>
            <h1>Welcome to Smart School OS.</h1>
            <p className="trial-subtitle">
              Your trial workspace has been prepared in this browser prototype.
            </p>

            <div className="generated-school">
              <span>YOUR SCHOOL ID</span>
              <strong>{schoolId}</strong>
              <span>{school.schoolName}</span>
            </div>

            <div className="trial-benefits">
              <span><CheckCircle2 size={16} /> Separate trial workspace record</span>
              <span><CheckCircle2 size={16} /> 7-day trial countdown starts now</span>
              <span><CheckCircle2 size={16} /> School contact details saved for this prototype</span>
            </div>

            <div className="trial-prototype-notice">
              Frontend prototype: no real user account or email verification has been created yet.
            </div>

            <button className="trial-primary trial-explore" onClick={goToTrial} type="button">
              Start Exploring SSOS <ArrowRight size={18} />
            </button>

            <button className="trial-back" type="button" onClick={onBack}>
              Back to website
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
