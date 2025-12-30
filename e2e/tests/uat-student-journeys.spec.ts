/**
 * User Acceptance Testing - Student Journey Tests
 *
 * These tests simulate real student interactions with the app,
 * evaluating UX from four different student perspectives:
 *
 * 1. Emma Chen (highachiever) - Top student aiming for Ivy League
 * 2. Jake Martinez (average) - Typical student, state school goals
 * 3. Priya Sharma (stem) - Math olympiad, MIT/Princeton dreams
 * 4. Marcus Johnson (athlete) - D1 basketball recruit
 *
 * Each test captures the student's journey and generates feedback
 * from their perspective.
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';

// =============================================================================
// TEST USER PERSONAS
// =============================================================================

interface StudentPersona {
  email: string;
  name: string;
  type: 'highachiever' | 'average' | 'stem' | 'athlete';
  description: string;
  goals: string[];
  concerns: string[];
  advisorQuestions: string[];
}

const STUDENT_PERSONAS: StudentPersona[] = [
  {
    email: 'abhishek.gutgutia+highachiever@gmail.com',
    name: 'Emma Chen',
    type: 'highachiever',
    description: 'Top student at TJ, 4.0 GPA, 1560 SAT, aiming for Ivy League',
    goals: [
      'Get into Harvard, Stanford, or MIT',
      'Understand my chances at top schools',
      'Improve my application essays',
    ],
    concerns: [
      'Am I competitive enough for HYPSM?',
      'How do I stand out among other high achievers?',
      'Should I apply ED somewhere?',
    ],
    advisorQuestions: [
      'What are my chances at Harvard?',
      'Should I apply Early Decision to Stanford or MIT?',
      'How can I make my NIH research experience stand out in my essays?',
    ],
  },
  {
    email: 'abhishek.gutgutia+average@gmail.com',
    name: 'Jake Martinez',
    type: 'average',
    description: 'Solid student, 3.5 GPA, 1280 SAT, works part-time, plays soccer',
    goals: [
      'Get into UT Austin or Texas A&M',
      'Figure out what major makes sense',
      'Balance college prep with work and soccer',
    ],
    concerns: [
      'Is my GPA good enough?',
      'Should I retake the SAT?',
      'How do I explain working at Chick-fil-A in my application?',
    ],
    advisorQuestions: [
      'What are my chances at UT Austin?',
      'Should I retake the SAT to get above 1300?',
      'How do I write about my part-time job without it sounding boring?',
    ],
  },
  {
    email: 'abhishek.gutgutia+stem@gmail.com',
    name: 'Priya Sharma',
    type: 'stem',
    description: 'Math prodigy, USAMO qualifier, wants PhD at MIT',
    goals: [
      'Get into MIT or Princeton for math',
      'Showcase my math olympiad achievements',
      'Find the right research opportunities',
    ],
    concerns: [
      'Will my lower English grades hurt me?',
      'How important are extracurriculars outside of math?',
      'Should I apply for math or CS major?',
    ],
    advisorQuestions: [
      'Should I apply as a math major or CS major to maximize my chances?',
      'My English grades are B+, will that hurt my MIT application?',
      'How should I describe my math olympiad journey in my essays?',
    ],
  },
  {
    email: 'abhishek.gutgutia+athlete@gmail.com',
    name: 'Marcus Johnson',
    type: 'athlete',
    description: 'ESPN 4-star basketball recruit, being recruited by Duke/UNC',
    goals: [
      'Commit to Duke or UNC for basketball',
      'Keep academics strong for eligibility',
      'Balance recruitment with college apps',
    ],
    concerns: [
      'What if I get injured before signing?',
      'Do I need to worry about regular admissions?',
      'How do I handle unofficial visits?',
    ],
    advisorQuestions: [
      "I'm being recruited by Duke and UNC - how do I choose?",
      'Do I still need to focus on my regular application if I get recruited?',
      'What should I study in college as a potential NBA player?',
    ],
  },
];

// =============================================================================
// UAT RESULT TRACKING
// =============================================================================

interface UATFinding {
  category: 'positive' | 'friction' | 'bug' | 'suggestion';
  area: string;
  description: string;
  studentImpact: string;
}

interface StudentJourneyResult {
  persona: StudentPersona;
  journeyName: string;
  findings: UATFinding[];
  overallSentiment: 'positive' | 'neutral' | 'negative';
  studentQuote: string;
  screenshots: string[];
}

const journeyResults: StudentJourneyResult[] = [];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

async function takeScreenshot(page: Page, name: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `uat-${name}-${timestamp}.png`;
  await page.screenshot({
    path: `e2e/screenshots/${filename}`,
    fullPage: true,
  });
  return filename;
}

async function loginAsStudent(
  context: BrowserContext,
  persona: StudentPersona,
  baseURL: string
): Promise<void> {
  // Create session token for the student
  const response = await fetch(`${baseURL}/api/test/create-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: persona.email }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create test session for ${persona.name}`);
  }

  const user = await response.json();

  // Create session token
  const sessionPayload = {
    userId: user.id,
    email: user.email,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  const sessionToken = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');

  const url = new URL(baseURL);
  await context.addCookies([
    {
      name: 'sesame_session',
      value: sessionToken,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
    {
      name: 'sesame_user_id',
      value: user.id,
      domain: url.hostname,
      path: '/',
      httpOnly: true,
      secure: url.protocol === 'https:',
      sameSite: 'Lax',
    },
  ]);
}

async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  // Wait a bit more for any React hydration
  await page.waitForTimeout(500);
}

// =============================================================================
// JOURNEY 1: DASHBOARD FIRST IMPRESSIONS
// =============================================================================

test.describe('UAT: Dashboard First Impressions', () => {
  for (const persona of STUDENT_PERSONAS) {
    test(`${persona.name} (${persona.type}) - First time seeing dashboard`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

      const findings: UATFinding[] = [];
      const screenshots: string[] = [];

      try {
        await loginAsStudent(context, persona, baseURL);
        await page.goto('/');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `dashboard-${persona.type}`));

        // Check what the student sees first
        const pageContent = await page.textContent('body');

        // Is the student's name visible?
        const hasName = pageContent?.includes(persona.name.split(' ')[0]);
        if (hasName) {
          findings.push({
            category: 'positive',
            area: 'Dashboard',
            description: 'Student name is displayed - feels personalized',
            studentImpact: `${persona.name} feels recognized`,
          });
        } else {
          findings.push({
            category: 'friction',
            area: 'Dashboard',
            description: 'Student name not visible on dashboard',
            studentImpact: 'Feels impersonal, like a generic template',
          });
        }

        // Is there a clear call-to-action?
        const hasCTA = await page.locator('button, a').filter({ hasText: /start|continue|add|explore/i }).count();
        if (hasCTA > 0) {
          findings.push({
            category: 'positive',
            area: 'Dashboard',
            description: 'Clear call-to-action buttons present',
            studentImpact: 'Student knows what to do next',
          });
        }

        // Check for overwhelming amount of info
        const cardCount = await page.locator('[class*="card"], [class*="Card"]').count();
        if (cardCount > 6) {
          findings.push({
            category: 'friction',
            area: 'Dashboard',
            description: `Dashboard shows ${cardCount} cards - might be overwhelming`,
            studentImpact: 'Could feel information overload for new users',
          });
        }

        // Record result
        journeyResults.push({
          persona,
          journeyName: 'Dashboard First Impressions',
          findings,
          overallSentiment: findings.filter((f) => f.category === 'positive').length > findings.filter((f) => f.category !== 'positive').length ? 'positive' : 'neutral',
          studentQuote: `"As ${persona.name}, I ${hasName ? 'like seeing my name' : 'wish it felt more personal'}"`,
          screenshots,
        });
      } finally {
        await context.close();
      }
    });
  }
});

// =============================================================================
// JOURNEY 2: VIEWING AND EDITING PROFILE
// =============================================================================

test.describe('UAT: Profile Exploration', () => {
  for (const persona of STUDENT_PERSONAS) {
    test(`${persona.name} (${persona.type}) - Reviews their profile`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

      const findings: UATFinding[] = [];
      const screenshots: string[] = [];

      try {
        await loginAsStudent(context, persona, baseURL);

        // Navigate to profile
        await page.goto('/profile');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `profile-overview-${persona.type}`));

        // Check if profile feels complete
        const profileContent = await page.textContent('body');

        // Is their GPA visible?
        const gpaVisible = /\d\.\d{1,2}/.test(profileContent || '');
        if (gpaVisible) {
          findings.push({
            category: 'positive',
            area: 'Profile',
            description: 'GPA is clearly displayed',
            studentImpact: 'Student can verify their academic info is correct',
          });
        }

        // Navigate to activities
        await page.goto('/profile/activities');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `profile-activities-${persona.type}`));

        // Check if activities are displayed
        const activityCards = await page.locator('[class*="activity"], [class*="Activity"]').count();
        if (activityCards > 0) {
          findings.push({
            category: 'positive',
            area: 'Activities',
            description: `${activityCards} activities displayed clearly`,
            studentImpact: 'Student can see their involvement at a glance',
          });
        }

        // Try to find edit functionality
        const editButtons = await page.locator('button:has-text("Edit"), button:has-text("Add")').count();
        if (editButtons > 0) {
          findings.push({
            category: 'positive',
            area: 'Profile',
            description: 'Edit/Add buttons are visible',
            studentImpact: 'Easy to update information',
          });
        } else {
          findings.push({
            category: 'friction',
            area: 'Profile',
            description: 'No obvious way to edit activities',
            studentImpact: 'Student might not know how to update their profile',
          });
        }

        // Record result
        journeyResults.push({
          persona,
          journeyName: 'Profile Exploration',
          findings,
          overallSentiment: 'positive',
          studentQuote: `"I can see all my ${persona.type === 'athlete' ? 'sports achievements' : 'activities'} in one place"`,
          screenshots,
        });
      } finally {
        await context.close();
      }
    });
  }
});

// =============================================================================
// JOURNEY 3: EXPLORING SCHOOLS
// =============================================================================

test.describe('UAT: School List Experience', () => {
  for (const persona of STUDENT_PERSONAS) {
    test(`${persona.name} (${persona.type}) - Explores school list`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

      const findings: UATFinding[] = [];
      const screenshots: string[] = [];

      try {
        await loginAsStudent(context, persona, baseURL);

        // Navigate to schools
        await page.goto('/schools');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `schools-${persona.type}`));

        // Check for school categorization
        const hasCategories = await page.locator('text=/reach|target|safety|dream/i').count();
        if (hasCategories > 0) {
          findings.push({
            category: 'positive',
            area: 'Schools',
            description: 'Schools are categorized (reach/target/safety)',
            studentImpact: 'Helps student understand their options realistically',
          });
        }

        // Check for search/add functionality
        const hasSearch = await page.locator('input[placeholder*="search" i], button:has-text("Add")').count();
        if (hasSearch > 0) {
          findings.push({
            category: 'positive',
            area: 'Schools',
            description: 'Search or add school functionality available',
            studentImpact: 'Student can build their list easily',
          });
        }

        // Check for empty state handling
        const schoolCards = await page.locator('[class*="school"], [class*="School"]').count();
        if (schoolCards === 0) {
          const hasEmptyState = await page.locator('text=/add.*school|no.*school|get started/i').count();
          if (hasEmptyState > 0) {
            findings.push({
              category: 'positive',
              area: 'Schools',
              description: 'Empty state provides guidance',
              studentImpact: 'New users know what to do',
            });
          } else {
            findings.push({
              category: 'friction',
              area: 'Schools',
              description: 'Empty school list with no guidance',
              studentImpact: 'Student confused about what to do',
            });
          }
        }

        journeyResults.push({
          persona,
          journeyName: 'School List Experience',
          findings,
          overallSentiment: findings.some((f) => f.category === 'friction') ? 'neutral' : 'positive',
          studentQuote: `"${persona.goals[0]}"`,
          screenshots,
        });
      } finally {
        await context.close();
      }
    });
  }
});

// =============================================================================
// JOURNEY 4: AI ADVISOR INTERACTION
// =============================================================================

test.describe('UAT: AI Advisor Conversation', () => {
  for (const persona of STUDENT_PERSONAS) {
    test(`${persona.name} (${persona.type}) - Asks advisor questions`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

      const findings: UATFinding[] = [];
      const screenshots: string[] = [];

      try {
        await loginAsStudent(context, persona, baseURL);

        // Navigate to advisor
        await page.goto('/advisor');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `advisor-initial-${persona.type}`));

        // Check for welcoming message
        const pageContent = await page.textContent('body');
        const hasWelcome = /welcome|hello|hi|how can i help/i.test(pageContent || '');

        if (hasWelcome) {
          findings.push({
            category: 'positive',
            area: 'Advisor',
            description: 'Advisor has a welcoming greeting',
            studentImpact: 'Feels approachable and friendly',
          });
        }

        // Check for chat input
        const chatInput = page.locator('textarea, input[type="text"]').first();
        const hasChatInput = await chatInput.isVisible().catch(() => false);

        if (hasChatInput) {
          findings.push({
            category: 'positive',
            area: 'Advisor',
            description: 'Chat input is clearly visible',
            studentImpact: 'Easy to start asking questions',
          });

          // Try sending the first advisor question
          const question = persona.advisorQuestions[0];
          await chatInput.fill(question);

          // Look for send button
          const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
          if (await sendButton.isVisible().catch(() => false)) {
            findings.push({
              category: 'positive',
              area: 'Advisor',
              description: 'Send button is visible',
              studentImpact: 'Clear how to submit questions',
            });

            // Note: We won't actually send to avoid API costs, but we record that we could
            findings.push({
              category: 'suggestion',
              area: 'Advisor',
              description: `Student would ask: "${question}"`,
              studentImpact: `This is a real concern for ${persona.type} students`,
            });
          }
        } else {
          findings.push({
            category: 'bug',
            area: 'Advisor',
            description: 'Chat input not found',
            studentImpact: 'Cannot ask questions!',
          });
        }

        // Check for suggested prompts
        const hasSuggestions = await page.locator('button, [role="button"]').filter({ hasText: /suggest|try|ask about/i }).count();
        if (hasSuggestions > 0) {
          findings.push({
            category: 'positive',
            area: 'Advisor',
            description: 'Suggested prompts help users get started',
            studentImpact: "Helpful for students who don't know what to ask",
          });
        }

        screenshots.push(await takeScreenshot(page, `advisor-ready-${persona.type}`));

        journeyResults.push({
          persona,
          journeyName: 'AI Advisor Conversation',
          findings,
          overallSentiment: findings.filter((f) => f.category === 'positive').length > 2 ? 'positive' : 'neutral',
          studentQuote: `"I want to ask: ${persona.advisorQuestions[0]}"`,
          screenshots,
        });
      } finally {
        await context.close();
      }
    });
  }
});

// =============================================================================
// JOURNEY 5: MOBILE EXPERIENCE
// =============================================================================

test.describe('UAT: Mobile Experience', () => {
  for (const persona of STUDENT_PERSONAS) {
    test(`${persona.name} (${persona.type}) - Uses app on phone`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
        isMobile: true,
      });
      const page = await context.newPage();
      const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

      const findings: UATFinding[] = [];
      const screenshots: string[] = [];

      try {
        await loginAsStudent(context, persona, baseURL);

        // Test dashboard on mobile
        await page.goto('/');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `mobile-dashboard-${persona.type}`));

        // Check for horizontal scroll (bad on mobile)
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        if (hasHorizontalScroll) {
          findings.push({
            category: 'bug',
            area: 'Mobile',
            description: 'Horizontal scroll detected on mobile',
            studentImpact: 'Frustrating to use, content overflows',
          });
        } else {
          findings.push({
            category: 'positive',
            area: 'Mobile',
            description: 'No horizontal overflow on mobile',
            studentImpact: 'Easy to scroll and navigate',
          });
        }

        // Check for bottom navigation
        const hasBottomNav = await page.locator('nav, [role="navigation"]').last().isVisible();
        if (hasBottomNav) {
          findings.push({
            category: 'positive',
            area: 'Mobile',
            description: 'Bottom navigation present',
            studentImpact: 'Easy to navigate with thumb',
          });
        }

        // Check touch targets
        const smallButtons = await page.evaluate(() => {
          const buttons = document.querySelectorAll('button, a');
          let small = 0;
          buttons.forEach((b) => {
            const rect = b.getBoundingClientRect();
            if (rect.width < 44 && rect.height < 44 && rect.width > 0) {
              small++;
            }
          });
          return small;
        });

        if (smallButtons > 5) {
          findings.push({
            category: 'friction',
            area: 'Mobile',
            description: `${smallButtons} buttons have small touch targets`,
            studentImpact: 'Hard to tap accurately on phone',
          });
        }

        // Test advisor on mobile
        await page.goto('/advisor');
        await waitForPageReady(page);

        screenshots.push(await takeScreenshot(page, `mobile-advisor-${persona.type}`));

        const chatInputVisible = await page.locator('textarea, input[type="text"]').first().isVisible().catch(() => false);
        if (chatInputVisible) {
          findings.push({
            category: 'positive',
            area: 'Mobile Advisor',
            description: 'Chat input works on mobile',
            studentImpact: 'Can ask questions on the go',
          });
        }

        journeyResults.push({
          persona,
          journeyName: 'Mobile Experience',
          findings,
          overallSentiment: findings.filter((f) => f.category === 'bug').length > 0 ? 'negative' : 'positive',
          studentQuote: `"Most of my friends use their phones for everything"`,
          screenshots,
        });
      } finally {
        await context.close();
      }
    });
  }
});

// =============================================================================
// FINAL REPORT
// =============================================================================

test.afterAll(async () => {
  // Generate summary report
  console.log('\n');
  console.log('='.repeat(80));
  console.log('   SESAME3 USER ACCEPTANCE TEST REPORT');
  console.log('='.repeat(80));
  console.log('\n');

  // Summary by persona
  for (const persona of STUDENT_PERSONAS) {
    const personaResults = journeyResults.filter((r) => r.persona.email === persona.email);
    console.log(`\n📱 ${persona.name} (${persona.type.toUpperCase()})`);
    console.log(`   ${persona.description}`);
    console.log('   ' + '-'.repeat(60));

    for (const result of personaResults) {
      console.log(`\n   Journey: ${result.journeyName}`);
      console.log(`   Sentiment: ${result.overallSentiment.toUpperCase()}`);
      console.log(`   Quote: ${result.studentQuote}`);

      for (const finding of result.findings) {
        const icon = {
          positive: '✅',
          friction: '⚠️',
          bug: '🐛',
          suggestion: '💡',
        }[finding.category];
        console.log(`      ${icon} [${finding.area}] ${finding.description}`);
      }
    }
  }

  // Overall summary
  const allFindings = journeyResults.flatMap((r) => r.findings);
  const positive = allFindings.filter((f) => f.category === 'positive').length;
  const friction = allFindings.filter((f) => f.category === 'friction').length;
  const bugs = allFindings.filter((f) => f.category === 'bug').length;
  const suggestions = allFindings.filter((f) => f.category === 'suggestion').length;

  console.log('\n');
  console.log('='.repeat(80));
  console.log('   SUMMARY');
  console.log('='.repeat(80));
  console.log(`\n   ✅ Positive: ${positive}`);
  console.log(`   ⚠️  Friction: ${friction}`);
  console.log(`   🐛 Bugs: ${bugs}`);
  console.log(`   💡 Suggestions: ${suggestions}`);
  console.log('\n');
});
