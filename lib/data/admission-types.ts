// Admission Type Explainers
// Static definitions for college application decision types

export type AdmissionType =
  | "early_decision"
  | "early_decision_ii"
  | "early_action"
  | "restrictive_early_action"
  | "regular_decision"
  | "rolling";

export interface AdmissionTypeInfo {
  id: AdmissionType;
  name: string;
  abbreviation: string;
  isBinding: boolean;
  hasRestrictions: boolean;
  shortDescription: string;
  fullExplanation: string;
  typicalDeadline: string;
  typicalNotification: string;
  pros: string[];
  cons: string[];
}

export const ADMISSION_TYPES: Record<AdmissionType, AdmissionTypeInfo> = {
  early_decision: {
    id: "early_decision",
    name: "Early Decision",
    abbreviation: "ED",
    isBinding: true,
    hasRestrictions: false,
    shortDescription: "Apply early with a binding commitment to attend if accepted.",
    fullExplanation:
      "Early Decision is a binding application plan. If you are accepted ED, you must withdraw all other applications and commit to attending that school. Because of the binding nature, ED typically has higher acceptance rates than Regular Decision. You can only apply ED to one school.",
    typicalDeadline: "November 1-15",
    typicalNotification: "Mid-December",
    pros: [
      "Higher acceptance rates than RD (often 1.5-2x)",
      "Know your decision early and reduce stress",
      "Demonstrates strong interest to admissions",
      "Can focus senior year after acceptance",
    ],
    cons: [
      "Binding commitment - must attend if accepted",
      "Cannot compare financial aid offers",
      "Must be certain this is your top choice",
      "May not be ideal if you need to compare aid packages",
    ],
  },

  early_decision_ii: {
    id: "early_decision_ii",
    name: "Early Decision II",
    abbreviation: "ED2",
    isBinding: true,
    hasRestrictions: false,
    shortDescription:
      "A second round of binding Early Decision with a later deadline.",
    fullExplanation:
      "Early Decision II is identical to ED in terms of binding commitment, but with a later deadline (usually around January 1). ED2 is often used by students who were deferred or rejected from their ED school and want to show similar commitment to another school. It still requires withdrawal of all other applications upon acceptance.",
    typicalDeadline: "January 1-15",
    typicalNotification: "Mid-February",
    pros: [
      "Second chance at a binding early option",
      "Good for students who discovered their top choice later",
      "Can apply after seeing ED results elsewhere",
      "Shows strong commitment like ED",
    ],
    cons: [
      "Same binding commitment as ED",
      "Shorter time to decide after ED results",
      "Fewer schools offer ED2 than ED",
      "Financial aid comparison still not possible",
    ],
  },

  early_action: {
    id: "early_action",
    name: "Early Action",
    abbreviation: "EA",
    isBinding: false,
    hasRestrictions: false,
    shortDescription: "Apply early and get an early decision, but non-binding.",
    fullExplanation:
      "Early Action allows you to apply early and receive a decision early (usually by mid-December), but you are NOT required to attend if accepted. You have until May 1 (National Decision Day) to make your final choice, allowing you to compare offers from multiple schools. You can apply EA to multiple schools.",
    typicalDeadline: "November 1-15",
    typicalNotification: "Mid-December to early February",
    pros: [
      "Non-binding - no commitment required",
      "Get an early answer to reduce stress",
      "Can apply EA to multiple schools",
      "Time to compare financial aid offers",
    ],
    cons: [
      "Acceptance rates may be lower than ED",
      "Doesn't demonstrate as strong a commitment",
      "Requires completing applications earlier",
      "May still need to wait for RD results elsewhere",
    ],
  },

  restrictive_early_action: {
    id: "restrictive_early_action",
    name: "Restrictive Early Action",
    abbreviation: "REA/SCEA",
    isBinding: false,
    hasRestrictions: true,
    shortDescription:
      "Non-binding early application, but with restrictions on applying early elsewhere.",
    fullExplanation:
      "Restrictive Early Action (also called Single-Choice Early Action at some schools) is non-binding like regular EA, but comes with restrictions. Typically, you cannot apply ED or EA to other private universities (public universities are usually exempt). Each school's REA policy is different, so always check the specific rules. Harvard, Yale, Princeton, and Stanford use this plan.",
    typicalDeadline: "November 1",
    typicalNotification: "Mid-December",
    pros: [
      "Non-binding - no commitment to attend",
      "Shows strong interest without binding commitment",
      "Can still apply EA to public universities",
      "Time to compare offers through May 1",
    ],
    cons: [
      "Cannot apply ED/EA to other private schools",
      "Each school has different restriction rules",
      "More limiting than regular EA",
      "Need to carefully read each school's policy",
    ],
  },

  regular_decision: {
    id: "regular_decision",
    name: "Regular Decision",
    abbreviation: "RD",
    isBinding: false,
    hasRestrictions: false,
    shortDescription:
      "Standard application deadline with decisions in late March/April.",
    fullExplanation:
      "Regular Decision is the standard application timeline. Applications are typically due between January 1-15, and decisions are released in late March or early April. RD is non-binding and allows you to apply to as many schools as you want. You have until May 1 to decide where to enroll.",
    typicalDeadline: "January 1-15",
    typicalNotification: "Late March to early April",
    pros: [
      "No binding commitment",
      "More time to work on applications",
      "Can apply to unlimited schools",
      "Full picture of options before deciding",
    ],
    cons: [
      "Generally lower acceptance rates than ED",
      "Longer wait for decisions",
      "More stressful senior spring",
      "May have less demonstrated interest",
    ],
  },

  rolling: {
    id: "rolling",
    name: "Rolling Admissions",
    abbreviation: "Rolling",
    isBinding: false,
    hasRestrictions: false,
    shortDescription:
      "Applications reviewed and decisions sent on an ongoing basis.",
    fullExplanation:
      "Rolling admissions means the school reviews applications as they are received and sends decisions on an ongoing basis, rather than waiting for a specific deadline. Applying early is advantageous because spots fill up over time. There may be a priority deadline for best consideration. Schools with rolling admissions often include large public universities.",
    typicalDeadline: "Varies - often priority deadline in November/December",
    typicalNotification: "2-8 weeks after applying",
    pros: [
      "Quick decisions (often within weeks)",
      "Flexibility in when you apply",
      "Can get an acceptance early in the process",
      "Less pressure of a single deadline",
    ],
    cons: [
      "Spots may fill up if you apply late",
      "Less structure to the process",
      "Priority deadlines may affect aid/honors",
      "Some students procrastinate without hard deadlines",
    ],
  },
};

// Helper functions

/**
 * Get the admission type info for a school based on its flags
 */
export function getAvailableAdmissionTypes(school: {
  hasEarlyDecision: boolean;
  hasEarlyDecisionII: boolean;
  hasEarlyAction: boolean;
  isRestrictiveEarlyAction: boolean;
  hasRollingAdmissions: boolean;
}): AdmissionTypeInfo[] {
  const types: AdmissionTypeInfo[] = [];

  if (school.hasEarlyDecision) {
    types.push(ADMISSION_TYPES.early_decision);
  }
  if (school.hasEarlyDecisionII) {
    types.push(ADMISSION_TYPES.early_decision_ii);
  }
  if (school.hasEarlyAction) {
    if (school.isRestrictiveEarlyAction) {
      types.push(ADMISSION_TYPES.restrictive_early_action);
    } else {
      types.push(ADMISSION_TYPES.early_action);
    }
  }
  if (school.hasRollingAdmissions) {
    types.push(ADMISSION_TYPES.rolling);
  }

  // RD is always available
  types.push(ADMISSION_TYPES.regular_decision);

  return types;
}

/**
 * Get a short summary of admission options for a school
 */
export function getAdmissionOptionsSummary(school: {
  hasEarlyDecision: boolean;
  hasEarlyDecisionII: boolean;
  hasEarlyAction: boolean;
  isRestrictiveEarlyAction: boolean;
  hasRollingAdmissions: boolean;
}): string {
  const options: string[] = [];

  if (school.hasEarlyDecision) options.push("ED");
  if (school.hasEarlyDecisionII) options.push("ED2");
  if (school.hasEarlyAction) {
    options.push(school.isRestrictiveEarlyAction ? "REA" : "EA");
  }
  if (school.hasRollingAdmissions) options.push("Rolling");
  options.push("RD");

  return options.join(", ");
}
