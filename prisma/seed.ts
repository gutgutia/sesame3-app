import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Summer Programs for 2025
// Data compiled from program websites - verify before relying on it
const summerPrograms2025 = [
  // =============================================================================
  // HIGHLY SELECTIVE STEM/RESEARCH PROGRAMS
  // =============================================================================
  {
    name: 'Research Science Institute',
    shortName: 'RSI',
    organization: 'MIT / Center for Excellence in Education',
    description: 'A free six-week summer program at MIT for high school students who have demonstrated excellence in math and science. Students conduct original research under the mentorship of scientists and researchers.',
    websiteUrl: 'https://www.cee.org/programs/rsi',
    programYear: 2025,

    // Eligibility
    minGrade: 11,
    maxGrade: 11,
    minAge: 15,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['AP Calculus BC', 'AP Physics C', 'AP Chemistry'],
    otherRequirements: ['Must be a current high school junior'],
    eligibilityNotes: 'One of the most competitive summer programs. Strong preference for students with research experience and competition achievements.',

    // Application
    applicationOpens: new Date('2024-11-01'),
    applicationDeadline: new Date('2025-01-15'),
    isRolling: false,
    notificationDate: new Date('2025-04-15'),
    applicationUrl: 'https://www.cee.org/programs/rsi/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: true,

    // Program details
    startDate: new Date('2025-06-22'),
    endDate: new Date('2025-08-02'),
    duration: '6 weeks',
    format: 'residential',
    location: 'Cambridge, MA',

    // Cost
    cost: 0,
    stipend: null,
    financialAid: true,
    costNotes: 'Completely free - all expenses covered',

    // Classification
    selectivity: 'highly_selective',
    acceptanceRate: 0.02,
    cohortSize: 80,
    focusAreas: ['STEM', 'research', 'science', 'mathematics', 'engineering'],
  },

  {
    name: 'Summer Science Program',
    shortName: 'SSP',
    organization: 'Summer Science Program',
    description: 'An intensive 6-week academic experience for talented high school students. Students complete a challenging research project in astrophysics, biochemistry, or genomics.',
    websiteUrl: 'https://summerscience.org',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['Pre-Calculus', 'Physics', 'Chemistry'],
    otherRequirements: ['Must be rising senior or rarely a rising junior'],
    eligibilityNotes: 'Three tracks: Astrophysics (NM & CO campuses), Biochemistry (IN campus), Genomics (NC campus)',

    applicationOpens: new Date('2024-11-15'),
    applicationDeadline: new Date('2025-02-01'),
    isRolling: false,
    notificationDate: new Date('2025-04-01'),
    applicationUrl: 'https://summerscience.org/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-07-27'),
    duration: '6 weeks',
    format: 'residential',
    location: 'Multiple (NM, CO, IN, NC)',

    cost: 8950,
    stipend: null,
    financialAid: true,
    costNotes: 'Need-based financial aid available, over 30% receive aid',

    selectivity: 'highly_selective',
    acceptanceRate: 0.05,
    cohortSize: 144,
    focusAreas: ['STEM', 'research', 'astrophysics', 'biochemistry', 'genomics'],
  },

  {
    name: 'MIT Online Science, Technology, and Engineering Community',
    shortName: 'MOSTEC',
    organization: 'MIT Office of Engineering Outreach Programs',
    description: 'A free six-month online program for rising high school seniors from underrepresented and underserved backgrounds. Includes online coursework and a one-week on-campus conference.',
    websiteUrl: 'https://oeop.mit.edu/programs/mostec',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2', 'Pre-Calculus'],
    otherRequirements: ['Must be rising senior', 'Focus on underrepresented backgrounds in STEM'],
    eligibilityNotes: 'Preference given to students from underrepresented groups in STEM, first-generation college students, and those from under-resourced schools.',

    applicationOpens: new Date('2025-01-01'),
    applicationDeadline: new Date('2025-02-15'),
    isRolling: false,
    notificationDate: new Date('2025-04-15'),
    applicationUrl: 'https://oeop.mit.edu/programs/mostec/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-12-31'),
    duration: '6 months (online) + 1 week on campus',
    format: 'hybrid',
    location: 'Online + Cambridge, MA',

    cost: 0,
    stipend: null,
    financialAid: true,
    costNotes: 'Completely free including travel for on-campus week',

    selectivity: 'highly_selective',
    acceptanceRate: 0.08,
    cohortSize: 100,
    focusAreas: ['STEM', 'engineering', 'science', 'technology'],
  },

  {
    name: 'Stanford Institutes of Medicine Summer Research Program',
    shortName: 'SIMR',
    organization: 'Stanford Medicine',
    description: 'An 8-week summer program for high school students interested in pursuing research in the biomedical sciences, health, or medicine. Students work alongside Stanford researchers.',
    websiteUrl: 'https://simr.stanford.edu',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 12,
    minAge: 16,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Biology', 'Chemistry'],
    otherRequirements: ['Must be at least 16 years old'],
    eligibilityNotes: 'Priority given to students from groups underrepresented in medicine and science.',

    applicationOpens: new Date('2025-01-01'),
    applicationDeadline: new Date('2025-02-13'),
    isRolling: false,
    notificationDate: new Date('2025-04-01'),
    applicationUrl: 'https://simr.stanford.edu/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-16'),
    endDate: new Date('2025-08-08'),
    duration: '8 weeks',
    format: 'commuter',
    location: 'Stanford, CA',

    cost: 0,
    stipend: 500,
    financialAid: true,
    costNotes: 'Free program, $500 stipend provided',

    selectivity: 'highly_selective',
    acceptanceRate: 0.05,
    cohortSize: 60,
    focusAreas: ['medicine', 'research', 'biology', 'health', 'science'],
  },

  // =============================================================================
  // CALIFORNIA COSMOS
  // =============================================================================
  {
    name: 'California State Summer School for Mathematics and Science',
    shortName: 'COSMOS',
    organization: 'University of California',
    description: 'A 4-week intensive residential program for students with demonstrated interest and achievement in math and science. Campuses at UC Davis, UC Irvine, UC San Diego, and UC Santa Cruz.',
    websiteUrl: 'https://cosmos-ucop.ucdavis.edu',
    programYear: 2025,

    minGrade: 9,
    maxGrade: 12,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2'],
    otherRequirements: ['Must be California resident OR out-of-state with different fee'],
    eligibilityNotes: 'Priority for California residents. Out-of-state students pay higher tuition.',

    applicationOpens: new Date('2025-01-06'),
    applicationDeadline: new Date('2025-02-14'),
    isRolling: false,
    notificationDate: new Date('2025-04-01'),
    applicationUrl: 'https://cosmos-ucop.ucdavis.edu/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-07-06'),
    endDate: new Date('2025-08-02'),
    duration: '4 weeks',
    format: 'residential',
    location: 'UC Davis, UC Irvine, UC San Diego, or UC Santa Cruz',

    cost: 4500,
    stipend: null,
    financialAid: true,
    costNotes: 'California residents: ~$4,500. Out-of-state: ~$8,500. Financial aid covers 75% of students.',

    selectivity: 'selective',
    acceptanceRate: 0.25,
    cohortSize: 600,
    focusAreas: ['STEM', 'mathematics', 'science', 'engineering', 'research'],
  },

  // =============================================================================
  // PROGRAMS FOR YOUNGER STUDENTS (9th-10th grade friendly)
  // =============================================================================
  {
    name: 'Stanford Pre-Collegiate Summer Institutes',
    shortName: 'Stanford Summer',
    organization: 'Stanford Pre-Collegiate Studies',
    description: 'Intensive 2-3 week academic courses for intellectually curious students. Wide range of subjects from AI to creative writing to mathematics.',
    websiteUrl: 'https://summerinstitutes.spcs.stanford.edu',
    programYear: 2025,

    minGrade: 8,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: [],
    otherRequirements: [],
    eligibilityNotes: 'Courses have different grade requirements. Some accept 8th graders, some require 10th+.',

    applicationOpens: new Date('2024-12-01'),
    applicationDeadline: new Date('2025-03-15'),
    isRolling: true,
    rollingNotes: 'Applications reviewed on rolling basis until courses fill',
    notificationDate: null,
    applicationUrl: 'https://summerinstitutes.spcs.stanford.edu/apply',
    applicationFee: 100,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-21'),
    endDate: new Date('2025-08-10'),
    duration: '2-3 weeks',
    format: 'residential',
    location: 'Stanford, CA',

    cost: 7750,
    stipend: null,
    financialAid: true,
    costNotes: 'Need-based financial aid available for US citizens/residents',

    selectivity: 'selective',
    acceptanceRate: 0.30,
    cohortSize: 2000,
    focusAreas: ['academics', 'humanities', 'STEM', 'arts', 'social_sciences'],
  },

  {
    name: 'Johns Hopkins Center for Talented Youth Summer Programs',
    shortName: 'CTY Summer',
    organization: 'Johns Hopkins Center for Talented Youth',
    description: 'Intensive academic programs for gifted students. Multiple sessions and locations. Students take one course and dive deep into a subject.',
    websiteUrl: 'https://cty.jhu.edu/summer',
    programYear: 2025,

    minGrade: 5,
    maxGrade: 12,
    minAge: 10,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: [],
    otherRequirements: ['Must qualify through CTY Talent Search (SAT/ACT scores)'],
    eligibilityNotes: 'Requires qualifying test scores from CTY Talent Search, SAT, or ACT. Different score thresholds for different courses.',

    applicationOpens: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-04-01'),
    isRolling: true,
    rollingNotes: 'Rolling admissions, courses fill quickly',
    notificationDate: null,
    applicationUrl: 'https://cty.jhu.edu/summer/apply',
    applicationFee: 75,
    requiresRecs: false,
    requiresTranscript: false,
    requiresEssay: false,
    requiresTestScores: true,
    applicationNotes: 'Requires qualifying test scores from CTY Talent Search',

    startDate: new Date('2025-06-22'),
    endDate: new Date('2025-08-08'),
    duration: '3 weeks per session',
    format: 'residential',
    location: 'Multiple campuses nationwide',

    cost: 6500,
    stipend: null,
    financialAid: true,
    costNotes: 'Financial aid available for qualifying families',

    selectivity: 'moderate',
    acceptanceRate: null,
    cohortSize: 10000,
    focusAreas: ['academics', 'mathematics', 'science', 'humanities', 'writing'],
  },

  {
    name: 'Mathcamp',
    shortName: 'Mathcamp',
    organization: 'Mathematical Sciences Research Institute',
    description: 'An intensive 5-week summer program for mathematically talented high school students. Students take classes in advanced mathematics and work on problem-solving.',
    websiteUrl: 'https://www.mathcamp.org',
    programYear: 2025,

    minGrade: 9,
    maxGrade: 12,
    minAge: 13,
    maxAge: 18,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2', 'Geometry'],
    otherRequirements: [],
    eligibilityNotes: 'Qualifying quiz is the main admission criterion. Strong problem-solving skills needed.',

    applicationOpens: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-03-15'),
    isRolling: false,
    notificationDate: new Date('2025-04-15'),
    applicationUrl: 'https://www.mathcamp.org/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: false,
    requiresEssay: false,
    requiresTestScores: false,
    applicationNotes: 'Requires completing a qualifying quiz',

    startDate: new Date('2025-07-06'),
    endDate: new Date('2025-08-10'),
    duration: '5 weeks',
    format: 'residential',
    location: 'Varies yearly',

    cost: 5500,
    stipend: null,
    financialAid: true,
    costNotes: 'Significant financial aid available - no student turned away for financial reasons',

    selectivity: 'highly_selective',
    acceptanceRate: 0.12,
    cohortSize: 120,
    focusAreas: ['mathematics', 'problem_solving'],
  },

  {
    name: 'Ross Mathematics Program',
    shortName: 'Ross',
    organization: 'Ohio State University',
    description: 'An intensive 6-week summer program for high school students interested in mathematics. Focus on number theory with emphasis on mathematical thinking and problem-solving.',
    websiteUrl: 'https://rossprogram.org',
    programYear: 2025,

    minGrade: 9,
    maxGrade: 12,
    minAge: 15,
    maxAge: 18,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2'],
    otherRequirements: [],
    eligibilityNotes: 'Application includes challenging math problems. Strong mathematical thinking skills required.',

    applicationOpens: new Date('2025-01-01'),
    applicationDeadline: new Date('2025-03-31'),
    isRolling: false,
    notificationDate: new Date('2025-05-01'),
    applicationUrl: 'https://rossprogram.org/students/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: false,
    requiresEssay: true,
    requiresTestScores: false,
    applicationNotes: 'Application includes solving several challenging math problems',

    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-07-26'),
    duration: '6 weeks',
    format: 'residential',
    location: 'Columbus, OH (also Asia sites)',

    cost: 6000,
    stipend: null,
    financialAid: true,
    costNotes: 'Generous financial aid available based on need',

    selectivity: 'highly_selective',
    acceptanceRate: 0.10,
    cohortSize: 70,
    focusAreas: ['mathematics', 'number_theory', 'problem_solving'],
  },

  {
    name: 'Hampshire College Summer Studies in Mathematics',
    shortName: 'HCSSiM',
    organization: 'Hampshire College',
    description: 'A 6-week residential program for mathematically talented high school students. Known for its collaborative environment and exploration of advanced topics.',
    websiteUrl: 'https://hcssim.org',
    programYear: 2025,

    minGrade: 9,
    maxGrade: 12,
    minAge: null,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2'],
    otherRequirements: [],
    eligibilityNotes: 'Application includes math problems. Looking for creative mathematical thinking.',

    applicationOpens: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-04-15'),
    isRolling: true,
    rollingNotes: 'Applications reviewed as received',
    notificationDate: null,
    applicationUrl: 'https://hcssim.org/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: false,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-08-10'),
    duration: '6 weeks',
    format: 'residential',
    location: 'Amherst, MA',

    cost: 5500,
    stipend: null,
    financialAid: true,
    costNotes: 'Financial aid available',

    selectivity: 'highly_selective',
    acceptanceRate: 0.15,
    cohortSize: 60,
    focusAreas: ['mathematics', 'problem_solving'],
  },

  // =============================================================================
  // RESEARCH PROGRAMS (various selectivity)
  // =============================================================================
  {
    name: 'Garcia Summer Scholars',
    shortName: 'Garcia',
    organization: 'Stony Brook University',
    description: 'A 7-week summer research program for high school students interested in materials science and engineering. Students conduct original research in university labs.',
    websiteUrl: 'https://www.stonybrook.edu/commcms/garcia/',
    programYear: 2025,

    minGrade: 10,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Chemistry', 'Physics'],
    otherRequirements: [],
    eligibilityNotes: 'Preference for students interested in materials science, polymer chemistry, or related fields.',

    applicationOpens: new Date('2025-01-15'),
    applicationDeadline: new Date('2025-02-28'),
    isRolling: false,
    notificationDate: new Date('2025-04-15'),
    applicationUrl: 'https://www.stonybrook.edu/commcms/garcia/apply.php',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-30'),
    endDate: new Date('2025-08-15'),
    duration: '7 weeks',
    format: 'residential',
    location: 'Stony Brook, NY',

    cost: 0,
    stipend: 1500,
    financialAid: true,
    costNotes: 'Free program with $1500 stipend',

    selectivity: 'highly_selective',
    acceptanceRate: 0.05,
    cohortSize: 30,
    focusAreas: ['research', 'materials_science', 'engineering', 'chemistry', 'STEM'],
  },

  {
    name: 'Simons Summer Research Program',
    shortName: 'Simons',
    organization: 'Stony Brook University',
    description: 'An 8-week summer research program pairing high school students with Stony Brook faculty mentors for hands-on research experience in STEM fields.',
    websiteUrl: 'https://www.stonybrook.edu/simons/',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: [],
    otherRequirements: ['Must be entering senior year'],
    eligibilityNotes: 'For rising seniors only. Strong interest in STEM research required.',

    applicationOpens: new Date('2024-11-01'),
    applicationDeadline: new Date('2025-02-01'),
    isRolling: false,
    notificationDate: new Date('2025-04-01'),
    applicationUrl: 'https://www.stonybrook.edu/simons/application.php',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-06-23'),
    endDate: new Date('2025-08-15'),
    duration: '8 weeks',
    format: 'residential',
    location: 'Stony Brook, NY',

    cost: 0,
    stipend: 800,
    financialAid: true,
    costNotes: 'Free program with stipend',

    selectivity: 'highly_selective',
    acceptanceRate: 0.04,
    cohortSize: 30,
    focusAreas: ['research', 'STEM', 'science', 'mathematics', 'engineering'],
  },

  {
    name: 'Boston University RISE Internship',
    shortName: 'BU RISE',
    organization: 'Boston University',
    description: 'A 6-week summer research internship for high school students. Students work in BU research labs across various STEM disciplines.',
    websiteUrl: 'https://www.bu.edu/summer/high-school-programs/rise/',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 12,
    minAge: 17,
    maxAge: null,
    citizenship: 'international_ok',
    requiredCourses: [],
    recommendedCourses: ['Biology', 'Chemistry', 'Physics'],
    otherRequirements: ['Must be at least 17 years old by program start'],
    eligibilityNotes: 'Age 17+ requirement. International students eligible.',

    applicationOpens: new Date('2025-01-01'),
    applicationDeadline: new Date('2025-02-15'),
    isRolling: false,
    notificationDate: new Date('2025-03-31'),
    applicationUrl: 'https://www.bu.edu/summer/high-school-programs/rise/apply/',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-07-07'),
    endDate: new Date('2025-08-15'),
    duration: '6 weeks',
    format: 'residential',
    location: 'Boston, MA',

    cost: 5000,
    stipend: null,
    financialAid: true,
    costNotes: 'Program fee covers housing and meals. Financial aid available.',

    selectivity: 'selective',
    acceptanceRate: 0.15,
    cohortSize: 100,
    focusAreas: ['research', 'STEM', 'science', 'engineering', 'health'],
  },

  // =============================================================================
  // PROGRAMS FOR UNDERREPRESENTED GROUPS
  // =============================================================================
  {
    name: 'MIT Women\'s Technology Program',
    shortName: 'WTP',
    organization: 'MIT',
    description: 'A rigorous 4-week summer program for high school juniors who identify as women. Students study electrical engineering and computer science through hands-on projects.',
    websiteUrl: 'https://wtp.mit.edu',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Pre-Calculus', 'Physics'],
    otherRequirements: ['Must identify as a woman or non-binary'],
    eligibilityNotes: 'Open to students who identify as women or non-binary. Must be rising senior.',

    applicationOpens: new Date('2024-12-15'),
    applicationDeadline: new Date('2025-02-01'),
    isRolling: false,
    notificationDate: new Date('2025-04-15'),
    applicationUrl: 'https://wtp.mit.edu/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-07-06'),
    endDate: new Date('2025-08-02'),
    duration: '4 weeks',
    format: 'residential',
    location: 'Cambridge, MA',

    cost: 0,
    stipend: null,
    financialAid: true,
    costNotes: 'Completely free - all expenses covered',

    selectivity: 'highly_selective',
    acceptanceRate: 0.10,
    cohortSize: 60,
    focusAreas: ['engineering', 'computer_science', 'EECS', 'women_in_STEM'],
  },

  {
    name: 'MITES Semester',
    shortName: 'MITES Semester',
    organization: 'MIT Office of Engineering Outreach Programs',
    description: 'A 6-month online program followed by on-campus experience for high school juniors from underrepresented backgrounds interested in STEM.',
    websiteUrl: 'https://oeop.mit.edu/programs/mites',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: ['Algebra 2', 'Geometry'],
    otherRequirements: ['Focus on underrepresented minorities in STEM', 'First-generation college students encouraged'],
    eligibilityNotes: 'Priority for students from underrepresented groups in STEM, first-gen, and under-resourced schools.',

    applicationOpens: new Date('2024-10-01'),
    applicationDeadline: new Date('2025-01-05'),
    isRolling: false,
    notificationDate: new Date('2025-03-15'),
    applicationUrl: 'https://oeop.mit.edu/programs/mites/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-08-01'),
    duration: '6 months online + campus experience',
    format: 'hybrid',
    location: 'Online + Cambridge, MA',

    cost: 0,
    stipend: null,
    financialAid: true,
    costNotes: 'Completely free including travel for on-campus portions',

    selectivity: 'highly_selective',
    acceptanceRate: 0.06,
    cohortSize: 80,
    focusAreas: ['STEM', 'engineering', 'science', 'diversity'],
  },

  {
    name: 'Questbridge College Prep Scholars',
    shortName: 'QuestBridge CPS',
    organization: 'QuestBridge',
    description: 'A free program that connects high-achieving high school juniors from low-income backgrounds with educational and scholarship opportunities.',
    websiteUrl: 'https://www.questbridge.org/high-school-students/college-prep-scholars',
    programYear: 2025,

    minGrade: 11,
    maxGrade: 11,
    minAge: null,
    maxAge: null,
    citizenship: 'us_permanent_resident',
    requiredCourses: [],
    recommendedCourses: [],
    otherRequirements: ['Household income typically under $65,000 for family of 4'],
    eligibilityNotes: 'For high-achieving, low-income students. Opens doors to fly-in programs and college guidance.',

    applicationOpens: new Date('2025-01-01'),
    applicationDeadline: new Date('2025-03-24'),
    isRolling: false,
    notificationDate: new Date('2025-05-15'),
    applicationUrl: 'https://www.questbridge.org/high-school-students/college-prep-scholars/apply',
    applicationFee: 0,
    requiresRecs: true,
    requiresTranscript: true,
    requiresEssay: true,
    requiresTestScores: false,

    startDate: null,
    endDate: null,
    duration: 'Year-round support + summer conference',
    format: 'hybrid',
    location: 'Online + partner colleges',

    cost: 0,
    stipend: null,
    financialAid: true,
    costNotes: 'Completely free, provides access to college fly-ins',

    selectivity: 'highly_selective',
    acceptanceRate: 0.15,
    cohortSize: 6500,
    focusAreas: ['college_prep', 'leadership', 'academics'],
  },
]

async function seedSummerPrograms() {
  console.log('Seeding summer programs...')

  for (const program of summerPrograms2025) {
    const existing = await prisma.summerProgram.findFirst({
      where: {
        name: program.name,
        programYear: program.programYear,
      },
    })

    if (existing) {
      console.log(`  Updating: ${program.shortName || program.name}`)
      await prisma.summerProgram.update({
        where: { id: existing.id },
        data: program,
      })
    } else {
      console.log(`  Creating: ${program.shortName || program.name}`)
      await prisma.summerProgram.create({
        data: program,
      })
    }
  }

  console.log(`Seeded ${summerPrograms2025.length} summer programs for 2025`)
}

async function main() {
  try {
    await seedSummerPrograms()
    console.log('\nSeeding complete!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
