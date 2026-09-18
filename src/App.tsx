import { useState } from "react";
import "./index.css";
import SchoolRegistration from "./SchoolRegistration";

const modules = [
  {
    icon: "🎓",
    title: "Academic Management",
    description:
      "Manage academic years, classes, sections, subjects, and teacher assignments from one place.",
  },
  {
    icon: "👨‍🎓",
    title: "Student Management",
    description:
      "Maintain complete student profiles, parents, documents, academic information, and history.",
  },
  {
    icon: "📋",
    title: "Attendance",
    description:
      "Record and monitor student and teacher attendance with clear daily insights.",
  },
  {
    icon: "💳",
    title: "Fee Management",
    description:
      "Configure fee structures, collect payments, generate receipts, and track pending fees.",
  },
  {
    icon: "📝",
    title: "Examination",
    description:
      "Create exams, enter marks, calculate results, and generate student result cards.",
  },
  {
    icon: "🚌",
    title: "Transport",
    description:
      "Manage buses, drivers, routes, stops, and student transport assignments.",
  },
  {
    icon: "📢",
    title: "Communication",
    description:
      "Keep your school community informed with centralized announcements and notifications.",
  },
  {
    icon: "📊",
    title: "Reports & Insights",
    description:
      "Access student, attendance, fee, examination, and operational reports.",
  },
];

const roles = [
  {
    icon: "👨‍💼",
    title: "Administrators",
    text: "Control the complete school operation from a centralized platform.",
  },
  {
    icon: "👩‍🏫",
    title: "Teachers",
    text: "Manage assigned students, attendance, marks, and academic activities.",
  },
  {
    icon: "🧑‍💻",
    title: "Staff",
    text: "Work efficiently with the modules and responsibilities assigned to them.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parents",
    text: "Connect with important student and school information through future parent access.",
  },
];

function App() {
    const [showRegistration, setShowRegistration] = useState(false);

  if (showRegistration) {
    return <SchoolRegistration />;
  }
  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>Smart School</strong>
            <small>OS</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#modules">Modules</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#security">Security</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="nav-actions">
          <button className="login-button">Login</button>
          <button className="primary-button small">Get Started</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="pulse-dot" />
              The modern operating system for schools
            </div>

            <h1>
              Run Your Entire School.
              <span> From One Intelligent Platform.</span>
            </h1>

            <p className="hero-description">
              Smart School OS is a centralized school management platform
              designed to bring academics, people, attendance, fees,
              examinations, transport, communication, and reports together.
            </p>

            <div className="hero-buttons">
              <button className="primary-button">
                Get Started <span>→</span>
              </button>
              <button className="secondary-button">
                Explore Platform <span>↓</span>
              </button>
            </div>

            <div className="hero-note">
              <span>✓</span> Built for modern schools
              <span>✓</span> Centralized management
              <span>✓</span> Secure by design
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-window">
              <div className="window-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>Smart School OS</span>
                <span className="window-status">● Live</span>
              </div>

              <div className="mini-dashboard">
                <aside>
                  <div className="mini-logo">S</div>
                  <div className="mini-nav active">⌂</div>
                  <div className="mini-nav">🎓</div>
                  <div className="mini-nav">👥</div>
                  <div className="mini-nav">📋</div>
                  <div className="mini-nav">💳</div>
                  <div className="mini-nav">📝</div>
                </aside>

                <div className="dashboard-main">
                  <div className="dashboard-heading">
                    <div>
                      <small>MONDAY, JUNE 15, 2026</small>
                      <h3>Good morning, Admin 👋</h3>
                    </div>
                    <div className="admin-avatar">A</div>
                  </div>

                  <div className="stat-grid">
                    <div className="stat-card">
                      <span>Students</span>
                      <strong>1,248</strong>
                      <small>↑ 8.2%</small>
                    </div>
                    <div className="stat-card">
                      <span>Teachers</span>
                      <strong>86</strong>
                      <small>↑ 4.1%</small>
                    </div>
                    <div className="stat-card">
                      <span>Attendance</span>
                      <strong>94.6%</strong>
                      <small>Today</small>
                    </div>
                    <div className="stat-card">
                      <span>Fee Collection</span>
                      <strong>₹4.8L</strong>
                      <small>This month</small>
                    </div>
                  </div>

                  <div className="chart-area">
                    <div className="chart-header">
                      <strong>Student Attendance</strong>
                      <span>Last 7 days</span>
                    </div>
                    <div className="chart">
                      <div className="bar h1" />
                      <div className="bar h2" />
                      <div className="bar h3" />
                      <div className="bar h4" />
                      <div className="bar h5" />
                      <div className="bar h6" />
                      <div className="bar h7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card attendance-card">
              <span className="floating-icon">✓</span>
              <div>
                <strong>94.6%</strong>
                <small>Today's Attendance</small>
              </div>
            </div>

            <div className="floating-card fee-card">
              <span className="floating-icon">₹</span>
              <div>
                <strong>₹4.8L</strong>
                <small>Fee Collection</small>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-large">
            <strong>01</strong>
            <span>Centralized Platform</span>
          </div>
          <div className="stat-large">
            <strong>10+</strong>
            <span>School Modules</span>
          </div>
          <div className="stat-large">
            <strong>06</strong>
            <span>Core User Roles</span>
          </div>
          <div className="stat-large">
            <strong>24/7</strong>
            <span>School Operations</span>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-heading">
            <span className="section-label">EVERYTHING CONNECTED</span>
            <h2>Everything your school needs.</h2>
            <p>
              Replace disconnected tools and manual processes with one
              connected school operating system.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card featured">
              <div className="feature-number">01</div>
              <h3>One School. One System.</h3>
              <p>
                Your entire school lifecycle stays connected — from school
                setup and student admission to attendance, fees, exams,
                communication, and reporting.
              </p>
              <div className="feature-line" />
              <span>Centralized school management →</span>
            </div>

            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Built Around Your School</h3>
              <p>
                Configure your academic years, departments, standards,
                classes, sections, subjects, staff, and operational structure.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Designed for Every Role</h3>
              <p>
                Give administrators, managers, teachers, staff, and cashiers
                the access they need with role-based permissions.
              </p>
            </div>
          </div>
        </section>

        <section id="modules" className="section modules-section">
          <div className="section-heading">
            <span className="section-label">CORE MODULES</span>
            <h2>Your school's entire operation.</h2>
            <p>
              Powerful modules designed to work together as one connected
              platform.
            </p>
          </div>

          <div className="module-grid">
            {modules.map((module) => (
              <article className="module-card" key={module.title}>
                <div className="module-icon">{module.icon}</div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <span className="module-arrow">→</span>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="section lifecycle-section">
          <div className="section-heading">
            <span className="section-label">HOW SSOS WORKS</span>
            <h2>From setup to daily operations.</h2>
            <p>
              A simple connected lifecycle that keeps every part of your
              school organized.
            </p>
          </div>

          <div className="lifecycle">
            {[
              "Register School",
              "Configure School",
              "Manage People",
              "Run Daily Operations",
              "Track Fees & Attendance",
              "Manage Exams & Results",
              "Communicate",
              "Generate Reports",
            ].map((item, index) => (
              <div className="lifecycle-item" key={item}>
                <div className="lifecycle-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span>{item}</span>
                {index < 7 && <b>→</b>}
              </div>
            ))}
          </div>
        </section>

        <section className="roles-section section">
          <div className="roles-copy">
            <span className="section-label">BUILT FOR EVERY ROLE</span>
            <h2>One platform.<br />Different responsibilities.</h2>
            <p>
              SSOS adapts access and functionality based on each user's
              responsibility inside the school.
            </p>
            <button className="secondary-button">
              Explore User Roles →
            </button>
          </div>

          <div className="roles-grid">
            {roles.map((role) => (
              <div className="role-card" key={role.title}>
                <div className="role-icon">{role.icon}</div>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security" className="security-section section">
          <div className="security-content">
            <span className="section-label">SECURITY & PRIVACY</span>
            <h2>Security built into the foundation.</h2>
            <p>
              School data deserves strong protection. SSOS is designed around
              secure authentication, role-based access, tenant isolation,
              protected documents, auditability, and privacy by design.
            </p>

            <div className="security-points">
              <div>
                <span>✓</span>
                <strong>Role-based access control</strong>
              </div>
              <div>
                <span>✓</span>
                <strong>School-level data isolation</strong>
              </div>
              <div>
                <span>✓</span>
                <strong>Audit-ready activity tracking</strong>
              </div>
              <div>
                <span>✓</span>
                <strong>Protected student documents</strong>
              </div>
            </div>
          </div>

          <div className="security-visual">
            <div className="shield">✓</div>
            <div className="security-ring ring-one" />
            <div className="security-ring ring-two" />
            <span className="security-badge badge-one">RBAC</span>
            <span className="security-badge badge-two">TLS</span>
            <span className="security-badge badge-three">AUDIT</span>
          </div>
        </section>

        <section id="pricing" className="pricing-section section">
          <div className="section-heading">
            <span className="section-label">SIMPLE & SCALABLE</span>
            <h2>Built to grow with your school.</h2>
            <p>
              Start with the essentials and expand as your school's needs
              grow.
            </p>
          </div>

          <div className="pricing-card">
            <div>
              <span className="pricing-tag">SSOS PLATFORM</span>
              <h3>Everything in one place.</h3>
              <p>
                School registration, centralized management, academic
                operations, people management, fees, examinations, transport,
                communication, and reporting.
              </p>
            </div>

           <button
  className="primary-button"
  onClick={() => setShowRegistration(true)}
>
  Get Started <span>→</span>
</button>
          </div>
        </section>

        <section className="cta-section">
          <div>
            <span className="section-label">READY TO LEVEL UP YOUR SCHOOL?</span>
            <h2>Bring your entire school together.</h2>
            <p>
              Create your school workspace and start building a smarter,
              centralized school operation.
            </p>
          </div>

          <button className="primary-button large">
            Get Started With SSOS →
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <a href="#" className="brand">
            <span className="brand-mark">S</span>
            <span>
              <strong>Smart School</strong>
              <small>OS</small>
            </span>
          </a>
          <p>
            The intelligent operating system for modern school management.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Platform</strong>
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div>
            <strong>Company</strong>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Support</a>
          </div>
          <div>
            <strong>Access</strong>
            <a href="#">Login</a>
            <a href="#">Register School</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Smart School OS. All rights reserved.</span>
          <span>Built for better schools.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;