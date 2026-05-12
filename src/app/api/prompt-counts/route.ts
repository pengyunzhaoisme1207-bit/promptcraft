import { NextResponse } from 'next/server';
import { getPromptCounts } from '@/lib/data';

export async function GET() {
  const counts = getPromptCounts();
  return NextResponse.json(counts);
}
