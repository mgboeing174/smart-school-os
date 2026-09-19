import { useState } from "react";
import { CalendarCheck, UserCheck, IndianRupee, Receipt, Clock3, Search, Plus, X, Printer } from "lucide-react";

type Module = "Student Attendance"|"Teacher Attendance"|"Fee Structure"|"Fee Collection"|"Pending Fees"|"Receipts";

const schoolId="SSOS/2026/000127";

const students=[
["STU001","Arun Kumar","10-A","Present","₹18,000","₹2,000"],
["STU002","Priya S","9-B","Present","₹20,000","₹0"],
["STU003","Rahul M","12-A","Absent","₹24,000","₹4,000"],
["STU004","Divya R","8-C","Present","₹19,000","₹1,500"],
["STU005","Vishal K","6-A","Present","₹16,000","₹0"],
["STU006","Ananya P","5-B","Present","₹16,000","₹2,500"],
];

const teachers=[
["TCH001","Meena Lakshmi","Mathematics","Present"],
["TCH002","Karthik R","Science","Present"],
["TCH003","Anitha S","English","Present"],
["TCH004","Ramesh B","Tamil","Absent"],
["TCH005","Priya M","Computer Science","Present"],
];

const fees=[
["FEE001","Tuition Fee","₹18,000","Annual"],
["FEE002","Transport Fee","₹12,000","Annual"],
["FEE003","Examination Fee","₹2,000","Annual"],
["FEE004","Computer Fee","₹1,500","Annual"],
["FEE005","Activity Fee","₹1,000","Annual"],
];

export default function Phase3(){
 const [module,setModule]=useState<Module>("Student Attendance");
 const [search,setSearch]=useState("");
 const [showPay,setShowPay]=useState(false);
 const [showReceipt,setShowReceipt]=useState(false);
 const [selected,setSelected]=useState<string[]>([]);
 const [saved,setSaved]=useState(false);

 const tabs=[
  ["Student Attendance",CalendarCheck],
  ["Teacher Attendance",UserCheck],
  ["Fee Structure",IndianRupee],
  ["Fee Collection",IndianRupee],
  ["Pending Fees",Clock3],
  ["Receipts",Receipt]
 ] as const;

 const filtered=module==="Student Attendance"||module==="Fee Collection"||module==="Pending Fees"
  ? students.filter(x=>x.join(" ").toLowerCase().includes(search.toLowerCase()))
  : module==="Teacher Attendance"
  ? teachers.filter(x=>x.join(" ").toLowerCase().includes(search.toLowerCase()))
  : fees.filter(x=>x.join(" ").toLowerCase().includes(search.toLowerCase()));

 const toggle=(id:string)=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);

 return <div className="p3-page">
  <header className="p3-header">
   <div className="p3-brand"><b>S</b><strong>SSOS</strong><span>Daily Operations</span></div>
   <span>{schoolId} · 2026–2027</span>
  </header>

  <main className="p3-content">
   <div className="p3-title">
    <div><h1>Daily Operations</h1><p>Attendance, fees, payments and receipts.</p></div>
    <div className="p3-date">19 September 2026</div>
   </div>

   <div className="p3-stats">
    <div><CalendarCheck/><span>Student Attendance</span><b>94.6%</b></div>
    <div><UserCheck/><span>Teacher Attendance</span><b>96.5%</b></div>
    <div><IndianRupee/><span>Today's Collection</span><b>₹48,500</b></div>
    <div><Clock3/><span>Pending Fees</span><b>₹1.84L</b></div>
   </div>

   <div className="p3-tabs">
    {tabs.map(([name,Icon])=><button key={name} className={module===name?"active":""} onClick={()=>{setModule(name);setSearch("");setSelected([])}}><Icon size={16}/>{name}</button>)}
   </div>

   <section className="p3-card">
    <div className="p3-toolbar">
     <div><h2>{module}</h2><small>{schoolId}</small></div>
     <div className="p3-toolbar-right">
      {module!=="Receipts"&&<div className="p3-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."/></div>}
      {module==="Fee Collection"&&<button className="p3-primary" onClick={()=>setShowPay(true)}><Plus size={16}/> Collect Fee</button>}
      {module==="Fee Structure"&&<button className="p3-primary"><Plus size={16}/> Add Fee</button>}
     </div>
    </div>

    {module==="Student Attendance"&&<AttendanceTable rows={filtered} selected={selected} toggle={toggle} type="student" saved={saved}/>}
    {module==="Teacher Attendance"&&<AttendanceTable rows={filtered} selected={selected} toggle={toggle} type="teacher" saved={saved}/>}
    {module==="Fee Structure"&&<FeeTable rows={filtered}/>}
    {module==="Fee Collection"&&<FeeTable rows={filtered} onPay={()=>setShowPay(true)}/>}
    {module==="Pending Fees"&&<FeeTable rows={filtered} pending onPay={()=>setShowPay(true)}/>}
    {module==="Receipts"&&<Receipts onOpen={()=>setShowReceipt(true)}/>}
   </section>

   {(module==="Student Attendance"||module==="Teacher Attendance")&&
    <button className="p3-save" onClick={()=>setSaved(true)}>{saved?"✓ Attendance Saved":"Save Attendance"}</button>}
  </main>

  {showPay&&<Payment onClose={()=>setShowPay(false)} onReceipt={()=>{setShowPay(false);setShowReceipt(true)}}/>}
  {showReceipt&&<ReceiptModal onClose={()=>setShowReceipt(false)}/>}
 </div>
}

function AttendanceTable({rows,selected,toggle,type,saved}:{rows:string[][],selected:string[],toggle:(x:string)=>void,type:string,saved:boolean}){
 return <div className="p3-table">
  <div className="p3-row p3-head"><span>ID</span><span>Name</span><span>{type==="student"?"Class":"Department"}</span><span>Attendance</span><span>Action</span></div>
  {rows.map(r=><div className="p3-row" key={r[0]}>
   <span>{r[0]}</span><strong>{r[1]}</strong><span>{r[2]}</span>
   <span className={r[3]==="Present"?"p3-present":"p3-absent"}>{r[3]}</span>
   <button className="p3-att-btn" onClick={()=>toggle(r[0])}>{selected.includes(r[0])?"Marked":"Mark Present"}</button>
  </div>)}
  {saved&&<div className="p3-success">Attendance saved successfully for {schoolId}.</div>}
 </div>
}

function FeeTable({rows,pending=false,onPay=()=>{}}:{rows:string[][],pending?:boolean,onPay?:()=>void}){
 if(rows.length&&rows[0].length===4)return <div className="p3-table">
  <div className="p3-row p3-head"><span>Fee ID</span><span>Category</span><span>Amount</span><span>Frequency</span><span>Status</span></div>
  {rows.map(r=><div className="p3-row" key={r[0]}><span>{r[0]}</span><strong>{r[1]}</strong><span>{r[2]}</span><span>{r[3]}</span><span className="p3-present">Active</span></div>)}
 </div>;

 return <div className="p3-table">
  <div className="p3-row p3-head"><span>ID</span><span>Student</span><span>Class</span><span>{pending?"Balance":"Total Fee"}</span><span>Action</span></div>
  {rows.map(r=><div className="p3-row" key={r[0]}><span>{r[0]}</span><strong>{r[1]}</strong><span>{r[2]}</span><span>{pending?r[5]:r[4]}</span><button className="p3-link" onClick={onPay}>{pending?"Pay Now":"Collect"}</button></div>)}
 </div>
}

function Receipts({onOpen}:{onOpen:()=>void}){
 return <div className="p3-table">
  <div className="p3-row p3-head"><span>Receipt</span><span>Student</span><span>Amount</span><span>Date</span><span>Action</span></div>
  {["RCT-2026-00091","RCT-2026-00090","RCT-2026-00089"].map((x,i)=><div className="p3-row" key={x}><span>{x}</span><strong>{["Arun Kumar","Priya S","Vishal K"][i]}</strong><span>{["₹5,000","₹10,000","₹4,500"][i]}</span><span>19 Sep 2026</span><button className="p3-link" onClick={onOpen}><Receipt size={14}/> View</button></div>)}
 </div>
}

function Payment({onClose,onReceipt}:{onClose:()=>void,onReceipt:()=>void}){
 return <div className="p3-overlay"><div className="p3-modal">
  <button className="p3-close" onClick={onClose}><X/></button>
  <h2>Collect Fee</h2><p>Record a simulated school payment.</p>
  <div className="p3-form">
   <label>Student<select><option>STU001 · Arun Kumar</option><option>STU002 · Priya S</option></select></label>
   <label>Fee Category<select><option>Tuition Fee</option><option>Transport Fee</option><option>Examination Fee</option></select></label>
   <label>Amount<input value="5000" readOnly/></label>
   <label>Payment Method<select><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option></select></label>
  </div>
  <button className="p3-primary p3-full" onClick={onReceipt}>Record Payment & Generate Receipt</button>
 </div></div>
}

function ReceiptModal({onClose}:{onClose:()=>void}){
 return <div className="p3-overlay"><div className="p3-modal p3-receipt">
  <button className="p3-close" onClick={onClose}><X/></button>
  <div className="p3-receipt-head"><b>S</b><div><h2>Smart Valley Matriculation Higher Secondary School</h2><small>{schoolId}</small></div></div>
  <hr/><h3>PAYMENT RECEIPT</h3>
  <div className="p3-receipt-grid"><span>Receipt No</span><b>RCT-2026-00092</b><span>Student</span><b>Arun Kumar (STU001)</b><span>Fee Type</span><b>Tuition Fee</b><span>Amount Paid</span><b>₹5,000</b><span>Payment Method</span><b>UPI</b><span>Date</span><b>19 Sep 2026</b></div>
  <button className="p3-primary p3-full" onClick={()=>window.print()}><Printer size={16}/> Print Receipt</button>
 </div></div>
}
