import { useState } from "react";
import {
  LayoutDashboard, School, CalendarDays, Building2, BookOpen, Users,
  UserCog, ShieldCheck, LogOut, Plus, Search, Bell, ChevronDown,
  GraduationCap, Layers3, BookMarked, Menu, X, Settings
} from "lucide-react";

type Role = "Admin" | "Manager" | "Teacher" | "Staff" | "Cashier";
type Module = "Dashboard" | "School Profile" | "Academic Year" | "Departments" | "Classes" | "Sections" | "Subjects" | "Users & Roles";

const school = {
  name: "Smart Valley Matriculation Higher Secondary School",
  id: "SSOS/2026/000127",
  year: "2026–2027",
  board: "State Board",
};

const roles: Role[] = ["Admin", "Manager", "Teacher", "Staff", "Cashier"];

const permissions: Record<Role, string[]> = {
  Admin: ["Dashboard","School Profile","Academic Year","Departments","Classes","Sections","Subjects","Users & Roles"],
  Manager: ["Dashboard","School Profile","Academic Year","Departments","Classes","Sections","Subjects"],
  Teacher: ["Dashboard","Classes","Sections","Subjects"],
  Staff: ["Dashboard"],
  Cashier: ["Dashboard"],
};

const demo = {
  classes: ["LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"],
  sections: ["A","B","C"],
  subjects: ["Tamil","English","Mathematics","Science","Social Science","Computer Science"],
  departments: ["Administration","Primary","Secondary","Higher Secondary","Accounts","Examination","Transport","IT","HR"],
};

export default function Phase1() {
  const [role, setRole] = useState<Role>("Admin");
  const [module, setModule] = useState<Module>("Dashboard");
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");

  const allowed = permissions[role];
  const navigate = (m: Module) => {
    if (allowed.includes(m)) {
      setModule(m);
      setMobile(false);
    }
  };

  const navGroups = [
    { title: "MAIN", items: [["Dashboard", LayoutDashboard] as const] },
    { title: "SCHOOL", items: [["School Profile", School],["Academic Year", CalendarDays],["Departments", Building2]] as const },
    { title: "ACADEMIC", items: [["Classes", GraduationCap],["Sections", Layers3],["Subjects", BookOpen]] as const },
    { title: "ADMINISTRATION", items: [["Users & Roles", ShieldCheck],["Settings", Settings]] as const },
  ];

  return (
    <div className="p1-shell">
      <aside className={`p1-sidebar ${mobile ? "open" : ""}`}>
        <div className="p1-brand">
          <div className="p1-logo">S</div>
          <div><strong>SSOS</strong><span>School OS</span></div>
          <button className="p1-mobile-close" onClick={() => setMobile(false)}><X size={20}/></button>
        </div>

        <div className="p1-school-mini">
          <div className="p1-school-icon"><School size={20}/></div>
          <div><strong>{school.name}</strong><span>{school.id}</span></div>
        </div>

        <nav>
          {navGroups.map(g => (
            <div className="p1-nav-group" key={g.title}>
              <small>{g.title}</small>
              {g.items.map(([label, Icon]) => (
                <button
                  key={label}
                  className={module === label ? "active" : ""}
                  disabled={!allowed.includes(label as Module) && label !== "Settings"}
                  onClick={() => label === "Settings" ? setModule("School Profile") : navigate(label as Module)}
                >
                  <Icon size={18}/><span>{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p1-sidebar-bottom">
          <button onClick={() => window.location.href="/"}><LogOut size={18}/> Exit SSOS</button>
        </div>
      </aside>

      {mobile && <div className="p1-overlay" onClick={() => setMobile(false)}/>}

      <main className="p1-main">
        <header className="p1-topbar">
          <button className="p1-menu" onClick={() => setMobile(true)}><Menu/></button>
          <div>
            <strong>{module}</strong>
            <span>School ID: {school.id}</span>
          </div>
          <div className="p1-top-actions">
            <button><Bell size={19}/></button>
            <div className="p1-role">
              <div className="p1-avatar">A</div>
              <div><strong>Admin User</strong><span>{role}</span></div>
              <select value={role} onChange={e => setRole(e.target.value as Role)}>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </header>

        <section className="p1-content">
          {module === "Dashboard" && (
            <>
              <div className="p1-page-head">
                <div><h1>Good evening, Admin 👋</h1><p>Here’s what’s happening at your school today.</p></div>
                <div className="p1-badge"><span/> {school.year}</div>
              </div>

              <div className="p1-cards">
                {[
                  ["Students","1,248","↑ 8.2%","from last year",GraduationCap],
                  ["Teachers","86","↑ 4.1%","from last year",Users],
                  ["Staff","34","↑ 2.8%","from last year",UserCog],
                  ["Classes","42","Active","across standards",BookMarked],
                ].map(([a,b,c,d,I]) => (
                  <div className="p1-card" key={a as string}>
                    <div className="p1-card-icon"><I size={21}/></div>
                    <span>{a}</span><strong>{b}</strong><small>{c} <em>{d}</em></small>
                  </div>
                ))}
              </div>

              <div className="p1-grid2">
                <div className="p1-panel">
                  <div className="p1-panel-head"><div><h3>Today's Attendance</h3><p>19 September 2026</p></div><strong>94.6%</strong></div>
                  <div className="p1-progress"><span style={{width:"94.6%"}}/></div>
                  <div className="p1-attendance"><div><b>1,181</b><span>Present</span></div><div><b>67</b><span>Absent</span></div><div><b>1,248</b><span>Total</span></div></div>
                </div>

                <div className="p1-panel">
                  <div className="p1-panel-head"><div><h3>Quick Actions</h3><p>Common school operations</p></div></div>
                  <div className="p1-actions">
                    <button onClick={() => navigate("Classes")}><Plus/> Add Class</button>
                    <button onClick={() => navigate("Subjects")}><Plus/> Add Subject</button>
                    <button onClick={() => navigate("Departments")}><Plus/> Department</button>
                    <button onClick={() => navigate("Users & Roles")}><UserCog/> Manage Users</button>
                  </div>
                </div>
              </div>

              <div className="p1-panel">
                <div className="p1-panel-head"><div><h3>School Foundation</h3><p>Phase 1 configuration status</p></div><span className="p1-complete">Foundation Ready</span></div>
                <div className="p1-foundation">
                  {["School Setup","School ID","Authentication","Roles & RBAC","Academic Year","Classes","Sections","Subjects","Departments"].map(x =>
                    <div key={x}><span>✓</span>{x}<small>Configured</small></div>
                  )}
                </div>
              </div>
            </>
          )}

          {module !== "Dashboard" && <Management module={module} search={search} setSearch={setSearch}/>}
        </section>
      </main>
    </div>
  );
}

function Management({module, search, setSearch}: {module: Module, search:string, setSearch:(v:string)=>void}) {
  const data =
    module === "Classes" ? demo.classes :
    module === "Sections" ? demo.sections :
    module === "Subjects" ? demo.subjects :
    module === "Departments" ? demo.departments :
    module === "Academic Year" ? ["2026–2027","2025–2026","2024–2025"] :
    module === "Users & Roles" ? ["Admin User","Academic Manager","Class Teacher","Office Staff","Cashier"] : [];

  if (module === "School Profile") return (
    <div>
      <div className="p1-page-head"><div><h1>School Profile</h1><p>Manage your school's core information.</p></div></div>
      <div className="p1-panel p1-form">
        <div className="p1-profile-logo">S</div>
        <label>School Name<input value={school.name} readOnly/></label>
        <label>School ID<input value={school.id} readOnly/></label>
        <label>Academic Year<input value={school.year} readOnly/></label>
        <label>Board<input value={school.board} readOnly/></label>
        <label>Phone<input value="+91 98765 43210" readOnly/></label>
        <label>Email<input value="admin@smartvalleyschool.edu.in" readOnly/></label>
        <label>Address<textarea value="Chennai, Tamil Nadu, India" readOnly/></label>
      </div>
    </div>
  );

  const filtered = data.filter(x => x.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="p1-page-head">
        <div><h1>{module}</h1><p>Manage {module.toLowerCase()} for {school.name}.</p></div>
        <button className="p1-primary"><Plus size={17}/> Add {module === "Academic Year" ? "Year" : module === "Users & Roles" ? "User" : module.slice(0,-1)}</button>
      </div>
      <div className="p1-panel">
        <div className="p1-toolbar"><div className="p1-search"><Search size={17}/><input placeholder={`Search ${module}...`} value={search} onChange={e=>setSearch(e.target.value)}/></div><span>{filtered.length} records</span></div>
        <div className="p1-table">
          <div className="p1-tr p1-th"><span>Name</span><span>Status</span><span>School ID</span><span>Action</span></div>
          {filtered.map(x=><div className="p1-tr" key={x}><span><b>{x}</b></span><span><i className="p1-status">Active</i></span><span>{school.id}</span><button>View <ChevronDown size={14}/></button></div>)}
        </div>
      </div>
    </div>
  );
}
