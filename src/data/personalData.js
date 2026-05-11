export const personalData = {
  name: "Shubham Singh",
  firstName: "Shubham",
  lastName: "Singh",
  initials: "SS",
  title: "SDE (Android) @ PhonePe",
  email: "shubhamotsav@gmail.com",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/shubham-0707",
  linkedin: "https://www.linkedin.com/in/shubham-0707",
  twitter: "https://x.com/shubham0707_11",
  newsletter: "https://www.linkedin.com/newsletters/the-code-report-7197864242228678656/",
  topmate: "https://topmate.io/shubham0707",
  resumeUrl: "/Shubham_Singh_Resume.pdf",
  profilePic: "/img/profile-pic.png",
  web3formsKey: "e6a6886d-03a9-4705-990b-2d2a381b764f",

  heroDescription:
    "SDE at PhonePe, ex-Glance (InMobi). I build Android apps at scale, write The Code Report newsletter for 4,300+ subscribers, and mentor aspiring devs. Kotlin fanatic, DSA enthusiast, and a hip-hop lover.",

  roles: [
    "Android Developer",
    "PhonePe Engineer",
    "Kotlin Enthusiast",
    "Tech Blogger",
    "Open Source Mentor",
  ],

  stats: [
    { count: 2.5, label: "Years Experience", plus: true },
    { count: 326, label: "PRs Shipped", plus: true },
    { count: 4300, label: "Newsletter Readers", plus: true },
  ],

  journey: [
    {
      type: "work",
      title: "Software Development Engineer",
      company: "PhonePe",
      date: "June 2025 — Present",
      description:
        "Spearheading the Android Offers platform serving 500M+ users across India. Architected the complete migration of Offers discovery from legacy Views to a Feed-based architecture using Jetpack Compose, resulting in a 24% jump in user retention and 35% faster page loads. Identified and resolved critical jank issues causing frame drops on low-end devices through systrace profiling and lazy composition. Led reliability improvements including crash-free rate optimization from 99.2% to 99.8%, implemented circuit-breaker patterns for API resilience, and mentored 2 junior engineers on Compose best practices and clean architecture patterns.",
      tags: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "Coroutines", "Hilt"],
      current: true,
    },
    {
      type: "work",
      title: "Software Development Engineer",
      company: "Glance (InMobi Group)",
      date: "Oct 2023 — May 2025",
      description:
        "Core Android engineer on the Glance Lock Screen platform reaching 400M+ devices globally. Architected 2 major SDKs from the ground up — a Camera SDK with CameraX supporting real-time filters, AR effects, and multi-lens switching, and a Content Creation SDK enabling users to produce short-form video content with templates. Led mission-critical platform migrations including Kotlin 1.9 → 2.0, KAPT → KSP (40% faster builds), ExoPlayer → Media3, and Dagger → Koin. Built AI-powered content generation features integrating on-device ML models for smart cropping and auto-captioning. Revamped the entire authentication system reducing login failures by 60%. Shipped 326+ PRs, delivered 30+ major features, conducted 200+ code reviews, and consistently ranked in the top 10% of contributors across the org.",
      tags: ["Android", "Kotlin", "Koin", "CameraX", "Compose", "Media3", "KSP"],
      current: false,
    },
    {
      type: "work",
      title: "SDE Intern → Converted to Full-Time",
      company: "Glance (InMobi Group)",
      date: "Apr 2023 — Oct 2023",
      description:
        "Started as an intern and earned full-time conversion within 6 months based on impact. Built pixel-perfect UI components using Jetpack Compose for the Glance lock screen experience. Implemented deep linking infrastructure enabling seamless content-to-app navigation, increasing click-through rates by 18%. Developed partner-specific SDK configuration system supporting 15+ OEM partners (Samsung, Xiaomi, Oppo). Integrated analytics tracking pipelines for user engagement metrics, and optimized image loading with custom Coil transformations reducing memory usage by 25%. Contributed to the CI/CD pipeline and wrote comprehensive unit tests achieving 85%+ coverage on new modules.",
      tags: ["Jetpack Compose", "Navigation", "Coroutines", "Coil", "Deep Linking"],
      current: false,
    },
    {
      type: "work",
      title: "Jr. Associate — Big Data & EDW",
      company: "Celebal Technologies",
      date: "Feb 2023 — Apr 2023",
      description:
        "Intensive cloud and data engineering training program where I earned 3 industry certifications — Microsoft Azure AZ-900 (Cloud Fundamentals), DP-900 (Data Fundamentals), and Databricks Lakehouse Platform. Built automated web scraping pipelines using Selenium WebDriver and BeautifulSoup to extract structured data from 50+ sources. Designed and deployed ETL workflows on Azure Data Factory for transforming raw data into analytics-ready datasets. Gained hands-on experience with Azure Blob Storage, SQL Database, and Databricks notebooks for large-scale data processing.",
      tags: ["Azure", "Selenium", "Databricks", "Python", "ETL", "ADF"],
      current: false,
    },
    {
      type: "work",
      title: "Android Developer Intern",
      company: "DKG Labs",
      date: "Feb 2022 — May 2022",
      description:
        "First professional experience as an Android developer, working on the Hero Lectro e-bike companion app. Fixed 40+ production bugs spanning Bluetooth connectivity, GPS tracking, and battery monitoring modules. Developed new features including ride history with route visualization using Google Maps SDK, real-time speed/distance dashboard, and push notification system with Firebase Cloud Messaging. Collaborated with senior engineers on REST API integration using Retrofit + OkHttp, implemented offline-first architecture with Room DB, and trained 3 new team members on the project codebase and development workflow.",
      tags: ["Android", "Java", "Firebase", "Google Maps", "Room", "Retrofit"],
      current: false,
    },
    {
      type: "education",
      title: "B.Tech — Computer Science & Engineering",
      company: "Dr. A.P.J. Abdul Kalam Technical University",
      date: "2019 — 2023",
      description:
        "Graduated with a GPA of 8.71/10. Built a strong foundation in core CS — data structures & algorithms, operating systems, DBMS, computer networks, and software engineering. Completed 600+ DSA problems across LeetCode and GeeksforGeeks. Led the college coding club, organized inter-college hackathons, and mentored juniors in competitive programming. Final year research project on 'AI-Powered Blogging Platforms' published in an international journal. Active participant in Google Developer Student Clubs and won multiple intra-college coding competitions.",
      tags: ["DSA", "OS", "DBMS", "Networks", "Research", "Leadership"],
      current: false,
    },
  ],

  skills: [
    {
      category: "Mobile",
      icon: "mobile",
      items: [
        { name: "Android", level: "expert" },
        { name: "Kotlin", level: "expert" },
        { name: "Java", level: "expert" },
        { name: "Jetpack Compose", level: "advanced" },
        { name: "MVVM / MVI", level: "advanced" },
        { name: "Hilt / Dagger / Koin", level: "advanced" },
        { name: "KMP", level: "intermediate" },
        { name: "CameraX", level: "intermediate" },
      ],
    },
    {
      category: "Backend & Web",
      icon: "code",
      items: [
        { name: "Spring Boot", level: "intermediate" },
        { name: "REST APIs", level: "advanced" },
        { name: "HTML/CSS/JS", level: "advanced" },
        { name: "React", level: "intermediate" },
        { name: "Ktor", level: "intermediate" },
        { name: "Retrofit", level: "advanced" },
      ],
    },
    {
      category: "Languages",
      icon: "wrench",
      items: [
        { name: "Java", level: "expert" },
        { name: "Kotlin", level: "expert" },
        { name: "Python", level: "advanced" },
        { name: "C/C++", level: "intermediate" },
        { name: "SQL", level: "advanced" },
      ],
    },
    {
      category: "Tools & Cloud",
      icon: "layers",
      items: [
        { name: "Git", level: "expert" },
        { name: "Android Studio", level: "expert" },
        { name: "Firebase", level: "advanced" },
        { name: "Azure (AZ-900, DP-900)", level: "advanced" },
        { name: "Databricks", level: "intermediate" },
        { name: "AWS", level: "intermediate" },
        { name: "IntelliJ IDEA", level: "advanced" },
        { name: "Figma", level: "intermediate" },
      ],
    },
  ],

  achievements: [
    "LinkedIn Top Voice — recognized for high-impact dev content",
    "2x Microsoft Azure Certified (AZ-900, DP-900)",
    "1x Databricks Lakehouse Certified",
    "1x GitHub Certified Developer",
    "Author of The Code Report newsletter — 4,300+ subscribers",
    "Hackathon Judge — V.I.T. Vellore, Kalasalingam University",
    "Software Engineering Evangelist @ Topmate.io",
    "Published research on AI in Blogging Platforms",
  ],
};
