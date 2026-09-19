import { useState } from "react";
import {
  ArrowRight, Check, ChevronDown, Menu, X, ShieldCheck, Users,
  GraduationCap, BarChart3, BookOpen, Bus, CreditCard, Bell,
  ClipboardCheck, Building2, Sparkles, CheckCircle2, LogIn
} from "lucide-react";
import "./App.css";

type Page = "home" | "pricing" | "details" | "payment" | "signup" | "register" | "login";

const plans = {
  Starter: {
    price: "₹1,999",
    period: "/month",
    description: "For small schools getting started with centralized management.",
    features: [
      "Up to 300 students",
      "Student & parent management",
      "Teacher management",
      "Attendance management",
      "Basic fee collection",
      "Basic reports",
      "Role-based access",
      "Email support"
    ]
  },
  Professional: {
    price: "₹4,999",
    period: "/month",
    description: "For growing schools that need complete daily operations.",
    features: [
      "Up to 1,000 students",
      "Everything in Starter",
      "Exams & marks",
      "Results & report cards",
      "Transport management",
      "Announcements",
      "Advanced reports",
      "Receipt management",
      "Priority support"
    ]
  },
  Enterprise: {
    price: "Custom",
    period: "",
    description: "For large institutions and multi-school organizations.",
    features: [
      "Unlimited students",
      "Everything in Professional",
      "Multi-school management",
      "Advanced administration",
      "Custom integrations",
      "Dedicated onboarding",
      "Priority infrastructure",
      "Custom support",
      "Future SaaS capabilities"
    ]
  }
};

const modules = [
  ["Students", "Manage student profiles, parents, academics, attendance and documents.", Users],
  ["Teachers & Staff", "Centralize employee information, assignments and attendance.", GraduationCap],
  ["Attendance", "Record student and teacher attendance with useful reports.", ClipboardCheck],
  ["Fees", "Manage fee structures, collections, balances and receipts.", CreditCard],
  ["Examination", "Manage exams, marks, grades, results and report cards.", BookOpen],
  ["Transport", "Manage buses, drivers, routes, stops and student assignments.", Bus],
  ["Communication", "Publish announcements and internal notifications.", Bell],
  ["Reports", "View operational and academic reports across your school.", BarChart3],
];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [mobileMenu, setMobileMenu] = useState(false);

  const go = (target: Page) => {
    setPage(target);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choosePlan = (plan: string) => {
    setSelectedPlan(plan);
    go("payment");
  };


  if (page === "login") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <button className="back-link" onClick={() => go("home")}>← Back to website</button>
          <div className="brand large"><span>SS</span> Smart School OS</div>
          <h1>Welcome back</h1>
          <p>Sign in to your school management system.</p>
          <label>Email or Username</label>
          <input placeholder="admin@school.com" />
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
          <div className="auth-row">
            <label className="check"><input type="checkbox" /> Remember me</label>
            <button className="text-button">Forgot password?</button>
          </div>
          <button className="primary full" onClick={() => go("home")}>
            <LogIn size={18}/> Sign In
          </button>
          <p className="auth-bottom">Demo login UI — authentication will be connected in Phase 1.</p>
        </div>
      </div>
    );
  }


  if (page === "payment") {
    const plan = plans[selectedPlan as keyof typeof plans];

    return (
      <div className="auth-page">
        <div className="payment-card">

          <button className="back-link" onClick={() => go("pricing")}>
            ← Back to Pricing
          </button>

          <div className="brand large">
            <span>SS</span> Smart School OS
          </div>

          <div className="eyebrow">SECURE CHECKOUT</div>

          <h1>Complete your plan</h1>
          <p>
            Confirm your SSOS plan to continue with school setup.
          </p>

          <div className="payment-plan">
            <div>
              <span>Selected Plan</span>
              <strong>{selectedPlan}</strong>
            </div>
            <div className="payment-price">
              {plan.price}
              <small>{plan.period}</small>
            </div>
          </div>

          <div className="payment-features">
            <h3>Included with {selectedPlan}</h3>

            {plan.features.map((feature) => (
              <div key={feature}>
                <CheckCircle2 size={17} />
                {feature}
              </div>
            ))}
          </div>

          <div className="payment-demo-notice">
            <ShieldCheck size={20} />
            <div>
              <strong>Demo checkout</strong>
              <p>
                Payment gateway integration will be connected during the
                production billing phase. No real card information is stored.
              </p>
            </div>
          </div>

          <button
            className="primary full"
            onClick={() => go("signup")}
          >
            Pay & Continue <ArrowRight size={18} />
          </button>

          <p className="auth-bottom">
            Secure school onboarding • Role-based access • School data isolation
          </p>
        </div>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div className="auth-page">
        <div className="signup-card">
          <button className="back-link" onClick={() => go("pricing")}>
            ← Back to Pricing
          </button>

          <div className="brand large">
            <span>SS</span> Smart School OS
          </div>

          <div className="selected-plan">
            Selected plan: <strong>{selectedPlan}</strong>
          </div>

          <h1>Create your account</h1>
          <p>
            Create your SSOS account first. After signup, we'll set up your
            school workspace.
          </p>

          <div className="social-auth">
            <button
              className="social-button"
              onClick={() => go("register")}
            >
              <span className="social-icon google">G</span>
              Continue with Google
            </button>

            <button
              className="social-button"
              onClick={() => go("register")}
            >
              <span className="social-icon apple">●</span>
              Continue with Apple
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          <div className="signup-form">
            <label>Full Name</label>
            <input placeholder="Your full name" />

            <label>Email Address</label>
            <input type="email" placeholder="you@school.com" />

            <label>Password</label>
            <input type="password" placeholder="Create a strong password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>

          <label className="terms-check">
            <input type="checkbox" />
            <span>
              I agree to the SSOS Terms of Service and Privacy Policy.
            </span>
          </label>

          <button
            className="primary full"
            onClick={() => go("register")}
          >
            Create Account <ArrowRight size={18} />
          </button>

          <p className="auth-bottom">
            Your account will be connected to the selected {selectedPlan} plan.
          </p>
        </div>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="auth-page">
        <div className="register-card">
          <button className="back-link" onClick={() => go("home")}>← Back to website</button>
          <div className="brand large"><span>SS</span> Smart School OS</div>
          <div className="selected-plan">Selected plan: <strong>{selectedPlan}</strong></div>
          <h1>Create your school</h1>
          <p>Set up your Smart School OS workspace.</p>
          <div className="form-grid">
            <div><label>School Name</label><input placeholder="Your School Name" /></div>
            <div><label>School Email</label><input placeholder="school@example.com" /></div>
            <div><label>Phone</label><input placeholder="+91 XXXXX XXXXX" /></div>
            <div><label>Board</label><select><option>CBSE</option><option>ICSE</option><option>State Board</option><option>Matriculation</option></select></div>
            <div className="wide"><label>Address</label><input placeholder="School address" /></div>
            <div><label>State</label><input placeholder="Tamil Nadu" /></div>
            <div><label>District</label><input placeholder="District" /></div>
          </div>
          <button className="primary full" onClick={() => window.location.href = "/app"}>
            Continue School Setup <ArrowRight size={18}/>
          </button>
          <p className="auth-bottom">School ID will be generated after setup.</p>
        </div>
      </div>
    );
  }

  if (page === "details") {
    return (
      <div className="site">
        <Header go={go} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
        <section className="detail-hero">
          <div className="container">
            <button className="back-link light" onClick={() => go("pricing")}>← Back to Pricing</button>
            <div className="eyebrow">PRICING DETAILS</div>
            <h1>Choose the plan that fits your school.</h1>
            <p>Start with the tools you need today and expand as your school grows.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="detail-grid">
              {Object.entries(plans).map(([name, plan]) => (
                <div className={`detail-card ${name === "Professional" ? "featured" : ""}`} key={name}>
                  {name === "Professional" && <div className="popular">MOST POPULAR</div>}
                  <h2>{name}</h2>
                  <p>{plan.description}</p>
                  <div className="detail-price">{plan.price}<small>{plan.period}</small></div>
                  <button className="primary full" onClick={() => choosePlan(name)}>
                    Choose {name} <ArrowRight size={17}/>
                  </button>
                  <div className="feature-list">
                    {plan.features.map(f => <div key={f}><CheckCircle2 size={17}/>{f}</div>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="comparison">
              <h2>What's included</h2>
              <p>All plans are designed around the complete school lifecycle.</p>
              {[
                ["School profile & School ID", "✓", "✓", "✓"],
                ["Students & Parents", "✓", "✓", "✓"],
                ["Teachers & Staff", "✓", "✓", "✓"],
                ["Attendance", "✓", "✓", "✓"],
                ["Fees & Receipts", "Basic", "✓", "✓"],
                ["Exams & Results", "—", "✓", "✓"],
                ["Transport", "—", "✓", "✓"],
                ["Reports", "Basic", "Advanced", "Advanced"],
                ["Multi-school", "—", "—", "✓"],
                ["Dedicated Support", "—", "Priority", "✓"]
              ].map(row => (
                <div className="comparison-row" key={row[0]}>
                  <strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer go={go}/>
      </div>
    );
  }

  if (page === "pricing") {
    return (
      <div className="site">
        <Header go={go} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
        <section className="pricing-hero">
          <div className="container center">
            <div className="eyebrow">SIMPLE, TRANSPARENT PRICING</div>
            <h1>Plans built for modern schools.</h1>
            <p>Start small, grow confidently, and manage your complete school operation from one platform.</p>
          </div>
        </section>
        <section className="section pricing-section">
          <div className="container">
            <div className="pricing-grid">
              {Object.entries(plans).map(([name, plan]) => (
                <PriceCard key={name} name={name} plan={plan} choosePlan={choosePlan} details={() => go("details")}/>
              ))}
            </div>
            <div className="pricing-note">
              <ShieldCheck size={22}/>
              <div><strong>Secure by design.</strong><br/>School data isolation, role-based access and audit-ready architecture are built into SSOS.</div>
            </div>
          </div>
        </section>
        <Footer go={go}/>
      </div>
    );
  }

  return (
    <div className="site">
      <Header go={go} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><Sparkles size={16}/> THE SCHOOL OPERATING SYSTEM</div>
              <h1>Run your entire school from <span>one system.</span></h1>
              <p className="hero-text">Smart School OS brings school administration, students, teachers, attendance, fees, exams, transport and communication together in one centralized platform.</p>
              <div className="hero-actions">
                <button className="primary" onClick={() => go("pricing")}>Get Started <ArrowRight size={18}/></button>
                <button className="secondary" onClick={() => go("pricing")}>View Pricing</button>
              </div>
              <div className="trust"><ShieldCheck size={17}/> SaaS-ready architecture • Role-based access • Centralized school data</div>
            </div>
            <DashboardMockup/>
          </div>
        </section>

        <section className="stats-section">
          <div className="container stats">
            <Stat value="1" label="Centralized System"/>
            <Stat value="30+" label="School Operations"/>
            <Stat value="100%" label="Role Based"/>
            <Stat value="24/7" label="Accessible"/>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <SectionTitle eyebrow="WHY SSOS" title="Everything your school needs. Nothing scattered." text="Replace disconnected spreadsheets, registers and separate tools with one school operating system."/>
            <div className="feature-grid">
              <Feature icon={<Building2/>} title="One School. One ID." text="Every school gets a unique School ID and a centralized tenant workspace."/>
              <Feature icon={<ShieldCheck/>} title="Secure by Design" text="Role-based access and tenant isolation keep school information protected."/>
              <Feature icon={<BarChart3/>} title="Real-time Visibility" text="Understand attendance, fees, students and academic performance at a glance."/>
              <Feature icon={<Users/>} title="Connected People" text="Students, parents, teachers and staff work from the same source of truth."/>
            </div>
          </div>
        </section>

        <section className="section soft" id="modules">
          <div className="container">
            <SectionTitle eyebrow="COMPLETE SCHOOL OPERATIONS" title="One platform. Every major workflow." text="SSOS is designed around the complete school lifecycle."/>
            <div className="module-grid">
              {modules.map(([title, text, Icon]: any) => (
                <div className="module-card" key={title}>
                  <div className="icon-box"><Icon size={22}/></div>
                  <h3>{title}</h3><p>{text}</p>
                  <button onClick={() => go("register")}>Explore <ArrowRight size={15}/></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <SectionTitle eyebrow="HOW IT WORKS" title="From school registration to daily operations."/>
            <div className="steps">
              {[
                ["01","Register School","Enter school information and structure."],
                ["02","Get School ID","SSOS creates your unique school workspace."],
                ["03","Configure School","Set academic year, classes, sections, subjects and departments."],
                ["04","Run Everything","Manage people, attendance, fees, exams, transport and reports."]
              ].map(([n,t,d]) => <div className="step" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="pricing-preview">
          <div className="container">
            <SectionTitle eyebrow="PRICING" title="Start with the plan that fits your school." text="Transparent plans designed to scale with your school."/>
            <div className="pricing-grid">
              {Object.entries(plans).map(([name, plan]) => (
                <PriceCard key={name} name={name} plan={plan} choosePlan={choosePlan} details={() => go("details")}/>
              ))}
            </div>
            <div className="center view-all">
                <button className="secondary" onClick={() => go("pricing")}>
                  View Complete Pricing <ArrowRight size={17}/>
                </button>
                <button className="secondary" onClick={() => window.location.href="/demo"}>
                  Book a Demo <ArrowRight size={17}/>
                </button>
              </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta">
            <div><div className="eyebrow light">READY TO LEVEL UP YOUR SCHOOL?</div><h2>Build a smarter school operation.</h2><p>Start with one School ID and one centralized system.</p></div>
            <button className="white-button" onClick={() => go("pricing")}>Get Started <ArrowRight size={18}/></button>
          </div>
        </section>
      </main>
      <Footer go={go}/>
    </div>
  );
}

function Header({go,mobileMenu,setMobileMenu}:{go:(p:Page)=>void,mobileMenu:boolean,setMobileMenu:(v:boolean)=>void}) {
  return <header className="header">
    <div className="container nav">
      <button className="brand" onClick={() => go("home")}><span>SS</span> Smart School OS</button>
      <nav className={mobileMenu ? "mobile-open" : ""}>
        <button onClick={() => go("home")}>Home</button>
        <button onClick={() => document.getElementById("features")?.scrollIntoView({behavior:"smooth"})}>Features</button>
        <button onClick={() => document.getElementById("modules")?.scrollIntoView({behavior:"smooth"})}>Modules</button>
        <button onClick={() => document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>How It Works</button>
        <button onClick={() => go("pricing")}>Pricing</button>
        <button className="nav-demo" onClick={() => window.location.href="/demo"}>
          Book Demo
        </button>
        <button className="nav-login" onClick={() => go("login")}>Login</button>
        <button className="nav-start" onClick={() => go("pricing")}>Get Started</button>
      </nav>
      <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}

function PriceCard({name,plan,choosePlan,details}:{name:string,plan:any,choosePlan:(n:string)=>void,details:()=>void}) {
  return <div className={`price-card ${name==="Professional" ? "popular-card":""}`}>
    {name==="Professional" && <div className="popular">MOST POPULAR</div>}
    <h3>{name}</h3><p>{plan.description}</p>
    <div className="price">{plan.price}<small>{plan.period}</small></div>
    <div className="feature-list">{plan.features.slice(0,6).map((f:string)=><div key={f}><Check size={16}/>{f}</div>)}</div>
    <button className={name==="Professional" ? "primary full":"secondary full"} onClick={() => choosePlan(name)}>Choose Plan <ArrowRight size={17}/></button>
    <button className="details-button" onClick={details}>View Details <ChevronDown size={16}/></button>
  </div>;
}

function DashboardMockup() {
  return <div className="dashboard-mock">
    <div className="mock-top"><div className="mock-brand">SSOS</div><div className="mock-user">Admin</div></div>
    <div className="mock-body"><aside><div className="mock-active">Dashboard</div><div>Students</div><div>Attendance</div><div>Fees</div><div>Exams</div><div>Transport</div></aside>
    <div className="mock-content"><div className="mock-title">Good morning, Admin</div><div className="mock-cards"><div><b>1,248</b><small>Students</small></div><div><b>86%</b><small>Attendance</small></div><div><b>₹2.4L</b><small>Collection</small></div></div><div className="mock-chart"><div className="bars"><i/><i/><i/><i/><i/><i/><i/></div></div></div></div>
  </div>;
}

function Feature({icon,title,text}:{icon:any,title:string,text:string}) { return <div className="feature-card"><div className="icon-box">{icon}</div><h3>{title}</h3><p>{text}</p></div>; }
function Stat({value,label}:{value:string,label:string}) { return <div><strong>{value}</strong><span>{label}</span></div>; }
function SectionTitle({eyebrow,title,text}:{eyebrow:string,title:string,text?:string}) { return <div className="section-title"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{text&&<p>{text}</p>}</div>; }

function Footer({go}:{go:(p:Page)=>void}) {
  return <footer><div className="container footer-grid"><div><button className="brand footer-brand" onClick={()=>go("home")}><span>SS</span> Smart School OS</button><p>One school. One School ID. One centralized system.</p></div><div><h4>Product</h4><button onClick={()=>go("pricing")}>Pricing</button><button onClick={()=>go("details")}>Pricing Details</button><button onClick={()=>window.location.href="/demo"}>Book Demo</button><button onClick={()=>go("pricing")}>Get Started</button></div><div><h4>Platform</h4><button onClick={()=>go("home")}>Features</button><button onClick={()=>go("home")}>Modules</button><button onClick={()=>go("home")}>How It Works</button></div><div><h4>Account</h4><button onClick={()=>go("login")}>Login</button><button onClick={()=>go("pricing")}>Create School</button></div></div><div className="container footer-bottom">© 2026 Smart School OS. All rights reserved.</div></footer>;
}

export default App;
