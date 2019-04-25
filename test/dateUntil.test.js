import parseContent from '../source/scripts/parseContent';

const startDate = '20190301';
const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '播磨町,6月23日（日）まで,特別展「縄文土器とその世界－兵庫の１万年－」,兵庫県立考古博物館特別展示室,加古郡播磨町大中1-1-1,9:30～18:00（入場は17:30まで）,なし（周辺には播磨町大中遺跡公園有料駐車場64台と播磨町野添であい公園有料駐車場50台あり）,雨天決行,大人 500円、大学生 400円、高校生以下無料　,約１万年の時の流れを示す縄文土器。今回の展示では、縄文文化を代表する火焔型土器・遮光器土偶・注口土器をはじめ、県内出土品約250点の土器や土偶などの展示から縄文世界を感じていただきます。,兵庫県立考古博物館　TEL:079-437-5589,無,兵庫県立考古博物館　企画広報課　小谷　悦子,Etsuko_Kotani01@pref.hyogo.lg.jp';

describe('〇〇まで', () => {
  it(`開始日を「${startDate}」に設定し、終了日を検出された日付に設定する`, () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([{ start: startDate, end: '20190623' }]);
  });
});
