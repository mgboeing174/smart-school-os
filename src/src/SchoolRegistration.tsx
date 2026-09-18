import { useState } from "react";

type SchoolForm = {
  schoolName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  board: string;
  website: string;
  academicYear: string;
  yearsOfOperation: string;
};

const initialForm: SchoolForm = {
  schoolName: "",
  phone: "",
  email: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  board: "",
  website: "",
  academicYear: "2026–2027",
  yearsOfOperation: "",
};

function SchoolRegistration() {
  const [form, setForm] = useState<SchoolForm>(initialForm);
  const [logoName, setLogoName] = useState("");

  const updateField = (field: keyof SchoolForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("School registration:", {
      ...form,
      logoName,
    });

    alert("School information saved. Structure setup will be added next.");
  };

  return (
    <div className="registration-page">
      <header className="registration-header">
        <a href="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>Smart School</strong>
            <small>OS</small>
          </span>
        </a>

        <div className="registration-help">
          Already have an account?
          <button type="button">Login</button>
        </div>
      </header>

      <main className="registration-container">
        <div className="registration-progress">
          <div className="progress-step active">
            <span>1</span>
            <div>
              <strong>School Information</strong>
              <small>Basic details</small>
            </div>
          </div>

          <div className="progress-line" />

          <div className="progress-step">
            <span>2</span>
            <div>
              <strong>School Structure</strong>
              <small>Academic setup</small>
            </div>
          </div>

          <div className="progress-line" />

          <div className="progress-step">
            <span>3</span>
            <div>
              <strong>Complete Setup</strong>
              <small>Create workspace</small>
            </div>
          </div>
        </div>

        <section className="registration-card">
          <div className="registration-title">
            <span className="section-label">STEP 01 OF 03</span>
            <h1>Tell us about your school.</h1>
            <p>
              Enter your school's basic information. You can configure the
              academic structure in the next step.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-section-title">
                <div>
                  <h2>School Information</h2>
                  <p>Basic information used to create your school workspace.</p>
                </div>
              </div>

              <div className="logo-upload-row">
                <div className="logo-placeholder">
                  {logoName ? "✓" : "S"}
                </div>

                <div>
                  <strong>School Logo</strong>
                  <p>PNG, JPG or WEBP · Recommended 500 × 500px</p>

                  <label className="upload-button">
                    {logoName ? "Change Logo" : "Upload Logo"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) setLogoName(file.name);
                      }}
                    />
                  </label>

                  {logoName && (
                    <small className="selected-file">{logoName}</small>
                  )}
                </div>
              </div>

              <div className="form-grid">
                <label className="field full">
                  <span>School Name *</span>
                  <input
                    required
                    value={form.schoolName}
                    onChange={(event) =>
                      updateField("schoolName", event.target.value)
                    }
                    placeholder="Enter school name"
                  />
                </label>

                <label className="field">
                  <span>Phone Number *</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </label>

                <label className="field">
                  <span>Email Address *</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="school@example.com"
                  />
                </label>

                <label className="field full">
                  <span>School Address *</span>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    placeholder="Enter complete school address"
                  />
                </label>

                <label className="field">
                  <span>State *</span>
                  <input
                    required
                    value={form.state}
                    onChange={(event) =>
                      updateField("state", event.target.value)
                    }
                    placeholder="Enter state"
                  />
                </label>

                <label className="field">
                  <span>District *</span>
                  <input
                    required
                    value={form.district}
                    onChange={(event) =>
                      updateField("district", event.target.value)
                    }
                    placeholder="Enter district"
                  />
                </label>

                <label className="field">
                  <span>Pincode *</span>
                  <input
                    required
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(event) =>
                      updateField("pincode", event.target.value)
                    }
                    placeholder="600000"
                  />
                </label>

                <label className="field">
                  <span>Board *</span>
                  <select
                    required
                    value={form.board}
                    onChange={(event) =>
                      updateField("board", event.target.value)
                    }
                  >
                    <option value="">Select board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="Matriculation">Matriculation</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="field">
                  <span>School Website</span>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(event) =>
                      updateField("website", event.target.value)
                    }
                    placeholder="https://school.com"
                  />
                </label>

                <label className="field">
                  <span>Current Academic Year *</span>
                  <select
                    required
                    value={form.academicYear}
                    onChange={(event) =>
                      updateField("academicYear", event.target.value)
                    }
                  >
                    <option>2026–2027</option>
                    <option>2027–2028</option>
                    <option>2028–2029</option>
                  </select>
                </label>

                <label className="field">
                  <span>Years of School Operation *</span>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.yearsOfOperation}
                    onChange={(event) =>
                      updateField("yearsOfOperation", event.target.value)
                    }
                    placeholder="Example: 15"
                  />
                </label>
              </div>
            </div>

            <div className="registration-footer">
              <button type="button" className="back-button">
                ← Back to Website
              </button>

              <button type="submit" className="primary-button">
                Continue to Structure →
              </button>
            </div>
          </form>
        </section>

        <p className="registration-security">
          🔒 Your school information is protected and used only for creating
          your SSOS school workspace.
        </p>
      </main>
    </div>
  );
}

export default SchoolRegistration;