# Sesame3 Pricing Strategy

> Last updated: January 2025
> Status: Planning (not yet implemented)

## Overview

Sesame3 uses a freemium model with three subscription tiers plus one-time purchase options to address subscription fatigue.

### Core Principles

1. **Free users get real value** — Growth through word-of-mouth, help students who can't pay
2. **Clear upgrade triggers** — Hit natural walls that make upgrading feel logical, not punitive
3. **Multiple ways to pay** — Subscriptions, one-time passes, and small boosts
4. **Cost-aligned gating** — Message limits directly correlate with LLM costs

---

## Subscription Tiers

### Free — "Explorer"

*For students just getting started*

| Feature | Limit |
|---------|-------|
| AI Advisor (Kimi K2) | **30 messages/week** |
| Schools | **5** |
| Profile building | Full (unlimited) |
| Timeline | **View only** (no custom goals/tasks) |
| Chances | For schools on list |
| Sharing | No |
| Reminders | No |

**Target users:** Freshmen/sophomores exploring, students wanting to try before committing.

**Upgrade triggers:**
- Hit message limit during a good conversation
- Try to add 6th school
- Want to create goals or get reminders
- Want to share with parents

---

### Plus — "Applicant" — $10/month

*For students actively preparing*

| Feature | Limit |
|---------|-------|
| AI Advisor (Kimi K2) | **150 messages/week** |
| Schools | **15** |
| Profile building | Full |
| Timeline/Planning | **Full** (goals, tasks) |
| Chances | For schools on list |
| Sharing | **Parent view-only** |
| Reminders | **Email** reminders |

**Target users:** Juniors and seniors actively building applications. The "sensible choice" for most.

**Value props:**
- Enough schools for a balanced list (reaches, targets, safeties)
- Full planning capabilities
- Share progress with parents
- Never worry about message limits in practice

---

### Pro — "Committed" — $25/month

*For students who want every edge*

| Feature | Limit |
|---------|-------|
| AI Advisor | **Unlimited messages** |
| AI Quality | **Opus for complex analysis** (chances, essays, strategy) |
| Schools | **Unlimited** |
| Profile building | Full |
| Timeline/Planning | Full + **SMS/push reminders** |
| Chances | **Opus-powered deep analysis** |
| Sharing | Full + **access controls** (control what parents see) |
| Reminders | Email + SMS + push |
| Support | Priority |

**Target users:** Students applying to 15+ schools, want detailed AI analysis, families wanting full visibility.

**Value props:**
- Access to most intelligent AI models (Opus)
- Unlimited everything
- Full control over sharing/privacy
- Proactive notifications via SMS

---

## One-Time Payment Options

To address subscription fatigue, offer simple one-time alternatives:

### Season Pass — $89 one-time

- Full Plus-level access for **one year** (or through end of application season)
- No recurring charges — pay once, done
- Appeals to: "I just want to pay once and not worry about it"
- Better value than monthly ($10 × 12 = $120)

**Why this works:** Students have a natural end point (they get into college). Subscriptions feel wrong for something with a finish line. "Pay for the year" feels fair and predictable.

### Chances Check — $5-10 one-time

A standalone product for students who just want to know their odds:

1. **Build profile** — Enter GPA, test scores, activities, awards
2. **Select schools** — Choose up to 5 schools
3. **Get results** — Detailed chances analysis for each school
4. **Done** — No subscription, no recurring charge

**Why this works:**
- Clear, self-contained value proposition
- Low commitment for curious students
- Natural upsell to full platform after seeing results
- "Find out if you can get into your dream schools for $5"

**Upsell path:** After seeing chances, prompt: "Want to improve your odds? Get personalized planning and unlimited analysis with Plus."

---

## Pricing Summary

| Option | Price | What You Get |
|--------|-------|--------------|
| **Free** | $0 | 30 msgs/week, 5 schools, basic features |
| **Chances Check** | $5-10 one-time | Build profile, check 5 schools, done |
| **Plus** | $10/month | 150 msgs/week, 15 schools, planning, sharing |
| **Season Pass** | $89 one-time | Plus access for 1 year, no recurring |
| **Pro** | $25/month | Unlimited, Opus AI, full features |

**Messaging:**
- "Less than $8/month"
- "Less than one SAT prep book"
- "Less than 1 hour with a college counselor"
- "No surprise charges — pay once, use for a year"

---

## Gating Factors Summary

| Factor | Free | Plus | Pro |
|--------|------|------|-----|
| Messages/week | 30 | 150 | Unlimited |
| Schools | 5 | 15 | Unlimited |
| AI Model | Kimi K2 | Kimi K2 | Kimi K2 + Opus |
| Planning/Timeline | View only | Full | Full + SMS |
| Sharing | No | Parent view-only | Full + controls |
| Reminders | No | Email | Email + SMS + Push |

---

## AI Model Strategy

- **Kimi K2** — Used for all tiers, equivalent to Claude Sonnet quality
- **Opus** — Pro only, for:
  - Complex chances analysis with nuanced reasoning
  - Essay strategy and narrative building
  - Synthesizing full profile into strategic advice

The Opus upgrade is a key differentiator for Pro — "Access to the most intelligent AI models."

---

## Cost Considerations

### LLM Costs (Estimates)

| Model | Cost per message |
|-------|------------------|
| Kimi K2 | ~$0.001-0.002 |
| Opus | ~$0.01-0.02 |

### Break-even Analysis

Free user (30 msgs/week × 4 weeks = 120 msgs/month):
- Cost: ~$0.12-0.24/month

With 10% conversion to Plus ($10/month):
- Need ~5-8 free users per paid user to break even on LLM costs

Plus user (150 msgs/week × 4 weeks = 600 msgs/month):
- Cost: ~$0.60-1.20/month
- Margin: ~$8.80-9.40/month (88-94%)

Pro user with Opus usage (assume 20% of messages use Opus):
- Kimi cost: ~$0.80-1.60/month (80% of ~1000 msgs)
- Opus cost: ~$2.00-4.00/month (20% of ~1000 msgs)
- Total: ~$2.80-5.60/month
- Margin: ~$19.40-22.20/month (78-89%)

---

## Implementation Notes

### Database Changes Needed

1. Add `subscription_tier` enum: `free`, `plus`, `pro`
2. Add `subscription_type`: `monthly`, `annual`, `season_pass`
3. Add `message_count` tracking (weekly reset)
4. Add `one_time_purchases` table for boosts/unlocks
5. Update `User` model with subscription fields

### UI Changes Needed

1. Pricing page with tier comparison
2. Upgrade prompts at natural trigger points
3. Usage indicators (messages remaining, schools used)
4. Settings page for subscription management

### Stripe Integration

- Products for each tier (monthly + annual)
- Season Pass as one-time product
- Boosts as one-time products
- Webhook handling for subscription lifecycle

---

## Future Considerations

1. **Human counselor add-on** — 1-on-1 sessions with real counselors
2. **Family plan** — Multiple students (siblings) under one subscription
3. **School/counselor licensing** — B2B pricing for high schools
4. **Referral program** — Free months for referring friends
5. **Financial aid** — Reduced pricing for students who qualify

---

## Open Questions

1. Should Season Pass be Plus-level or Pro-level access?
2. Are boost prices right? ($2.99-6.99 range)
3. Should we offer monthly-only or push annual harder?
4. How do we handle existing users when pricing launches?
