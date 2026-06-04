/* --- CORE JAVASCRIPT & STATE ENGINE --- */

// Define roles details and default users
const USER_PROFILES = {
  admin: {
    name: "Lê Hoàng Nam (Quản trị viên)",
    email: "namlh@poly.edu.vn",
    code: "ADMIN001",
    avatar: "LN",
    roleText: "Quản trị hệ thống",
    dept: "Phòng Đào Tạo"
  },
  lecturer: {
    name: "ThS. Nguyễn Thị Minh",
    email: "minhnt@poly.edu.vn",
    code: "GV0042",
    avatar: "NM",
    roleText: "Giảng viên hướng dẫn",
    dept: "Công nghệ thông tin"
  },
  student: {
    name: "Phạm Minh Hoàng",
    email: "hoangpmps24680@fpt.edu.vn",
    code: "PS24680",
    avatar: "MH",
    roleText: "Sinh viên thực hiện",
    class: "WD18302",
    dept: "Phát triển phần mềm"
  },
  committee: {
    name: "PGS.TS. Trần Trung Kiên",
    email: "kientt@poly.edu.vn",
    code: "HD0015",
    avatar: "TK",
    roleText: "Chủ tịch Hội đồng",
    dept: "Khoa CNTT"
  }
};

// Initial Mock Data
const DEFAULT_STUDENTS = [
  { id: 1, mssv: "PS24680", name: "Phạm Minh Hoàng", email: "hoangpmps24680@fpt.edu.vn", class: "WD18302", major: "Phát triển phần mềm", status: "Đang làm" },
  { id: 2, mssv: "PS25114", name: "Nguyễn Thảo Nguyên", email: "nguyenntps25114@fpt.edu.vn", class: "WD18301", major: "Thiết kế đồ họa", status: "Hoàn thành" },
  { id: 3, mssv: "PS23490", name: "Trần Anh Tuấn", email: "tuantaPS23490@fpt.edu.vn", class: "WD18302", major: "Phát triển phần mềm", status: "Đang làm" },
  { id: 4, mssv: "PS22041", name: "Đặng Thị Mai", email: "maidtps22041@fpt.edu.vn", class: "WD18303", major: "Lập trình máy tính", status: "Chưa bắt đầu" },
  { id: 5, mssv: "PS26771", name: "Vũ Hải Đăng", email: "dangvhps26771@fpt.edu.vn", class: "WD18301", major: "Thiết kế đồ họa", status: "Hoàn thành" },
  { id: 6, mssv: "PS24599", name: "Lê Cẩm Tú", email: "tulcps24599@fpt.edu.vn", class: "WD18302", major: "Ứng dụng phần mềm", status: "Chưa bắt đầu" },
  { id: 7, mssv: "PS28113", name: "Ngô Quốc Bảo", email: "baonqps28113@fpt.edu.vn", class: "WD18303", major: "Phát triển phần mềm", status: "Đang làm" }
];

const DEFAULT_LECTURERS = [
  { id: 1, mgv: "GV0042", name: "ThS. Nguyễn Thị Minh", email: "minhnt@poly.edu.vn", dept: "Công nghệ thông tin", specialization: "Web Development / AI", load: 4 },
  { id: 2, mgv: "GV0109", name: "ThS. Trần Văn Hùng", email: "hungtv@poly.edu.vn", dept: "Công nghệ thông tin", specialization: "Mobile Apps / IoT", load: 3 },
  { id: 3, mgv: "GV0076", name: "Cô Nguyễn Mai Anh", email: "anhnm@poly.edu.vn", dept: "Thiết kế đồ họa", specialization: "UI/UX & Branding", load: 5 },
  { id: 4, mgv: "GV0125", name: "ThS. Đỗ Hoàng Sơn", email: "sondh@poly.edu.vn", dept: "Ứng dụng phần mềm", specialization: "Cloud & Devops", load: 2 }
];

const DEFAULT_TOPICS = [
  { id: 1, code: "DT001", title: "Hệ thống Quản lý Đồ án Sinh viên (SaaS Dashboard)", tech: ["HTML5", "CSS3", "Vanilla JS", "Canvas"], desc: "Hệ thống hỗ trợ nhà trường, giảng viên quản lý toàn diện tiến độ làm đồ án tốt nghiệp của sinh viên, cho phép chấm điểm theo rubric và thảo luận nhóm.", lecturerId: 1, status: "Đang thực hiện" },
  { id: 2, code: "DT002", title: "Ứng dụng đặt đồ ăn trực tuyến PolyFood", tech: ["React Native", "NodeJS", "MongoDB"], desc: "Thiết kế và triển khai ứng dụng phân phối thức ăn nhanh trong phạm vi các cơ sở FPT Polytechnic, hỗ trợ ví điện tử và định vị shipper.", lecturerId: 2, status: "Đang thực hiện" },
  { id: 3, code: "DT003", title: "Thiết kế bộ nhận diện thương hiệu cho doanh nghiệp du lịch", tech: ["Illustrator", "Photoshop", "Figma"], desc: "Xây dựng hệ thống ấn phẩm truyền thông, bộ logo, hướng dẫn phong cách và thiết kế giao diện landing page cho du lịch sinh thái.", lecturerId: 3, status: "Hoàn thành" },
  { id: 4, code: "DT004", title: "Xây dựng hệ thống IoT Giám sát vườn rau thông minh", tech: ["Arduino", "Raspberry Pi", "Firebase"], desc: "Thiết kế phần cứng cảm biến độ ẩm, nhiệt độ đất và kích hoạt hệ thống tưới tự động qua Telegram bot.", lecturerId: 2, status: "Chờ phê duyệt" },
  { id: 5, code: "DT005", title: "Nền tảng tuyển dụng sinh viên PolyJobs", tech: ["NextJS", "NestJS", "PostgreSQL"], desc: "Cung cấp cổng kết nối thông tin thực tập giữa doanh nghiệp và sinh viên năm cuối, tự động gợi ý công việc dựa trên CV.", lecturerId: 1, status: "Chờ phê duyệt" }
];

const DEFAULT_GROUPS = [
  { id: 1, name: "Nhóm Phát triển Web 01", leaderId: 1, members: [1, 3], topicId: 1, progress: 65, status: "Active" },
  { id: 2, name: "Nhóm Thiết kế Brand 02", leaderId: 2, members: [2, 5], topicId: 3, progress: 100, status: "Completed" },
  { id: 3, name: "Nhóm Mobile App 03", leaderId: 7, members: [7], topicId: 2, progress: 40, status: "Active" },
  { id: 4, name: "Nhóm Lập trình IoT 04", leaderId: 4, members: [4, 6], topicId: 4, progress: 0, status: "Pending" }
];

const DEFAULT_TASKS = [
  { id: 1, groupId: 1, title: "Thiết kế Wireframe & Cơ sở dữ liệu", desc: "Vẽ sơ đồ ERD và thiết kế giao diện UI thô trên Figma", status: "done", dueDate: "2026-05-15", assigneeId: 1 },
  { id: 2, groupId: 1, title: "Xây dựng khung HTML/CSS Glassmorphism", desc: "Viết CSS variables và bộ khung layout dashboard chuẩn Apple", status: "progress", dueDate: "2026-06-05", assigneeId: 1 },
  { id: 3, groupId: 1, title: "Lập trình tương tác JS & Canvas Charts", desc: "Vẽ biểu đồ bằng Canvas, cấu hình switch role và bộ lọc bảng", status: "progress", dueDate: "2026-06-15", assigneeId: 3 },
  { id: 4, groupId: 1, title: "Viết báo cáo chương 1 và chương 2", desc: "Phân tích yêu cầu và thiết kế kiến trúc hệ thống", status: "done", dueDate: "2026-05-20", assigneeId: 3 },
  { id: 5, groupId: 1, title: "Tích hợp chấm điểm Rubric & Chạy thử", desc: "Hoàn thiện các rubrics chấm điểm, tối ưu hiệu năng", status: "todo", dueDate: "2026-06-30", assigneeId: 1 }
];

const DEFAULT_SCORES = [
  { groupId: 1, progress: 75, report: 70, code: 0, presentation: 0, comments: "Tiến độ tốt, giao diện bắt mắt nhưng cần hoàn thiện mã nguồn JS sớm.", finalGrade: 0 },
  { groupId: 2, progress: 100, report: 95, code: 90, presentation: 95, comments: "Đồ án rất xuất sắc, thiết kế chuyên nghiệp, thuyết trình thuyết phục.", finalGrade: 94 }
];

const DEFAULT_ACTIVITIES = [
  { id: 1, text: "ThS. Nguyễn Thị Minh đã nhận xét Đề tài DT001", type: "comment", time: "10 phút trước", user: "Nguyễn Thị Minh" },
  { id: 2, text: "Sinh viên Phạm Minh Hoàng đã tải lên tài liệu 'Báo cáo chương 1.docx'", type: "upload", time: "1 giờ trước", user: "Phạm Minh Hoàng" },
  { id: 3, text: "Lê Hoàng Nam đã cập nhật phân quyền hệ thống", type: "system", time: "3 giờ trước", user: "Lê Hoàng Nam" },
  { id: 4, text: "Hội đồng đã hoàn thành chấm điểm bảo vệ cho Nhóm Thiết kế Brand 02", type: "score", time: "1 ngày trước", user: "Trần Trung Kiên" }
];

const DEFAULT_COMMENTS = [
  { id: 1, author: "ThS. Nguyễn Thị Minh", text: "Giao diện Glassmorphism trông rất hiện đại và mượt mà. Hãy tập trung xử lý tiếp phần biểu đồ Canvas sao cho có animation đẹp mắt nhé.", time: "Hôm qua lúc 14:32" },
  { id: 2, author: "Phạm Minh Hoàng", text: "Dạ em đã cập nhật lại bảng CSS và tối ưu các hiệu ứng hover. Em sẽ nộp phần logic biểu đồ vào tuần sau ạ.", time: "Hôm qua lúc 16:05" }
];

// Database Wrapper
const DB = {
  students: [],
  lecturers: [],
  topics: [],
  groups: [],
  tasks: [],
  scores: [],
  activities: [],
  comments: [],

  init() {
    if (!localStorage.getItem("poly_project_db_initialized_v2")) {
      localStorage.setItem("poly_students", JSON.stringify(DEFAULT_STUDENTS));
      localStorage.setItem("poly_lecturers", JSON.stringify(DEFAULT_LECTURERS));
      localStorage.setItem("poly_topics", JSON.stringify(DEFAULT_TOPICS));
      localStorage.setItem("poly_groups", JSON.stringify(DEFAULT_GROUPS));
      localStorage.setItem("poly_tasks", JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem("poly_scores", JSON.stringify(DEFAULT_SCORES));
      localStorage.setItem("poly_activities", JSON.stringify(DEFAULT_ACTIVITIES));
      localStorage.setItem("poly_comments", JSON.stringify(DEFAULT_COMMENTS));
      localStorage.setItem("poly_project_db_initialized_v2", "true");
    }
    this.load();
  },

  load() {
    this.students = JSON.parse(localStorage.getItem("poly_students") || "[]");
    this.lecturers = JSON.parse(localStorage.getItem("poly_lecturers") || "[]");
    this.topics = JSON.parse(localStorage.getItem("poly_topics") || "[]");
    this.groups = JSON.parse(localStorage.getItem("poly_groups") || "[]");
    this.tasks = JSON.parse(localStorage.getItem("poly_tasks") || "[]");
    this.scores = JSON.parse(localStorage.getItem("poly_scores") || "[]");
    this.activities = JSON.parse(localStorage.getItem("poly_activities") || "[]");
    this.comments = JSON.parse(localStorage.getItem("poly_comments") || "[]");
  },

  save() {
    localStorage.setItem("poly_students", JSON.stringify(this.students));
    localStorage.setItem("poly_lecturers", JSON.stringify(this.lecturers));
    localStorage.setItem("poly_topics", JSON.stringify(this.topics));
    localStorage.setItem("poly_groups", JSON.stringify(this.groups));
    localStorage.setItem("poly_tasks", JSON.stringify(this.tasks));
    localStorage.setItem("poly_scores", JSON.stringify(this.scores));
    localStorage.setItem("poly_activities", JSON.stringify(this.activities));
    localStorage.setItem("poly_comments", JSON.stringify(this.comments));
  }
};

// Global App State
const AppState = {
  currentRole: "admin",
  activeView: "dashboard",
  isLoggedIn: false,
  studentTablePage: 1,
  studentTableLimit: 5,
  studentSortField: "id",
  studentSortOrder: "asc",
  studentFilterMajor: "all",
  studentSearchQuery: ""
};

// DOM Content Loader
document.addEventListener("DOMContentLoaded", () => {
  DB.init();
  setupEventListeners();
  checkLoginState();
  initTheme();
  initLoginParticles();
  initLoginParallax();
  
  // Pre-fill student credentials by default
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  if (usernameInput && passwordInput && !usernameInput.value) {
    usernameInput.value = "PS24680";
    passwordInput.value = "123";
    usernameInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
  }
});

// Check if user is logged in
function checkLoginState() {
  const logged = localStorage.getItem("poly_logged_in") === "true";
  AppState.isLoggedIn = logged;
  if (logged) {
    const savedRole = localStorage.getItem("poly_active_role") || "admin";
    AppState.currentRole = savedRole;
    document.getElementById("role-select").value = savedRole;
    
    const savedUser = localStorage.getItem("poly_current_user_profile");
    if (savedUser) {
      USER_PROFILES[savedRole] = JSON.parse(savedUser);
    }
    
    document.getElementById("login-page").style.display = "none";
    document.getElementById("app-shell-container").style.display = "flex";
    applyRoleRbac();
    router(AppState.activeView);
  } else {
    document.getElementById("login-page").style.display = "flex";
    document.getElementById("app-shell-container").style.display = "none";
  }
}

// Initialize Theme
function initTheme() {
  const savedTheme = localStorage.getItem("poly_theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.innerHTML = savedTheme === "light" 
      ? `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>` // Moon icon
      : `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`; // Sun icon
  }
}

// Toggle Dark / Light Theme
function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("poly_theme", newTheme);
  initTheme();
  
  // Re-draw charts in case colors need alignment
  if (AppState.activeView === "dashboard" || AppState.activeView === "reports") {
    setTimeout(renderCharts, 100);
  }
  showToast(`Đã chuyển sang chế độ ${newTheme === 'light' ? 'Sáng' : 'Tối'}`);
}

// Setup Event Listeners
function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin();
    });
  }

  // Segmented role pills listener
  document.querySelectorAll(".role-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      document.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
      e.currentTarget.classList.add("active");
      
      const role = e.currentTarget.getAttribute("data-role");
      const usernameInput = document.getElementById("username-input");
      const passwordInput = document.getElementById("password-input");
      
      if (usernameInput && passwordInput) {
        if (role === "student") {
          usernameInput.value = "PS24680";
          passwordInput.value = "123";
        } else if (role === "lecturer") {
          usernameInput.value = "GV0042";
          passwordInput.value = "123";
        } else if (role === "committee") {
          usernameInput.value = "HD0015";
          passwordInput.value = "123";
        } else if (role === "admin") {
          usernameInput.value = "ADMIN001";
          passwordInput.value = "123";
        }
        usernameInput.dispatchEvent(new Event("input"));
        passwordInput.dispatchEvent(new Event("input"));
      }
    });
  });

  // Sync Role Pill on manual input
  const usernameInput = document.getElementById("username-input");
  if (usernameInput) {
    usernameInput.addEventListener("input", (e) => {
      const val = e.target.value.trim().toUpperCase();
      let role = "";
      if (val.startsWith("PS")) role = "student";
      else if (val.startsWith("GV")) role = "lecturer";
      else if (val.startsWith("HD")) role = "committee";
      else if (val === "ADMIN" || val === "ADMIN001") role = "admin";

      if (role) {
        document.querySelectorAll(".role-pill").forEach(p => {
          if (p.getAttribute("data-role") === role) {
            p.classList.add("active");
          } else {
            p.classList.remove("active");
          }
        });
      }
    });
  }

  // Social logins mock
  document.querySelectorAll(".btn-oauth").forEach(btn => {
    btn.addEventListener("click", () => {
      showToast("Đang kết nối cổng xác thực SSO...");
      setTimeout(() => {
        // Auto-login as the default student via SSO
        DB.load();
        const found = DB.students.find(s => s.mssv === "PS24680");
        const activeUser = {
          name: found.name,
          email: found.email,
          code: found.mssv,
          avatar: found.name.split(" ").pop().substring(0, 2).toUpperCase(),
          roleText: "Sinh viên thực hiện",
          class: found.class,
          dept: found.major
        };
        USER_PROFILES["student"] = activeUser;
        localStorage.setItem("poly_logged_in", "true");
        localStorage.setItem("poly_active_role", "student");
        localStorage.setItem("poly_current_user_profile", JSON.stringify(activeUser));
        showToast(`Đăng nhập SSO thành công! Chào mừng, ${activeUser.name}`);
        checkLoginState();
      }, 1000);
    });
  });

  // Forgot Password Trigger
  const forgotLink = document.querySelector(".forgot-link");
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("forgot-password-modal");
      // Reset state inside forgot modal
      document.getElementById("forgot-step-1").style.display = "block";
      document.getElementById("forgot-step-2").style.display = "none";
      document.getElementById("forgot-identity").value = "";
      document.getElementById("forgot-otp").value = "";
      document.getElementById("forgot-new-password").value = "";
    });
  }

  // Sidebar Links
  document.querySelectorAll(".sidebar-link[data-view]").forEach(link => {
    link.addEventListener("click", (e) => {
      const view = e.currentTarget.getAttribute("data-view");
      router(view);
      
      // Close mobile drawer on navigation
      const sidebar = document.getElementById("sidebar-container");
      if (sidebar) sidebar.classList.remove("mobile-active");
    });
  });

  // Sidebar Collapse Toggler
  const sidebarToggle = document.getElementById("sidebar-toggle-btn");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const sidebar = document.getElementById("sidebar-container");
      if (sidebar) {
        sidebar.classList.toggle("collapsed");
        const isCollapsed = sidebar.classList.contains("collapsed");
        localStorage.setItem("poly_sidebar_collapsed", isCollapsed ? "true" : "false");
      }
    });
  }

  // Restore sidebar collapse state
  const sidebar = document.getElementById("sidebar-container");
  if (sidebar && localStorage.getItem("poly_sidebar_collapsed") === "true") {
    sidebar.classList.add("collapsed");
  }

  // Mobile Sidebar Drawer Toggler
  const mobileToggle = document.getElementById("mobile-sidebar-toggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const sidebar = document.getElementById("sidebar-container");
      if (sidebar) sidebar.classList.toggle("mobile-active");
    });
  }

  // Logout Button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.setItem("poly_logged_in", "false");
      checkLoginState();
      showToast("Đã đăng xuất hệ thống");
    });
  }

  // Role Swapper Select
  const roleSelect = document.getElementById("role-select");
  if (roleSelect) {
    roleSelect.addEventListener("change", (e) => {
      switchRole(e.target.value);
    });
  }

  // Theme Toggle Button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Notifications Toggle
  const notifyBtn = document.getElementById("notification-btn");
  if (notifyBtn) {
    notifyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = document.getElementById("notification-dropdown");
      if (menu) menu.style.display = menu.style.display === "block" ? "none" : "block";
      
      // Close other menus
      const qaMenu = document.getElementById("quick-actions-dropdown");
      if (qaMenu) qaMenu.style.display = "none";
      const profMenu = document.getElementById("header-profile-dropdown");
      if (profMenu) profMenu.style.display = "none";
    });
  }

  // Quick Actions Dropdown Toggle
  const quickActionsBtn = document.getElementById("quick-actions-btn");
  if (quickActionsBtn) {
    quickActionsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = document.getElementById("quick-actions-dropdown");
      if (menu) menu.style.display = menu.style.display === "block" ? "none" : "block";

      // Close other menus
      const notifyMenu = document.getElementById("notification-dropdown");
      if (notifyMenu) notifyMenu.style.display = "none";
      const profMenu = document.getElementById("header-profile-dropdown");
      if (profMenu) profMenu.style.display = "none";
    });
  }

  // User Profile Dropdown Toggle
  const profileTrigger = document.getElementById("header-profile-trigger");
  if (profileTrigger) {
    profileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = document.getElementById("header-profile-dropdown");
      if (menu) menu.style.display = menu.style.display === "block" ? "none" : "block";

      // Close other menus
      const notifyMenu = document.getElementById("notification-dropdown");
      if (notifyMenu) notifyMenu.style.display = "none";
      const qaMenu = document.getElementById("quick-actions-dropdown");
      if (qaMenu) qaMenu.style.display = "none";
    });
  }

  // Period filters clicks
  document.querySelectorAll("#apex-chart-filters .chart-selector-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("#apex-chart-filters .chart-selector-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderCharts();
    });
  });

  // Global Click Outside menu closer
  document.addEventListener("click", () => {
    const notifyMenu = document.getElementById("notification-dropdown");
    if (notifyMenu) notifyMenu.style.display = "none";
    
    const qaMenu = document.getElementById("quick-actions-dropdown");
    if (qaMenu) qaMenu.style.display = "none";
    
    const profMenu = document.getElementById("header-profile-dropdown");
    if (profMenu) profMenu.style.display = "none";
  });

  // Global search shortcut
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const search = document.getElementById("global-search");
      if (search) search.focus();
    }
  });

  // Modal Closers
  document.querySelectorAll(".modal-close-btn, .modal-cancel").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  // Global Search Input
  const globalSearch = document.getElementById("global-search");
  const globalResults = document.getElementById("global-search-results");
  if (globalSearch && globalResults) {
    globalSearch.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        globalResults.style.display = "none";
        return;
      }
      
      let html = "";
      
      // Search Students
      const matchStudents = DB.students.filter(s => 
        s.name.toLowerCase().includes(q) || s.mssv.toLowerCase().includes(q)
      ).slice(0, 3);
      
      if (matchStudents.length > 0) {
        html += `<div class="search-result-group">`;
        html += `<div class="search-result-group-title">Sinh viên</div>`;
        matchStudents.forEach(s => {
          html += `
            <div class="search-result-item" onclick="handleGlobalSearchClick('students', '${s.name}')">
              <span>👤 <strong>${s.mssv}</strong> - ${s.name}</span>
              <span class="search-result-item-desc">${s.class}</span>
            </div>
          `;
        });
        html += `</div>`;
      }
      
      // Search Lecturers
      const matchLecturers = DB.lecturers.filter(l => 
        l.name.toLowerCase().includes(q) || l.mgv.toLowerCase().includes(q)
      ).slice(0, 3);
      
      if (matchLecturers.length > 0) {
        html += `<div class="search-result-group">`;
        html += `<div class="search-result-group-title">Giảng viên</div>`;
        matchLecturers.forEach(l => {
          html += `
            <div class="search-result-item" onclick="handleGlobalSearchClick('lecturers', '${l.name}')">
              <span>👨‍🏫 <strong>${l.mgv}</strong> - ${l.name}</span>
              <span class="search-result-item-desc">${l.dept}</span>
            </div>
          `;
        });
        html += `</div>`;
      }
      
      // Search Topics
      const matchTopics = DB.topics.filter(t => 
        t.title.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)
      ).slice(0, 3);
      
      if (matchTopics.length > 0) {
        html += `<div class="search-result-group">`;
        html += `<div class="search-result-group-title">Đề tài đồ án</div>`;
        matchTopics.forEach(t => {
          html += `
            <div class="search-result-item" onclick="handleGlobalSearchClick('topics', '${t.title}')">
              <span>📝 <strong>${t.code}</strong> - ${t.title}</span>
            </div>
          `;
        });
        html += `</div>`;
      }
      
      if (html) {
        globalResults.innerHTML = html;
        globalResults.style.display = "flex";
      } else {
        globalResults.innerHTML = `<div style="padding: 10px; font-size: 0.8rem; color: var(--text-muted); text-align: center;">Không tìm thấy kết quả</div>`;
        globalResults.style.display = "flex";
      }
    });
    
    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!globalSearch.contains(e.target) && !globalResults.contains(e.target)) {
        globalResults.style.display = "none";
      }
    });
  }
}

// Router for SPA Tabs
function router(viewName) {
  AppState.activeView = viewName;
  
  // Update Active Link styling
  document.querySelectorAll(".sidebar-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Toggle Visibility of Sections
  document.querySelectorAll(".view-section").forEach(sec => {
    if (sec.id === `${viewName}-view`) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Load View Specific Contents
  switch (viewName) {
    case "dashboard":
      renderDashboard();
      break;
    case "students":
      renderStudents();
      break;
    case "lecturers":
      renderLecturers();
      break;
    case "topics":
      renderTopics();
      break;
    case "groups":
      renderGroups();
      break;
    case "progress":
      renderProgress();
      break;
    case "scoring":
      renderScoring();
      break;
    case "reports":
      renderReports();
      break;
    case "profile":
      renderProfile();
      break;
  }
}
window.router = router;


// Login Controller
function handleLogin() {
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const errorContainer = document.getElementById("login-error-message");
  const errorText = document.getElementById("login-error-text");
  const loginCard = document.querySelector(".login-card");
  const submitBtn = document.getElementById("btn-login-submit");

  const username = usernameInput?.value || "";
  const password = passwordInput?.value || "";
  const userClean = username.trim().toUpperCase();

  // Reset error states
  if (errorContainer) {
    errorContainer.style.display = "none";
  }
  if (loginCard) {
    loginCard.classList.remove("animate-shake");
  }

  // Reload database to ensure newly added users can log in
  DB.load();

  // Helper function to update submit button loader state
  function setSubmitting(isSubmitting) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector(".btn-text");
    const spinner = submitBtn.querySelector(".login-spinner");
    if (isSubmitting) {
      submitBtn.disabled = true;
      if (btnText) btnText.innerText = "Đang xác thực...";
      if (spinner) spinner.style.display = "inline-block";
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.innerText = "Đăng nhập";
      if (spinner) spinner.style.display = "none";
    }
  }

  // Enter loading state
  setSubmitting(true);

  // Simulate API response delay for premium SaaS feel
  setTimeout(() => {
    // 1. Password Verification
    const customPasswords = JSON.parse(localStorage.getItem("poly_custom_passwords") || "{}");
    const customPass = customPasswords[userClean] || "";
    const isCustomValid = customPass && password === customPass;
    const isDefaultValid = ["123", "123456", "admin", "poly", "poly123"].includes(password.toLowerCase());

    if (!password || (!isDefaultValid && !isCustomValid)) {
      setSubmitting(false);
      showLoginError("Mật khẩu không chính xác!");
      return;
    }

    // 2. Username Verification and Role Resolution
    let role = "";
    let activeUser = null;

    if (userClean === "ADMIN" || userClean === "ADMIN001") {
      role = "admin";
      activeUser = { ...USER_PROFILES.admin };
    } else if (userClean.startsWith("PS")) {
      role = "student";
      const found = DB.students.find(s => s.mssv === userClean);
      if (found) {
        activeUser = {
          name: found.name,
          email: found.email,
          code: found.mssv,
          avatar: found.name.split(" ").pop().substring(0, 2).toUpperCase(),
          roleText: "Sinh viên thực hiện",
          class: found.class,
          dept: found.major
        };
      } else {
        setSubmitting(false);
        showLoginError("Mã sinh viên không tồn tại trên hệ thống!");
        return;
      }
    } else if (userClean.startsWith("GV")) {
      role = "lecturer";
      const found = DB.lecturers.find(l => l.mgv === userClean);
      if (found) {
        activeUser = {
          name: found.name,
          email: found.email,
          code: found.mgv,
          avatar: found.name.split(" ").pop().substring(0, 2).toUpperCase(),
          roleText: "Giảng viên hướng dẫn",
          dept: found.dept
        };
      } else {
        setSubmitting(false);
        showLoginError("Mã giảng viên không tồn tại trên hệ thống!");
        return;
      }
    } else if (userClean === "HD0015" || userClean === "HD") {
      role = "committee";
      activeUser = { ...USER_PROFILES.committee };
    } else {
      setSubmitting(false);
      showLoginError("Tài khoản không tồn tại trên hệ thống!");
      return;
    }

    // Login successful
    USER_PROFILES[role] = activeUser;
    
    localStorage.setItem("poly_logged_in", "true");
    localStorage.setItem("poly_active_role", role);
    localStorage.setItem("poly_current_user_profile", JSON.stringify(activeUser));
    
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";

    setSubmitting(false);
    showToast(`Chào mừng trở lại, ${activeUser.name}!`);
    checkLoginState();
  }, 1000);
}

function showLoginError(msg) {
  const errorContainer = document.getElementById("login-error-message");
  const errorText = document.getElementById("login-error-text");
  const loginCard = document.querySelector(".login-card");

  if (errorContainer && errorText) {
    errorText.innerText = msg;
    errorContainer.style.display = "flex";
  }
  
  if (loginCard) {
    loginCard.classList.remove("animate-shake");
    void loginCard.offsetWidth; // force reflow
    loginCard.classList.add("animate-shake");
  }
}

// --- FORGOT PASSWORD CONTROLLERS ---
window.sendForgotPasswordOTP = function() {
  const identityInput = document.getElementById("forgot-identity");
  const identity = identityInput?.value.trim();
  if (!identity) {
    showToast("Vui lòng nhập Email hoặc Mã số tài khoản!");
    if (identityInput) identityInput.focus();
    return;
  }

  const btnSend = document.getElementById("btn-send-otp");
  if (btnSend) {
    btnSend.innerText = "Đang gửi...";
    btnSend.disabled = true;
  }

  // Simulate server sending email/OTP
  setTimeout(() => {
    if (btnSend) {
      btnSend.innerText = "Gửi mã OTP";
      btnSend.disabled = false;
    }
    
    document.getElementById("forgot-step-1").style.display = "none";
    document.getElementById("forgot-step-2").style.display = "block";
    showToast("Mã OTP khôi phục mật khẩu đã được gửi! (Sử dụng mã 123456)");
  }, 1200);
};

window.backToStep1 = function() {
  document.getElementById("forgot-step-1").style.display = "block";
  document.getElementById("forgot-step-2").style.display = "none";
};

window.handleForgotPasswordSubmit = function() {
  const identityInput = document.getElementById("forgot-identity");
  const identity = identityInput?.value.trim().toUpperCase();
  const otp = document.getElementById("forgot-otp")?.value.trim();
  const newPassword = document.getElementById("forgot-new-password")?.value.trim();

  if (otp !== "123456") {
    showToast("Mã OTP không chính xác! Hãy nhập 123456");
    return;
  }

  if (!newPassword || newPassword.length < 3) {
    showToast("Mật khẩu mới phải dài từ 3 ký tự trở lên!");
    return;
  }

  // Save new custom password
  const customPasswords = JSON.parse(localStorage.getItem("poly_custom_passwords") || "{}");
  customPasswords[identity] = newPassword;
  localStorage.setItem("poly_custom_passwords", JSON.stringify(customPasswords));

  showToast(`Đặt lại mật khẩu thành công cho tài khoản ${identity}!`);
  closeModal();
};

// Switch Role Controller
function switchRole(role) {
  AppState.currentRole = role;
  localStorage.setItem("poly_active_role", role);
  applyRoleRbac();
  showToast(`Đã chuyển đổi quyền xem thành: ${USER_PROFILES[role].roleText}`);
  router("dashboard");
}

// Apply RBAC Rules
function applyRoleRbac() {
  const user = USER_PROFILES[AppState.currentRole];
  
  // Update Navbar Profile Card
  const profileName = document.getElementById("navbar-user-name");
  const profileRole = document.getElementById("navbar-user-role");
  const profileAvatar = document.getElementById("navbar-user-avatar");
  
  if (profileName) profileName.innerText = user.name;
  if (profileRole) profileRole.innerText = user.roleText;
  if (profileAvatar) profileAvatar.innerText = user.avatar;
  
  // Update Sidebar Avatar Details
  const sbName = document.getElementById("sb-user-name");
  const sbRole = document.getElementById("sb-user-role");
  const sbAvatar = document.getElementById("sb-user-avatar");
  
  if (sbName) sbName.innerText = user.name.split(" (")[0];
  if (sbRole) sbRole.innerText = user.roleText;
  if (sbAvatar) sbAvatar.innerText = user.avatar;

  // RBAC Link Restrictions (Notion Simplicity style - we show links based on capabilities)
  const isStudent = AppState.currentRole === "student";
  const isLecturer = AppState.currentRole === "lecturer";
  const isCommittee = AppState.currentRole === "committee";
  const isAdmin = AppState.currentRole === "admin";

  // Hide/Show Admin features
  toggleSidebarLink("students", isAdmin || isLecturer);
  toggleSidebarLink("lecturers", isAdmin);
  toggleSidebarLink("topics", true); // All can view, actions will be limited
  toggleSidebarLink("groups", true);
  toggleSidebarLink("progress", true);
  toggleSidebarLink("scoring", isAdmin || isLecturer || isCommittee);
  toggleSidebarLink("reports", isAdmin || isLecturer);
}

function toggleSidebarLink(view, shouldShow) {
  const el = document.querySelector(`.sidebar-link[data-view='${view}']`);
  if (el) {
    el.style.display = shouldShow ? "flex" : "none";
  }
}

// Show Alert Banner (Toast)
function showToast(msg) {
  const toast = document.getElementById("toast-banner");
  if (!toast) return;
  toast.querySelector(".toast-text").innerText = msg;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 4000);
}

// Modal open/close helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal() {
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.classList.remove("active");
  });
}

/* --- DASHBOARD RENDERER --- */
// Global chart instances tracking
let mainChartInstance = null;
let barChartInstance = null;

function renderDashboard() {
  DB.load();
  
  // Calculate analytics
  const totalStudents = DB.students.length;
  const totalLecturers = DB.lecturers.length;
  const totalTopics = DB.topics.length;
  const completedProjects = DB.topics.filter(t => t.status === "Hoàn thành").length;
  
  // Write KPIs
  document.getElementById("kpi-students").innerText = totalStudents;
  document.getElementById("kpi-lecturers").innerText = totalLecturers;
  document.getElementById("kpi-topics").innerText = totalTopics;
  document.getElementById("kpi-completed").innerText = completedProjects;

  // Render activities list
  const listEl = document.getElementById("dashboard-activities");
  if (listEl) {
    listEl.innerHTML = DB.activities.map(act => {
      let iconColor = "rgba(59, 130, 246, 0.15)";
      let strokeColor = "var(--secondary)";
      if (act.type === "upload") { iconColor = "rgba(139, 92, 246, 0.15)"; strokeColor = "var(--accent)"; }
      if (act.type === "score") { iconColor = "rgba(34, 197, 94, 0.15)"; strokeColor = "var(--success)"; }
      if (act.type === "comment") { iconColor = "rgba(249, 115, 22, 0.15)"; strokeColor = "var(--primary)"; }
      if (act.type === "system") { iconColor = "rgba(239, 68, 68, 0.15)"; strokeColor = "var(--danger)"; }

      const initials = act.user ? act.user.split(" ").pop().substring(0, 2).toUpperCase() : "US";
      const cleanedText = act.user ? act.text.replace(act.user, "").trim() : act.text;

      return `
        <div class="activity-item">
          <div class="activity-avatar" style="background: ${iconColor}; color: ${strokeColor}; border: 1.5px solid ${strokeColor}">${initials}</div>
          <div class="activity-content">
            <div class="activity-title"><strong>${act.user || "Hệ thống"}</strong> ${cleanedText}</div>
            <div class="activity-time">${act.time}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Calculate Kanban summary widgets
  const proposedCount = DB.topics.filter(t => t.status === "Chờ phê duyệt").length;
  const approvedCount = DB.topics.filter(t => t.status === "Đang thực hiện" || t.status === "Hoàn thành").length;
  const progressCount = DB.groups.filter(g => g.status === "Active" && g.progress < 100).length;
  const completedCount = DB.groups.filter(g => g.status === "Completed" || g.progress === 100).length;
  
  const totalSummary = proposedCount + approvedCount + progressCount + completedCount || 1;
  
  const setBarWidth = (valElId, barElId, count) => {
    const valEl = document.getElementById(valElId);
    const barEl = document.getElementById(barElId);
    if (valEl) valEl.innerText = count;
    if (barEl) {
      const pct = Math.round((count / totalSummary) * 100);
      barEl.style.width = pct + "%";
    }
  };
  
  setBarWidth("kb-proposed-count", "kb-proposed-bar", proposedCount);
  setBarWidth("kb-approved-count", "kb-approved-bar", approvedCount);
  setBarWidth("kb-progress-count", "kb-progress-bar", progressCount);
  setBarWidth("kb-completed-count", "kb-completed-bar", completedCount);

  // Quick stats values
  const activeGroupsEl = document.getElementById("qs-active-groups");
  if (activeGroupsEl) activeGroupsEl.innerText = DB.groups.filter(g => g.status === "Active").length;
  
  const pendingReviewsEl = document.getElementById("qs-pending-reviews");
  if (pendingReviewsEl) pendingReviewsEl.innerText = DB.topics.filter(t => t.status === "Chờ phê duyệt").length;

  // Render Apex charts
  setTimeout(renderCharts, 50);
}

// Custom High-Fidelity ApexCharts Area & Column Drawers
function renderCharts() {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.08)";
  const textColor = isDark ? "#94A3B8" : "#64748B";

  // Data mapping for different periods
  const periodData = {
    "Fall 2026": [15, 30, 45, 55, 75, 85],
    "Summer 2026": [10, 25, 40, 60, 80, 95],
    "Spring 2027": [5, 15, 20, 35, 50, 65]
  };

  const activePeriod = document.querySelector("#apex-chart-filters .chart-selector-btn.active")?.getAttribute("data-period") || "Fall 2026";
  const selectedSeries = periodData[activePeriod] || periodData["Fall 2026"];

  // 1. Apex Area Chart for Project Progress
  const areaChartEl = document.getElementById("apex-main-chart");
  if (areaChartEl) {
    areaChartEl.innerHTML = ""; // Clear wrapper
    
    const areaOptions = {
      series: [{
        name: 'Tiến độ hoàn thành',
        data: selectedSeries
      }],
      chart: {
        type: 'area',
        height: 250,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        background: 'transparent'
      },
      colors: ['#F97316'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
      },
      theme: { mode: isDark ? 'dark' : 'light' },
      xaxis: {
        categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5', 'Tuần 6'],
        labels: {
          style: {
            colors: textColor,
            fontFamily: 'Inter, sans-serif'
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function(val) { return val + "%"; },
          style: {
            colors: textColor,
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: function(val) { return val + "% tiến độ"; }
        }
      }
    };

    if (mainChartInstance) {
      mainChartInstance.destroy();
    }
    mainChartInstance = new ApexCharts(areaChartEl, areaOptions);
    mainChartInstance.render();
  }

  // 2. Apex Column Bar Chart for majors
  const barChartEl = document.getElementById("apex-bar-chart");
  if (barChartEl) {
    barChartEl.innerHTML = "";
    
    const barOptions = {
      series: [{
        name: 'Số lượng đồ án',
        data: [18, 12, 8, 15] 
      }],
      chart: {
        type: 'bar',
        height: 220,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '45%',
          distributed: false
        }
      },
      colors: ['#8B5CF6'], 
      dataLabels: { enabled: false },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
      },
      theme: { mode: isDark ? 'dark' : 'light' },
      xaxis: {
        categories: ['CNTT', 'Đồ họa', 'Ứng dụng', 'Lập trình'],
        labels: {
          style: {
            colors: textColor,
            fontFamily: 'Inter, sans-serif'
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          style: {
            colors: textColor,
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light'
      }
    };

    if (barChartInstance) {
      barChartInstance.destroy();
    }
    barChartInstance = new ApexCharts(barChartEl, barOptions);
    barChartInstance.render();
  }
}

/* --- STUDENT MANAGEMENT RENDERER --- */
function renderStudents() {
  DB.load();
  
  // Search filter major, search query
  let filtered = [...DB.students];
  
  if (AppState.studentSearchQuery) {
    const q = AppState.studentSearchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.mssv.toLowerCase().includes(q) || 
      s.email.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q)
    );
  }
  
  if (AppState.studentFilterMajor !== "all") {
    filtered = filtered.filter(s => s.major === AppState.studentFilterMajor);
  }
  
  // Sort
  filtered.sort((a, b) => {
    let valA = a[AppState.studentSortField];
    let valB = b[AppState.studentSortField];
    
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    
    if (valA < valB) return AppState.studentSortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return AppState.studentSortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Pagination
  const total = filtered.length;
  const startIdx = (AppState.studentTablePage - 1) * AppState.studentTableLimit;
  const paged = filtered.slice(startIdx, startIdx + AppState.studentTableLimit);
  const totalPages = Math.ceil(total / AppState.studentTableLimit) || 1;
  
  // Render html rows
  const tbody = document.getElementById("student-table-body");
  if (tbody) {
    if (paged.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">Không tìm thấy dữ liệu sinh viên</td></tr>`;
    } else {
      tbody.innerHTML = paged.map(s => {
        let statusBadgeClass = "badge-primary";
        if (s.status === "Hoàn thành") statusBadgeClass = "badge-success";
        if (s.status === "Chưa bắt đầu") statusBadgeClass = "badge-warning";
        
        return `
          <tr>
            <td><strong>${s.mssv}</strong></td>
            <td>
              <div class="table-student-cell">
                <div class="user-avatar" style="width:28px; height:28px; font-size: 0.75rem;">${s.name.split(" ").pop().substring(0,2).toUpperCase()}</div>
                <div><strong>${s.name}</strong></div>
              </div>
            </td>
            <td style="color:var(--text-muted)">${s.email}</td>
            <td>${s.class}</td>
            <td><span class="badge badge-accent" style="font-size:0.7rem; padding: 2px 8px">${s.major}</span></td>
            <td><span class="badge ${statusBadgeClass}">${s.status}</span></td>
            <td>
              <div class="table-actions">
                <button class="btn-icon btn-icon-edit" onclick="openEditStudent(${s.id})" title="Chỉnh sửa"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                <button class="btn-icon btn-icon-delete" onclick="deleteStudent(${s.id})" title="Xóa"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // Update numbers info
  const startNum = total === 0 ? 0 : startIdx + 1;
  const endNum = Math.min(startIdx + AppState.studentTableLimit, total);
  const infoEl = document.getElementById("student-table-info");
  if (infoEl) {
    infoEl.innerText = `Hiển thị ${startNum}-${endNum} trong số ${total} sinh viên`;
  }

  // Setup Pagination state
  const prevBtn = document.getElementById("student-page-prev");
  const nextBtn = document.getElementById("student-page-next");
  if (prevBtn) prevBtn.disabled = AppState.studentTablePage === 1;
  if (nextBtn) nextBtn.disabled = AppState.studentTablePage === totalPages;
  
  // Attach search event
  const searchInp = document.getElementById("student-search");
  if (searchInp && !searchInp.dataset.bound) {
    searchInp.addEventListener("input", (e) => {
      AppState.studentSearchQuery = e.target.value;
      AppState.studentTablePage = 1;
      renderStudents();
    });
    searchInp.dataset.bound = "true";
  }

  // Attach filter event
  const filterMaj = document.getElementById("student-filter-major");
  if (filterMaj && !filterMaj.dataset.bound) {
    filterMaj.addEventListener("change", (e) => {
      AppState.studentFilterMajor = e.target.value;
      AppState.studentTablePage = 1;
      renderStudents();
    });
    filterMaj.dataset.bound = "true";
  }
}

// Student CRUD Handlers
window.openAddStudent = function() {
  document.getElementById("student-modal-title").innerText = "Thêm Sinh Viên Mới";
  document.getElementById("student-id-field").value = "";
  document.getElementById("student-form").reset();
  openModal("student-crud-modal");
};

window.openEditStudent = function(id) {
  const std = DB.students.find(s => s.id === id);
  if (!std) return;
  
  document.getElementById("student-modal-title").innerText = "Chỉnh Sửa Thông Tin Sinh Viên";
  document.getElementById("student-id-field").value = std.id;
  document.getElementById("std-mssv").value = std.mssv;
  document.getElementById("std-name").value = std.name;
  document.getElementById("std-email").value = std.email;
  document.getElementById("std-class").value = std.class;
  document.getElementById("std-major").value = std.major;
  document.getElementById("std-status").value = std.status;
  
  openModal("student-crud-modal");
};

window.saveStudent = function(e) {
  const form = document.getElementById("student-form");
  const idVal = document.getElementById("student-id-field").value;
  
  const stdData = {
    mssv: document.getElementById("std-mssv").value,
    name: document.getElementById("std-name").value,
    email: document.getElementById("std-email").value,
    class: document.getElementById("std-class").value,
    major: document.getElementById("std-major").value,
    status: document.getElementById("std-status").value
  };

  if (idVal) {
    // Edit Mode
    const index = DB.students.findIndex(s => s.id === parseInt(idVal));
    if (index !== -1) {
      DB.students[index] = { ...DB.students[index], ...stdData };
      showToast(`Đã chỉnh sửa thông tin của ${stdData.name}`);
    }
  } else {
    // Add Mode
    const newId = DB.students.reduce((max, s) => s.id > max ? s.id : max, 0) + 1;
    DB.students.push({ id: newId, ...stdData });
    showToast(`Đã thêm thành công sinh viên ${stdData.name}`);
  }
  
  DB.save();
  closeModal();
  renderStudents();
};

window.deleteStudent = function(id) {
  const std = DB.students.find(s => s.id === id);
  if (!std) return;
  if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${std.name} (${std.mssv})?`)) {
    DB.students = DB.students.filter(s => s.id !== id);
    DB.save();
    showToast(`Đã xóa sinh viên ${std.name}`);
    renderStudents();
  }
};

window.changeStudentPage = function(dir) {
  AppState.studentTablePage += dir;
  renderStudents();
};

// Sort Student Table
window.sortStudents = function(field) {
  if (AppState.studentSortField === field) {
    AppState.studentSortOrder = AppState.studentSortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    AppState.studentSortField = field;
    AppState.studentSortOrder = 'asc';
  }
  renderStudents();
};

// Import/Export excel emulation
window.exportExcelStudents = function() {
  let csv = "Mã SV,Họ tên,Email,Lớp,Ngành,Trạng thái\n";
  DB.students.forEach(s => {
    csv += `"${s.mssv}","${s.name}","${s.email}","${s.class}","${s.major}","${s.status}"\n`;
  });
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `Danh_sach_sinh_vien_${Date.now()}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Đã xuất danh sách Excel thành công!");
};

window.importExcelStudents = function() {
  const mockCsv = prompt(
    "Dán chuỗi CSV dữ liệu sinh viên vào đây (Mẫu: MSSV,Họ Tên,Email,Lớp,Ngành,Trạng thái):",
    "PS29999,Nguyễn Văn Mẫu,maunv@fpt.edu.vn,WD18302,Phát triển phần mềm,Chưa bắt đầu"
  );
  if (mockCsv) {
    const parts = mockCsv.split(",");
    if (parts.length >= 5) {
      const newId = DB.students.reduce((max, s) => s.id > max ? s.id : max, 0) + 1;
      DB.students.push({
        id: newId,
        mssv: parts[0].trim(),
        name: parts[1].trim(),
        email: parts[2].trim(),
        class: parts[3].trim(),
        major: parts[4].trim(),
        status: parts[5]?.trim() || "Chưa bắt đầu"
      });
      DB.save();
      showToast("Đã nhập thành công sinh viên từ Excel!");
      renderStudents();
    } else {
      alert("Định dạng CSV không hợp lệ!");
    }
  }
};


/* --- LECTURER MANAGEMENT RENDERER --- */
function renderLecturers() {
  DB.load();
  const grid = document.getElementById("lecturer-grid-container");
  if (grid) {
    grid.innerHTML = DB.lecturers.map(gv => {
      // Calculate capacity progress bar color
      const capacityPct = (gv.load / 5) * 100;
      let barFillColor = "fill-green";
      if (gv.load >= 5) barFillColor = "fill-orange";
      else if (gv.load >= 3) barFillColor = "fill-blue";

      return `
        <div class="glass-card lecturer-card">
          <div class="lecturer-avatar-wrap">
            <div class="lecturer-avatar-large">${gv.name.split(" ").pop().substring(0,1)}</div>
            <div class="lecturer-info-wrap">
              <div class="lecturer-name">${gv.name}</div>
              <div class="lecturer-dept">${gv.dept}</div>
            </div>
          </div>
          <div class="lecturer-meta-list">
            <div class="lecturer-meta-item">
              <span class="meta-label">Mã số GV:</span>
              <span class="meta-value">${gv.mgv}</span>
            </div>
            <div class="lecturer-meta-item">
              <span class="meta-label">Email:</span>
              <span class="meta-value" style="font-size:0.75rem">${gv.email}</span>
            </div>
            <div class="lecturer-meta-item">
              <span class="meta-label">Chuyên môn:</span>
              <span class="meta-value">${gv.specialization}</span>
            </div>
            <div class="lecturer-meta-item" style="flex-direction:column; align-items:flex-start; gap:4px; margin-top:8px;">
              <div style="display:flex; justify-content:space-between; width:100%; font-size:0.8rem">
                <span class="meta-label">Đang hướng dẫn:</span>
                <span class="meta-value"><strong>${gv.load} / 5</strong> Đồ án</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill ${barFillColor}" style="width: ${capacityPct}%"></div>
              </div>
            </div>
          </div>
          <div style="display:flex; gap:10px">
            <button class="btn btn-secondary btn-small" onclick="openAssignLecturer(${gv.id})">Phân công</button>
            <button class="btn btn-secondary btn-small" onclick="openEditLecturer(${gv.id})">Sửa</button>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.openAddLecturer = function() {
  document.getElementById("lecturer-modal-title").innerText = "Thêm Giảng Viên Mới";
  document.getElementById("lecturer-id-field").value = "";
  document.getElementById("lecturer-form").reset();
  openModal("lecturer-crud-modal");
};

window.openEditLecturer = function(id) {
  const gv = DB.lecturers.find(l => l.id === id);
  if (!gv) return;
  
  document.getElementById("lecturer-modal-title").innerText = "Chỉnh Sửa Thông Tin Giảng Viên";
  document.getElementById("lecturer-id-field").value = gv.id;
  document.getElementById("gv-mgv").value = gv.mgv;
  document.getElementById("gv-name").value = gv.name;
  document.getElementById("gv-email").value = gv.email;
  document.getElementById("gv-dept").value = gv.dept;
  document.getElementById("gv-specialization").value = gv.specialization;
  
  openModal("lecturer-crud-modal");
};

window.saveLecturer = function() {
  const idVal = document.getElementById("lecturer-id-field").value;
  
  const gvData = {
    mgv: document.getElementById("gv-mgv").value,
    name: document.getElementById("gv-name").value,
    email: document.getElementById("gv-email").value,
    dept: document.getElementById("gv-dept").value,
    specialization: document.getElementById("gv-specialization").value,
    load: idVal ? DB.lecturers.find(l => l.id === parseInt(idVal)).load : 0
  };

  if (idVal) {
    // Edit
    const index = DB.lecturers.findIndex(l => l.id === parseInt(idVal));
    if (index !== -1) {
      DB.lecturers[index] = { ...DB.lecturers[index], ...gvData };
      showToast(`Đã chỉnh sửa giảng viên ${gvData.name}`);
    }
  } else {
    // Add
    const newId = DB.lecturers.reduce((max, l) => l.id > max ? l.id : max, 0) + 1;
    DB.lecturers.push({ id: newId, ...gvData });
    showToast(`Đã thêm thành công giảng viên ${gvData.name}`);
  }
  
  DB.save();
  closeModal();
  renderLecturers();
};

window.openAssignLecturer = function(id) {
  const gv = DB.lecturers.find(l => l.id === id);
  if (!gv) return;
  
  // Custom quick assignment
  const newLoad = prompt(`Cập nhật số lượng đồ án đang hướng dẫn cho Thầy/Cô ${gv.name}: (Tối đa 5)`, gv.load);
  if (newLoad !== null) {
    const num = parseInt(newLoad);
    if (!isNaN(num) && num >= 0 && num <= 10) {
      gv.load = num;
      DB.save();
      showToast(`Đã cập nhật số lượng đồ án đang hướng dẫn!`);
      renderLecturers();
    } else {
      alert("Số lượng không hợp lệ!");
    }
  }
};


/* --- TOPIC MANAGEMENT RENDERER --- */
function renderTopics() {
  DB.load();
  const container = document.getElementById("topics-grid-container");
  if (container) {
    const isStudent = AppState.currentRole === "student";
    const isLecturer = AppState.currentRole === "lecturer";
    const isAdmin = AppState.currentRole === "admin";
    
    container.innerHTML = DB.topics.map(t => {
      const gv = DB.lecturers.find(l => l.id === t.lecturerId) || { name: "Chưa phân công" };
      
      let badgeClass = "badge-primary";
      if (t.status === "Hoàn thành") badgeClass = "badge-success";
      if (t.status === "Chờ phê duyệt") badgeClass = "badge-warning";
      
      // Control buttons based on role RBAC
      let actHtml = "";
      if (isAdmin || isLecturer) {
        if (t.status === "Chờ phê duyệt") {
          actHtml = `
            <button class="btn btn-secondary btn-small" style="border-color:var(--success); color:var(--success)" onclick="approveTopic(${t.id}, 'approved')">Duyệt</button>
            <button class="btn btn-secondary btn-small" style="border-color:var(--danger); color:var(--danger)" onclick="approveTopic(${t.id}, 'rejected')">Từ chối</button>
          `;
        } else {
          actHtml = `
            <button class="btn btn-secondary btn-small" onclick="openEditTopic(${t.id})">Sửa</button>
            <button class="btn btn-secondary btn-small" style="border-color:var(--danger); color:var(--danger)" onclick="deleteTopic(${t.id})">Xóa</button>
          `;
        }
      } else if (isStudent && t.status === "Đang thực hiện") {
        actHtml = `
          <button class="btn btn-primary btn-small" onclick="registerTopic(${t.id})">Đăng ký đề tài</button>
        `;
      }

      return `
        <div class="glass-card topic-card">
          <div>
            <div class="topic-header">
              <span class="badge badge-accent">${t.code}</span>
              <span class="badge ${badgeClass}">${t.status}</span>
            </div>
            <div class="topic-title">${t.title}</div>
            <div class="topic-desc">${t.desc}</div>
            <div class="topic-tech-list">
              ${t.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
            </div>
          </div>
          <div class="topic-footer">
            <div class="topic-lecturer">
              <div class="topic-lecturer-avatar">${gv.name.split(" ").pop().substring(0,1)}</div>
              <div>${gv.name}</div>
            </div>
            <div class="topic-actions">
              ${actHtml}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.openAddTopic = function() {
  document.getElementById("topic-modal-title").innerText = "Đề Xuất Đề Tài Mới";
  document.getElementById("topic-id-field").value = "";
  document.getElementById("topic-form").reset();
  
  // Fill lecturers select
  const sel = document.getElementById("tp-lecturer");
  if (sel) {
    sel.innerHTML = DB.lecturers.map(l => `<option value="${l.id}">${l.name}</option>`).join("");
  }
  openModal("topic-crud-modal");
};

window.openEditTopic = function(id) {
  const t = DB.topics.find(top => top.id === id);
  if (!t) return;
  
  document.getElementById("topic-modal-title").innerText = "Chỉnh Sửa Đề Tài";
  document.getElementById("topic-id-field").value = t.id;
  document.getElementById("tp-code").value = t.code;
  document.getElementById("tp-title").value = t.title;
  document.getElementById("tp-tech").value = t.tech.join(", ");
  document.getElementById("tp-desc").value = t.desc;
  document.getElementById("tp-status").value = t.status;
  
  const sel = document.getElementById("tp-lecturer");
  if (sel) {
    sel.innerHTML = DB.lecturers.map(l => `<option value="${l.id}" ${l.id === t.lecturerId ? 'selected' : ''}>${l.name}</option>`).join("");
  }
  
  openModal("topic-crud-modal");
};

window.saveTopic = function() {
  const idVal = document.getElementById("topic-id-field").value;
  
  const tpData = {
    code: document.getElementById("tp-code").value,
    title: document.getElementById("tp-title").value,
    tech: document.getElementById("tp-tech").value.split(",").map(i => i.trim()),
    desc: document.getElementById("tp-desc").value,
    lecturerId: parseInt(document.getElementById("tp-lecturer").value),
    status: document.getElementById("tp-status").value
  };

  if (idVal) {
    // Edit
    const index = DB.topics.findIndex(top => top.id === parseInt(idVal));
    if (index !== -1) {
      DB.topics[index] = { ...DB.topics[index], ...tpData };
      showToast(`Đã cập nhật đề tài ${tpData.title}`);
    }
  } else {
    // Add
    const newId = DB.topics.reduce((max, top) => top.id > max ? top.id : max, 0) + 1;
    DB.topics.push({ id: newId, ...tpData });
    showToast(`Đã thêm thành công đề tài ${tpData.title}`);
  }
  
  DB.save();
  closeModal();
  renderTopics();
};

window.approveTopic = function(id, action) {
  const t = DB.topics.find(top => top.id === id);
  if (!t) return;
  
  if (action === 'approved') {
    t.status = "Đang thực hiện";
    showToast(`Đã phê duyệt đề tài ${t.code} vào hệ thống!`);
  } else {
    t.status = "Bị từ chối";
    showToast(`Đã từ chối đề tài ${t.code}`);
  }
  DB.save();
  renderTopics();
};

window.registerTopic = function(id) {
  const t = DB.topics.find(top => top.id === id);
  if (!t) return;
  
  if (confirm(`Bạn muốn đăng ký thực hiện đề tài "${t.title}"?`)) {
    // Simulate group creation or binding
    const student = USER_PROFILES.student;
    
    // Check if group already exists
    const groupIndex = DB.groups.findIndex(g => g.leaderId === 1); // 1 is Hoàng
    if (groupIndex !== -1) {
      DB.groups[groupIndex].topicId = t.id;
      showToast(`Đã đăng ký đồ án thành công! Đang chờ Giảng viên phê duyệt nhóm.`);
    } else {
      const newId = DB.groups.reduce((max, g) => g.id > max ? g.id : max, 0) + 1;
      DB.groups.push({
        id: newId,
        name: "Nhóm " + student.name,
        leaderId: 1,
        members: [1],
        topicId: t.id,
        progress: 0,
        status: "Active"
      });
      showToast(`Đã tạo nhóm và đăng ký đề tài thành công!`);
    }
    DB.save();
    router("groups");
  }
};


/* --- GROUP MANAGEMENT RENDERER --- */
function renderGroups() {
  DB.load();
  const listEl = document.getElementById("groups-list-container");
  if (listEl) {
    listEl.innerHTML = DB.groups.map(g => {
      const leader = DB.students.find(s => s.id === g.leaderId) || { name: "Unknown" };
      const topic = DB.topics.find(t => t.id === g.topicId) || { title: "Chưa chọn đề tài", code: "N/A" };
      
      const memberNames = g.members.map(mid => {
        const s = DB.students.find(std => std.id === mid);
        return s ? s.name : "Unknown";
      }).join(", ");

      return `
        <div class="glass-card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:12px">
          <div style="display:flex; justify-content:space-between; align-items:center">
            <h3 style="font-weight: 700; font-size:1.1rem">${g.name}</h3>
            <span class="badge ${g.status === 'Completed' ? 'badge-success' : 'badge-primary'}">${g.status}</span>
          </div>
          <div style="font-size:0.88rem; color:var(--text-muted)">
            <p style="margin-bottom:4px"><strong style="color:var(--text-main)">Trưởng nhóm:</strong> ${leader.name} (${leader.mssv})</p>
            <p style="margin-bottom:4px"><strong style="color:var(--text-main)">Thành viên:</strong> ${memberNames}</p>
            <p style="margin-bottom:4px"><strong style="color:var(--text-main)">Đề tài:</strong> [${topic.code}] ${topic.title}</p>
          </div>
          <div style="margin-top:6px">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px">
              <span>Tiến độ thực hiện:</span>
              <strong>${g.progress}%</strong>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill fill-orange" style="width: ${g.progress}%"></div>
            </div>
          </div>
          <div style="display:flex; gap:10px; margin-top:8px; flex-wrap:wrap">
            ${(AppState.currentRole === 'lecturer' || AppState.currentRole === 'admin') && g.status === 'Pending' ? `
              <button class="btn btn-primary btn-small" onclick="approveGroup(${g.id}, 'Active')" style="background:var(--success); border-color:var(--success)">Duyệt nhóm</button>
              <button class="btn btn-secondary btn-small" style="color:var(--danger); border-color:var(--danger)" onclick="approveGroup(${g.id}, 'Rejected')">Từ chối</button>
            ` : ''}
            <button class="btn btn-secondary btn-small" onclick="openManageMembers(${g.id})">Thành viên</button>
            <button class="btn btn-secondary btn-small" onclick="openLinkTopic(${g.id})">Chọn đề tài</button>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.openCreateGroup = function() {
  const grpName = prompt("Nhập tên nhóm đồ án muốn tạo:", "Nhóm Đồ án Mới");
  if (grpName) {
    const newId = DB.groups.reduce((max, g) => g.id > max ? g.id : max, 0) + 1;
    DB.groups.push({
      id: newId,
      name: grpName,
      leaderId: AppState.currentRole === "student" ? 1 : 3, // mock leader
      members: [AppState.currentRole === "student" ? 1 : 3],
      topicId: 0,
      progress: 0,
      status: "Active"
    });
    DB.save();
    showToast(`Đã tạo nhóm đồ án "${grpName}" thành công!`);
    renderGroups();
  }
};

window.openManageMembers = function(groupId) {
  const grp = DB.groups.find(g => g.id === groupId);
  if (!grp) return;
  
  const mssvStr = prompt(`Quản lý thành viên nhóm ${grp.name}. Nhập MSSV sinh viên muốn thêm vào nhóm:`);
  if (mssvStr) {
    const std = DB.students.find(s => s.mssv.toUpperCase() === mssvStr.trim().toUpperCase());
    if (std) {
      if (grp.members.includes(std.id)) {
        alert("Sinh viên này đã ở trong nhóm!");
      } else {
        grp.members.push(std.id);
        DB.save();
        showToast(`Đã thêm ${std.name} vào nhóm ${grp.name}!`);
        renderGroups();
      }
    } else {
      alert("Không tìm thấy sinh viên có MSSV này!");
    }
  }
};

window.openLinkTopic = function(groupId) {
  const grp = DB.groups.find(g => g.id === groupId);
  if (!grp) return;
  
  // List topics available
  const available = DB.topics.filter(t => t.status === "Đang thực hiện");
  if (available.length === 0) {
    alert("Không có đề tài nào khả dụng để thực hiện!");
    return;
  }
  
  const listStr = available.map((t, idx) => `${idx + 1}. [${t.code}] ${t.title}`).join("\n");
  const choice = prompt(`Chọn đề tài cho nhóm ${grp.name}:\n\n${listStr}\n\nNhập số thứ tự đề tài muốn chọn:`);
  if (choice) {
    const idx = parseInt(choice) - 1;
    if (idx >= 0 && idx < available.length) {
      grp.topicId = available[idx].id;
      DB.save();
      showToast(`Đã liên kết đề tài thành công!`);
      renderGroups();
    } else {
      alert("Lựa chọn không hợp lệ!");
    }
  }
};


// Helper function to get student record
function getCurrentStudent() {
  if (AppState.currentRole !== "student") return null;
  const userProfile = USER_PROFILES.student;
  return DB.students.find(s => s.mssv === userProfile.code);
}

// Helper function to get student's active group
function getCurrentStudentGroup() {
  const std = getCurrentStudent();
  if (!std) return null;
  return DB.groups.find(g => g.members.includes(std.id));
}

/* --- PROGRESS TRACKER RENDERER (KANBAN) --- */
function renderProgress() {
  DB.load();
  
  const isStudent = AppState.currentRole === "student";
  let tasks = [];
  let group = null;
  
  if (isStudent) {
    group = getCurrentStudentGroup();
    if (!group) {
      // Show empty state for students without a group
      const kanbanBoard = document.querySelector(".kanban-board");
      if (kanbanBoard) kanbanBoard.style.display = "none";
      const uploadContainer = document.querySelector(".upload-container");
      if (uploadContainer) uploadContainer.closest("div").style.display = "none";
      
      // Show message banner
      const progView = document.getElementById("progress-view");
      let emptyEl = document.getElementById("progress-empty-state");
      if (!emptyEl) {
        emptyEl = document.createElement("div");
        emptyEl.id = "progress-empty-state";
        emptyEl.className = "glass-card";
        emptyEl.style.padding = "3rem";
        emptyEl.style.textAlign = "center";
        emptyEl.style.marginBottom = "2rem";
        emptyEl.innerHTML = `
          <div style="font-size:3rem; margin-bottom:1rem">📁</div>
          <h3 style="font-weight:700; font-size:1.2rem; margin-bottom:0.5rem">Bạn chưa có nhóm đồ án</h3>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem">Bạn cần tham gia hoặc tạo mới một nhóm đồ án tại tab "Nhóm đồ án" để bắt đầu theo dõi tiến độ công việc.</p>
          <button class="btn btn-primary" onclick="router('groups')" style="max-width:200px; margin:0 auto">Đi đến Nhóm đồ án</button>
        `;
        progView.insertBefore(emptyEl, progView.querySelector(".kanban-board"));
      } else {
        emptyEl.style.display = "block";
      }
      return;
    } else {
      const emptyEl = document.getElementById("progress-empty-state");
      if (emptyEl) emptyEl.style.display = "none";
      const kanbanBoard = document.querySelector(".kanban-board");
      if (kanbanBoard) kanbanBoard.style.display = "grid";
      const uploadContainer = document.querySelector(".upload-container");
      if (uploadContainer) uploadContainer.closest("div").style.display = "block";
      
      tasks = DB.tasks.filter(t => t.groupId === group.id);
    }
  } else {
    const emptyEl = document.getElementById("progress-empty-state");
    if (emptyEl) emptyEl.style.display = "none";
    const kanbanBoard = document.querySelector(".kanban-board");
    if (kanbanBoard) kanbanBoard.style.display = "grid";
    const uploadContainer = document.querySelector(".upload-container");
    if (uploadContainer) uploadContainer.closest("div").style.display = "block";
    
    tasks = DB.tasks.filter(t => t.groupId === 1); // Default to group 1
  }
  
  // Render Kanban Columns
  renderKanbanCol("todo", tasks.filter(t => t.status === "todo"));
  renderKanbanCol("progress", tasks.filter(t => t.status === "progress"));
  renderKanbanCol("done", tasks.filter(t => t.status === "done"));

  // Render Mentor Comment Thread
  const listComments = document.getElementById("comments-thread");
  if (listComments) {
    listComments.innerHTML = DB.comments.map(c => `
      <div class="glass-card comment-card">
        <div class="comment-avatar">${c.author.split(" ").pop().substring(0,1)}</div>
        <div class="comment-bubble">
          <div class="comment-meta">
            <span class="comment-author">${c.author}</span>
            <span class="comment-time">${c.time}</span>
          </div>
          <div class="comment-body">${c.text}</div>
        </div>
      </div>
    `).join("");
  }
}

function renderKanbanCol(colId, list) {
  const col = document.getElementById(`kanban-col-${colId}`);
  if (!col) return;
  
  col.querySelector(".column-count").innerText = list.length;
  const cardsWrap = col.querySelector(".kanban-cards-container");
  
  cardsWrap.innerHTML = list.map(t => {
    const assignee = DB.students.find(s => s.id === t.assigneeId) || { name: "Chưa phân công" };
    return `
      <div class="glass-card kanban-card" draggable="true" ondragstart="handleDragStart(event, ${t.id})" onclick="handleKanbanCardClick(${t.id})">
        <div class="kanban-card-title">${t.title}</div>
        <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4">${t.desc}</p>
        <div class="kanban-card-meta">
          <span>Hạn nộp: ${t.dueDate}</span>
          <div class="kanban-card-members">
            <div class="kanban-card-avatar" title="${assignee.name}">${assignee.name.split(" ").pop().substring(0,1)}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Drag & Drop simulation
let draggedTaskId = null;
window.handleDragStart = function(e, id) {
  draggedTaskId = id;
  e.dataTransfer.setData("text/plain", id);
};

window.allowDrop = function(e) {
  e.preventDefault();
};

window.handleDrop = function(e, status) {
  e.preventDefault();
  const id = parseInt(e.dataTransfer.getData("text/plain") || draggedTaskId);
  if (!id) return;
  
  const task = DB.tasks.find(t => t.id === id);
  if (task) {
    task.status = status;
    
    // Auto-update group progress if tasks completed
    const groupTasks = DB.tasks.filter(t => t.groupId === task.groupId);
    const completed = groupTasks.filter(t => t.status === "done").length;
    const progress = Math.round((completed / groupTasks.length) * 100) || 0;
    
    const grp = DB.groups.find(g => g.id === task.groupId);
    if (grp) {
      grp.progress = progress;
    }
    
    DB.save();
    showToast(`Đã chuyển đổi trạng thái công việc!`);
    renderProgress();
  }
};

// Alternative click-to-move for accessibility
window.handleKanbanCardClick = function(id) {
  const task = DB.tasks.find(t => t.id === id);
  if (!task) return;
  
  const nextStatusMap = {
    todo: "progress",
    progress: "done",
    done: "todo"
  };
  
  const next = nextStatusMap[task.status];
  const VietnameseStatus = {
    todo: "Chưa bắt đầu",
    progress: "Đang thực hiện",
    done: "Hoàn thành"
  };
  
  if (confirm(`Bạn muốn chuyển công việc này sang cột "${VietnameseStatus[next]}"?`)) {
    task.status = next;
    
    // Recalculate group progress
    const groupTasks = DB.tasks.filter(t => t.groupId === task.groupId);
    const completed = groupTasks.filter(t => t.status === "done").length;
    const progress = Math.round((completed / groupTasks.length) * 100) || 0;
    
    const grp = DB.groups.find(g => g.id === task.groupId);
    if (grp) grp.progress = progress;

    DB.save();
    showToast(`Đã chuyển công việc sang "${VietnameseStatus[next]}"`);
    renderProgress();
  }
};

window.addNewKanbanTask = function() {
  const title = prompt("Nhập tiêu đề công việc:");
  if (!title) return;
  const desc = prompt("Nhập mô tả chi tiết:");
  const due = prompt("Nhập hạn nộp (YYYY-MM-DD):", "2026-06-30");
  
  const newId = DB.tasks.reduce((max, t) => t.id > max ? t.id : max, 0) + 1;
  DB.tasks.push({
    id: newId,
    groupId: 1, // bound to default group
    title: title,
    desc: desc || "",
    status: "todo",
    dueDate: due || "2026-06-30",
    assigneeId: 1
  });
  
  // Recalculate group progress
  const groupTasks = DB.tasks.filter(t => t.groupId === 1);
  const completed = groupTasks.filter(t => t.status === "done").length;
  const progress = Math.round((completed / groupTasks.length) * 100) || 0;
  const grp = DB.groups.find(g => g.id === 1);
  if (grp) grp.progress = progress;

  DB.save();
  showToast("Đã thêm công việc mới vào cột Chưa Bắt Đầu!");
  renderProgress();
};

// File Upload Simulator
window.triggerFileUpload = function() {
  const fileInput = document.getElementById("file-uploader-input");
  if (fileInput) fileInput.click();
};

window.handleFileSelected = function(e) {
  const files = e.target.files;
  if (files.length === 0) return;
  
  const file = files[0];
  showToast(`Đang tải lên và quét virus file "${file.name}"...`);
  
  setTimeout(() => {
    // Add to activity
    const newActId = DB.activities.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
    DB.activities.unshift({
      id: newActId,
      text: `Hoàng đã tải lên tệp: ${file.name}`,
      type: "upload",
      time: "Vừa xong",
      user: "Phạm Minh Hoàng"
    });
    DB.save();
    showToast(`Tải lên tệp ${file.name} thành công!`);
    
    // Refresh if in dashboard
    if (AppState.activeView === "dashboard") renderDashboard();
  }, 1500);
};

// Comment Post Form
window.postComment = function() {
  const ta = document.getElementById("comment-input-area");
  if (!ta) return;
  
  const text = ta.value.trim();
  if (!text) return;
  
  const user = USER_PROFILES[AppState.currentRole];
  const newComm = {
    id: DB.comments.length + 1,
    author: user.name.split(" (")[0],
    text: text,
    time: "Vừa xong"
  };
  
  DB.comments.push(newComm);
  
  // Log activity
  const newActId = DB.activities.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
  DB.activities.unshift({
    id: newActId,
    text: `${user.name.split(" (")[0]} đã nhận xét tiến độ đồ án`,
    type: "comment",
    time: "Vừa xong",
    user: user.name.split(" (")[0]
  });
  
  DB.save();
  ta.value = "";
  showToast("Đã gửi nhận xét giảng viên!");
  renderProgress();
};


/* --- SCORING RUBRICS RENDERER --- */
function renderScoring() {
  DB.load();
  
  let groupId = 1;
  const isStudent = AppState.currentRole === "student";
  if (isStudent) {
    const grp = getCurrentStudentGroup();
    if (grp) groupId = grp.id;
  }
  
  // Fetch score settings for target group
  const sc = DB.scores.find(s => s.groupId === groupId) || { progress: 0, report: 0, code: 0, presentation: 0, comments: "Chưa có nhận xét nào." };
  
  // Populate sliders
  setSliderVal("rub-progress", sc.progress);
  setSliderVal("rub-report", sc.report);
  setSliderVal("rub-code", sc.code);
  setSliderVal("rub-presentation", sc.presentation);
  
  const ta = document.getElementById("scoring-comment-area");
  if (ta) ta.value = sc.comments;
  
  calculateFinalScore();
}

function setSliderVal(id, val) {
  const slider = document.getElementById(id);
  if (slider) {
    slider.value = val;
    const container = slider.closest(".rubric-card");
    if (container) {
      container.querySelector(".rubric-value").innerText = val;
    }
  }
}

// Sliders dynamically update numerical calculations
window.handleSliderInput = function(slider, targetId) {
  const val = slider.value;
  const container = slider.closest(".rubric-card");
  if (container) {
    container.querySelector(".rubric-value").innerText = val;
  }
  calculateFinalScore();
};

function calculateFinalScore() {
  const p = parseFloat(document.getElementById("rub-progress")?.value || 0);
  const r = parseFloat(document.getElementById("rub-report")?.value || 0);
  const c = parseFloat(document.getElementById("rub-code")?.value || 0);
  const pr = parseFloat(document.getElementById("rub-presentation")?.value || 0);
  
  // Math Weight Matrix: 20% progress + 20% report + 30% code + 30% presentation
  const final = (p * 0.2) + (r * 0.2) + (c * 0.3) + (pr * 0.3);
  const roundFinal = Math.round(final * 10) / 10;
  
  const scoreCard = document.getElementById("scoring-summary-box");
  if (scoreCard) {
    scoreCard.querySelector(".score-big-num").innerText = roundFinal;
    
    // Update conic gradient circle indicator pct
    // 0 - 10 score is mapped to 0 - 100 percent
    const pct = roundFinal * 10;
    scoreCard.querySelector(".score-display-radial").style.setProperty("--score-pct", pct);
    
    // Status text update
    const resultLabel = document.getElementById("scoring-status-text");
    if (resultLabel) {
      if (roundFinal >= 8.5) resultLabel.innerHTML = `<span class="badge badge-success">Xuất sắc (A)</span>`;
      else if (roundFinal >= 7.0) resultLabel.innerHTML = `<span class="badge badge-primary">Khá (B)</span>`;
      else if (roundFinal >= 5.0) resultLabel.innerHTML = `<span class="badge badge-warning">Đạt trung bình (C)</span>`;
      else resultLabel.innerHTML = `<span class="badge badge-danger">Không đạt (F)</span>`;
    }
  }
}

window.saveDefenseScores = function() {
  const p = parseInt(document.getElementById("rub-progress").value);
  const r = parseInt(document.getElementById("rub-report").value);
  const c = parseInt(document.getElementById("rub-code").value);
  const pr = parseInt(document.getElementById("rub-presentation").value);
  const comm = document.getElementById("scoring-comment-area").value;
  
  const final = Math.round(((p * 0.2) + (r * 0.2) + (c * 0.3) + (pr * 0.3)) * 10) / 10;
  
  const scoreIndex = DB.scores.findIndex(s => s.groupId === 1);
  const scoreObj = { groupId: 1, progress: p, report: r, code: c, presentation: pr, comments: comm, finalGrade: final };
  
  if (scoreIndex !== -1) {
    DB.scores[scoreIndex] = scoreObj;
  } else {
    DB.scores.push(scoreObj);
  }
  
  // Log Activity
  const newActId = DB.activities.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
  DB.activities.unshift({
    id: newActId,
    text: `Hội đồng đã lưu điểm chấm đồ án Nhóm 01: ${final} điểm`,
    type: "score",
    time: "Vừa xong",
    user: USER_PROFILES[AppState.currentRole].name.split(" (")[0]
  });
  
  DB.save();
  showToast(`Đã lưu thành công kết quả chấm điểm đồ án: ${final} / 10!`);
};


/* --- REPORTS & STATS VIEW RENDERER --- */
function renderReports() {
  DB.load();
  
  // Populate statistics table or detail list
  const listEl = document.getElementById("reports-detail-table");
  if (listEl) {
    listEl.innerHTML = DB.groups.map(g => {
      const topic = DB.topics.find(t => t.id === g.topicId) || { title: "N/A" };
      const score = DB.scores.find(s => s.groupId === g.id) || { finalGrade: "Chưa chấm" };
      
      let scoreBadge = `<span class="badge badge-secondary">${score.finalGrade}</span>`;
      if (typeof score.finalGrade === 'number') {
        if (score.finalGrade >= 5) scoreBadge = `<span class="badge badge-success">${score.finalGrade} / 10 (ĐẠT)</span>`;
        else scoreBadge = `<span class="badge badge-danger">${score.finalGrade} / 10 (HỎNG)</span>`;
      }
      
      return `
        <tr>
          <td><strong>${g.name}</strong></td>
          <td style="font-size:0.8rem">${topic.title}</td>
          <td>
            <div style="display:flex; align-items:center; gap:8px">
              <span style="font-size:0.8rem">${g.progress}%</span>
              <div class="progress-bar-wrap" style="width:70px">
                <div class="progress-bar-fill fill-orange" style="width:${g.progress}%"></div>
              </div>
            </div>
          </td>
          <td>${scoreBadge}</td>
        </tr>
      `;
    }).join("");
  }
}

window.exportPDFReport = function() {
  showToast("Đang kết xuất báo cáo định dạng PDF...");
  setTimeout(() => {
    alert("BÁO CÁO THỐNG KÊ TIẾN ĐỘ VÀ KẾT QUẢ ĐỒ ÁN TỐT NGHIỆP\n\n- Tổng số sinh viên: " + DB.students.length + "\n- Đề tài đăng ký: " + DB.topics.length + "\n- Giảng viên tham gia: " + DB.lecturers.length + "\n- Đồ án đã chấm: " + DB.scores.length + "\n\n(Tài liệu xuất tự động từ hệ thống)");
    showToast("Đã tải xuống file PDF báo cáo học kỳ!");
  }, 1000);
};

window.exportExcelReport = function() {
  showToast("Đang chuẩn bị file Excel...");
  setTimeout(() => {
    let csv = "Nhóm đồ án,Tên đề tài,Tiến độ,Điểm trung bình\n";
    DB.groups.forEach(g => {
      const topic = DB.topics.find(t => t.id === g.topicId) || { title: "N/A" };
      const score = DB.scores.find(s => s.groupId === g.id) || { finalGrade: "Chưa chấm" };
      csv += `"${g.name}","${topic.title}","${g.progress}%","${score.finalGrade}"\n`;
    });
    
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `Bao_cao_hoc_ky_${Date.now()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Đã xuất báo cáo Excel thành công!");
  }, 800);
};


/* --- USER PROFILE RENDERER --- */
function renderProfile() {
  const user = USER_PROFILES[AppState.currentRole];
  
  document.getElementById("profile-header-avatar").innerText = user.avatar;
  document.getElementById("profile-name-title").innerText = user.name;
  document.getElementById("profile-role-sub").innerText = user.roleText;
  
  // Fill details fields
  document.getElementById("prof-code").value = user.code;
  document.getElementById("prof-name").value = user.name.split(" (")[0];
  document.getElementById("prof-email").value = user.email;
  document.getElementById("prof-dept").value = user.dept;
  
  // Render recent logs in user history
  const logEl = document.getElementById("profile-activity-logs");
  if (logEl) {
    const userFirstName = user.name.split(" ").pop().split(" (")[0];
    const filteredActs = DB.activities.filter(a => a.user && a.user.includes(userFirstName));
    
    if (filteredActs.length === 0) {
      logEl.innerHTML = `<li style="font-size:0.85rem; color:var(--text-muted); padding: 0.5rem 0">Không có hoạt động gần đây</li>`;
    } else {
      logEl.innerHTML = filteredActs.map(a => `
        <li style="font-size:0.85rem; display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding: 8px 0">
          <span>${a.text}</span>
          <span style="color:var(--text-muted); font-size:0.75rem">${a.time}</span>
        </li>
      `).join("");
    }
  }
}

window.saveUserProfile = function() {
  const user = USER_PROFILES[AppState.currentRole];
  const newEmail = document.getElementById("prof-email").value;
  const newName = document.getElementById("prof-name").value;
  
  if (!newEmail || !newName) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  user.email = newEmail;
  
  if (AppState.currentRole === "student") {
    user.name = newName;
    DB.load();
    const std = DB.students.find(s => s.mssv === user.code);
    if (std) {
      std.name = newName;
      std.email = newEmail;
      DB.save();
    }
  } else if (AppState.currentRole === "lecturer") {
    user.name = newName + " (Giảng viên)";
    DB.load();
    const lect = DB.lecturers.find(l => l.mgv === user.code);
    if (lect) {
      lect.name = newName;
      lect.email = newEmail;
      DB.save();
    }
  } else if (AppState.currentRole === "admin") {
    user.name = newName + " (Quản trị viên)";
  } else if (AppState.currentRole === "committee") {
    user.name = newName + " (Hội đồng)";
  }

  localStorage.setItem("poly_current_user_profile", JSON.stringify(user));
  
  showToast("Đã lưu thông tin cá nhân!");
  applyRoleRbac();
  renderProfile();
};

window.saveUserSecurity = function() {
  const curPass = document.getElementById("prof-current-pass").value;
  const newPass = document.getElementById("prof-new-pass").value;
  
  if (!curPass || !newPass) {
    alert("Vui lòng điền đầy đủ thông tin mật khẩu!");
    return;
  }
  
  const user = USER_PROFILES[AppState.currentRole];
  const userClean = user.code.toUpperCase();
  const customPasswords = JSON.parse(localStorage.getItem("poly_custom_passwords") || "{}");
  const customPass = customPasswords[userClean] || "";
  const isDefaultValid = ["123", "123456", "admin", "poly", "poly123"].includes(curPass.toLowerCase());
  const isCustomValid = customPass && curPass === customPass;
  
  if (!isDefaultValid && !isCustomValid) {
    alert("Mật khẩu hiện tại không chính xác!");
    return;
  }
  
  showToast("Đang cập nhật mật mã bảo mật...");
  setTimeout(() => {
    customPasswords[userClean] = newPass;
    localStorage.setItem("poly_custom_passwords", JSON.stringify(customPasswords));
    document.getElementById("prof-current-pass").value = "";
    document.getElementById("prof-new-pass").value = "";
    showToast("Thay đổi mật khẩu thành công!");
  }, 1000);
};

window.triggerAvatarUpload = function() {
  const user = USER_PROFILES[AppState.currentRole];
  const newAvatar = prompt("Nhập 2 chữ cái viết tắt đại diện cho bạn (ví dụ: MH, AD, TM):", user.avatar);
  if (newAvatar && newAvatar.trim().length > 0) {
    user.avatar = newAvatar.trim().substring(0, 2).toUpperCase();
    localStorage.setItem("poly_current_user_profile", JSON.stringify(user));
    
    // Update avatar everywhere
    applyRoleRbac();
    renderProfile();
    showToast("Đã cập nhật ảnh đại diện mới!");
  }
};

// System backup simulation for Admins
window.backupSystemData = function() {
  const backup = {
    students: DB.students,
    lecturers: DB.lecturers,
    topics: DB.topics,
    groups: DB.groups,
    tasks: DB.tasks,
    scores: DB.scores,
    timestamp: Date.now()
  };
  
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", `Sao_luu_he_thong_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Đã hoàn tất sao lưu dữ liệu toàn hệ thống!");
};

window.deleteTopic = function(id) {
  const t = DB.topics.find(top => top.id === id);
  if (!t) return;
  if (confirm(`Bạn có chắc chắn muốn xóa đề tài "${t.title}" (${t.code})?`)) {
    DB.topics = DB.topics.filter(top => top.id !== id);
    DB.save();
    showToast(`Đã xóa đề tài ${t.code}`);
    renderTopics();
  }
};

window.approveGroup = function(id, status) {
  const g = DB.groups.find(grp => grp.id === id);
  if (!g) return;
  g.status = status;
  
  const newActId = DB.activities.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
  DB.activities.unshift({
    id: newActId,
    text: `Giảng viên đã ${status === 'Active' ? 'phê duyệt kích hoạt' : 'từ chối'} nhóm ${g.name}`,
    type: "system",
    time: "Vừa xong",
    user: USER_PROFILES[AppState.currentRole].name.split(" (")[0]
  });
  
  DB.save();
  showToast(`Đã ${status === 'Active' ? 'phê duyệt' : 'từ chối'} nhóm ${g.name}!`);
  renderGroups();
};

// --- GLOBAL SEARCH FUNCTIONALITY ---
window.handleGlobalSearchClick = function(view, query) {
  const globalResults = document.getElementById("global-search-results");
  if (globalResults) globalResults.style.display = "none";
  
  const globalSearch = document.getElementById("global-search");
  if (globalSearch) globalSearch.value = "";
  
  // Navigate to target view
  router(view);
  
  // Apply query filters
  if (view === "students") {
    AppState.studentSearchQuery = query;
    const inp = document.getElementById("student-search");
    if (inp) inp.value = query;
    renderStudents();
  } else if (view === "topics") {
    showToast(`Đã tìm thấy đề tài: ${query}`);
  } else if (view === "lecturers") {
    showToast(`Đã tìm thấy giảng viên hướng dẫn: ${query}`);
  }
};

// --- INTERACTIVE BACKGROUND PARTICLES ENGINE ---
function initLoginParticles() {
  const canvas = document.getElementById("login-particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 115, 22, ${this.alpha})`; // subtle orange accent tint
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    const loginPage = document.getElementById("login-page");
    if (loginPage && loginPage.style.display !== "none") {
      ctx.clearRect(0, 0, width, height);

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist/90) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", () => {
    if (canvas.offsetWidth === 0) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  });

  animate();
}

// --- INTERACTIVE MOUSE PARALLAX EFFECT ---
function initLoginParallax() {
  const loginPage = document.getElementById("login-page");
  if (!loginPage) return;

  loginPage.addEventListener("mousemove", (e) => {
    if (loginPage.style.display === "none") return;

    const cards = document.querySelectorAll(".floating-scene .floating-card");
    const rect = loginPage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    cards.forEach((card, idx) => {
      const factorX = (idx + 1) * 6; // slightly offsets depth
      const factorY = (idx + 1) * 8;
      // offset positions dynamically
      card.style.marginLeft = `${dx * factorX}px`;
      card.style.marginTop = `${dy * factorY}px`;
    });
  });
}

