#!/usr/bin/env bun

const API_KEY = process.env.XAI_API_KEY || "";
const API_URL = "https://api.x.ai/v1/chat/completions";

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

async function testGrokHandRaising() {
  console.log("🤚 Testing Grok API - Hand Raising Mechanism\n");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-4-1-fast-reasoning",
        messages: [
          {
            role: "system",
            content: `You are Devil's Advocate in a debate.

Your role: Find weaknesses and logical flaws in ideas.

META INSTRUCTION:
Rate your desire to speak in the current debate from 0-100.
Output only the number, no explanation.`
          },
          {
            role: "user",
            content: "Topic: Should we use React or Vue for our new project?"
          },
          {
            role: "user",
            content: "[Tech Expert] I think React has better ecosystem..."
          },
          {
            role: "user",
            content: "Rate your interest to speak (0-100 number only):"
          }
        ],
        max_tokens: 5,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      console.error("❌ API Error:", response.status, response.statusText);
      const error = await response.text();
      console.error(error);
      return;
    }

    const data = await response.json();
    console.log("✅ Raw Response:", JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content || "";
    console.log("\n📊 Score:", content);

    // Parse score
    const match = content.match(/\d+/);
    const score = match ? parseInt(match[0]) : 0;
    console.log("✅ Parsed Score:", score);

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// First, list available models
await listModels();

console.log("\n" + "=".repeat(50) + "\n");

// Then test hand raising
await testGrokHandRaising();
