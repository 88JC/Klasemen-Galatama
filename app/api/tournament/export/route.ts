import { NextRequest, NextResponse } from 'next/server';
import { readTournamentData } from '@/lib/storage';
import { calculateRankings } from '@/lib/ranking';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';
    const state = readTournamentData();
    const ranked = calculateRankings(state.participants);

    if (format === 'json') {
      return new NextResponse(JSON.stringify(state, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="klasemen-galtam-${Date.now()}.json"`,
        },
      });
    }

    // Generate CSV
    const rows: string[] = [];
    rows.push('Peringkat,No Slot,Nama Peserta,Display Name,Points,Status Bayar (Pay),Sudah Bayar,Absen,Jumlah Riwayat');

    ranked.forEach((item) => {
      const p = item.participant;
      const cleanName = (p.name || '').replace(/"/g, '""');
      const cleanNick = (p.nickname || '').replace(/"/g, '""');
      const cleanPay = (p.pay || '').replace(/"/g, '""');
      rows.push(
        `"${item.rank}","${p.id}","${cleanName}","${cleanNick}","${p.points}","${cleanPay}","${p.paid ? 'YA' : 'TIDAK'}","${p.joined ? 'HADIR' : 'BELUM'}","${p.history.length}"`
      );
    });

    const csvContent = '\uFEFF' + rows.join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="klasemen-galtam-${Date.now()}.csv"`,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal mengekspor data' },
      { status: 500 }
    );
  }
}
