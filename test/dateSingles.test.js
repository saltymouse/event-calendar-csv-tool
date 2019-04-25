import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '赤穂市,5月18日（土）、5月19日（日）,花と緑のフェスティバル　,赤穂城南緑地管理事務所及びバラ園周辺にて,赤穂市加里屋1278番地,10:00～16:00,あり（無料174台）,小雨決行,,赤穂城南緑地公園内にあるバラ園の見頃シーズンに合わせて開催されます。ステージイベントやフリーマーケットのほか様々な出店が行われます。　,文化とみどり財団公園事務所 TEL:0791-25-8611,無,赤穂市産業観光課　綿田,kankou@city.ako.lg.jp';

describe('〇月△日、〇月△日', () => {
  it('「、」で区切っている日付を個別イベントに分割する（開催日と終了日は一緒）（２つの日付の状態）', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([
      { start: '20190518', end: '20190518' },
      { start: '20190519', end: '20190519' },
    ]);
  });
});
