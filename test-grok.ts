#!/usr/bin/env bun

const API_KEY = process.env.XAI_API_KEY || "";
const API_URL = "https://api.x.ai/v1/chat/completions";

export {};

async function listModels() {
  console.log("📋 Listing available models...\n");

  try {
    const response = await fetch("https://api.x.ai/v1/models", {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    console.log("Status:", response.status);
    const data = await response.text();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Agent definitions
const agents = [
  {
    name: "Devil's Advocate",
    role: `You are Devil's Advocate in a debate.

Your role: Find weaknesses and logical flaws in ideas.
Personality: Sharp but constructive, always provide evidence.`,
  },
  {
    name: "Tech Expert",
    role: `You are Tech Expert in a debate.

Your role: Provide technical insights and implementation details.
Personality: Pragmatic, focused on feasibility and best practices.`,
  },
  {
    name: "Facilitator",
    role: `You are Facilitator in a debate.

Your role: Guide the discussion, summarize, and keep it productive.
Personality: Balanced, asks clarifying questions, moves discussion forward.`,
  },
];

// Grok pricing (as of 2024)
const PRICING = {
  input: 0.20 / 1_000_000,  // $0.20 per 1M input tokens
  output: 0.80 / 1_000_000, // $0.80 per 1M output tokens
};

interface HandRaiseResult {
  agent: string;
  score: number;
  usage: any;
  cost: number;
}

async function getAgentScore(
  agentName: string,
  agentRole: string,
  conversationHistory: string[]
): Promise<HandRaiseResult> {
  const messages = [
    {
      role: "system",
      content: `${agentRole}

META INSTRUCTION:
Rate your desire to speak in the current debate from 0-100.
Output only the number, no explanation.`,
    },
    ...conversationHistory.map((msg) => ({
      role: "user" as const,
      content: msg,
    })),
    {
      role: "user",
      content: "Rate your interest to speak (0-100 number only):",
    },
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "grok-4-1-fast-reasoning",
      messages,
      max_tokens: 5,
      temperature: 0,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  const match = content.match(/\d+/);
  const score = match ? parseInt(match[0]) : 0;

  const usage = data.usage;
  const cost =
    usage.prompt_tokens * PRICING.input +
    usage.completion_tokens * PRICING.output;

  return {
    agent: agentName,
    score,
    usage,
    cost,
  };
}

function selectSpeaker(
  results: HandRaiseResult[],
  previousSpeaker: string | null
): { speaker: string; reason: string } {
  const facilitator = results.find((r) => r.agent === "Facilitator");

  // Rule 1: 사회자 80+ → 사회자 우선
  if (facilitator && facilitator.score >= 80) {
    return {
      speaker: "Facilitator",
      reason: "Facilitator priority (score >= 80)",
    };
  }

  // Rule 2: 전원 20 이하 → 사회자 정리
  const allLow = results.every((r) => r.score <= 20);
  if (allLow) {
    return {
      speaker: "Facilitator",
      reason: "All scores <= 20, Facilitator wraps up",
    };
  }

  // Rule 3: 이전 발언자 제외 + 최고 점수 선택
  const candidates = results.filter((r) => r.agent !== previousSpeaker);
  const sorted = [...candidates].sort((a, b) => b.score - a.score);

  return {
    speaker: sorted[0].agent,
    reason: `Highest score among candidates${
      previousSpeaker ? ` (excluding ${previousSpeaker})` : ""
    }`,
  };
}

async function testGrokHandRaising() {
  console.log("🤚 Testing Grok API - Hand Raising Mechanism (3 Agents in Parallel)\n");

  const conversationHistory = [
    "Topic: Should we use React or Vue for our new project?",
    "[Tech Expert] I think React has better ecosystem and more job opportunities...",
  ];

  const previousSpeaker = "Tech Expert"; // 이전 발언자

  try {
    console.log("📝 Conversation so far:");
    conversationHistory.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
    console.log(`\n⏮️  Previous Speaker: ${previousSpeaker}`);
    console.log("\n🔄 Requesting scores from all agents in parallel...\n");

    // Parallel requests to all agents
    const startTime = Date.now();
    const results = await Promise.all(
      agents.map((agent) =>
        getAgentScore(agent.name, agent.role, conversationHistory)
      )
    );
    const duration = Date.now() - startTime;

    // Display results
    console.log("✅ Results:");
    results.forEach((result) => {
      console.log(`\n  ${result.agent}:`);
      console.log(`    Score: ${result.score}/100`);
      console.log(`    Tokens: ${result.usage.prompt_tokens} input + ${result.usage.completion_tokens} output`);
      console.log(`    Cost: $${result.cost.toFixed(6)}`);
    });

    // Total cost
    const totalCost = results.reduce((sum, r) => sum + r.cost, 0);
    const totalTokens = results.reduce(
      (sum, r) => sum + r.usage.prompt_tokens + r.usage.completion_tokens,
      0
    );

    console.log("\n💰 Total Cost:");
    console.log(`  Tokens: ${totalTokens}`);
    console.log(`  Cost: $${totalCost.toFixed(6)}`);
    console.log(`  Duration: ${duration}ms`);

    // Select speaker with logic
    const selection = selectSpeaker(results, previousSpeaker);
    console.log("\n🎤 Next Speaker:");
    console.log(`  ${selection.speaker}`);
    console.log(`  Reason: ${selection.reason}`);

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// First, list available models
await listModels();

console.log("\n" + "=".repeat(50) + "\n");

// Then test hand raising
await testGrokHandRaising();
