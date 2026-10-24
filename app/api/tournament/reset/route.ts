import { NextResponse } from 'next/server';
import { resetTournamentData } from '@/lib/storage';


export async function POST() {
  try {
    const freshState = resetTournamentData();
    return NextResponse.json({
      success: true,
      message: 'Klasemen berhasil di-reset',
      data: freshState,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal mereset turnamen' },
      { status: 500 }
    );
  }
}
