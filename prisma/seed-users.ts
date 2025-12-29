/**
 * Seed Users - Test profiles for advisor testing
 *
 * Creates 4 student profiles with varying academic profiles:
 * - highachiever: 4.0 GPA, 1550 SAT, strong ECs, national awards
 * - average: 3.5 GPA, 1280 SAT, typical activities
 * - stem: Strong STEM focus, math olympiad, research experience
 * - athlete: Recruited athlete, good academics, sports-focused
 *
 * All users use email pattern: abhishek.gutgutia+[name]@gmail.com
 *
 * Usage:
 *   npm run db:seed-users
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// =============================================================================
// PROFILE DEFINITIONS
// =============================================================================

interface TestProfile {
  emailSuffix: string;
  firstName: string;
  lastName: string;
  grade: string;
  graduationYear: number;
  highSchool: {
    name: string;
    city: string;
    state: string;
    type: string;
  };
  academics: {
    gpaUnweighted: number;
    gpaWeighted: number;
    classRank?: number;
    classSize?: number;
  };
  testing: {
    sat?: { total: number; math: number; reading: number };
    act?: { composite: number; english: number; math: number; reading: number; science: number };
    psat?: { total: number; math: number; reading: number };
  };
  courses: Array<{
    name: string;
    subject: string;
    level: string;
    status: string;
    gradeLevel: string;
    grade?: string;
  }>;
  activities: Array<{
    title: string;
    organization: string;
    category: string;
    description: string;
    hoursPerWeek: number;
    weeksPerYear: number;
    isLeadership: boolean;
    isSpike?: boolean;
  }>;
  awards: Array<{
    title: string;
    organization: string;
    level: string;
    category: string;
    year: number;
  }>;
  aboutMe: {
    values: string[];
    interests: string[];
    personality: string;
    aspirations: string;
  };
}

const TEST_PROFILES: TestProfile[] = [
  // =========================================================================
  // HIGH ACHIEVER - Emma Chen
  // =========================================================================
  {
    emailSuffix: "highachiever",
    firstName: "Emma",
    lastName: "Chen",
    grade: "11th",
    graduationYear: 2026,
    highSchool: {
      name: "Thomas Jefferson High School for Science and Technology",
      city: "Alexandria",
      state: "VA",
      type: "public",
    },
    academics: {
      gpaUnweighted: 4.0,
      gpaWeighted: 4.8,
      classRank: 5,
      classSize: 480,
    },
    testing: {
      sat: { total: 1560, math: 800, reading: 760 },
      psat: { total: 1480, math: 760, reading: 720 },
    },
    courses: [
      { name: "AP Calculus BC", subject: "Math", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "Multivariable Calculus", subject: "Math", level: "college", status: "in_progress", gradeLevel: "11th" },
      { name: "AP Physics C: Mechanics", subject: "Science", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP Physics C: E&M", subject: "Science", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "AP Chemistry", subject: "Science", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP Computer Science A", subject: "Science", level: "ap", status: "completed", gradeLevel: "9th", grade: "A" },
      { name: "AP English Language", subject: "English", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "AP US History", subject: "History", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP French", subject: "Language", level: "ap", status: "in_progress", gradeLevel: "11th" },
    ],
    activities: [
      {
        title: "President",
        organization: "Science Olympiad",
        category: "club",
        description: "Lead 45-member team to state championships. Coordinate practice schedules, mentor new members, and compete in 3 events (Chemistry Lab, Forensics, Disease Detectives).",
        hoursPerWeek: 12,
        weeksPerYear: 40,
        isLeadership: true,
        isSpike: true,
      },
      {
        title: "Research Intern",
        organization: "NIH Summer Internship Program",
        category: "work",
        description: "Conducted computational biology research on protein folding under Dr. Sarah Miller. Published findings in high school science journal.",
        hoursPerWeek: 40,
        weeksPerYear: 8,
        isLeadership: false,
      },
      {
        title: "Founder & Director",
        organization: "STEM Mentorship Initiative",
        category: "volunteer",
        description: "Founded nonprofit connecting high school students with elementary students for STEM tutoring. Serve 200+ students across 5 schools.",
        hoursPerWeek: 6,
        weeksPerYear: 45,
        isLeadership: true,
      },
      {
        title: "First Violin",
        organization: "Regional Youth Symphony Orchestra",
        category: "arts",
        description: "Perform in 6 concerts annually. Selected for All-State Orchestra 2 consecutive years.",
        hoursPerWeek: 8,
        weeksPerYear: 45,
        isLeadership: false,
      },
    ],
    awards: [
      { title: "USABO Semifinalist", organization: "Center for Excellence in Education", level: "national", category: "academic", year: 2025 },
      { title: "Science Olympiad State Champion - Chemistry Lab", organization: "Science Olympiad", level: "state", category: "academic", year: 2025 },
      { title: "National Merit Semifinalist", organization: "National Merit Scholarship Corporation", level: "national", category: "academic", year: 2025 },
      { title: "AP Scholar with Distinction", organization: "College Board", level: "national", category: "academic", year: 2024 },
    ],
    aboutMe: {
      values: ["intellectual curiosity", "community impact", "excellence"],
      interests: ["computational biology", "cancer research", "classical music", "mentoring"],
      personality: "Driven perfectionist who loves solving complex problems and helping others succeed",
      aspirations: "Become a physician-scientist researching novel cancer treatments while mentoring the next generation of scientists",
    },
  },

  // =========================================================================
  // AVERAGE STUDENT - Jake Martinez
  // =========================================================================
  {
    emailSuffix: "average",
    firstName: "Jake",
    lastName: "Martinez",
    grade: "11th",
    graduationYear: 2026,
    highSchool: {
      name: "Westwood High School",
      city: "Austin",
      state: "TX",
      type: "public",
    },
    academics: {
      gpaUnweighted: 3.5,
      gpaWeighted: 3.9,
    },
    testing: {
      sat: { total: 1280, math: 650, reading: 630 },
    },
    courses: [
      { name: "AP Calculus AB", subject: "Math", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors Pre-Calculus", subject: "Math", level: "honors", status: "completed", gradeLevel: "10th", grade: "B+" },
      { name: "AP Biology", subject: "Science", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors Chemistry", subject: "Science", level: "honors", status: "completed", gradeLevel: "10th", grade: "B" },
      { name: "AP English Language", subject: "English", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors English 10", subject: "English", level: "honors", status: "completed", gradeLevel: "10th", grade: "A-" },
      { name: "AP US History", subject: "History", level: "ap", status: "completed", gradeLevel: "10th", grade: "B+" },
      { name: "Spanish III", subject: "Language", level: "regular", status: "in_progress", gradeLevel: "11th" },
    ],
    activities: [
      {
        title: "Member",
        organization: "Varsity Soccer Team",
        category: "sport",
        description: "Starting midfielder on varsity team since sophomore year. Team made playoffs both seasons.",
        hoursPerWeek: 15,
        weeksPerYear: 20,
        isLeadership: false,
      },
      {
        title: "Volunteer",
        organization: "Austin Habitat for Humanity",
        category: "volunteer",
        description: "Help build homes for families in need on weekends. Learned basic construction skills.",
        hoursPerWeek: 4,
        weeksPerYear: 30,
        isLeadership: false,
      },
      {
        title: "Part-time Employee",
        organization: "Chick-fil-A",
        category: "work",
        description: "Work 12 hours/week after school. Handle customer service and food preparation.",
        hoursPerWeek: 12,
        weeksPerYear: 48,
        isLeadership: false,
      },
      {
        title: "Member",
        organization: "National Honor Society",
        category: "club",
        description: "Participate in community service events and tutoring sessions.",
        hoursPerWeek: 2,
        weeksPerYear: 35,
        isLeadership: false,
      },
    ],
    awards: [
      { title: "Academic Excellence Award", organization: "Westwood High School", level: "school", category: "academic", year: 2024 },
      { title: "Varsity Letter - Soccer", organization: "Westwood High School", level: "school", category: "athletics", year: 2024 },
    ],
    aboutMe: {
      values: ["teamwork", "reliability", "balance"],
      interests: ["soccer", "video games", "hanging out with friends", "business"],
      personality: "Easy-going and social, works hard when motivated but not obsessed with academics",
      aspirations: "Go to a good state school, major in business, maybe start my own company someday",
    },
  },

  // =========================================================================
  // STEM FOCUSED - Priya Sharma
  // =========================================================================
  {
    emailSuffix: "stem",
    firstName: "Priya",
    lastName: "Sharma",
    grade: "11th",
    graduationYear: 2026,
    highSchool: {
      name: "Stuyvesant High School",
      city: "New York",
      state: "NY",
      type: "public",
    },
    academics: {
      gpaUnweighted: 3.85,
      gpaWeighted: 4.5,
      classRank: 50,
      classSize: 850,
    },
    testing: {
      sat: { total: 1520, math: 800, reading: 720 },
      act: { composite: 35, english: 33, math: 36, reading: 34, science: 36 },
    },
    courses: [
      { name: "Linear Algebra", subject: "Math", level: "college", status: "in_progress", gradeLevel: "11th" },
      { name: "AP Calculus BC", subject: "Math", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP Statistics", subject: "Math", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP Physics C: Mechanics", subject: "Science", level: "ap", status: "completed", gradeLevel: "10th", grade: "A" },
      { name: "AP Physics C: E&M", subject: "Science", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "AP Computer Science A", subject: "Science", level: "ap", status: "completed", gradeLevel: "9th", grade: "A" },
      { name: "Data Structures & Algorithms", subject: "Science", level: "college", status: "in_progress", gradeLevel: "11th" },
      { name: "AP English Language", subject: "English", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors English 10", subject: "English", level: "honors", status: "completed", gradeLevel: "10th", grade: "B+" },
    ],
    activities: [
      {
        title: "USAMO Qualifier",
        organization: "Math Olympiad",
        category: "club",
        description: "One of ~250 students nationally to qualify for USAMO. Train 15+ hours weekly on competition math. Coach middle schoolers in local MathCounts.",
        hoursPerWeek: 18,
        weeksPerYear: 45,
        isLeadership: false,
        isSpike: true,
      },
      {
        title: "Research Intern",
        organization: "Columbia University Applied Math Department",
        category: "work",
        description: "Work with Professor Li on machine learning applications to number theory. Exploring patterns in prime distributions using neural networks.",
        hoursPerWeek: 10,
        weeksPerYear: 40,
        isLeadership: false,
      },
      {
        title: "Co-Founder",
        organization: "NYC Math Circle",
        category: "volunteer",
        description: "Started free math enrichment program for underserved middle schoolers in Brooklyn. Now serve 80+ students weekly with 12 volunteer tutors.",
        hoursPerWeek: 6,
        weeksPerYear: 40,
        isLeadership: true,
      },
      {
        title: "Competitive Programmer",
        organization: "USA Computing Olympiad",
        category: "club",
        description: "Gold division competitor. Participate in Codeforces and LeetCode contests weekly.",
        hoursPerWeek: 8,
        weeksPerYear: 50,
        isLeadership: false,
      },
    ],
    awards: [
      { title: "USAMO Qualifier", organization: "Mathematical Association of America", level: "national", category: "academic", year: 2025 },
      { title: "USACO Gold Division", organization: "USA Computing Olympiad", level: "national", category: "academic", year: 2024 },
      { title: "AMC 10 Perfect Score", organization: "Mathematical Association of America", level: "national", category: "academic", year: 2024 },
      { title: "Regeneron STS Scholar", organization: "Society for Science", level: "national", category: "academic", year: 2025 },
    ],
    aboutMe: {
      values: ["intellectual depth", "mathematical beauty", "giving back"],
      interests: ["pure mathematics", "theoretical computer science", "AI/ML", "teaching"],
      personality: "Intensely focused on math but warm and patient when teaching others",
      aspirations: "Pursue a PhD in mathematics or theoretical CS at MIT or Princeton. Want to prove important theorems and train the next generation of mathematicians.",
    },
  },

  // =========================================================================
  // RECRUITED ATHLETE - Marcus Johnson
  // =========================================================================
  {
    emailSuffix: "athlete",
    firstName: "Marcus",
    lastName: "Johnson",
    grade: "11th",
    graduationYear: 2026,
    highSchool: {
      name: "IMG Academy",
      city: "Bradenton",
      state: "FL",
      type: "private",
    },
    academics: {
      gpaUnweighted: 3.6,
      gpaWeighted: 4.0,
    },
    testing: {
      sat: { total: 1320, math: 680, reading: 640 },
    },
    courses: [
      { name: "Honors Pre-Calculus", subject: "Math", level: "honors", status: "in_progress", gradeLevel: "11th" },
      { name: "Algebra II", subject: "Math", level: "regular", status: "completed", gradeLevel: "10th", grade: "A-" },
      { name: "Honors Physics", subject: "Science", level: "honors", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors Chemistry", subject: "Science", level: "honors", status: "completed", gradeLevel: "10th", grade: "B+" },
      { name: "AP English Language", subject: "English", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Honors English 10", subject: "English", level: "honors", status: "completed", gradeLevel: "10th", grade: "A-" },
      { name: "AP US History", subject: "History", level: "ap", status: "in_progress", gradeLevel: "11th" },
      { name: "Spanish III", subject: "Language", level: "regular", status: "in_progress", gradeLevel: "11th" },
    ],
    activities: [
      {
        title: "Point Guard",
        organization: "IMG Academy Basketball",
        category: "sport",
        description: "Starting point guard on nationally ranked team (#15 ESPN). Average 14 PPG, 8 APG. Being recruited by Duke, UNC, Kentucky, and others. ESPN 4-star recruit.",
        hoursPerWeek: 30,
        weeksPerYear: 48,
        isLeadership: true,
        isSpike: true,
      },
      {
        title: "Captain",
        organization: "AAU Team Florida Elite",
        category: "sport",
        description: "Lead AAU team during spring/summer circuit. Competed at Nike EYBL and Peach Jam.",
        hoursPerWeek: 25,
        weeksPerYear: 16,
        isLeadership: true,
      },
      {
        title: "Mentor",
        organization: "Bradenton Boys & Girls Club",
        category: "volunteer",
        description: "Run weekly basketball clinics for at-risk youth. Help kids with homework and life skills.",
        hoursPerWeek: 4,
        weeksPerYear: 40,
        isLeadership: false,
      },
      {
        title: "Ambassador",
        organization: "Nike Basketball",
        category: "work",
        description: "Selected as Nike Next athlete. Represent brand at events and on social media (15K followers).",
        hoursPerWeek: 3,
        weeksPerYear: 50,
        isLeadership: false,
      },
    ],
    awards: [
      { title: "ESPN 4-Star Recruit", organization: "ESPN", level: "national", category: "athletics", year: 2025 },
      { title: "Florida Gatorade Player of the Year Finalist", organization: "Gatorade", level: "state", category: "athletics", year: 2025 },
      { title: "MaxPreps All-American Honorable Mention", organization: "MaxPreps", level: "national", category: "athletics", year: 2024 },
      { title: "FHSAA State Tournament MVP", organization: "Florida High School Athletic Association", level: "state", category: "athletics", year: 2024 },
    ],
    aboutMe: {
      values: ["dedication", "leadership", "giving back"],
      interests: ["basketball", "sports analytics", "mentoring youth", "business"],
      personality: "Intense competitor on the court, humble and friendly off it. Natural leader who lifts others up.",
      aspirations: "Play D1 basketball at Duke or UNC, then pursue NBA career. Eventually start foundation to help underprivileged kids access sports.",
    },
  },
];

// =============================================================================
// SEEDING FUNCTIONS
// =============================================================================

async function seedUser(profile: TestProfile): Promise<void> {
  const email = `abhishek.gutgutia+${profile.emailSuffix}@gmail.com`;

  console.log(`\nSeeding user: ${profile.firstName} ${profile.lastName} (${email})`);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`  User already exists, deleting and recreating...`);
    // Delete cascade will handle all related records
    await prisma.user.delete({ where: { id: existingUser.id } });
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name: `${profile.firstName} ${profile.lastName}`,
      authProvider: "email",
      emailVerified: true,
    },
  });
  console.log(`  Created user: ${user.id}`);

  // Create student profile
  const studentProfile = await prisma.studentProfile.create({
    data: {
      userId: user.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      grade: profile.grade,
      graduationYear: profile.graduationYear,
      highSchoolName: profile.highSchool.name,
      highSchoolCity: profile.highSchool.city,
      highSchoolState: profile.highSchool.state,
      highSchoolType: profile.highSchool.type,
      residencyStatus: "us_citizen",
      onboardingCompletedAt: new Date(),
    },
  });
  console.log(`  Created student profile: ${studentProfile.id}`);

  // Create academics
  await prisma.academics.create({
    data: {
      studentProfileId: studentProfile.id,
      schoolReportedGpaUnweighted: profile.academics.gpaUnweighted,
      schoolReportedGpaWeighted: profile.academics.gpaWeighted,
      gpaScale: 4.0,
      classRank: profile.academics.classRank,
      classSize: profile.academics.classSize,
    },
  });
  console.log(`  Created academics record`);

  // Create testing + scores
  const testing = await prisma.testing.create({
    data: {
      studentProfileId: studentProfile.id,
      planningToTakeSat: !profile.testing.sat,
      planningToTakeAct: !profile.testing.act,
      psatTotal: profile.testing.psat?.total,
      psatMath: profile.testing.psat?.math,
      psatReading: profile.testing.psat?.reading,
      psatDate: profile.testing.psat ? new Date("2024-10-15") : undefined,
    },
  });

  if (profile.testing.sat) {
    await prisma.sATScore.create({
      data: {
        testingId: testing.id,
        total: profile.testing.sat.total,
        math: profile.testing.sat.math,
        reading: profile.testing.sat.reading,
        testDate: new Date("2024-12-07"),
        isPrimary: true,
      },
    });
  }

  if (profile.testing.act) {
    await prisma.aCTScore.create({
      data: {
        testingId: testing.id,
        composite: profile.testing.act.composite,
        english: profile.testing.act.english,
        math: profile.testing.act.math,
        reading: profile.testing.act.reading,
        science: profile.testing.act.science,
        testDate: new Date("2024-09-14"),
        isPrimary: true,
      },
    });
  }
  console.log(`  Created testing records`);

  // Create courses
  for (const course of profile.courses) {
    await prisma.course.create({
      data: {
        studentProfileId: studentProfile.id,
        name: course.name,
        subject: course.subject,
        level: course.level,
        status: course.status,
        gradeLevel: course.gradeLevel,
        grade: course.grade,
        academicYear: course.gradeLevel === "11th" ? "2024-2025" : "2023-2024",
        semester: "full_year",
        isCore: ["Math", "Science", "English", "History"].includes(course.subject),
      },
    });
  }
  console.log(`  Created ${profile.courses.length} courses`);

  // Create activities
  for (let i = 0; i < profile.activities.length; i++) {
    const activity = profile.activities[i];
    await prisma.activity.create({
      data: {
        studentProfileId: studentProfile.id,
        title: activity.title,
        organization: activity.organization,
        category: activity.category,
        description: activity.description,
        hoursPerWeek: activity.hoursPerWeek,
        weeksPerYear: activity.weeksPerYear,
        isLeadership: activity.isLeadership,
        isSpike: activity.isSpike ?? false,
        isContinuing: true,
        displayOrder: i,
      },
    });
  }
  console.log(`  Created ${profile.activities.length} activities`);

  // Create awards
  for (let i = 0; i < profile.awards.length; i++) {
    const award = profile.awards[i];
    await prisma.award.create({
      data: {
        studentProfileId: studentProfile.id,
        title: award.title,
        organization: award.organization,
        level: award.level,
        category: award.category,
        year: award.year,
        displayOrder: i,
      },
    });
  }
  console.log(`  Created ${profile.awards.length} awards`);

  // Create aboutMe
  await prisma.aboutMe.create({
    data: {
      studentProfileId: studentProfile.id,
      values: profile.aboutMe.values,
      interests: profile.aboutMe.interests,
      personality: profile.aboutMe.personality,
      aspirations: profile.aboutMe.aspirations,
    },
  });
  console.log(`  Created about me`);

  // Create student context (for advisor)
  await prisma.studentContext.create({
    data: {
      studentProfileId: studentProfile.id,
      quickContext: `${profile.firstName} ${profile.lastName}, ${profile.grade} at ${profile.highSchool.name}. ${profile.academics.gpaUnweighted} GPA${profile.testing.sat ? `, ${profile.testing.sat.total} SAT` : ""}${profile.testing.act ? `, ${profile.testing.act.composite} ACT` : ""}. ${profile.aboutMe.personality}`,
      accountabilityLevel: "moderate",
    },
  });
  console.log(`  Created student context`);
}

async function main() {
  console.log("=== SEEDING TEST USERS ===");
  console.log(`Creating ${TEST_PROFILES.length} test profiles...\n`);

  for (const profile of TEST_PROFILES) {
    await seedUser(profile);
  }

  console.log("\n=== USER SEEDING COMPLETE ===");
  console.log(`\nCreated ${TEST_PROFILES.length} users:`);
  for (const profile of TEST_PROFILES) {
    console.log(`  - abhishek.gutgutia+${profile.emailSuffix}@gmail.com (${profile.firstName} ${profile.lastName})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
