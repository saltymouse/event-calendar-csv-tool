import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '宍粟市,6月下旬～7月上旬頃予定,べにばなまつり,上ノ下公園,宍粟市山崎町上ノ556,,あり,雨天未定,無料　　,地元の同好会が育てている約2万本のベニバナが開花します。それに合わせてべにばなまつりが開催され、賑わいます。期間中べにばなの切り花即売もございます。　詳細はお問合せ下さい。,しそう森林王国観光協会　TEL:0790-64-0923　月曜定休日,有16,しそう森林王国観光協会 蒲池,info@shiso.or.jp';

describe('〇月〜△月', () => {
  it('日が無い状態で連続イベントの開始日を「〜」の前にある日付に設定し、終了日を「〜」の後にある日付に設定する', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data.length).toBe(1);
    expect(data).toEqual([{ start: '20190601', end: '20190701' }]);
  });
});
