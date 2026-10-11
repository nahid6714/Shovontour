import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destination, days, travelers, budget, preferences, lang } = body;

    const systemInstruction =
      lang === 'bn'
        ? 'আপনি Shovon Tour & Travel BD (মালিক: Md. Tawhid Hossan Shovon)-এর একজন অভিজ্ঞ ট্রাভেল কনসালট্যান্ট। ব্যবহারকারীর ভ্রমণ চাহিদা অনুযায়ী দিনভিত্তিক ভ্রমণ পরিকল্পনা, আনুমানিক বাজেট টিপস (নমুনা হিসাব হিসেবে), এবং প্যাকিং পরামর্শ পরিষ্কার বাংলায় তৈরি করে দিন। কোনো অবস্থাতেই ভিসা গ্যারান্টি বা নিশ্চিত সিট দাবি করবেন না।'
        : 'You are an expert travel planner for Shovon Tour & Travel BD (CEO: Md. Tawhid Hossan Shovon). Create a structured, helpful day-by-day custom itinerary, estimated sample budget breakdown in BDT, and practical travel tips based on the traveler request. Clearly note that prices are sample estimates.';

    const prompt = `Destination: ${destination || 'Coxs Bazar / Sajek / Nepal'}
Duration: ${days || 3} days
Travelers: ${travelers || 2} persons
Estimated Budget Preference: ${budget || 'Standard'}
Special Preferences: ${preferences || 'Family friendly sightseeing'}
Language: ${lang === 'bn' ? 'Bengali' : 'English'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return NextResponse.json({
      plan: response.text || '',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message ||
          'Unable to generate live AI itinerary at the moment. Please review our sample packages.',
      },
      { status: 500 }
    );
  }
}
