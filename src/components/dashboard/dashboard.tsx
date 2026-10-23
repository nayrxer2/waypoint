"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "../ui/icon";
import type { MockUser } from "../../lib/mock-user";

type Project = {
  name: string;
  category: string;
  progress: number;
  tasks: number;
  color: "sage" | "peach" | "lilac";
  initials: string[];
};

type Task = {
  id: number;
  title: string;
  detail: string;
  project: string;
  due: string;
  color: "sage" | "peach" | "lilac";
  done: boolean;
};

const initialProjects: Project[] = [
  { name: "Brand refresh", category: "Brand & identity", progress: 72, tasks: 18, color: "sage", initials: ["JD", "MK", "AL"] },
  { name: "Mobile app", category: "Product design", progress: 46, tasks: 24, color: "peach", initials: ["SC", "JD"] },
  { name: "Spring campaign", category: "Marketing", progress: 31, tasks: 12, color: "lilac", initials: ["AL", "MK", "SC"] },
];

const initialTasks: Task[] = [
  { id: 1, title: "Finalize homepage direction", detail: "Review the latest Figma explorations", project: "Brand refresh", due: "10:30 AM", color: "sage", done: false },
  { id: 2, title: "Share onboarding flow", detail: "Send a preview to the product team", project: "Mobile app", due: "12:00 PM", color: "peach", done: false },
  { id: 3, title: "Write campaign brief", detail: "Outline the launch story and key message", project: "Spring campaign", due: "2:30 PM", color: "lilac", done: false },
  { id: 4, title: "Collect stakeholder notes", detail: "Pull together feedback from Monday", project: "Brand refresh", due: "4:00 PM", color: "sage", done: true },
];

const navigation: { label: string; icon: IconName; badge?: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "My tasks", icon: "check", badge: "4" },
  { label: "Projects", icon: "layers" },
  { label: "Calendar", icon: "calendar" },
  { label: "Inbox", icon: "inbox", badge: "2" },
];

function AvatarStack({ people }: { people: string[] }) {
  return (
    <div className="avatar-stack" aria-label={`${people.length} project members`}>
      {people.map((person, index) => (
        <span className={`avatar avatar-${index + 1}`} key={person}>{person}</span>
      ))}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button className={`project-card ${project.color}`} onClick={onOpen} type="button">
      <div className="project-card-top">
        <span className="project-mark"><Icon name={project.color === "sage" ? "spark" : project.color === "peach" ? "layers" : "target"} size={17} /></span>
        <Icon name="dots" size={19} />
      </div>
      <p className="project-category">{project.category}</p>
      <h3>{project.name}</h3>
      <div className="project-progress-label"><span>{project.tasks} tasks</span><span>{project.progress}%</span></div>
      <div className="progress-track" aria-label={`${project.progress}% complete`}><span style={{ width: `${project.progress}%` }} /></div>
      <div className="project-card-footer"><AvatarStack people={project.initials} /><span><Icon name="arrow" size={15} /></span></div>
    </button>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  return (
    <article className={`task-row ${task.done ? "is-done" : ""}`}>
      <button
        aria-label={task.done ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}
        aria-pressed={task.done}
        className={`task-check ${task.done ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        type="button"
      >
        {task.done && <Icon name="check" size={13} strokeWidth={2.6} />}
      </button>
      <div className={`task-color ${task.color}`} />
      <div className="task-copy">
        <div className="task-title-line"><h3>{task.title}</h3><span>{task.due}</span></div>
        <p>{task.detail}</p>
        <span className={`task-project-tag ${task.color}`}>{task.project}</span>
      </div>
      <button className="icon-button task-more" type="button" aria-label={`More options for ${task.title}`}><Icon name="dots" size={18} /></button>
    </article>
  );
}

function ScheduleItem({ time, title, project, color }: { time: string; title: string; project: string; color: string }) {
  return (
    <div className="schedule-item">
      <span className="schedule-time">{time}</span>
      <span className={`schedule-dot ${color}`} />
      <div><p>{title}</p><span>{project}</span></div>
    </div>
  );
}

export default function Dashboard({ user }: { user: MockUser }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [activeNav, setActiveNav] = useState("Overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  // Keep theme state on this route so the dashboard never changes the welcome page theme.
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter both collections together so search always reflects the same workspace context.
  const filteredProjects = useMemo(
    () => projects.filter((project) => `${project.name} ${project.category}`.toLowerCase().includes(query.toLowerCase())),
    [projects, query],
  );
  const filteredTasks = useMemo(
    () => tasks.filter((task) => `${task.title} ${task.detail} ${task.project}`.toLowerCase().includes(query.toLowerCase())),
    [tasks, query],
  );

  function addProject() {
    // Keep this prototype's new projects in local UI state until a project API is connected.
    const project: Project = {
      name: `New project ${projects.length - initialProjects.length + 1}`,
      category: "Just getting started",
      progress: 0,
      tasks: 0,
      color: "lilac",
      initials: ["SC"],
    };
    setProjects((current) => [project, ...current]);
    setNotice(`${project.name} is ready for your ideas.`);
    window.setTimeout(() => setNotice(""), 3200);
  }

  function addTask() {
    // Create an independent task record so React can append it without mutating existing state.
    const task: Task = {
      id: Date.now(),
      title: "New task",
      detail: "Add a note to give this task more context",
      project: "Brand refresh",
      due: "No due time",
      color: "sage",
      done: false,
    };
    setTasks((current) => [task, ...current]);
    setNotice("Your new task has been added.");
    window.setTimeout(() => setNotice(""), 3200);
  }

  function toggleTask(id: number) {
    // Use a functional update because completion is derived from the latest task list.
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  async function signOut() {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        setNotice("We couldn't sign you out. Please try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setNotice("We couldn't reach the server. Please try signing out again.");
    }
  }

  const completedCount = tasks.filter((task) => task.done).length;
  const today = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

  return (
    <main className={`waypoint-dashboard${isDarkMode ? " dark" : ""}`}>
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Waypoint home">
          <span className="brand-symbol"><span /><span /><span /></span>
          <span>waypoint<span className="brand-period">.</span></span>
        </Link>

        <div className="workspace-switcher">
          <span className="workspace-avatar">{user.workspace.initials}</span>
          <span className="workspace-name"><strong>{user.workspace.name}</strong><small>{user.workspace.plan}</small></span>
          <span className="switch-chevron"><Icon name="chevron" size={15} /></span>
        </div>

        <div className="side-section-label">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              aria-label={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                if (item.label !== "Overview") setNotice(`${item.label} view selected`);
                window.setTimeout(() => setNotice(""), 2600);
              }}
              type="button"
            >
              <Icon name={item.icon} size={17} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="side-section-label projects-label">YOUR PROJECTS <button type="button" aria-label="Add project" onClick={addProject}><Icon name="plus" size={15} /></button></div>
        <div className="sidebar-projects">
          {projects.slice(0, 4).map((project) => (
            <button className="sidebar-project" key={project.name} onClick={() => setNotice(`${project.name} selected`)} type="button">
              <span className={`project-dot ${project.color}`} />{project.name}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <span className="upgrade-icon"><Icon name="spark" size={17} /></span>
            <strong>Make room for more</strong>
            <p>Bring your whole team into the flow.</p>
            <button type="button" onClick={() => setNotice("You’re on the list for Waypoint Pro.")}>Explore Pro <Icon name="arrow" size={14} /></button>
          </div>
          <button className="profile-button" type="button" onClick={signOut} aria-label={`Sign out ${user.name}`}>
            <span className="profile-avatar">{user.avatarInitials}</span>
            <span className="profile-name"><strong>{user.name}</strong><small>{user.title}</small></span>
            <span className="profile-sign-out">Sign out</span>
          </button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <button
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDarkMode}
              className="theme-toggle"
              onClick={() => setIsDarkMode((dark) => !dark)}
              type="button"
            >
              <span aria-hidden="true">{isDarkMode ? "☀" : "☾"}</span>
              <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
            </button>
            {searchOpen && (
              <label className="search-field">
                <Icon name="search" size={16} />
                <input autoFocus aria-label="Search your workspace" onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks and projects" value={query} />
                <button aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(""); }} type="button">Esc</button>
              </label>
            )}
            <button className="icon-button top-action" type="button" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><Icon name="search" /></button>
            <button className="icon-button top-action notification-button" type="button" aria-label="Notifications" onClick={() => setNotice("You’re all caught up.")}><Icon name="bell" /><span /></button>
            <button className="button-primary" type="button" onClick={addProject}><Icon name="plus" size={16} /> New project</button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> YOUR STUDIO, IN SYNC</p>
              <h1>Good morning, {user.firstName} <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">A little progress every day adds up to a lot.</p>
            </div>
            <div className="date-pill"><Icon name="calendar" size={15} /><span>{today}</span></div>
          </section>

          <section className="focus-banner">
            <div className="focus-icon"><Icon name="target" size={21} /></div>
            <div className="focus-copy"><span>YOUR DAILY FOCUS</span><strong>Make space for the work that matters.</strong></div>
            <div className="focus-progress"><span>{completedCount} of {tasks.length} tasks done</span><div><i style={{ width: `${Math.round((completedCount / Math.max(tasks.length, 1)) * 100)}%` }} /></div></div>
            <button aria-label="View your focus" className="focus-arrow" type="button" onClick={() => setActiveNav("My tasks")}><Icon name="arrow" size={17} /></button>
            <div className="focus-orb orb-one" /><div className="focus-orb orb-two" />
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div><p className="eyebrow">THE BIG PICTURE</p><h2>Projects in motion <span className="count-pill">{projects.length}</span></h2></div>
              <button className="text-button" onClick={() => setActiveNav("Projects")} type="button">All projects <Icon name="arrow" size={15} /></button>
            </div>
            <div className="project-grid">
              {filteredProjects.map((project) => <ProjectCard key={project.name} project={project} onOpen={() => setNotice(`${project.name} project opened`)} />)}
              {filteredProjects.length === 0 && <p className="empty-state">No projects match “{query}”. Try another search.</p>}
              <button className="new-project-card" onClick={addProject} type="button"><span><Icon name="plus" size={18} /></span><strong>Start something new</strong><small>A fresh space for your next idea</small></button>
            </div>
          </section>

          <div className="lower-grid">
            <section className="tasks-panel">
              <div className="section-heading task-heading">
                <div><p className="eyebrow">KEEP THE MOMENTUM</p><h2>Today’s tasks <span className="count-pill">{filteredTasks.filter((task) => !task.done).length}</span></h2></div>
                <button className="text-button" onClick={addTask} type="button"><Icon name="plus" size={15} /> Add task</button>
              </div>
              <div className="task-list">
                {filteredTasks.map((task) => <TaskRow key={task.id} task={task} onToggle={toggleTask} />)}
                {filteredTasks.length === 0 && <p className="empty-state">No tasks match “{query}”. Try another search.</p>}
              </div>
              <button className="all-tasks-button" onClick={() => setActiveNav("My tasks")} type="button">View all tasks <Icon name="arrow" size={15} /></button>
            </section>

            <aside className="right-column">
              <section className="stats-card">
                <div className="stats-head"><div><p className="eyebrow">YOUR WEEK SO FAR</p><h2>A steady pace</h2></div><button className="icon-button" aria-label="More weekly stats" type="button"><Icon name="dots" /></button></div>
                <div className="stats-number-row"><strong>24<span>h</span></strong><span className="trend-chip">↗ 12%</span><small>focused this week</small></div>
                <div className="chart" aria-label="Focus hours by day this week">
                  {[38, 57, 45, 80, 62, 92, 48].map((height, index) => (
                    <div className="chart-day" key={index}><span className={index === 5 ? "today-bar" : ""} style={{ height: `${height}%` }} /><small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small></div>
                  ))}
                </div>
              </section>

              <section className="schedule-card">
                <div className="schedule-heading"><div><p className="eyebrow">UP NEXT</p><h2>On your calendar</h2></div><button className="icon-button" aria-label="Open calendar" type="button" onClick={() => setActiveNav("Calendar")}><Icon name="arrow" size={16} /></button></div>
                <p className="schedule-date">TODAY <span>•</span> 3 THINGS PLANNED</p>
                <div className="schedule-list">
                  <ScheduleItem time="10:30" title="Creative check-in" project="Brand refresh" color="sage" />
                  <ScheduleItem time="12:00" title="Product sync" project="Mobile app" color="peach" />
                  <ScheduleItem time="2:30" title="Campaign review" project="Spring campaign" color="lilac" />
                </div>
                <button className="schedule-footer" onClick={() => setActiveNav("Calendar")} type="button">See your full calendar <Icon name="chevron" size={15} /></button>
              </section>
            </aside>
          </div>

          <footer className="dashboard-footer"><span>Small steps. Good work. ✳</span><span>Made for your next waypoint.</span></footer>
        </div>
      </section>

      {notice && <div className="toast" role="status"><span><Icon name="check" size={15} /></span>{notice}</div>}
    </main>
  );
}
