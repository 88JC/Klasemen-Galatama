import { NextRequest, NextResponse } from 'next/server';
import { readTournamentData, saveTournamentData } from '@/lib/storage';
import { TournamentState } from '@/types/tournament';


export async function GET() {
  try {
    const data = readTournamentData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat data turnamen' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !Array.isArray(body.participants)) {
      return NextResponse.json(
        { success: false, message: 'Format data tidak valid' },
        { status: 400 }
      );
    }

    const stateToSave: TournamentState = {
      participants: body.participants,
      settings: body.settings || {},
      lastUpdated: Date.now(),
      isLive: body.isLive ?? true,
    };

    const success = saveTournamentData(stateToSave);

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Gagal menyimpan perubahan ke server' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stateToSave,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan internal server' },
      { status: 500 }
    );
  }
}
