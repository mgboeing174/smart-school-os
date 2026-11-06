import { useMemo, useState } from "react";
import {
  LayoutDashboard, ChartNoAxesCombined, School, BookOpen, Users,
  CalendarCheck, Wallet, GraduationCap, Bus, Bell, ShieldCheck,
  Settings, ChevronDown, ChevronRight, Menu, X, Search, Plus,
  Download, Upload, FileSpreadsheet, Server, HardDrive, Camera,
  MapPin, Database, CheckCircle2, AlertCircle,
  FileText, CircleHelp, LogOut, ArrowUpRight, Clock, Activity
} from "lucide-react";
import "./school-os.css";

type Item = { name: string; icon: typeof School; children?: string[] };

const navigation: Item[] = [
  { name: "Dashboard", icon: LayoutDashboard, children: ["Overview"] },
  { name: "Reports", icon: ChartNoAxesCombined, children: ["Overall Reports", "Academic Reports", "Attendance Reports", "Fee Reports"] },
  { name: "School", icon: School, children: ["School Profile", "Academic Year", "Departments"] },
  { name: "Academic", icon: BookOpen, children: ["Classes / Standards", "Sections", "Subjects"] },
  { name: "People", icon: Users, children: ["Students", "Parents", "Teachers", "Staff", "Drivers"] },
  { name: "Attendance", icon: CalendarCheck, children: ["Student Attendance", "Teacher Attendance", "Staff Attendance"] },
  { name: "Fees", icon: Wallet, children: ["Fee Structure", "Fee Collection", "Fees Pending", "Receipts"] },
  { name: "Examination", icon: GraduationCap, children: ["Exam Schedule", "Marks Entry", "Grades", "Results", "Result Card"] },
  { name: "Transport", icon: Bus, children: ["Buses", "Drivers", "Routes", "Stops", "Assignments"] },
  { name: "Announcement", icon: Bell, children: ["Announcements", "Notifications"] },
  { name: "Administration", icon: ShieldCheck, children: ["Users & Roles", "Permissions", "Audit Logs"] }
];

const datasets: Record<string, string[]> = {
  "School Profile": ["School Name", "School ID", "Phone", "Email", "Address"],
  "Academic Year": ["Year", "Start Date", "End Date", "Status"],
  Departments: ["Department Name", "Department Head"],
  "Classes / Standards": ["Class Name", "Academic Year"],
  Sections: ["Section Name", "Class Name", "Class Teacher"],
  Subjects: ["Subject Name", "Subject Code", "Class Name"],
  Students: ["Admission Number", "First Name", "Last Name", "Class", "Section", "Parent Email", "Phone"],
  Parents: ["Parent Name", "Email", "Phone", "Student Admission Number"],
  Teachers: ["Employee ID", "Teacher Name", "Email", "Phone", "Department"],
  Staff: ["Employee ID", "Staff Name", "Role", "Phone"],
  Drivers: ["Driver ID", "Driver Name", "Phone", "Licence Number"],
  "Student Attendance": ["Admission Number", "Date", "Status"],
  "Teacher Attendance": ["Employee ID", "Date", "Status"],
  "Staff Attendance": ["Employee ID", "Date", "Status"],
  "Fee Structure": ["Class", "Fee Name", "Amount", "Due Date"],
  "Fee Collection": ["Admission Number", "Receipt Number", "Amount", "Payment Date", "Method"],
  "Fees Pending": ["Admission Number", "Fee Name", "Due Amount", "Due Date"],
  Receipts: ["Receipt Number", "Admission Number", "Amount", "Date"],
  "Exam Schedule": ["Exam Name", "Class", "Subject", "Exam Date", "Maximum Marks"],
  "Marks Entry": ["Admission Number", "Exam Name", "Subject", "Marks"],
  Results: ["Admission Number", "Exam Name", "Total Marks", "Grade"],
  "Result Card": ["Admission Number", "Exam Name", "Academic Year"],
  Buses: ["Bus Number", "Registration Number", "Capacity"],
  Routes: ["Route Name", "Start Point", "End Point"],
  Stops: ["Stop Name", "Route Name", "Pickup Time"],
  Announcements: ["Title", "Message", "Publish Date"],
  Notifications: ["Title", "Message", "Recipient", "Date"],
  "Users & Roles": ["Name", "Email", "Role", "Status"],
  Permissions: ["Role", "Module", "Permission"],
  "Audit Logs": ["User", "Action", "Module", "Date"]
};

const settingsItems = [
  { name: "CCTV / OpenCV Connection", icon: Camera },
  { name: "GPS Connection", icon: MapPin },
  { name: "Storage Connection", icon: HardDrive },
  { name: "Server Connection", icon: Server },
  { name: "Backups", icon: Database },
  { name: "Data Import Center", icon: FileSpreadsheet }
];

function downloadCSV(name: string, headers: string[]) {
  const content = headers.map(v => `"${v.replace(/"/g, '""')}"`).join(",") + "\n";
  const url = URL.createObjectURL(new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function Dashboard({ open }: { open: (page: string) => void }) {
  const stats = [
    { label: "Total Students", value: "1,248", delta: "+8.2%", icon: Users },
    { label: "Teachers", value: "64", delta: "+3 this term", icon: GraduationCap },
    { label: "Staff", value: "28", delta: "Across departments", icon: ShieldCheck },
    { label: "Classes", value: "24", delta: "LKG – Grade 12", icon: School }
  ];
  const bars = [44, 63, 54, 76, 61, 85, 70, 93, 74, 88, 67, 96];
  return <div className="sos-content">
    <div className="sos-page-heading"><div><span className="sos-eyebrow">SCHOOL OVERVIEW</span><h1>Dashboard</h1><p>Here’s what’s happening at your school today.</p></div><button className="sos-button" onClick={() => open("School Profile")}>School profile <ArrowUpRight size={16}/></button></div>
    <div className="sos-stat-grid">{stats.map(s => <div className="sos-stat" key={s.label}><div className="sos-stat-top"><span>{s.label}</span><s.icon size={19}/></div><strong>{s.value}</strong><small>{s.delta}</small></div>)}</div>
    <div className="sos-dashboard-grid">
      <section className="sos-panel sos-chart-panel"><div className="sos-panel-heading"><div><h2>Student strength</h2><p>Enrolment overview · 2026–2027</p></div><span className="sos-chip">This year</span></div><div className="sos-chart"><div className="sos-y-labels"><span>1,500</span><span>1,000</span><span>500</span><span>0</span></div><div className="sos-bars">{bars.map((v, i) => <div className="sos-bar-wrap" key={i}><div className="sos-bar" style={{height: `${v}%`}}/><span>{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}</span></div>)}</div></div></section>
      <section className="sos-panel"><div className="sos-panel-heading"><div><h2>Today’s attendance</h2><p>Student attendance summary</p></div><CalendarCheck size={19}/></div><div className="sos-attendance"><div className="sos-donut"><div><strong>92%</strong><span>Present</span></div></div><div className="sos-legend"><span><i className="sos-dot present"/>Present <b>1,148</b></span><span><i className="sos-dot absent"/>Absent <b>82</b></span><span><i className="sos-dot leave"/>On leave <b>18</b></span></div></div><button className="sos-text-button" onClick={() => open("Student Attendance")}>View attendance <ArrowUpRight size={15}/></button></section>
      <section className="sos-panel"><div className="sos-panel-heading"><div><h2>Fee collection</h2><p>Current academic year</p></div><Wallet size={19}/></div><div className="sos-money">₹24,80,000</div><p className="sos-muted">Collected of ₹32,00,000 total fees</p><div className="sos-progress"><span style={{width:"77.5%"}}/></div><div className="sos-fee-foot"><span>77.5% collected</span><b>₹7,20,000 pending</b></div><button className="sos-text-button" onClick={() => open("Fee Collection")}>View collections <ArrowUpRight size={15}/></button></section>
      <section className="sos-panel"><div className="sos-panel-heading"><div><h2>Upcoming activities</h2><p>Keep track of school events</p></div><Clock size={19}/></div><div className="sos-event"><div className="sos-event-date"><b>18</b><span>OCT</span></div><div><strong>Quarterly Exam</strong><p>Grades 6–12 · Examination hall</p></div></div><div className="sos-event"><div className="sos-event-date"><b>21</b><span>OCT</span></div><div><strong>Parent–Teacher Meeting</strong><p>All classes · 9:00 AM</p></div></div><button className="sos-text-button" onClick={() => open("Exam Schedule")}>View schedule <ArrowUpRight size={15}/></button></section>
    </div>
    <section className="sos-panel sos-quick"><div className="sos-panel-heading"><div><h2>Quick actions</h2><p>Common school operations</p></div></div><div className="sos-quick-grid">{[["Add student","Students",Users],["Mark attendance","Student Attendance",CalendarCheck],["Collect fees","Fee Collection",Wallet],["Enter marks","Marks Entry",BookOpen],["Import data","Data Import Center",Upload]].map(([label,page,Icon]) => { const I = Icon as typeof School; return <button key={label as string} onClick={() => open(page as string)}><I size={20}/><span>{label as string}</span><ChevronRight size={15}/></button> })}</div></section>
  </div>;
}

function ImportCenter() {
  const [category, setCategory] = useState("Peoples");
  const [selected, setSelected] = useState("Students");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const categories: Record<string,string[]> = {
    School: ["School Profile","Academic Year","Departments"],
    Academic: ["Classes / Standards","Sections","Subjects"],
    Peoples: ["Students","Parents","Teachers","Staff","Drivers"],
    Attendance: ["Student Attendance","Teacher Attendance","Staff Attendance"],
    Fees: ["Fee Structure","Fee Collection","Fees Pending","Receipts"],
    Examination: ["Exam Schedule","Marks Entry","Results","Result Card"],
    Transport: ["Buses","Drivers","Routes","Stops"],
    Announcement: ["Announcements","Notifications"],
    Administration: ["Users & Roles","Permissions","Audit Logs"]
  };
  const headers = datasets[selected] || ["Name","Description"];
  const parseCSV = (text: string) => {
    const result: string[][] = [];
    let row: string[] = [], cell = "", quoted = false;
    const input = text.replace(/^\uFEFF/, "");
    for (let i=0; i<input.length; i++) {
      const c = input[i];
      if (c === '"' && quoted && input[i+1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = !quoted;
      else if (c === "," && !quoted) { row.push(cell.trim()); cell = ""; }
      else if ((c === "\n" || c === "\r") && !quoted) {
        if (c === "\r" && input[i+1] === "\n") i++;
        row.push(cell.trim()); if (row.some(v=>v!=="")) result.push(row);
        row=[]; cell="";
      } else cell += c;
    }
    row.push(cell.trim()); if (row.some(v=>v!=="")) result.push(row);
    return result;
  };
  const loadFile = async (f: File | undefined) => {
    setFile(f || null); setRows([]); setMessage(""); setError("");
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".csv")) { setError("Please upload a .csv file."); return; }
    try {
      const parsed = parseCSV(await f.text());
      if (parsed.length < 2) { setError("CSV must contain a header row and at least one data row."); return; }
      const incoming = parsed[0].map(x=>x.toLowerCase().replace(/[^a-z0-9]/g,""));
      const expected = headers.map(x=>x.toLowerCase().replace(/[^a-z0-9]/g,""));
      if (incoming.join("|") !== expected.join("|")) {
        setError(`Header mismatch. Download the ${selected} template and use its exact column names.`);
        setRows(parsed.slice(0,6)); return;
      }
      setRows(parsed.slice(1));
    } catch { setError("Could not read this CSV file."); }
  };
  return <div className="sos-content"><div className="sos-page-heading"><div><span className="sos-eyebrow">SETTINGS / DATA MANAGEMENT</span><h1>CSV Import Center</h1><p>Prepare, validate and preview module data before importing.</p></div></div>
    <div className="sos-import-steps"><div className="active"><span>1</span><b>Choose template</b></div><div><span>2</span><b>Upload CSV</b></div><div><span>3</span><b>Preview & validate</b></div><div><span>4</span><b>Import</b></div></div>
    <div className="sos-panel"><h2>1. Select module</h2><p className="sos-muted">Choose the destination module for your data.</p><div className="sos-category-grid">{Object.keys(categories).map(c=><button className={category===c?"selected":""} key={c} onClick={()=>{setCategory(c);setSelected(categories[c][0]);setFile(null);setRows([]);setError("");setMessage("");}}>{c}</button>)}</div><label className="sos-field-label">Data type</label><select className="sos-select" value={selected} onChange={e=>{setSelected(e.target.value);setFile(null);setRows([]);setError("");setMessage("");}}>{categories[category].map(x=><option key={x}>{x}</option>)}</select>
      <div className="sos-template-row"><div className="sos-template-icon"><FileSpreadsheet size={24}/></div><div className="sos-template-text"><b>{selected} template</b><p>{headers.join(" · ")}</p></div><button className="sos-button" onClick={()=>downloadCSV(selected,headers)}><Download size={16}/> Download CSV</button></div></div>
    <div className="sos-panel"><h2>2. Upload your completed CSV</h2><p className="sos-muted">Use the downloaded template. Column names and order must match exactly.</p><label className="sos-upload"><Upload size={25}/><b>Choose a CSV file</b><span>{file ? file.name : "Select a .csv file from your computer"}</span><input type="file" accept=".csv,text/csv" onChange={e=>void loadFile(e.target.files?.[0])}/></label>
      {error && <div className="sos-import-error"><AlertCircle size={17}/>{error}</div>}
      {rows.length>0 && <><h3>3. Preview & validation</h3><p className="sos-muted">{rows.length} data rows shown (maximum 5 in preview). Import is not connected to a backend yet.</p><div className="sos-table-wrap"><table className="sos-table"><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.slice(0,5).map((r,i)=><tr key={i}>{headers.map((_,j)=><td key={j}>{r[j] || <span className="sos-missing">Empty</span>}</td>)}</tr>)}</tbody></table></div><div className="sos-import-notice"><AlertCircle size={17}/>Preview only: no records have been saved. Duplicate detection and database import require backend integration.</div><button className="sos-button" onClick={()=>setMessage(`Preview validated: ${rows.length} rows, ${rows.filter(r=>r.length!==headers.length || r.some(c=>!c.trim())).length} rows with missing or extra values. No data was imported.`)}>Validate preview</button>{message&&<div className="sos-import-success"><CheckCircle2 size={17}/>{message}</div>}</>}
    </div>
  </div>;
}

function SettingsPage({ page }: { page: string }) {
  const [backup, setBackup] = useState("Not configured");
  const descriptions: Record<string,string> = {
    "CCTV / OpenCV Connection":"Configure the future integration for camera streams and computer-vision services.",
    "GPS Connection":"Configure provider credentials and GPS device integration.",
    "Storage Connection":"Configure document and media storage for school records.",
    "Server Connection":"Review application server and integration health.",
    Backups:"Set a backup schedule and review backup history.",
    "School Settings":"Manage school identity, academic preferences and system defaults."
  };
  const Icon = settingsItems.find(x=>x.name===page)?.icon || Settings;
  return <div className="sos-content"><div className="sos-page-heading"><div><span className="sos-eyebrow">CONFIGURATION</span><h1>{page}</h1><p>Manage your school system configuration.</p></div></div>
    {page==="Data Import Center" ? <ImportCenter/> : <div className="sos-panel sos-setting-detail"><div className="sos-setting-icon"><Icon size={30}/></div><h2>{page}</h2><p>{descriptions[page] || "Manage your school system preferences."}</p><div className="sos-setting-status"><span>Status</span><span className="sos-chip">Not connected</span></div>{page==="Backups" ? <><label className="sos-field-label">Backup schedule</label><select className="sos-select" value={backup} onChange={e=>setBackup(e.target.value)}><option>Not configured</option><option>Daily</option><option>Weekly</option><option>Monthly</option></select><button className="sos-button" onClick={()=>alert("Frontend preview only. Configure secure server-side backup before enabling this feature.")}>Save schedule</button></> : <button className="sos-button" onClick={()=>alert("Integration placeholder: credentials and secure backend connection will be configured in a later phase.")}>Configure connection</button>}<div className="sos-import-notice"><AlertCircle size={17}/>This is a frontend placeholder. No camera, GPS, server, storage or backup connection is active.</div></div>}
  </div>;
}

function ModulePage({ page }: { page: string }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const isReport = page.includes("Reports") || page==="Reports";
  const columns = datasets[page] || (isReport ? ["Report Name","Period","Status"] : ["Name","Reference ID","Status"]);
  const demo = page==="Students" ? [{Name:"Arun Kumar", "Reference ID":"STU001",Status:"Active"},{Name:"Priya R", "Reference ID":"STU002",Status:"Active"}] : page==="Teachers" ? [{Name:"Sample Teacher","Reference ID":"TCH001",Status:"Active"}] : [];
  const rows = [...demo, ...items.map((x,i)=>({Name:x,"Reference ID":`LOCAL-${i+1}`,Status:"Local preview"}))].filter(r=>Object.values(r).some(v=>String(v).toLowerCase().includes(search.toLowerCase())));
  return <div className="sos-content"><div className="sos-page-heading"><div><span className="sos-eyebrow">SCHOOL MANAGEMENT</span><h1>{page}</h1><p>Manage and review {page.toLowerCase()} records.</p></div><button className="sos-button sos-primary" onClick={()=>setShowForm(!showForm)}><Plus size={17}/>{isReport?"Generate report":"Add new"}</button></div>
    {showForm && <div className="sos-panel"><h2>{isReport?"Generate report":`Add ${page}`}</h2><p className="sos-muted">Frontend preview — this record is not saved to a database.</p><label className="sos-field-label">{isReport?"Report name":"Name"}</label><input className="sos-input" value={name} onChange={e=>setName(e.target.value)} placeholder={`Enter ${isReport?"report":"name"}`}/><div className="sos-form-actions"><button className="sos-button" onClick={()=>setShowForm(false)}>Cancel</button><button className="sos-button sos-primary" disabled={!name.trim()} onClick={()=>{setItems(p=>[...p,name.trim()]);setName("");setShowForm(false);}}>Add preview record</button></div></div>}
    <div className="sos-panel"><div className="sos-table-toolbar"><div><h2>{isReport?"Available reports":`${page} directory`}</h2><p className="sos-muted">{rows.length} preview records</p></div><div className="sos-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records..."/></div></div><div className="sos-table-wrap"><table className="sos-table"><thead><tr>{columns.slice(0,6).map(c=><th key={c}>{c}</th>)}<th>Actions</th></tr></thead><tbody>{rows.length ? rows.map((r,i)=><tr key={i}>{columns.slice(0,6).map(c=><td key={c}>{(r as Record<string,string>)[c] || "—"}</td>)}<td><button className="sos-row-action" onClick={()=>alert("Preview only. Backend CRUD and permission checks are not connected.")}>View</button></td></tr>) : <tr><td colSpan={Math.min(columns.length,6)+1}><div className="sos-empty"><FileText size={30}/><b>No records to display</b><span>Connect the backend or add a preview record to get started.</span></div></td></tr>}</tbody></table></div><p className="sos-table-foot"><Activity size={15}/> Sample data and local preview entries only · Backend integration pending</p></div>
  </div>;
}

export default function SchoolOS() {
  const [active, setActive] = useState("Dashboard");
  const [expanded, setExpanded] = useState("Dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const schoolName = "Smart Valley Matriculation Higher Secondary School";
  const isSettings = settingsOpen;
  const isImport = active === "Data Import Center";
  const current = useMemo(() => navigation.find(n=>n.children?.includes(active) || n.name===active)?.name || (isSettings?"Settings":"Dashboard"), [active,isSettings]);
  const navigate = (page:string) => { setActive(page); setSettingsOpen(page==="Data Import Center" || settingsItems.some(x=>x.name===page) || page==="School Settings"); setExpanded(navigation.find(n=>n.children?.includes(page) || n.name===page)?.name || ""); setMobileOpen(false); setGlobalSearch(""); };
  const goHome = () => { setActive("Dashboard"); setSettingsOpen(false); setExpanded("Dashboard"); setMobileOpen(false); };
  return <div className="sos-shell">
    {mobileOpen && <button className="sos-mobile-scrim" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/>}
    <aside className={`sos-sidebar ${mobileOpen?"mobile-open":""}`}>
      <div className="sos-brand"><div className="sos-brand-mark"><School size={24}/></div><div><strong>SSOS</strong><span>SMART SCHOOL OS</span></div><button className="sos-mobile-close" onClick={()=>setMobileOpen(false)}><X size={19}/></button></div>
      <button className="sos-school-switch" onClick={goHome}><div className="sos-school-avatar">SV</div><div><strong>Smart Valley School</strong><span>School ID: SSOS/2026/000127</span></div><ChevronDown size={15}/></button>
      <div className="sos-nav-label">WORKSPACE</div><nav className="sos-navigation">
        {navigation.map(item=>{const I=item.icon;const open=expanded===item.name;const selected=active===item.name || item.children?.includes(active);return <div key={item.name}><button className={`sos-nav-item ${selected&&!settingsOpen?"active":""}`} onClick={()=>{if(item.name==="Dashboard"&&item.children?.includes("Overview")){navigate("Dashboard");return;}setExpanded(open?"":item.name);if(!item.children?.length)navigate(item.name);else if(item.children.length===1)navigate(item.children[0]);}}><I size={18}/><span>{item.name}</span>{item.children?.length ? open?<ChevronDown size={15}/>:<ChevronRight size={15}/>:null}</button>{item.children && open && <div className="sos-subnav">{item.children.filter(c=>c!=="Overview").map(child=><button key={child} className={active===child?"active":""} onClick={()=>navigate(child)}>{child}</button>)}</div>}</div>})}
      </nav>
      <div className="sos-sidebar-bottom"><div className="sos-nav-label">SYSTEM</div><button className={`sos-nav-item ${settingsOpen?"active":""}`} onClick={()=>{setSettingsOpen(!settingsOpen);setActive("School Settings");setExpanded("");setMobileOpen(false);}}><Settings size={18}/><span>Settings</span>{settingsOpen?<ChevronDown size={15}/>:<ChevronRight size={15}/>}</button>{settingsOpen&&<div className="sos-subnav sos-settings-nav">{[{name:"School Settings",icon:Settings},...settingsItems].map(s=>{const I=s.icon;return <button key={s.name} className={active===s.name?"active":""} onClick={()=>navigate(s.name)}><I size={15}/>{s.name}</button>})}</div>}
        <div className="sos-user"><div className="sos-user-avatar">AD</div><div><strong>School Admin</strong><span>Administrator</span></div><button aria-label="Account options" onClick={()=>alert("Account profile and logout will be connected in the authentication phase.")}><LogOut size={17}/></button></div>
      </div>
    </aside>
    <main className="sos-main"><header className="sos-topbar"><button className="sos-mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button><div className="sos-breadcrumb"><span>SSOS</span><ChevronRight size={14}/><b>{settingsOpen?"Settings":current}</b>{active!=="Dashboard"&&active!=="School Settings"&&<><ChevronRight size={14}/><b>{active}</b></>}</div><div className="sos-topbar-right"><div className="sos-global-search"><Search size={16}/><input value={globalSearch} onChange={e=>setGlobalSearch(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){const target=[...navigation.flatMap(n=>[n.name,...(n.children||[])]),...settingsItems.map(s=>s.name),"School Settings"].find(v=>v.toLowerCase().includes(globalSearch.toLowerCase()));if(target)navigate(target);}}} placeholder="Find a module..."/></div><button className="sos-icon-button" title="Help" onClick={()=>alert("SSOS help center will be available in a later phase.")}><CircleHelp size={19}/></button><button className="sos-icon-button sos-notification" title="Notifications" onClick={()=>navigate("Notifications")}><Bell size={19}/><i/></button><div className="sos-top-avatar">AD</div></div></header>
      <div className="sos-context"><div><span className="sos-live-dot"/>Academic Year: <strong>2026–2027</strong></div><span>{schoolName}</span></div>
      {active==="Dashboard"&&!settingsOpen ? <Dashboard open={navigate}/> : isSettings||isImport ? <SettingsPage page={active}/> : <ModulePage page={active}/>}
      <footer className="sos-footer"><span>© 2026 SSOS · Smart School OS</span><span>School operations, centralized.</span></footer>
    </main>
  </div>;
}
