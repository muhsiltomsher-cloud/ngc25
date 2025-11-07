import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: Integrate with CRM / email provider
    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

