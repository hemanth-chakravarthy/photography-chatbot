import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Message cannot be empty." } },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Message too long." } },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a professional photography assistant.
Rules:
- Only answer photography-related questions
- Provide structured answers:
  - Camera settings
  - Tips
  - Optional explanation
- Keep responses concise and actionable`;

    const formattedHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    const messages = [
      { role: "system", content: systemPrompt },
      ...formattedHistory,
      { role: "user", content: message },
    ];

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: { code: "CONFIG_ERROR", message: "API Key not configured." } },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      data: { reply },
    });

  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Failed to generate response.";
    console.error("Chat API Error:", errMessage);
    return NextResponse.json(
      { error: { code: "AI_ERROR", message: errMessage } },
      { status: 500 }
    );
  }
}
