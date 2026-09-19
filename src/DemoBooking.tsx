import { useState } from "react";
import {
  CalendarDays, CheckCircle2, Clock3, School,
  Users, GraduationCap, BookOpen, IndianRupee, ClipboardCheck,
  Bus, Megaphone, BarChart3, ShieldCheck, Settings
} from "lucide-react";

const features = [
  ["Dashboard","Central school overview with students, teachers, attendance, fees and exams.",BarChart3],
  ["School Setup","Configure school information, structure, departments and academic year.",School],
  ["Academic Management","Classes, sections, subjects and teacher assignments.",BookOpen],
  ["Students","Complete student records, profiles, academic and operational information.",GraduationCap],
  ["Parents","Parent profiles with linked students and contact information.",Users],
  ["Teachers & Staff","Employee profiles, departments, assignments and records.",Users],
  ["Attendance","Student and teacher attendance with summaries and reports.",ClipboardCheck],
  ["Fees & Payments","Fee structure, collection, pending fees, payments and receipts.",IndianRupee],
  ["Examinations","Exams, subjects, marks, grades, results and result cards.",ClipboardCheck],
  ["Transport","Buses, drivers, routes, stops and student transport assignments.",Bus],
  ["Communication","Announcements and internal notifications.",Megaphone],
  ["Reports","Student, attendance, fee, examination and transport reports.",BarChart3],
  ["Users & Roles","Role-based access, permissions and user management.",ShieldCheck],
  ["Audit Logs","Track important administrative and security activities.",ShieldCheck],
  ["Settings","School, academic, account and appearance configuration.",Settings],
];

const future = ["SMS","WhatsApp","GPS Tracking","Biometric Attendance","CCTV Integration","Payment Gateway","AI Features","Advanced Analytics","Push Notifications"];

export default function DemoBooking({onBack,onExplore}:{onBack:()=>void,onExplore:()=>void}) {
  const [submitted,setSubmitted]=useState(false);
  const [selected,setSelected]=useState<string[]>([]);
  const [form,setForm]=useState({
    name:"",school:"",email:"",phone:"",city:"",board:"State Board",
    students:"",teachers:"",date:"",time:"10:00 AM",mode:"Online Demo",message:""
  });

  const update=(key:string,value:string)=>setForm({...form,[key]:value});
  const toggle=(name:string)=>setSelected(v=>v.includes(name)?v.filter(x=>x!==name):[...v,name]);

  if(submitted) return <div className="demo-page">
    <div className="demo-success">
      <div className="demo-success-icon"><CheckCircle2 size={46}/></div>
      <h1>Demo Request Confirmed 🎉</h1>
      <p>Thank you for your interest in Smart School OS. Your demo request has been submitted successfully.</p>
      <div className="demo-confirm-grid">
        <div><small>Request ID</small><b>DEMO-2026-00127</b></div>
        <div><small>School</small><b>{form.school || "Your School"}</b></div>
        <div><small>Date</small><b>{form.date || "To be confirmed"}</b></div>
        <div><small>Time</small><b>{form.time}</b></div>
        <div><small>Mode</small><b>{form.mode}</b></div>
        <div><small>Features</small><b>{selected.length || "All"} selected</b></div>
      </div>
      <div className="demo-success-actions">
        <button onClick={onBack}>Back to Website</button>
        <button className="demo-primary" onClick={onExplore}>Explore SSOS</button>
      </div>
    </div>
  </div>;

  return <div className="demo-page">
    <header className="demo-header">
      <button className="demo-brand" onClick={onBack}><span>SS</span><b>Smart School OS</b></button>
      <button className="demo-back" onClick={onBack}>← Back to Website</button>
    </header>

    <main className="demo-main">
      <div className="demo-hero">
        <span className="demo-eyebrow">PERSONALIZED PRODUCT DEMO</span>
        <h1>See Smart School OS<br/><strong>in action.</strong></h1>
        <p>Book a guided demo and explore the complete school operating system with your team.</p>
      </div>

      <form className="demo-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
        <section className="demo-section">
          <div className="demo-section-title"><span>01</span><div><h2>Contact Details</h2><p>Tell us who we should contact.</p></div></div>
          <div className="demo-fields">
            <label>Full Name<input required value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your name"/></label>
            <label>School Name<input required value={form.school} onChange={e=>update("school",e.target.value)} placeholder="School name"/></label>
            <label>School / Work Email<input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@school.com"/></label>
            <label>Phone / WhatsApp<input required value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="+91"/></label>
            <label>City / District<input value={form.city} onChange={e=>update("city",e.target.value)} placeholder="City"/></label>
            <label>Board<select value={form.board} onChange={e=>update("board",e.target.value)}><option>State Board</option><option>CBSE</option><option>ICSE</option><option>Matriculation</option><option>Other</option></select></label>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-section-title"><span>02</span><div><h2>School Information</h2><p>Help us tailor the demo to your school.</p></div></div>
          <div className="demo-fields">
            <label>Number of Students<input type="number" min="1" value={form.students} onChange={e=>update("students",e.target.value)} placeholder="e.g. 1200"/></label>
            <label>Number of Teachers<input type="number" min="1" value={form.teachers} onChange={e=>update("teachers",e.target.value)} placeholder="e.g. 80"/></label>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-section-title"><span>03</span><div><h2>Schedule Your Demo</h2><p>Choose your preferred demo slot.</p></div></div>
          <div className="demo-fields">
            <label>Preferred Date<input required type="date" value={form.date} onChange={e=>update("date",e.target.value)}/></label>
            <label>Preferred Time<select value={form.time} onChange={e=>update("time",e.target.value)}>{["10:00 AM","11:30 AM","2:00 PM","3:30 PM","5:00 PM"].map(x=><option key={x}>{x}</option>)}</select></label>
            <label>Demo Mode<select value={form.mode} onChange={e=>update("mode",e.target.value)}><option>Online Demo</option><option>In-person Demo</option></select></label>
          </div>
        </section>

        <section className="demo-section">
          <div className="demo-section-title"><span>04</span><div><h2>What would you like to explore?</h2><p>Select features for a focused demo. You can select all of them.</p></div></div>
          <div className="feature-grid">
            {features.map(([name,desc,Icon])=><button type="button" key={name as string} className={selected.includes(name as string)?"feature selected":"feature"} onClick={()=>toggle(name as string)}>
              <span className="feature-check">{selected.includes(name as string)?"✓":""}</span>
              <Icon size={19}/><strong>{name as string}</strong><small>{desc as string}</small>
            </button>)}
          </div>
          <button type="button" className="select-all" onClick={()=>setSelected(selected.length===features.length?[]:features.map(x=>x[0] as string))}>{selected.length===features.length?"Clear All":"Select All Features"}</button>
        </section>

        <section className="demo-section">
          <div className="demo-section-title"><span>05</span><div><h2>Anything else?</h2><p>Tell us about your requirements.</p></div></div>
          <textarea value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us what you'd like to see in the demo..."/>
        </section>

        <div className="demo-submit">
          <div><strong>Ready to see SSOS?</strong><span>We'll use your information only to coordinate the demo.</span></div>
          <button type="submit">Book My Demo <CalendarDays size={17}/></button>
        </div>
      </form>

      <section className="future-section">
        <h2>Also coming to SSOS</h2>
        <p>Future integrations and advanced capabilities.</p>
        <div>{future.map(x=><span key={x}><Clock3 size={13}/>{x}</span>)}</div>
      </section>
    </main>
  </div>
}
