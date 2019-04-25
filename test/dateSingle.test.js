import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '播磨町,5月3日（金・祝）,ゴールデンウィークイベント「体感！縄文時代」,兵庫県立考古博物館メインホール他,加古郡播磨町大中1-1-1,13:00～15:00,なし（周辺には播磨町大中遺跡公園有料駐車場64台と播磨町野添であい公園有料駐車場50台あり）,雨天決行,無料　,縄文土器パズルや本物の「火焔型土器」にさわって、縄文時代を体感しよう。,兵庫県立考古博物館　TEL:079-437-5589,無,兵庫県立考古博物館　企画広報課　小谷　悦子,Etsuko_Kotani01@pref.hyogo.lg.jp';

describe('〇月〇日', () => {
  it('一つの日付があれば終了日と開催日を同じように設定する', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([{ start: '20190503', end: '20190503' }]);
  });
});
