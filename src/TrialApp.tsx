import { useState } from "react";
import {
  LayoutDashboard,
  School,
  CalendarDays,
  Building2,
  GraduationCap,
  Layers3,
  BookOpen,
  Users,
  UserRound,
  UserCog,
  ClipboardCheck,
  Wallet,
  Receipt,
  FileText,
  Bus,
  Megaphone,
  Bell,
  BarChart3,
  ShieldCheck,
  Settings,
  Lock,
  Sparkles,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "./trial-app.css";

type Module = {
  name: string;
  icon: any;
  section: string;
  description: string;
};

const modules: Module[] = [
  { name: "Dashboard", icon: LayoutDashboard, section: "Overview", description: "School-wide operational overview and key statistics." },
  { name: "School Profile", icon: School, section: "School", description: "Manage school identity, contact information and academic details." },
  { name: "Academic Year", icon: CalendarDays, section: "School", description: "Manage academic years and active school periods." },
  { name: "Departments", icon: Building2, section: "School", description: "Manage academic and operational departments." },
  { name: "Classes", icon: GraduationCap, section: "Academic", description: "Manage standards and classes." },
  { name: "Sections", icon: Layers3, section: "Academic", description: "Manage class sections and student distribution." },
  { name: "Subjects", icon: BookOpen, section: "Academic", description: "Manage subjects and teacher assignments." },
  { name: "Students", icon: Users, section: "People", description: "Manage student profiles, academics and records." },
  { name: "Parents", icon: UserRound, section: "People", description: "Manage parents and linked students." },
  { name: "Teachers", icon: UserCog, section: "People", description: "Manage teachers, assignments and profiles." },
  { name: "Staff", icon: UserRound, section: "People", description: "Manage administrative and support staff." },
  { name: "Student Attendance", icon: ClipboardCheck, section: "Attendance", description: "Record and monitor student attendance." },
  { name: "Teacher Attendance", icon: ClipboardCheck, section: "Attendance", description: "Record and monitor teacher attendance." },
  { name: "Fee Structure", icon: Wallet, section: "Fees", description: "Configure fee categories and academic fee structures." },
  { name: "Fee Collection", icon: Wallet, section: "Fees", description: "Record school fee payments using demo payment methods." },
  { name: "Pending Fees", icon: Wallet, section: "Fees", description: "Track outstanding student fee balances." },
  { name: "Receipts", icon: Receipt, section: "Fees", description: "View and print demo payment receipts." },
  { name: "Exams", icon: FileText, section: "Examination", description: "Create and manage examinations." },
  { name: "Marks Entry", icon: FileText, section: "Examination", description: "Enter and review examination marks." },
  { name: "Results", icon: BarChart3, section: "Examination", description: "Generate student examination results." },
  { name: "Result Cards", icon: FileText, section: "Examination", description: "Preview printable student result cards." },
  { name: "Buses", icon: Bus, section: "Transport", description: "Manage school buses." },
  { name: "Drivers", icon: Bus, section: "Transport", description: "Manage transport drivers." },
  { name: "Routes", icon: Bus, section: "Transport", description: "Manage transport routes and stops." },
  { name: "Stops", icon: Bus, section: "Transport", description: "Manage route pickup and drop points." },
  { name: "Announcements", icon: Megaphone, section: "Communication", description: "Publish internal school announcements." },
  { name: "Notifications", icon: Bell, section: "Communication", description: "View internal school notifications." },
  { name: "Reports", icon: BarChart3, section: "Reports", description: "Explore school operational reports." },
  { name: "Users & Roles", icon: ShieldCheck, section: "Administration", description: "Manage demo users and role-based access." },
  { name: "Permissions", icon: Lock, section: "Administration", description: "Configure module permissions in the demo." },
  { name: "Audit Logs", icon: ShieldCheck, section: "Administration", description: "Review simulated administrative activity." },
  { name: "Settings", icon: Settings, section: "Administration", description: "Explore system and school settings." },
];

const comingSoon = [
  "SMS",
  "WhatsApp",
  "GPS",
  "Biometric",
  "CCTV",
  "Payment Gateway",
  "AI",
  "Advanced Analytics",
  "Push Notifications",
];

const demoStats = [
  ["Total Students", "486"],
  ["Teachers", "32"],
  ["Staff", "14"],
  ["Classes", "18"],
  ["Today's Attendance", "94.6%"],
  ["Pending Fees", "₹2.84L"],
];

const demoStudents = [
  ["STU-1001", "Arjun Kumar", "10-A", "Present"],
  ["STU-1002", "Ananya Raj", "9-B", "Present"],
  ["STU-1003", "Vignesh S", "12-A", "Absent"],
  ["STU-1004", "Harini M", "8-C", "Present"],
];

export default function DemoApp() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = modules.find((item) => item.name === active) ?? modules[0];
  const Icon = current.icon;

  const grouped = modules.reduce<Record<string, Module[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="demo-shell">
      <aside className={`demo-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="demo-brand">
          <div className="demo-logo">S</div>
          <div>
            <strong>Smart School OS</strong>
            <span>Demo Environment</span>
          </div>
        </div>

        <div className="demo-school">
          <School size={17} />
          <div>
            <strong>Smart Valley School</strong>
            <span>SSOS/2026/000127</span>
          </div>
        </div>

        <nav>
          {Object.entries(grouped).map(([section, items]) => (
            <div className="demo-nav-group" key={section}>
              <small>{section}</small>
              {items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.name}
                    className={active === item.name ? "active" : ""}
                    onClick={() => {
                      setActive(item.name);
                      setMobileOpen(false);
                    }}
                  >
                    <ItemIcon size={17} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          ))}

          <div className="demo-nav-group">
            <small>Coming Soon</small>
            {comingSoon.map((name) => (
              <button className="coming" key={name}>
                <Sparkles size={16} />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </nav>

        <button className="demo-exit" onClick={() => (window.location.href = "/")}>
          <LogOut size={17} />
          Exit Demo
        </button>
      </aside>

      <main className="demo-main">
        <header className="demo-topbar">
          <button className="demo-menu" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
          <div>
            <strong>{active}</strong>
            <span>Demo mode · Read-only environment</span>
          </div>
          <div className="demo-user">
            <div className="demo-avatar">D</div>
            <span>Demo Admin</span>
            <ChevronDown size={15} />
          </div>
        </header>

        <div className="demo-content">
          <div className="demo-mode-banner">
            <Sparkles size={18} />
            <div>
              <strong>You're exploring Smart School OS</strong>
              <span>This is a separate demo dataset. Your real school data is never modified.</span>
            </div>
          </div>

          {active === "Dashboard" ? (
            <>
              <div className="demo-heading">
                <div>
                  <span className="eyebrow">DEMO SCHOOL · 2026–2027</span>
                  <h1>School Dashboard</h1>
                  <p>Explore the complete Smart School OS experience.</p>
                </div>
              </div>

              <div className="demo-stats">
                {demoStats.map(([label, value]) => (
                  <div className="demo-stat" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="demo-grid">
                <section className="demo-card">
                  <div className="demo-card-head">
                    <div>
                      <h2>Recent Students</h2>
                      <p>Sample records from the isolated demo dataset.</p>
                    </div>
                    <Users size={20} />
                  </div>
                  <div className="demo-table">
                    {demoStudents.map((row) => (
                      <div className="demo-row" key={row[0]}>
                        <span>{row[0]}</span>
                        <strong>{row[1]}</strong>
                        <span>{row[2]}</span>
                        <span className="status">{row[3]}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="demo-card">
                  <div className="demo-card-head">
                    <div>
                      <h2>Explore Everything</h2>
                      <p>Use the sidebar to explore every SSOS module.</p>
                    </div>
                    <LayoutDashboard size={20} />
                  </div>
                  <div className="explore-list">
                    <div><Users size={18} /> People Management</div>
                    <div><ClipboardCheck size={18} /> Attendance</div>
                    <div><Wallet size={18} /> Fees & Receipts</div>
                    <div><FileText size={18} /> Exams & Results</div>
                    <div><Bus size={18} /> Transport</div>
                    <div><BarChart3 size={18} /> Reports</div>
                  </div>
                </section>
              </div>
            </>
          ) : (
            <section className="demo-module">
              <div className="module-icon"><Icon size={28} /></div>
              <span className="eyebrow">{current.section.toUpperCase()}</span>
              <h1>{current.name}</h1>
              <p>{current.description}</p>

              <div className="module-preview">
                <div>
                  <strong>Demo Preview</strong>
                  <span>Sample data is displayed from the isolated SSOS demo dataset.</span>
                </div>
                <button onClick={() => alert("Demo mode: this action is simulated.")}>
                  Explore Module
                </button>
              </div>

              <div className="demo-placeholder-grid">
                <div><strong>Demo Records</strong><span>Sample records ready</span></div>
                <div><strong>Access</strong><span>Demo Admin</span></div>
                <div><strong>Environment</strong><span>Isolated Demo</span></div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
