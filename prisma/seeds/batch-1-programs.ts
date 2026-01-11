/**
 * Summer Programs Batch 1
 *
 * 20 high-priority programs researched from official sources
 * Data verified for 2026 program year
 *
 * Created: January 2026
 */

interface SummerProgramSeed {
  name: string;
  shortName: string | null;
  organization: string;
  description: string;
  websiteUrl: string;
  programYear: number;
  minGrade: number | null;
  maxGrade: number | null;
  minAge: number | null;
  maxAge: number | null;
  minGpaUnweighted: number | null;
  minGpaWeighted: number | null;
  citizenship: "us_only" | "us_permanent_resident" | "international_ok" | null;
  requiredCourses: string[];
  recommendedCourses: string[];
  eligibilityNotes: string | null;
  applicationOpens: Date | null;
  applicationDeadline: Date | null;
  isRolling: boolean;
  rollingNotes: string | null;
  applicationUrl: string;
  applicationNotes: string | null;
  format: "residential" | "commuter" | "online" | "hybrid";
  location: string;
  llmContext: string | null;
  category: string;
  focusAreas: string[];
  isActive: boolean;
  dataSource: "manual" | "api" | "import";
  dataStatus: "verified" | "pending_2026" | "needs_review";
  sessions: Array<{
    name: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
  }>;
}

export const batchPrograms: SummerProgramSeed[] = [
  // ===========================================================================
  // 1. CLARK SCHOLARS PROGRAM
  // ===========================================================================
  {
    name: "Clark Scholars Program",
    shortName: "Clark Scholars",
    organization: "Texas Tech University",
    description:
      "A highly selective 7-week summer research program accepting only 12 students worldwide. Scholars conduct original research with Texas Tech faculty across any discipline, from STEM to humanities.",
    websiteUrl: "https://www.depts.ttu.edu/clarkscholars/",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 12,
    minAge: 17,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be at least 17 years old by program start date (June 21, 2026). Must graduate in 2026 or 2027 (rising seniors or graduating seniors). NO EXCEPTIONS to age requirement. Open to all genders.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-02-16"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.depts.ttu.edu/clarkscholars/ApplicationDetails.php",
    applicationNotes:
      "Requires high school transcript, SAT/ACT scores (at minimum PSAT/PACT), and 3 recommendations (at least 2 from teachers). Application deadline February 16, 2026 at 11:59 PM CT.",

    format: "residential",
    location: "Lubbock, TX",

    llmContext:
      "Clark Scholars is one of the most prestigious and selective summer research programs in the US, accepting only 12 students worldwide each year from hundreds of applicants. The 7-week program (June 21 - August 6, 2026) pairs each student with a Texas Tech faculty mentor for intensive, original research across ANY field - STEM, humanities, social sciences, arts. Completely FREE including housing, meals, and a $750 stipend upon completion. Students must be 17+ by program start - no exceptions for younger students regardless of academic advancement. Selection based on intellectual curiosity, academic achievement, and interview performance - prior research experience NOT required. The small cohort creates an intimate, rigorous intellectual community. Alumni have won Intel STS/Regeneron, attended Ivy League schools, and pursued successful research careers. Ideal for students who want deep, mentored research immersion and are open to exploring any academic discipline. The program's flexibility in research topic makes it unique among top programs. Strong applicants show genuine passion for inquiry and learning.",

    category: "research",
    focusAreas: ["research", "STEM", "humanities", "social_sciences", "mentorship"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-21"),
        endDate: new Date("2026-08-06"),
        notes: "7 weeks, fully funded with $750 stipend",
      },
    ],
  },

  // ===========================================================================
  // 2. MITES SUMMER (MIT)
  // ===========================================================================
  {
    name: "MITES Summer",
    shortName: "MITES",
    organization: "MIT Office of Engineering Outreach Programs",
    description:
      "A free six-week residential STEM program at MIT for rising high school seniors, especially those from underrepresented or underserved communities. Students take rigorous courses and build community.",
    websiteUrl: "https://mites.mit.edu/",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be rising high school seniors (current juniors). Program prioritizes students from underrepresented communities in STEM (African American, Hispanic/Latino, Native American), low socioeconomic backgrounds, first-generation college students, and students from under-resourced schools. Open to all genders. U.S. citizens or permanent residents only.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-02-01"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://mites.mit.edu/discover-mites/apply-to-mites/",
    applicationNotes:
      "FREE application. Requires essays, transcript, and recommendations. Travel scholarships available for students who need help with transportation costs.",

    format: "residential",
    location: "Cambridge, MA (MIT Campus)",

    llmContext:
      "MITES Summer (formerly known as MITES) is one of MIT's flagship pre-college STEM programs with an acceptance rate of 3-10%. The 6-week residential program is completely FREE - all educational, food, and boarding costs covered by MIT, with travel scholarships available. Program bolsters confidence, creates lifelong community, and builds challenging foundation in STEM. Strongly encourages applications from underrepresented students in STEM fields including African American, Hispanic/Latino, Native American students, as well as first-generation college students and those from under-resourced schools. Selection is holistic - they're not just looking for the highest GPA but for students who haven't had access to advanced STEM opportunities. MITES alumni have significantly elevated MIT acceptance rates and many attend top universities. The program creates a strong, supportive cohort that stays connected beyond the summer. Ideal for students passionate about STEM who come from backgrounds where these opportunities are limited. No prior research or advanced coursework required - they're looking for potential and passion.",

    category: "STEM",
    focusAreas: ["STEM", "engineering", "science", "diversity", "underrepresented"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-28"),
        endDate: new Date("2026-08-08"),
        notes: "6 weeks, completely free including travel assistance",
      },
    ],
  },

  // ===========================================================================
  // 3. YALE YOUNG GLOBAL SCHOLARS (YYGS)
  // ===========================================================================
  {
    name: "Yale Young Global Scholars",
    shortName: "YYGS",
    organization: "Yale University",
    description:
      "A two-week residential program at Yale for high school students from around the world. Students choose from three interdisciplinary tracks: Innovations in Science & Technology, Politics of Law & Economics, or Solving Global Challenges.",
    websiteUrl: "https://globalscholars.yale.edu/",
    programYear: 2026,

    minGrade: 10,
    maxGrade: 11,
    minAge: 16,
    maxAge: 18,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be 16-18 years old by July 19, 2026 (first day of Session III). Must be current sophomore or junior (or international equivalent). Southern Hemisphere students graduating Nov/Dec 2026 or 2027 eligible. First-time participants only - cannot reapply if attended in previous years. Open to all genders.",

    applicationOpens: new Date("2025-09-01"),
    applicationDeadline: new Date("2026-01-07"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://globalscholars.yale.edu/how-to-apply",
    applicationNotes:
      "Application closed January 7, 2026. Requires essays, transcript, and recommendation. Financial aid application must be completed by deadline to be considered for scholarships.",

    format: "residential",
    location: "New Haven, CT (Yale Campus)",

    llmContext:
      "YYGS brings together students from 150+ countries and all 50 U.S. states for a transformative two-week experience at Yale. Three interdisciplinary tracks: Innovations in Science & Technology (IST), Politics of Law & Economics (PLE), and Solving Global Challenges (SGC). Cost is $7,000 per session (first increase in 7 years) but YYGS distributes over $3 million in need-based financial aid annually, with packages covering up to 100% of tuition for domestic and international students. Some awards also cover travel. Highly selective with thousands of applicants worldwide. Age requirement is strict: 16-18 by July 19, 2026. Cannot attend if you've participated before. The program emphasizes global perspectives, critical thinking, and building an international network of peers. Sessions run June 21 - July 3, July 5-17, and July 19-31. All sessions are residential only - no remote option. Strong for students interested in international affairs, policy, science/tech, or global issues. Yale faculty and guest speakers lead seminars and discussions.",

    category: "academics",
    focusAreas: ["academics", "international", "science", "policy", "global_issues", "leadership"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Session I",
        startDate: new Date("2026-06-21"),
        endDate: new Date("2026-07-03"),
        notes: "2 weeks, $7,000 tuition",
      },
      {
        name: "Session II",
        startDate: new Date("2026-07-05"),
        endDate: new Date("2026-07-17"),
        notes: "2 weeks, $7,000 tuition",
      },
      {
        name: "Session III",
        startDate: new Date("2026-07-19"),
        endDate: new Date("2026-07-31"),
        notes: "2 weeks, $7,000 tuition",
      },
    ],
  },

  // ===========================================================================
  // 4. YALE SUMMER PROGRAM IN ASTROPHYSICS (YSPA)
  // ===========================================================================
  {
    name: "Yale Summer Program in Astrophysics",
    shortName: "YSPA",
    organization: "Yale University",
    description:
      "A research and enrichment program for rising seniors passionate about astronomy and physics. Students conduct original research using Yale's telescopes and present findings at a mini-conference.",
    websiteUrl: "https://yspa.yale.edu/",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: 15,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: ["Physics", "Pre-Calculus", "Calculus"],
    eligibilityNotes:
      "Must be rising seniors (current juniors or equivalent). Must be at least 15.5 years old by July 5, 2026 (program start). International students welcome but must be proficient in English. Open to all genders.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-03-06"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://yspa.yale.edu/application-process",
    applicationNotes:
      "Requires transcript (through Fall semester), 2 teacher recommendations via SmarterSelect. Application deadline March 6, 2026 at 11:59 PM ET.",

    format: "hybrid",
    location: "New Haven, CT (Yale Campus)",

    llmContext:
      "YSPA is a selective program for 32 students passionate about astrophysics. Unique hybrid structure: 2-week online directed self-study (June 22 - July 3, 2026) followed by 4-week residential program (July 5 - August 2, 2026). Students take classes at Yale's Leitner Planetarium, learn programming and data analysis, and use telescopes at Leitner Observatory plus remote observatories to collect data for original research projects. Culminates in scientific paper and presentation at YSPA mini-conference. Cost is $7,500 with need-based financial aid covering up to 75% of tuition. The age requirement (15.5+ by July 5) is notable - younger students who meet the grade requirement but not age are not eligible. Program prepares students for scientific research careers and provides confidence that research is something they're ready to pursue in college. Strong for students with genuine interest in astronomy/physics who want hands-on research experience. Prior astronomy experience not required but enthusiasm essential.",

    category: "research",
    focusAreas: ["astronomy", "astrophysics", "physics", "research", "science"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Online Component",
        startDate: new Date("2026-06-22"),
        endDate: new Date("2026-07-03"),
        notes: "2 weeks online directed self-study",
      },
      {
        name: "Residential Component",
        startDate: new Date("2026-07-05"),
        endDate: new Date("2026-08-02"),
        notes: "4 weeks on Yale campus",
      },
    ],
  },

  // ===========================================================================
  // 5. PROMYS (Boston University)
  // ===========================================================================
  {
    name: "PROMYS",
    shortName: "PROMYS",
    organization: "Boston University",
    description:
      "A rigorous 6-week summer program in mathematics for motivated high school students. Emphasis on number theory, independent thinking, and collaborative problem-solving in a supportive community.",
    websiteUrl: "https://promys.org/",
    programYear: 2026,

    minGrade: 9,
    maxGrade: 12,
    minAge: 14,
    maxAge: 18,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: ["Algebra", "Geometry"],
    eligibilityNotes:
      "Must have completed at least 9th grade and be at least 14 years old by program start (June 28, 2026), but no older than 18. No flexibility on age requirements. May attend during summer between high school and college or during gap year. Cannot attend if already enrolled in university. Open to all genders. European students 16+ may apply to PROMYS Europe instead (cannot apply to both).",

    applicationOpens: new Date("2025-12-01"),
    applicationDeadline: new Date("2026-02-27"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://promys.org/programs/promys/for-students/application/",
    applicationNotes:
      "FREE application. Includes 5 short answer questions, solutions to challenging application problems (upload as PDF), transcript, and math teacher recommendation (due March 3). NEW for 2026: AI tools and internet answers strictly prohibited. Decisions by end of April 2026.",

    format: "residential",
    location: "Boston, MA (Boston University)",

    llmContext:
      "PROMYS is one of the 'big three' U.S. math camps alongside Ross and Mathcamp. 6-week residential program (June 28 - August 8, 2026) at Boston University focused on number theory. ~15% acceptance rate. Approximately 80 students with emphasis on mathematical discovery, not competition. FREE for domestic students whose families make under $80,000/year; need-based aid available for all. The application problems are central to admission - they test mathematical thinking, not just correct answers. Age requirement is strict: 14-18 during program with no exceptions. Students may attend between high school and college or during gap year, but not if already enrolled in university. Returning students can come back as junior counselors. Famous for developing deep mathematical thinking rather than speed or competition skills. Strong for students who love exploring math for its own sake. Can only apply to PROMYS OR PROMYS Europe (Oxford), not both. The community aspect is strong - students often maintain connections for years.",

    category: "mathematics",
    focusAreas: ["mathematics", "number_theory", "problem_solving", "proofs"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-28"),
        endDate: new Date("2026-08-08"),
        notes: "6 weeks, free for families under $80K",
      },
    ],
  },

  // ===========================================================================
  // 6. SUMaC (Stanford University Mathematics Camp)
  // ===========================================================================
  {
    name: "Stanford University Mathematics Camp",
    shortName: "SUMaC",
    organization: "Stanford Pre-Collegiate Studies",
    description:
      "An intensive 3-4 week program for students with exceptional interest in mathematics. Study abstract algebra, number theory, or algebraic topology with Stanford faculty and advanced graduate students.",
    websiteUrl: "https://sumac.spcs.stanford.edu/",
    programYear: 2026,

    minGrade: 10,
    maxGrade: 11,
    minAge: null,
    maxAge: 17,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: ["Algebra 2", "Pre-Calculus"],
    eligibilityNotes:
      "Must be current 10th or 11th grader. Residential program: must be under 18 during program. Online program: must be 18 or younger during program. Must have exceptional interest in mathematics and preparation for abstract algebra/number theory/topology. Open to all genders.",

    applicationOpens: new Date("2025-11-01"),
    applicationDeadline: new Date("2026-02-09"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://sumac.spcs.stanford.edu/sumac-admissions",
    applicationNotes:
      "Financial aid application deadline February 9, 2026. Financial aid documents due February 16, 2026. $60 financial aid application fee (waivers available).",

    format: "residential",
    location: "Stanford, CA",

    llmContext:
      "SUMaC is Stanford's elite mathematics program - highly selective with only 40 residential and 64 online spots. Two formats: 4-week residential ($8,250) June 21 - July 17, or 3-week online ($3,550) in June-July with morning or evening PT sessions. Students study advanced pure mathematics including abstract algebra, number theory, and algebraic topology - topics not covered in typical high school curriculum. Tuition covers housing, meals, instruction, materials, and weekend field trips. Need-based financial aid available for both domestic and international students, including partial and full scholarships. Age cap is important: residential students must be under 18 during program. Program designed for students who want to explore mathematics deeply, not for competition prep. Connects students with Stanford faculty and advanced grad students. Strong for students who enjoy rigorous abstract thinking and want a taste of university-level mathematics. The online option makes it accessible to students who can't travel.",

    category: "mathematics",
    focusAreas: ["mathematics", "abstract_algebra", "number_theory", "topology"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Residential",
        startDate: new Date("2026-06-21"),
        endDate: new Date("2026-07-17"),
        notes: "4 weeks on Stanford campus, $8,250",
      },
      {
        name: "Online Session 1",
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-07-03"),
        notes: "3 weeks online, $3,550",
      },
      {
        name: "Online Session 2",
        startDate: new Date("2026-07-06"),
        endDate: new Date("2026-07-24"),
        notes: "3 weeks online, $3,550",
      },
    ],
  },

  // ===========================================================================
  // 7. NIH SUMMER INTERNSHIP PROGRAM
  // ===========================================================================
  {
    name: "NIH Summer Internship Program",
    shortName: "NIH SIP",
    organization: "National Institutes of Health",
    description:
      "A paid summer research internship at NIH for students interested in biomedical, behavioral, and social sciences. Work alongside leading scientists at NIH's Bethesda campus and other locations.",
    websiteUrl: "https://www.training.nih.gov/research-training/pb/sip/",
    programYear: 2026,

    minGrade: 12,
    maxGrade: 12,
    minAge: 17,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: ["Biology", "Chemistry"],
    eligibilityNotes:
      "Must be 18 by September 30, 2026. Exception: If 17 as of June 1, 2026 but will turn 18 by September 30, 2026, your permanent address must be within 40 miles of an NIH campus. Must be enrolled at least half-time as high school senior at application time. Must have graduated before internship starts. Gap year students starting college in fall also eligible. U.S. citizens or permanent residents only. Open to all genders.",

    applicationOpens: new Date("2025-12-08"),
    applicationDeadline: new Date("2026-02-18"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.training.nih.gov/research-training/pb/sip/",
    applicationNotes:
      "Apply via NIH Application Center. Opens December 8, 2025 at 9 AM ET. Closes February 18, 2026 at noon ET. Reference letter deadline February 25, 2026 at noon ET. Requires personal statement about research interests and career goals.",

    format: "commuter",
    location: "Bethesda, MD (and other NIH campuses)",

    llmContext:
      "NIH SIP is the premier government biomedical research internship for high school students transitioning to college. ~8 weeks during summer (dates flexible). PAID internship with stipend. Students work side-by-side with NIH scientists on real research in biology, engineering, epidemiology, psychology, chemistry, physics, computer science, bioinformatics, and more. No centralized selection - individual Principal Investigators review applications and select interns, with selections completed by April 1. The age requirement is strict and complex: must be 18 by September 30, 2026. 17-year-olds only eligible if living within 40 miles of NIH campus and turning 18 by September 30. The former separate High School Summer Internship Program (HS-SIP) has been merged into SIP. This is an excellent pathway to biomedical research careers with exposure to world-class facilities and mentors. Mandatory orientation required before starting. Strong for students planning pre-med, biomedical engineering, or research science careers.",

    category: "research",
    focusAreas: ["research", "medicine", "biology", "biomedical", "science", "government"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Summer Internship",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-08-15"),
        notes: "~8 weeks, paid stipend, dates flexible",
      },
    ],
  },

  // ===========================================================================
  // 8. DUKE STAR PROGRAM
  // ===========================================================================
  {
    name: "Duke STAR Program",
    shortName: "Duke STAR",
    organization: "Duke Clinical Research Institute",
    description:
      "A 5-week summer research program at Duke for high school and college students. Conduct original research with faculty mentorship, with the goal of co-authorship on peer-reviewed publications.",
    websiteUrl: "https://dcri.org/education/dukes-star-program/",
    programYear: 2026,

    minGrade: 12,
    maxGrade: 12,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: ["Biology", "Chemistry", "Statistics"],
    eligibilityNotes:
      "Open to rising high school seniors and graduating seniors (as well as undergrads and medical students). No prior research experience required but strong academics and science interest needed. U.S. citizenship or permanent residency required per NIH policy. Open to all genders.",

    applicationOpens: new Date("2025-11-17"),
    applicationDeadline: new Date("2026-01-02"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://dcri.org/education/dukes-star-program/",
    applicationNotes:
      "Application deadline January 2, 2026 (now closed). For future cycles, application typically opens mid-November.",

    format: "residential",
    location: "Durham, NC (Duke University)",

    llmContext:
      "Duke STAR is a prestigious clinical research program with real pathway to publication. 5-week in-person program June 22 - July 24, 2026, with pre-reading in early June and remote activities in early August. HIGH SCHOOL STUDENTS RECEIVE $4,000 STIPEND (college students $5,000, medical students $8,000). Students only cover housing and transportation - the stipend makes participation feasible for students who need summer earnings. Faculty mentorship on original research projects with goal of co-authorship on peer-reviewed publications. Includes medical ethics seminar, statistics training, and clinical shadowing (for participants 18+). No prior research experience required - looking for strong academics and genuine interest in science/medicine. The program is competitive but rewards intellectual curiosity over prior credentials. Strong for students interested in clinical research, medicine, public health, or healthcare careers. Publication potential is a significant advantage for college applications and future research opportunities.",

    category: "research",
    focusAreas: ["research", "medicine", "clinical_research", "health", "science"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-22"),
        endDate: new Date("2026-07-24"),
        notes: "5 weeks, $4,000 stipend for high school students",
      },
    ],
  },

  // ===========================================================================
  // 9. CMU SAMS (Summer Academy for Math and Science)
  // ===========================================================================
  {
    name: "Carnegie Mellon Summer Academy for Math and Science",
    shortName: "CMU SAMS",
    organization: "Carnegie Mellon University",
    description:
      "A free 6-week residential STEM program for rising high school seniors from underrepresented communities. Rigorous coursework, research projects, and mentorship from CMU faculty.",
    websiteUrl: "https://www.cmu.edu/pre-college/academic-programs/sams.html",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: 16,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be at least 16 years old by June 20, 2026 (program start). Must be current 11th graders (rising seniors). U.S. citizen or permanent resident required. Program prioritizes students underrepresented in STEM, including first-generation college students and those from under-resourced schools. Open to all genders.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-02-01"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.cmu.edu/pre-college/academic-programs/sams.html",
    applicationNotes:
      "Application deadline February 1, 2026 at 11:59 PM EST. Requires financial documentation. Admissions decisions released April 15, 2026.",

    format: "residential",
    location: "Pittsburgh, PA (Carnegie Mellon Campus)",

    llmContext:
      "CMU SAMS is a fully-funded 6-week residential STEM program (June 20 - August 1, 2026) - one of the most generous free programs available. Students pay nothing except travel to/from Pittsburgh. Program includes virtual jumpstart June 15-16 followed by in-person residential experience, then ongoing virtual enrichment. ~10-15% acceptance rate. Prioritizes underrepresented students in STEM: first-generation college, under-resourced schools, underrepresented minorities. Must be 16+ by program start - this age requirement is firm. Program includes rigorous STEM coursework, research projects, and mentorship from world-class CMU faculty. Emphasis on both academic excellence and community engagement. Scholars are expected to participate fully for entire duration. Over 75% of SAMS alumni pursue STEM majors at top universities. Strong pathway to CMU admission and other elite schools. Ideal for motivated students from backgrounds where advanced STEM opportunities are limited. The program seeks students with demonstrated STEM interest who will contribute to and benefit from the cohort community.",

    category: "STEM",
    focusAreas: ["STEM", "mathematics", "science", "diversity", "underrepresented", "research"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Virtual Jumpstart",
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-06-16"),
        notes: "2-day virtual orientation",
      },
      {
        name: "Residential Program",
        startDate: new Date("2026-06-20"),
        endDate: new Date("2026-08-01"),
        notes: "6 weeks on CMU campus, fully funded",
      },
    ],
  },

  // ===========================================================================
  // 10. MIT BEAVER WORKS SUMMER INSTITUTE (BWSI)
  // ===========================================================================
  {
    name: "MIT Beaver Works Summer Institute",
    shortName: "MIT BWSI",
    organization: "MIT Lincoln Laboratory",
    description:
      "An intensive 4-week STEM program for rising high school seniors. Project-based courses in cutting-edge topics like AI, autonomous vehicles, cybersecurity, radar, and satellite systems.",
    websiteUrl: "https://bwsi.mit.edu/",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: ["Calculus", "Physics", "Programming"],
    eligibilityNotes:
      "Designed for high-achieving students entering their senior year of high school. Prerequisites vary by course - some require programming experience. Open to all genders. U.S. citizens or permanent residents typically required due to Lincoln Lab affiliation.",

    applicationOpens: new Date("2026-02-01"),
    applicationDeadline: null,
    isRolling: true,
    rollingNotes: "2026 Online Course Registration opens February 1, 2026. Spring program details available mid-January 2026.",
    applicationUrl: "https://bwsi.mit.edu/",
    applicationNotes:
      "Requires completion of online qualifying course during fall/spring before summer program. Check specific course requirements.",

    format: "residential",
    location: "Lexington, MA (MIT Lincoln Laboratory)",

    llmContext:
      "MIT BWSI is a challenging and prestigious STEM program run by MIT Lincoln Laboratory. 4-week summer intensive in July focusing on cutting-edge topics: AI and machine learning, autonomous vehicles, cybersecurity, radar systems, satellite technology, and more. Unique multi-phase structure: students must complete online qualifying courses during fall/spring semester (8-12 weeks on Saturdays) before being eligible for summer program. Also offers two national team-based challenges during fall. The summer institute provides immersive, hands-on project-based learning at a level approaching college coursework. Students work directly with MIT and Lincoln Lab researchers and engineers. The connection to Lincoln Lab (a federally funded research center) means exposure to real defense and security applications. Strong for students with programming background who want intensive technical experience. Prerequisites vary by course - some tracks require prior coding experience while others are more accessible. The program is prestigious among tech/engineering admissions committees. Can significantly boost applications to MIT and other top engineering schools.",

    category: "engineering",
    focusAreas: ["engineering", "computer_science", "AI", "robotics", "cybersecurity", "autonomous_systems"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Summer Institute",
        startDate: new Date("2026-07-06"),
        endDate: new Date("2026-08-01"),
        notes: "4 weeks intensive, requires prior online course completion",
      },
    ],
  },

  // ===========================================================================
  // 11. STANFORD MEDICAL YOUTH SCIENCE PROGRAM (SMYSP)
  // ===========================================================================
  {
    name: "Stanford Medical Youth Science Program",
    shortName: "SMYSP",
    organization: "Stanford School of Medicine",
    description:
      "A free 5-week science and medicine enrichment program for low-income, first-generation high school juniors from Northern California. Hands-on exposure to medical careers and research.",
    websiteUrl: "https://med.stanford.edu/odme/high-school-students/smysp.html",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: 2.5,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: ["Biology", "Chemistry"],
    eligibilityNotes:
      "Must be current junior from one of 20 Northern/Central California counties. Must be from low-income family with little/no history of college attendance. Minimum 2.5 GPA but program considers students whose circumstances prevented showing full academic potential. Must be available for mandatory orientation June 18, 2026. Commuter program - must be able to travel to Stanford daily. Open to all genders.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-03-23"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://smysp.spcs.stanford.edu/admissions",
    applicationNotes:
      "Application deadline March 23, 2026. Requires 2 recommendations (1 from STEM teacher, 1 from counselor/mentor), transcript, and optional work sample. Up to 60 finalists invited to interview. Decisions early May 2026.",

    format: "commuter",
    location: "Stanford, CA",

    llmContext:
      "SMYSP is a completely FREE program specifically for low-income, first-generation students from Northern California - one of the few truly accessible pathways to Stanford. 5-week program (June 22 - July 26, 2026) with mandatory orientation June 18. Only 24 students accepted each year. Commuter format - students travel to Stanford Monday-Friday, 30-40 hours/week. No stipend for 2026 but no cost to participate. Program doesn't require A-average - minimum 2.5 GPA with holistic review recognizing that circumstances may prevent some students from showing full potential. Looking for demonstrated interest in science/medicine, maturity, initiative, and curiosity. Must live in one of 20 eligible Northern/Central California counties. The regional restriction is firm. Strong for students from underserved backgrounds who dream of medical or science careers but haven't had opportunities. B-average students with genuine passion are encouraged to apply. Program provides real exposure to medicine and research while building confidence and skills for college.",

    category: "medicine",
    focusAreas: ["medicine", "health", "science", "diversity", "low_income", "first_generation"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Program",
        startDate: new Date("2026-06-22"),
        endDate: new Date("2026-07-26"),
        notes: "5 weeks, free, commuter only, Northern CA residents",
      },
    ],
  },

  // ===========================================================================
  // 12. GIRLS WHO CODE SUMMER PROGRAMS
  // ===========================================================================
  {
    name: "Girls Who Code Summer Programs",
    shortName: "GWC Summer",
    organization: "Girls Who Code",
    description:
      "Free coding programs for girls and non-binary students. The Summer Immersion Program offers a 2-week virtual introduction to computer science, while Pathways provides flexible coursework in cybersecurity, web dev, and data science.",
    websiteUrl: "https://girlswhocode.com/programs",
    programYear: 2026,

    minGrade: 9,
    maxGrade: 12,
    minAge: 14,
    maxAge: 18,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "GENDER RESTRICTED: Open only to students who identify as girls or non-binary. Ages 14-18 for international students; grades 9-12 for U.S. students. No GPA, transcript, or recommendations required. No prior coding experience needed.",

    applicationOpens: null,
    applicationDeadline: null,
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://girlswhocode.com/programs",
    applicationNotes:
      "Check website for 2026 application dates. Programs are free with no application fee. Note: Traditional Summer Immersion Program may be evolving - Pathways program now combines best elements.",

    format: "online",
    location: "Online (Virtual)",

    llmContext:
      "Girls Who Code offers FREE coding education for girls and non-binary students. GENDER RESTRICTED - not open to male-identifying students. The program landscape is evolving: the traditional 2-week Summer Immersion Program may be replaced or combined with Pathways, a newer flexible program covering cybersecurity, web development, data science + AI, and career exploration. No prior coding experience required - designed for beginners. No GPA requirements or recommendations needed. International students ages 14-18 are eligible; U.S. students must be in grades 9-12. The organization has reached 670,000+ members worldwide and 78% of alumni pursue CS majors/minors. Programs connect students with corporate partners for career exposure. Strong for girls/non-binary students curious about tech who want supportive, free introduction without barriers. The community aspect is significant - students join a network of peers with similar interests. Check website for most current 2026 program offerings as the format may change.",

    category: "STEM",
    focusAreas: ["computer_science", "coding", "women_in_STEM", "girls_only", "diversity", "technology"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "pending_2026",

    sessions: [
      {
        name: "Summer Programs",
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-08-15"),
        notes: "Dates vary, free, virtual, check website for 2026 specifics",
      },
    ],
  },

  // ===========================================================================
  // 13. KODE WITH KLOSSY
  // ===========================================================================
  {
    name: "Kode With Klossy",
    shortName: "KWK",
    organization: "Kode With Klossy (founded by Karlie Kloss)",
    description:
      "Free 2-week coding camps for girls, trans, and gender non-conforming students ages 13-18. Learn mobile app development or data science in supportive virtual or in-person sessions.",
    websiteUrl: "https://www.kodewithklossy.com/camp",
    programYear: 2026,

    minGrade: null,
    maxGrade: null,
    minAge: 13,
    maxAge: 18,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "GENDER RESTRICTED: Open to girls, trans, and gender non-conforming students of traditionally underrepresented genders in STEM. Ages 13-18. NO prior coding experience required. Open to international students.",

    applicationOpens: null,
    applicationDeadline: null,
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.kodewithklossy.com/camp",
    applicationNotes:
      "2026 applications closed as of January 2026. Summer 2026 dates and locations to be announced Spring 2026. Join interest list on website for updates.",

    format: "hybrid",
    location: "Virtual + select U.S. cities",

    llmContext:
      "Kode With Klossy, founded by supermodel Karlie Kloss in 2015, offers completely FREE 2-week coding camps for girls, trans, and gender non-conforming students. GENDER RESTRICTED - not open to cisgender male students. Ages 13-18 with no prior coding experience required. Two curriculum tracks: Mobile App Development (Swift, SwiftUI, iOS apps using Xcode) or Data Science (SQL, Python, data visualization). By 2021, 8,000+ scholars graduated. Virtual camps available globally; in-person camps in select U.S. cities (historically: Atlanta, Austin, Boston, Chicago, Dallas, D.C., Indianapolis, LA, Miami, NYC, Philadelphia, Pittsburgh, SF, Seattle, St. Louis, London). The program emphasizes community-building and connecting curious, passionate students who are enthusiastic about tech. Application deadline typically late March. For summer 2026, dates/locations announced in Spring 2026. Strong for younger students (13+) looking for supportive entry point to coding. The Karlie Kloss connection and strong alumni network provide unique networking opportunities.",

    category: "STEM",
    focusAreas: ["computer_science", "coding", "women_in_STEM", "girls_only", "diversity", "mobile_apps", "data_science"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "pending_2026",

    sessions: [
      {
        name: "Summer Camps",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-08-31"),
        notes: "2-week sessions, dates TBA Spring 2026, free",
      },
    ],
  },

  // ===========================================================================
  // 14. GOOGLE CSSI (Computer Science Summer Institute)
  // ===========================================================================
  {
    name: "Google Computer Science Summer Institute",
    shortName: "Google CSSI",
    organization: "Google",
    description:
      "A free 3-week introduction to computer science for graduating high school seniors from underrepresented groups. Hands-on coding experience and mentorship from Google engineers.",
    websiteUrl: "https://buildyourfuture.withgoogle.com/programs/computer-science-summer-institute",
    programYear: 2026,

    minGrade: 12,
    maxGrade: 12,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_permanent_resident",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be graduating high school senior planning to attend 4-year institution in U.S. or Canada and intending to pursue CS degree or related field. Program prioritizes students from historically underrepresented groups in tech. No prior technical background required - passion for CS is key. Open to all genders.",

    applicationOpens: new Date("2026-01-15"),
    applicationDeadline: new Date("2026-03-15"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://buildyourfuture.withgoogle.com/programs/computer-science-summer-institute",
    applicationNotes:
      "Application typically opens January and closes March. Includes general application, transcript, essay questions, and online coding challenge (early March). Final decisions by early May. Contact CSSI@google.com for questions.",

    format: "residential",
    location: "Google offices (various U.S. locations)",

    llmContext:
      "Google CSSI is one of the most prestigious free tech programs available, providing 3 weeks of hands-on CS education at Google offices with Googler mentors. COMPLETELY FREE including food, housing, and travel covered by Google. The program targets graduating seniors planning to pursue CS degrees, especially from underrepresented groups in tech. No prior coding experience required - they accept students of all technical levels as long as you demonstrate interest and enthusiasm. Application includes transcript, essays, and online coding challenge. Selection based on passion for CS, not existing skills. June-August timing (specific dates vary). Provides insider view of Google culture, engineering practices, and career pathways. Strong networking with Googlers and fellow scholars. Alumni network is valuable for internship and job opportunities. The program is competitive but explicitly welcomes applicants from all backgrounds. Strong for students who love problem-solving and technology but haven't had formal CS education opportunities.",

    category: "STEM",
    focusAreas: ["computer_science", "coding", "technology", "diversity", "internship"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "pending_2026",

    sessions: [
      {
        name: "Summer Program",
        startDate: new Date("2026-06-15"),
        endDate: new Date("2026-08-15"),
        notes: "3 weeks, fully funded by Google, dates TBA",
      },
    ],
  },

  // ===========================================================================
  // 15. WHARTON LEADERSHIP IN THE BUSINESS WORLD (LBW)
  // ===========================================================================
  {
    name: "Wharton Leadership in the Business World",
    shortName: "Wharton LBW",
    organization: "Wharton School, University of Pennsylvania",
    description:
      "An intensive 3-week residential program introducing rising seniors to business fundamentals, organizational strategy, and leadership. Culminates in a capstone case competition.",
    websiteUrl: "https://globalyouth.wharton.upenn.edu/programs-courses/leadership-in-the-business-world/",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: 3.5,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be rising senior (current junior, grade 11). Minimum 3.5 unweighted GPA. Must have demonstrated leadership experience and academic excellence. International applicants welcome. Open to all genders.",

    applicationOpens: null,
    applicationDeadline: new Date("2026-03-18"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://globalyouth.wharton.upenn.edu/programs-courses/leadership-in-the-business-world/",
    applicationNotes:
      "Priority deadline January 28, 2026. Final deadline March 18, 2026. Approximately 120 students selected per session.",

    format: "residential",
    location: "Philadelphia, PA (Wharton/UPenn Campus)",

    llmContext:
      "Wharton LBW is the premier pre-college business program in the U.S., run by the Wharton School since 1999. 3-week immersive residential experience introducing students to business fundamentals and leadership. Three sessions: June 7-27, June 28-July 18, July 19-August 8. Approximately 120 students per session from six continents and all U.S. states. Highly selective with many more applicants than spots - 3.5+ unweighted GPA and demonstrated leadership required. Program includes classroom discussions on business topics (leadership, teamwork, finance, entrepreneurship), Wharton Interactive digital simulations, case competitions, and meetings with successful business leaders across industries. Culminates in capstone case competition. Students receive Wharton Global Youth Certificate of Completion. Cost is approximately $7,500-10,000 (check current rates). Financial aid available but limited. Strong for students genuinely interested in business, entrepreneurship, or leadership - not just as resume padding. The Wharton name carries significant weight for college applications and future networking.",

    category: "business",
    focusAreas: ["business", "leadership", "entrepreneurship", "finance", "management"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Session 1",
        startDate: new Date("2026-06-07"),
        endDate: new Date("2026-06-27"),
        notes: "3 weeks",
      },
      {
        name: "Session 2",
        startDate: new Date("2026-06-28"),
        endDate: new Date("2026-07-18"),
        notes: "3 weeks",
      },
      {
        name: "Session 3",
        startDate: new Date("2026-07-19"),
        endDate: new Date("2026-08-08"),
        notes: "3 weeks",
      },
    ],
  },

  // ===========================================================================
  // 16. BOYS STATE (American Legion)
  // ===========================================================================
  {
    name: "American Legion Boys State",
    shortName: "Boys State",
    organization: "The American Legion",
    description:
      "A one-week government simulation program for high school juniors. Participants form mock city and state governments, run for office, pass legislation, and learn citizenship responsibilities.",
    websiteUrl: "https://www.legion.org/boysstate",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: 16,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_only",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be male-identifying student who has completed junior year with at least one semester remaining. Most states require age 16+. Delegates who turn 18 before session end may require background check. Must be nominated/sponsored by local American Legion post. Previous Boys State participants cannot attend again. MALE ONLY - female students should apply to Girls State.",

    applicationOpens: null,
    applicationDeadline: null,
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.legion.org/boysstate",
    applicationNotes:
      "Application process varies by state. Contact local American Legion post or school counselor for sponsorship. Expenses typically covered by sponsoring post or local business.",

    format: "residential",
    location: "Various state university campuses (50 state programs)",

    llmContext:
      "Boys State is a legendary 1-week government simulation program founded in 1935, held separately in each of 50 states. MALE ONLY - one of the few gender-restricted programs for male students (counterpart is Girls State for females). Participants form mock governments at city, county, and state levels - running for offices, holding legislative sessions, conducting court proceedings. Selection based on leadership, character, scholarship, loyalty, and service. Must be nominated/sponsored by local American Legion post - typically schools recommend students to their local post. Expenses usually covered by sponsor. Dates vary by state (examples: Virginia June 21-27, California June 20-26, Illinois starts June 13). Age requirement typically 16+ (varies slightly by state). Top performers from each state may be selected for Boys Nation in Washington D.C. - an elite follow-on program where 2 delegates per state act as U.S. Senators. Notable alumni include Bill Clinton, Neil Armstrong, Tom Brokaw, and many governors and senators. Strong for students interested in government, law, politics, or public service.",

    category: "leadership",
    focusAreas: ["government", "leadership", "politics", "civic_engagement", "public_service"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "State Sessions (dates vary)",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-07-15"),
        notes: "1 week per state, dates vary, typically free via sponsorship",
      },
    ],
  },

  // ===========================================================================
  // 17. GIRLS STATE (American Legion Auxiliary)
  // ===========================================================================
  {
    name: "American Legion Auxiliary Girls State",
    shortName: "Girls State",
    organization: "American Legion Auxiliary",
    description:
      "A one-week government simulation for high school junior girls. Participants form mock governments, run for office, pass legislation, and learn democratic responsibilities.",
    websiteUrl: "https://www.legion-aux.org/ala-girls-state",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "us_only",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "FEMALE ONLY - must be female-identifying student who has completed junior year. Must be nominated/sponsored by local American Legion Auxiliary unit. Above-average academic standing, outstanding character, and exemplary leadership qualities expected. Public, private, and homeschool students welcome. FEMALE ONLY - male students should apply to Boys State.",

    applicationOpens: null,
    applicationDeadline: null,
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.legion-aux.org/ala-girls-state",
    applicationNotes:
      "Contact school counselor or local American Legion Auxiliary unit for sponsorship. Registration fees typically paid by sponsoring unit (e.g., $400 in Florida). Application processes vary by state.",

    format: "residential",
    location: "Various state locations (held in most states)",

    llmContext:
      "Girls State is the female counterpart to Boys State, founded in 1938. FEMALE ONLY gender-restricted program. 1-week intensive government simulation held separately in each state. Participants form mock city, county, and state governments - running for offices, conducting legislative sessions, learning democratic processes. Must be female junior nominated by local American Legion Auxiliary unit. Selection based on leadership, character, academics, and community involvement. Registration typically covered by sponsoring unit or civic organizations. Dates vary by state (examples: Virginia June 21-26, Colorado June 7-13, New York June 30 - July 6). Top performers may be selected for Girls Nation in Washington D.C. - 2 'Senators' per state participate in mock U.S. Senate. Notable alumni include many state and federal officials. The program teaches citizenship, public speaking, civic engagement, and leadership. Strong for young women interested in government, law, politics, or public service. The network of Girls State alumni is valuable for future opportunities.",

    category: "leadership",
    focusAreas: ["government", "leadership", "politics", "civic_engagement", "public_service", "women_in_leadership"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "State Sessions (dates vary)",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-07-15"),
        notes: "1 week per state, dates vary, typically sponsored",
      },
    ],
  },

  // ===========================================================================
  // 18. MEDILL-NORTHWESTERN JOURNALISM INSTITUTE (CHERUBS)
  // ===========================================================================
  {
    name: "Medill-Northwestern Journalism Institute",
    shortName: "Cherubs",
    organization: "Northwestern University Medill School of Journalism",
    description:
      "An intensive 4-week summer program for rising seniors passionate about journalism. Learn from Medill faculty, work on real stories, and connect with peers who share your passion for media.",
    websiteUrl: "https://www.medill.northwestern.edu/journalism/high-school-programs/medill-cherubs.html",
    programYear: 2026,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be rising senior (completing junior year May/June 2025). Must rank in top quarter of high school class. Must meet high standards of character, dependability, and intelligence. Must show specific evidence of background and/or special ability in journalism. Open to all genders.",

    applicationOpens: new Date("2025-10-01"),
    applicationDeadline: new Date("2026-03-02"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://www.medill.northwestern.edu/journalism/high-school-programs/medill-cherubs.html",
    applicationNotes:
      "Application deadline March 2, 2026 at 4 PM CT. Requires transcript, recommendation from counselor/teacher, personal essay, optional writing samples (highly encouraged). $50 application fee (check). Decisions mailed by March 25, 2026.",

    format: "residential",
    location: "Evanston, IL (Northwestern Campus)",

    llmContext:
      "Medill Cherubs is the premier high school journalism program in the U.S., run by Northwestern's Medill School - one of the top journalism schools nationally. 4-week residential program June 28 - July 24, 2026 accepting only 84 students. ~37% acceptance rate (230 applicants in 2024). Cost is $5,000 covering instruction, housing, meals, field trips, and activities. Up to $100,000 in need-based financial aid available each summer. Students must rank in top quarter of class and show demonstrated journalism interest/ability. Writing samples highly encouraged though not required. The program provides professional journalism training including reporting, writing, interviewing, multimedia storytelling, and media ethics. Students work on real stories and publish work. Strong for students serious about journalism, media, communications, or writing careers. The Cherubs network is legendary - alumni include prominent journalists and media professionals. The experience provides realistic preview of journalism education and career. Application requires $50 fee paid by check.",

    category: "writing",
    focusAreas: ["journalism", "writing", "media", "communications", "storytelling"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Main Session",
        startDate: new Date("2026-06-28"),
        endDate: new Date("2026-07-24"),
        notes: "4 weeks, $5,000 with financial aid available",
      },
    ],
  },

  // ===========================================================================
  // 19. IOWA YOUNG WRITERS' STUDIO
  // ===========================================================================
  {
    name: "Iowa Young Writers' Studio",
    shortName: "Iowa YWS",
    organization: "University of Iowa",
    description:
      "A 2-week residential creative writing program taught by instructors from the legendary Iowa Writers' Workshop. Students choose one core course in Poetry, Fiction, Creative Writing, Playwriting, or TV Writing.",
    websiteUrl: "https://iyws.program.uiowa.edu/",
    programYear: 2026,

    minGrade: 10,
    maxGrade: 12,
    minAge: null,
    maxAge: null,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be current 10th, 11th, or 12th grader (NO 9th graders accepted anymore). Both U.S. and international students welcome. Open to all genders. 3.0 GPA required for online courses only.",

    applicationOpens: new Date("2026-01-19"),
    applicationDeadline: new Date("2026-02-01"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://iyws.program.uiowa.edu/how-to-apply/summer-residential-program",
    applicationNotes:
      "Application period: January 19, 2026 (12:00 AM CT) through February 1, 2026 (11:59 PM CT). $10 reading fee (waivers available). Must pay $2,500 and register by May 15, 2026 if accepted.",

    format: "residential",
    location: "Iowa City, IA (University of Iowa)",

    llmContext:
      "Iowa Young Writers' Studio is the youth program of the legendary Iowa Writers' Workshop - the most prestigious creative writing MFA program in the world. 2-week residential sessions taught by Workshop instructors and graduates. Two sessions: June 14-27 and July 12-25, 2026. Cost is $2,500 covering room, board, instruction, materials, and activities. Need-based financial aid available including full and partial tuition grants. Short application window: January 19 - February 1, 2026 only. Students choose ONE core course: Poetry, Fiction, Creative Writing, Playwriting, or TV Writing. Important: 9th graders are NO LONGER eligible - only 10th-12th graders accepted. The program offers intensive workshop experience in small cohorts with serious feedback on creative work. Strong for students committed to creative writing who want rigorous craft instruction and exposure to Iowa's writing culture. The connection to Iowa Writers' Workshop provides unique access to high-level literary community. Also offers 6-week online courses during winter and summer for students who can't attend in person.",

    category: "writing",
    focusAreas: ["creative_writing", "writing", "literature", "poetry", "fiction", "playwriting"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Session 1",
        startDate: new Date("2026-06-14"),
        endDate: new Date("2026-06-27"),
        notes: "2 weeks, $2,500",
      },
      {
        name: "Session 2",
        startDate: new Date("2026-07-12"),
        endDate: new Date("2026-07-25"),
        notes: "2 weeks, $2,500",
      },
    ],
  },

  // ===========================================================================
  // 20. KENYON REVIEW YOUNG WRITERS WORKSHOP
  // ===========================================================================
  {
    name: "Kenyon Review Young Writers Workshop",
    shortName: "Kenyon Young Writers",
    organization: "Kenyon College / The Kenyon Review",
    description:
      "A 2-week residential creative writing workshop for high school students. Multi-genre workshops in poetry, fiction, creative nonfiction, and more on the beautiful Kenyon College campus.",
    websiteUrl: "https://kenyonreview.org/high-school-workshops/",
    programYear: 2026,

    minGrade: null,
    maxGrade: null,
    minAge: 16,
    maxAge: 18,
    minGpaUnweighted: null,
    minGpaWeighted: null,
    citizenship: "international_ok",
    requiredCourses: [],
    recommendedCourses: [],
    eligibilityNotes:
      "Must be 16-18 years old at time of program. Most participants are rising juniors or seniors. Both U.S. and international students welcome. Open to all genders. No GPA requirement.",

    applicationOpens: new Date("2026-01-06"),
    applicationDeadline: new Date("2026-03-01"),
    isRolling: false,
    rollingNotes: null,
    applicationUrl: "https://kenyonreview.org/high-school-workshops/",
    applicationNotes:
      "Summer residential applications open January 6, close March 1, 2026. Requires 300-word statement/essay/poem about why writing is meaningful, transcript, teacher recommendation. No application fee. $500 deposit due by April 3 if accepted; balance due by May 18.",

    format: "residential",
    location: "Gambier, OH (Kenyon College)",

    llmContext:
      "Kenyon Review Young Writers is one of the most respected high school creative writing programs, connected to The Kenyon Review - one of America's premier literary journals. 2-week residential workshops on Kenyon College's picturesque campus. Two sessions: June 21-July 4 and July 12-25, 2026. Cost is $2,575 covering tuition, housing, meals, and all activities (travel not included). Need-based financial aid available - they typically grant requested amounts to all admitted students. Age-based eligibility: 16-18 years old (not grade-based). Multi-genre approach allows exploration of poetry, fiction, creative nonfiction, and other forms. Workshops are intensive and supportive - students stretch talents, discover new strengths, and build community with peers. Also offers Summer Online Workshop (June 14-19, $995) and Winter Online Workshop (January 24-February 28, $695) for students who can't attend in person. Strong for serious young writers who want craft instruction and literary community. The Kenyon connection provides exposure to elite literary culture and network.",

    category: "writing",
    focusAreas: ["creative_writing", "writing", "literature", "poetry", "fiction", "nonfiction"],
    isActive: true,
    dataSource: "manual",
    dataStatus: "verified",

    sessions: [
      {
        name: "Session 1 (Residential)",
        startDate: new Date("2026-06-21"),
        endDate: new Date("2026-07-04"),
        notes: "2 weeks, $2,575",
      },
      {
        name: "Session 2 (Residential)",
        startDate: new Date("2026-07-12"),
        endDate: new Date("2026-07-25"),
        notes: "2 weeks, $2,575",
      },
      {
        name: "Summer Online",
        startDate: new Date("2026-06-14"),
        endDate: new Date("2026-06-19"),
        notes: "1 week online, $995",
      },
    ],
  },
];
