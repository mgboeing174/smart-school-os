import { useState } from "react";
import {
  ArrowRight, Check, Menu, X, GraduationCap, Users, ClipboardCheck,
  CreditCard, BookOpen, Bus, BarChart3, ShieldCheck, Sparkles
} from "lucide-react";

export default function App() {
  const [menu, setMenu] = useState(false);
  const [pricing, setPricing] = useState(false);

  const goPricing = () => {
    setPricing(true);
    setMenu(false);
    setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (pricing) {
    return (
      <div className="site">
        <header className="nav">
          <div className="wrap navin">
            <button className="brand" onClick={() => setPricing(false)}>
              <span className="logo"><GraduationCap size={21}/></span>
              Smart School <b>OS</b>
            </button>
            <button className="primary" onClick={() => setPricing(false)}>Back Home</button>
          </div>
        </header>

        <section className="priceHero">
          <span className="tag"><Sparkles size={15}/> Simple school pricing</span>
          <h1>Plans built for <span>every school.</span></h1>
          <p>Start with the essentials and scale your school operations as you grow.</p>
        </section>

        <section id="pricing" className="pricing wrap">
          <PriceCard
            name="Starter"
            desc="For small schools getting started"
            price="₹2,999"
            features={["Student management","Attendance management","Teacher management","Basic reports","School profile","Academic year"]}
            action="Start Free Setup"
          />
          <PriceCard
            featured
            name="Professional"
            desc="For growing schools"
            price="₹6,999"
            features={["Everything in Starter","Fees & receipts","Exams & results","Parent management","Transport management","Announcements","Advanced reports"]}
            action="Get Started"
          />
          <PriceCard
            name="Enterprise"
            desc="For larger institutions"
            price="Custom"
            features={["Everything in Professional","Multiple school support","Advanced administration","Custom workflows","Priority support","Enterprise controls"]}
            action="Contact Us"
          />
        </section>

        <section className="comparison wrap">
          <h2>Everything connected in one platform.</h2>
          <p>One system for the complete school lifecycle.</p>
          <div className="compareGrid">
            {["Students","Attendance","Fees","Exams & Results","Teachers & Staff","Transport","Communication","Reports"].map(x =>
              <div key={x}><Check size={17}/>{x}</div>
            )}
          </div>
        </section>

        <CTA onClick={() => setPricing(false)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="site">
      <header className="nav">
        <div className="wrap navin">
          <button className="brand">
            <span className="logo"><GraduationCap size={21}/></span>
            Smart School <b>OS</b>
          </button>

          <nav className={menu ? "navlinks open" : "navlinks"}>
            <a href="#features" onClick={() => setMenu(false)}>Features</a>
            <a href="#modules" onClick={() => setMenu(false)}>Modules</a>
            <button onClick={goPricing}>Pricing</button>
            <a href="#about" onClick={() => setMenu(false)}>About</a>
            <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
          </nav>

          <div className="navbuttons">
            <button className="login">Login</button>
            <button className="primary">Get Started <ArrowRight size={16}/></button>
          </div>

          <button className="menubtn" onClick={() => setMenu(!menu)}>
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap heroGrid">
            <div>
              <span className="tag"><Sparkles size={15}/> The modern school operating system</span>
              <h1>Run your entire school from <span>one intelligent platform.</span></h1>
              <p>Smart School OS brings students, teachers, attendance, fees, exams, transport, communication and reports together in one secure workspace.</p>
              <div className="heroBtns">
                <button className="primary">Start Your School <ArrowRight size={18}/></button>
                <button className="secondary" onClick={goPricing}>View Pricing</button>
              </div>
              <div className="trust">
                <span><ShieldCheck size={16}/> Secure by design</span>
                <span><Check size={16}/> Built for schools</span>
                <span><Check size={16}/> Easy to use</span>
              </div>
            </div>

            <div className="dashboardMock">
              <div className="mockTop"><b>Smart School OS</b><span></span></div>
              <div className="mockBody">
                <aside>
                  <i></i><i></i><i></i><i></i><i></i>
                </aside>
                <div className="mockContent">
                  <small>Welcome back, Admin</small>
                  <h3>School Dashboard</h3>
                  <div className="mockStats">
                    <Stat icon={<Users/>} label="Students" value="1,248"/>
                    <Stat icon={<GraduationCap/>} label="Teachers" value="86"/>
                    <Stat icon={<ClipboardCheck/>} label="Attendance" value="94.8%"/>
                    <Stat icon={<CreditCard/>} label="Fees" value="₹8.4L"/>
                  </div>
                  <div className="mockChart">
                    <b>Attendance Overview</b>
                    <div className="bars">{[35,52,44,70,58,82,67,90,75,95].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro">
          <div className="wrap">
            <span className="tag">Everything connected</span>
            <h2>Your school. One operating system.</h2>
            <p>Replace disconnected tools and spreadsheets with one centralized platform designed around the complete school lifecycle.</p>
          </div>
        </section>

        <section id="features" className="features wrap">
          <Feature icon={<Users/>} title="Student Management" text="Manage student profiles, parents, documents, classes and academic information."/>
          <Feature icon={<ClipboardCheck/>} title="Attendance" text="Record and monitor student and teacher attendance with clear insights."/>
          <Feature icon={<CreditCard/>} title="Fees & Payments" text="Manage fee structures, collections, balances and digital-ready receipts."/>
          <Feature icon={<BookOpen/>} title="Exams & Results" text="Create exams, enter marks and generate structured results."/>
          <Feature icon={<GraduationCap/>} title="Teachers & Staff" text="Centralize employee information, assignments and attendance."/>
          <Feature icon={<Bus/>} title="Transport" text="Organize buses, drivers, routes, stops and student assignments."/>
          <Feature icon={<BarChart3/>} title="Reports" text="Get useful reports across students, attendance, fees and academics."/>
          <Feature icon={<ShieldCheck/>} title="Secure Foundation" text="Built around authentication, roles, permissions and school-level data isolation."/>
        </section>

        <section id="modules" className="modules">
          <div className="wrap">
            <span className="tag">Complete school management</span>
            <h2>Every important operation, connected.</h2>
            <div className="moduleGrid">
              {["Academic Management","People Management","Daily Attendance","Fee Management","Examination","Transport","Communication","Reports & Analytics"].map((x,i)=>
                <div className="module" key={x}><span>0{i+1}</span><b>{x}</b><ArrowRight size={17}/></div>
              )}
            </div>
          </div>
        </section>

        <section id="about" className="about wrap">
          <div>
            <span className="tag">How it works</span>
            <h2>From school registration to daily operations.</h2>
          </div>
          <div className="steps">
            {["Register your school","Set up academic structure","Manage daily operations","Understand your school with data"].map((x,i)=>
              <div key={x}><strong>{i+1}</strong><div><b>{x}</b><p>Simple, connected and designed for everyday school teams.</p></div></div>
            )}
          </div>
        </section>

        <section className="pricingPreview wrap">
          <div><span className="tag">Pricing</span><h2>Start simple. Scale when you need.</h2><p>Flexible plans designed around different school sizes and operational needs.</p></div>
          <button className="primary" onClick={goPricing}>Explore Pricing <ArrowRight size={17}/></button>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function PriceCard({name,desc,price,features,action,featured=false}:{name:string;desc:string;price:string;features:string[];action:string;featured?:boolean}) {
  return <div className={featured ? "priceCard featured" : "priceCard"}>
    {featured && <div className="popular">Most Popular</div>}
    <h3>{name}</h3><p>{desc}</p>
    <div className="price">{price}{price !== "Custom" && <small>/ month</small>}</div>
    <div className="priceFeatures">{features.map(f=><span key={f}><Check size={16}/>{f}</span>)}</div>
    <button className={featured ? "primary full" : "secondary full"}>{action} <ArrowRight size={16}/></button>
  </div>;
}

function Feature({icon,title,text}:{icon:any;title:string;text:string}) {
  return <article className="feature"><span className="featureIcon">{icon}</span><h3>{title}</h3><p>{text}</p><a href="#contact">Learn more <ArrowRight size={15}/></a></article>;
}

function Stat({icon,label,value}:{icon:any;label:string;value:string}) {
  return <div className="stat"><span>{icon}</span><small>{label}</small><b>{value}</b></div>;
}

function CTA({onClick}:{onClick?:()=>void}) {
  return <section className="cta"><div className="wrap"><span className="tag light">Ready to modernize your school?</span><h2>Give your school one connected system.</h2><p>Build your school's digital foundation with Smart School OS.</p><button className="whiteBtn" onClick={onClick}>Get Started <ArrowRight size={17}/></button></div></section>;
}

function Footer() {
  return <footer id="contact"><div className="wrap footerGrid">
    <div><button className="brand"><span className="logo"><GraduationCap size={21}/></span>Smart School <b>OS</b></button><p>The modern operating system for schools.</p></div>
    <div><b>Platform</b><a href="#features">Features</a><a href="#modules">Modules</a><a href="#pricing">Pricing</a></div>
    <div><b>Company</b><a href="#about">About</a><a href="#contact">Contact</a></div>
    <div><b>Support</b><a href="#contact">Help Center</a><a href="#contact">Privacy</a></div>
  </div><div className="wrap copyright">© 2026 Smart School OS. All rights reserved.</div></footer>;
}
