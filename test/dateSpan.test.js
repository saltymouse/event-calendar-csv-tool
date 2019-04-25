import parseContent from '../source/scripts/parseContent';

const csvCols = 'エリア,日付,タイトル,場所,住所,開催時間,駐車場,雨天,料金,詳細/コメント,お問い合わせ,画像,担当者,メールアドレス';
const csvTest = '明石市,5月25日（土）～6月23日（日）,明石市制施行100周年記念　企画展「郷土作家シリーズ－明石市100年の日本画家－」,明石市立文化博物館,明石市上ノ丸2丁目13番1号,9:30～18:30（入館18:00まで）,"あり（最大32台:1台1時間100円・上限1日1回当たり1,000円）",,大人200円、大高生150円、中学生以下無料,2019年11月に市制100周年を迎える明石市。大きく変わってきた明石市で、伝統や歴史の印象が強い日本画も、様々な画家により多彩な作品が生み出されてきました。明石藩最後の儒学者橋本海関から現代の作家まで、この100年の間に明石で育まれた日本画を当館の収蔵品からご紹介します。月曜休館。,明石市立文化博物館　TEL:078-918-5400,キャプションについて確認中　2キャプション:橋本関雪《老松春鳩図》,明石市立文化博物館　國田(掲載不可),kunita-madoka@akashibunpaku.com(掲載不可)';

describe('〇月〇日〜△月△日', () => {
  it('連続イベントの開始日を「〜」の前にある日付に設定し、終了日を「〜」の後にある日付に設定する', () => {
    const data = parseContent(`${csvCols}\n${csvTest}`)
      .map(item => ({
        start: item.event_calendar_start_day,
        end: item.event_calendar_end_day,
      }));

    expect(data).toEqual([{ start: '20190525', end: '20190623' }]);
  });
});
