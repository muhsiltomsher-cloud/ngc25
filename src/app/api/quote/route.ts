import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // In a real app, send email or push to CRM here.
    // For now, return success.
    return NextResponse.json({ ok: true, received: data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

