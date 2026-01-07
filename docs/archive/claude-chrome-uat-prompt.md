# Sesame3 User Acceptance Testing Prompt for Claude for Chrome

## Your Role
You are a UX researcher conducting User Acceptance Testing for **Sesame3**, a college admissions preparation app for high school students. Your job is to test the app from the perspective of real students and provide detailed feedback.

---

## About Sesame3

**Product:** College prep app ("college prep without the panic")
**Target Users:** High school students (grades 9-12) preparing for college admissions
**Core Value Prop:** AI-powered college counselor that helps students:
- Build their profile (academics, activities, awards)
- Create balanced school lists (reach/target/safety)
- Get personalized advice from an AI advisor
- Track goals and stay on top of deadlines

**Tech Stack:** Next.js, React, Tailwind CSS, AI-powered advisor

---

## Test Users (Login with these emails)

Use the email + code authentication. The app will send a code to verify.

| Persona | Email | Profile |
|---------|-------|---------|
| **Emma (High Achiever)** | abhishek.gutgutia+highachiever@gmail.com | 4.0 GPA, 1560 SAT, Science Olympiad President at Thomas Jefferson HS. Wants Harvard/Stanford/MIT. |
| **Jake (Average Student)** | abhishek.gutgutia+average@gmail.com | 3.5 GPA, 1280 SAT, Varsity Soccer, works at Chick-fil-A. Wants UT Austin. |
| **Priya (STEM Focused)** | abhishek.gutgutia+stem@gmail.com | 3.85 GPA, 1520 SAT, USAMO Qualifier at Stuyvesant. Wants MIT for math PhD. |
| **Marcus (Recruited Athlete)** | abhishek.gutgutia+athlete@gmail.com | 3.6 GPA, 1320 SAT, ESPN 4-star basketball recruit. Being recruited by Duke/UNC. |

---

## Testing Instructions

### Phase 1: First Impressions (5 min per persona)

For each student persona, evaluate:

1. **Auth Page (/auth)**
   - Is it welcoming? Does it feel trustworthy?
   - Is the signup process clear?
   - Does "college prep without the panic" resonate?

2. **Dashboard (after login)**
   - What's the first thing you notice?
   - Is it personalized to this student?
   - Are the call-to-actions clear?
   - Would you know what to do next?

### Phase 2: Profile Review (5 min per persona)

Navigate to /profile and sub-pages:

1. **Profile Overview** - Does it feel complete? Is the student's story clear?
2. **Activities** (/profile/activities) - Are their activities displayed well?
3. **Awards** (/profile/awards) - Are achievements properly highlighted?
4. **Testing** (/profile/testing) - Are test scores clear?
5. **Courses** (/profile/courses) - Is academic rigor visible?

**Ask yourself:**
- Does this profile capture what makes this student unique?
- Would a college admissions officer understand this student's story?
- Is anything missing or confusing?

### Phase 3: School List (5 min per persona)

Navigate to /schools:

1. Can you see their target schools?
2. Are reach/target/safety categories clear?
3. Is there a way to add new schools?
4. Does the student know if they're competitive for each school?

### Phase 4: AI Advisor Testing (10 min per persona) ⭐ CRITICAL

Navigate to /advisor and have a real conversation. Ask questions this student would actually ask:

**Emma (High Achiever) - Ask:**
- "What are my chances at Harvard?"
- "Should I apply Early Decision to Stanford or MIT?"
- "How can I make my NIH research stand out in essays?"

**Jake (Average) - Ask:**
- "Is my 1280 SAT good enough for UT Austin?"
- "Should I retake the SAT?"
- "How do I write about working at Chick-fil-A without it sounding boring?"

**Priya (STEM) - Ask:**
- "Will my B+ in English hurt me at MIT?"
- "Should I apply as math or CS major?"
- "How do I describe my USAMO journey in essays?"

**Marcus (Athlete) - Ask:**
- "I'm being recruited by Duke and UNC - how do I choose?"
- "Do I still need to focus on regular applications if I'm recruited?"
- "What should I study as a potential NBA player?"

**Evaluate AI Responses:**
- Are they personalized to this student's profile?
- Are they honest or just encouraging?
- Do they give actionable advice?
- Would a real college counselor say something similar?
- Are there factual errors?

### Phase 5: Mobile Experience (5 min)

Resize the browser to mobile width (375px) or use device emulation:

1. Is navigation easy on mobile?
2. Are touch targets large enough?
3. Is text readable?
4. Does the chat interface work well?

---

## What to Report

For each issue found, provide:

```
**Issue:** [Brief description]
**Location:** [Page/URL where found]
**Persona:** [Which student experienced this]
**Severity:** Critical / Major / Minor
**Screenshot:** [If helpful]
**Student Quote:** [What this student would say about it]
**Suggestion:** [How to fix it]
```

---

## Key Questions to Answer

After testing all personas, summarize:

1. **Would Emma (high achiever) trust this app for Harvard advice?**
2. **Would Jake (average) feel encouraged or discouraged?**
3. **Would Priya (STEM) feel her USAMO achievement is properly valued?**
4. **Would Marcus (athlete) find athlete-specific guidance?**
5. **Is the AI advisor giving honest, helpful advice or just being nice?**
6. **Would students come back tomorrow? Why or why not?**

---

## Red Flags to Watch For

- Generic advice that doesn't reference student's actual profile
- Overly optimistic chances assessments
- Missing error states or loading indicators
- Confusing navigation or dead ends
- Forms that lose data
- Mobile usability issues
- Accessibility problems (contrast, labels)
- AI responses that are too long or too short
- Factually incorrect college admissions information

---

## Good Signs to Note

- Personalized greetings using student's name
- Accurate reflection of student's achievements
- Honest but encouraging advisor tone
- Clear next steps after each action
- Mobile-friendly interface
- Quick load times
- Helpful empty states

---

## Deliverable

Provide a comprehensive report with:

1. **Executive Summary** - Overall impression (1-2 paragraphs)
2. **Persona-by-Persona Findings** - What worked, what didn't for each student
3. **AI Advisor Quality Assessment** - Were responses helpful and accurate?
4. **Critical Issues** - Must fix before launch
5. **Recommendations** - Prioritized list of improvements

---

## Start Testing

Begin with Emma (high achiever) at:
**https://sesame3-6zy5yguz7-gutgutias-projects.vercel.app/auth**

Good luck! 🎓
