import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '多可町,4月下旬から5月下旬ごろ,多可オープンガーデン2019,多可町、西脇市の23カ所のお庭,多可町、西脇市の23カ所にお庭,各お庭ごとに公開日を設けています,,雨天の場合:各庭ごと,無料　,多可オープンガーデン2019は、多可町、西脇市の23カ所の庭などで、花愛好家のみなさんが丹精込めて育てた花々を楽しみ事ができます。オープンガーデンの見学は「多可オープンガーデン」と書かれたのぼりが目印です。期間中に5月に2回バスツアーを計画しています。詳しくは、多可町観光交流協会のホームページをご覧ください。,多可町観光交流協会事務局（多可町商工観光課内）　TEL:0795-32-4779　https://kanko.takacho.net/,有33,多可町　商工観光課（多可町観光交流協会事務局）主査　小林,yayoi_kobayashi@town.taka.lg.jp';

describe('〇月から△月', () => {
  it('日が無い状態で連続イベントの開始日を「から」の前にある日付に設定し、終了日を「から」の後にある日付に設定する', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([{ start: '20190401', end: '20190501' }]);
  });
});
