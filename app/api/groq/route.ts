import { NextResponse } from "next/server";
import { generatePortfolioContent } from "@/services/groqService";
import { z } from "zod";

const portfolioSchema = z.object({
  name: z.string().min(1),
  bio: z.string().min(1),
  skills: z.string().min(1),
  projects: z.string().min(1),
  templateStyle: z.string().optional(),
  profileImage: z.string().nullable().optional(),
  socialLinks: z.array(
    z.object({
      id: z.string(),
      platform: z.string(),
      url: z.string(),
    })
  ).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = portfolioSchema.parse(body);
    const content = await generatePortfolioContent(data);
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 