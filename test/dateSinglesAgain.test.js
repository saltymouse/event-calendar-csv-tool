import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '宍粟市,5月11日（土）、5月12日（日）、5月18日（土）、5月19日(日）、5月25日（土）、5月26日（日）,クリンソウまつり,ちくさ高原,宍粟市千種町西河内付近,詳細未定,あり,雨天未定,,5月11日（土)～6月9日(日)までの土日のみ。国内最大級の群落、ちくさ高原クリンソウの開花時期に合わせて、地元の団体による「クリンソウまつり」が開催されます。,ちくさええとこセンター　TEL:0790-71-0230,有14,しそう森林王国観光協会 蒲池,info@shiso.or.jp';

describe('〇月△日、〇月△日、…', () => {
  it('「、」で区切っている日付を個別イベントに分割する（開催日と終了日は一緒）', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([
      { start: '20190511', end: '20190511' },
      { start: '20190512', end: '20190512' },
      { start: '20190518', end: '20190518' },
      { start: '20190519', end: '20190519' },
      { start: '20190525', end: '20190525' },
      { start: '20190526', end: '20190526' },
    ]);
  });
});
