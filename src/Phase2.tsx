import React from 'react';
import { useState } from "react";
import { Users, GraduationCap, UserRound, UserCog, Search, Plus, Phone, Mail, X } from "lucide-react";

type PersonType = "Students" | "Parents" | "Teachers" | "Staff";

const schoolId = "SSOS/2026/000127";

const students = [
  ["STU001","Arun Kumar","10-A","9840012345","Parent: Kumar"],
  ["STU002","Priya S","9-B","9840067890","Parent: Suresh"],
  ["STU003","Rahul M","12-A","9876543210","Parent: Mani"],
  ["STU004","Divya R","8-C","9898989898","Parent: Raj"],
  ["STU005","Vishal K","6-A","9789012345","Parent: Kumar"],
  ["STU006","Ananya P","5-B","9765432109","Parent: Prakash"],
];

const parents = [
  ["PAR001","Suresh Kumar","Father","9840011122","2 Students"],
  ["PAR002","Raj Kumar","Father","9840033344","1 Student"],
  ["PAR003","Prakash R","Father","9840055566","2 Students"],
];

const teachers = [
  ["TCH001","Meena Lakshmi","Mathematics","Senior Teacher","9876500011"],
  ["TCH002","Karthik R","Science","Teacher","9876500022"],
  ["TCH003","Anitha S","English","Teacher","9876500033"],
  ["TCH004","Ramesh B","Tamil","Senior Teacher","9876500044"],
  ["TCH005","Priya M","Computer Science","Teacher","9876500055"],
];

const staff = [
  ["STF001","Senthil Kumar","Administration","Office Staff","9876501010"],
  ["STF002","Kavitha R","Accounts","Accounts Staff","9876502020"],
  ["STF003","Mohan S","Transport","Transport Staff","9876503030"],
  ["STF004","Lakshmi P","Examination","Exam Staff","9876504040"],
];

export default function Phase2() {
  const [type, setType] = useState<PersonType>("Students");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const data = type === "Students" ? students : type === "Parents" ? parents : type === "Teachers" ? teachers : staff;
  const filtered = data.filter(row => row.join(" ").toLowerCase().includes(search.toLowerCase()));

  const icons: Record<PersonType, React.ComponentType<{size?: number}>> = {
    Students: GraduationCap,
    Parents: Users,
    Teachers: UserRound,
    Staff: UserCog
  };

  return (
    <div className="p2-page">
      <header className="p2-header">
        <div>
          <div className="p2-brand"><b>S</b><strong>SSOS</strong><span>People Management</span></div>
        </div>
        <div className="p2-school">{schoolId} · 2026–2027</div>
      </header>

      <main className="p2-content">
        <div className="p2-title">
          <div><h1>People</h1><p>Manage students, parents, teachers and staff.</p></div>
          <button className="p2-primary" onClick={() => setShowAdd(true)}><Plus size={17}/> Add {type.slice(0,-1)}</button>
        </div>

        <div className="p2-tabs">
          {(Object.keys(icons) as PersonType[]).map(item => {
            const Icon = icons[item];
            return <button key={item} className={type === item ? "active" : ""} onClick={() => {setType(item);setSearch("")}}>
              <Icon size={17}/>{item}
            </button>
          })}
        </div>

        <div className="p2-stats">
          <div><GraduationCap/><span>Students</span><b>1,248</b></div>
          <div><Users/><span>Parents</span><b>982</b></div>
          <div><UserRound/><span>Teachers</span><b>86</b></div>
          <div><UserCog/><span>Staff</span><b>34</b></div>
        </div>

        <section className="p2-card">
          <div className="p2-toolbar">
            <div><h2>{type}</h2><small>{filtered.length} records shown · School ID: {schoolId}</small></div>
            <div className="p2-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${type.toLowerCase()}...`}/></div>
          </div>

          <div className="p2-table">
            <div className="p2-row p2-head">
              <span>ID</span><span>Name</span><span>Class / Department</span><span>Phone</span><span>Status</span>
            </div>
            {filtered.map(row =>
              <button className="p2-row p2-data" key={row[0]} onClick={() => setSelected(row[0])}>
                <span>{row[0]}</span>
                <strong>{row[1]}</strong>
                <span>{row[2]}</span>
                <span>{row[3]}</span>
                <span className="p2-status">Active</span>
              </button>
            )}
          </div>
        </section>
      </main>

      {selected && <Profile type={type} id={selected} onClose={() => setSelected(null)}/>}
      {showAdd && <AddModal type={type} onClose={() => setShowAdd(false)}/>}
    </div>
  );
}

function Profile({type,id,onClose}:{type:PersonType,id:string,onClose:()=>void}) {
  const all = type === "Students" ? students : type === "Parents" ? parents : type === "Teachers" ? teachers : staff;
  const person = all.find(x=>x[0]===id) || all[0];

  return <div className="p2-overlay"><div className="p2-modal">
    <button className="p2-close" onClick={onClose}><X/></button>
    <div className="p2-profile-avatar">{person[1][0]}</div>
    <h2>{person[1]}</h2><p>{type.slice(0,-1)} · {person[0]}</p>
    <div className="p2-profile-grid">
      <div><small>School ID</small><b>{schoolId}</b></div>
      <div><small>Status</small><b className="green">Active</b></div>
      <div><small>Phone</small><b><Phone size={14}/>{person[3]}</b></div>
      <div><small>Email</small><b><Mail size={14}/>Not configured</b></div>
      <div><small>{type==="Students"?"Class":type==="Parents"?"Children":"Department"}</small><b>{person[2]}</b></div>
      <div><small>Record ID</small><b>{person[0]}</b></div>
    </div>
  </div></div>
}

function AddModal({type,onClose}:{type:PersonType,onClose:()=>void}) {
  return <div className="p2-overlay"><div className="p2-modal">
    <button className="p2-close" onClick={onClose}><X/></button>
    <h2>Add {type.slice(0,-1)}</h2><p>Create a new {type.slice(0,-1).toLowerCase()} record.</p>
    <div className="p2-form">
      <label>Full Name<input placeholder="Enter full name"/></label>
      <label>Phone<input placeholder="+91"/></label>
      <label>Email<input placeholder="email@example.com"/></label>
      <label>{type==="Students"?"Class":"Department"}<input placeholder="Select"/></label>
    </div>
    <div className="p2-form-footer"><button onClick={onClose}>Cancel</button><button className="p2-primary" onClick={onClose}>Save Record</button></div>
  </div></div>
}
