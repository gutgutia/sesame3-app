// AI Provider Configuration
// Unified interface for all AI providers using Vercel AI SDK

import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

// =============================================================================
// MODEL DEFINITIONS
// =============================================================================

export const models = {
  // Anthropic Claude - Deep reasoning, empathetic responses
  claude: {
    opus: anthropic("claude-opus-4-5"),
    sonnet: anthropic("claude-sonnet-4-5"),
    haiku: anthropic("claude-haiku-4-5"),
  },
  
  // OpenAI GPT-5 - Latest generation models
  openai: {
    gpt5: openai("gpt-5.1"),
    gpt5Mini: openai("gpt-5-mini"),
  },
  
  // Google Gemini - Large context, good at synthesis
  google: {
    gemini3Pro: google("gemini-3-pro-preview"),
  },
  
  // Groq - Ultra-fast inference
  groq: {
    kimiK2: groq("moonshotai/kimi-k2-instruct-0905"),
    qwen32b: groq("qwen/qwen3-32b"),
  },
} as const;

// =============================================================================
// MODEL SELECTION BY USE CASE
// =============================================================================

export const modelFor = {
  // Fast parsing and acknowledgments (~50ms first token)
  fastParsing: models.groq.kimiK2,
  
  // Deep reasoning and advice (main advisor)
  advisor: models.claude.sonnet,
  
  // Highest quality reasoning (when needed)
  deep: models.claude.opus,
  
  // Quick responses when latency matters
  quick: models.groq.qwen32b,
  
  // Fast and cheap for simple tasks
  fast: models.claude.haiku,
  
  // Long context processing (transcripts, documents)
  longContext: models.google.gemini3Pro,
  
  // Summarization (cheap, good enough)
  summarization: models.openai.gpt5Mini,
  
  // General purpose
  general: models.openai.gpt5,
} as const;

// =============================================================================
// PROVIDER CONFIGURATION
// =============================================================================

// Environment variable names for each provider
export const providerEnvVars = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  google: "GOOGLE_GENERATIVE_AI_API_KEY",
  groq: "GROQ_API_KEY",
} as const;

// Check which providers are configured
export function getAvailableProviders(): string[] {
  const available: string[] = [];
  
  if (process.env.ANTHROPIC_API_KEY) available.push("anthropic");
  if (process.env.OPENAI_API_KEY) available.push("openai");
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) available.push("google");
  if (process.env.GROQ_API_KEY) available.push("groq");
  
  return available;
}

// Get a fallback model if preferred is unavailable
export function getModelWithFallback(
  preferred: keyof typeof modelFor,
  fallbackOrder: (keyof typeof modelFor)[] = ["advisor", "quick"]
) {
  const providers = getAvailableProviders();
  
  // Check preferred model's provider
  const modelProviders: Record<keyof typeof modelFor, string> = {
    fastParsing: "groq",
    advisor: "anthropic",
    deep: "anthropic",
    quick: "groq",
    fast: "anthropic",
    longContext: "google",
    summarization: "openai",
    general: "openai",
  };
  
  if (providers.includes(modelProviders[preferred])) {
    return modelFor[preferred];
  }
  
  // Try fallbacks
  for (const fallback of fallbackOrder) {
    if (providers.includes(modelProviders[fallback])) {
      return modelFor[fallback];
    }
  }
  
  throw new Error("No AI providers configured. Please set API keys in environment variables.");
}
