import Papa from 'papaparse';
import moment from './lib/moment';
import EventContent from './eventItem';
import './lib/flatMap';
import './lib/flat';

/**
 * CSV入力欄に入っているデーターをJSONに変換する
 */
export default function parseContent(inputCsv) {
  const results = Papa.parse(inputCsv, {
    header: true,
    skipEmptyLines: true,
    beforeFirstChunk: chunk => chunk.replace(/.*,{10,}\n/gm, ''), // CSVコメントを取り去る
    transform: value => value.replace(/(\r\n|\n|\r|\s)/g, ''), // 空白を取り去る
  });

  return results.data.flatMap((item) => {
    const eventCollection = [];
    const datePattern = /(\d{1,2})(?:月)?(\d{1,2})?(?:日)?(?:.*?[（|(].+?[）|)])?(?:.*?(～|、|まで|から))?/g; // https://regex101.com/r/hhA8KY/16
    const datesForEvent = [...item['日付'].matchAll(datePattern)];
    const year = moment().format('YYYY');

    datesForEvent.forEach(([, month, day, divider], i) => {
      const newEvent = new EventContent(); // 新規イベント項目テンプレートを初期化
      const startAndEndDates = []; // 日付の検出処理終わったら開催日と終了日をこの配列に入れる
      day = day || 1; // もし日がないなら1日に設定する
      month -= 1; // JSの月は０から始まる

      if (divider && (divider.includes('～') || divider.includes('から'))) {
        // 連続日付のイベントは
        const [, endMonth, endDay] = datesForEvent.splice(i + 1, 1).flat();
        const endDayNormalized = endDay || 1;
        startAndEndDates.push(
          moment([year, month, day]).format('YYYYMMDD'),
          moment([year, endMonth - 1, endDayNormalized]).format('YYYYMMDD'),
        );
      } else if (divider && divider.includes('まで')) {
        startAndEndDates.push(
          moment([2019, 2, 1]).format('YYYYMMDD'),
          moment([year, month, day]).format('YYYYMMDD'),
        );
      } else {
        startAndEndDates.push(
          moment([year, month, day]).format('YYYYMMDD'),
          moment([year, month, day]).format('YYYYMMDD'),
        );
      }
      const dateSpan = moment.range(startAndEndDates);

      newEvent.title = item['タイトル'];
      newEvent.keywords = item['エリア'];
      newEvent.text = item['詳細/コメント'];
      newEvent.excerpt = item['詳細/コメント'];
      newEvent.event_calendar_area = item['エリア'];
      newEvent.tags = item['エリア'];
      newEvent.event_calendar_spot = item['場所'];
      newEvent.event_calendar_image = item['画像'];
      newEvent.event_calendar_date = item['日付'];
      newEvent.event_calendar_address = item['住所'];
      newEvent.event_calendar_time = item['開催時間'];
      newEvent.event_calendar_parking = item['駐車場'];
      newEvent.event_calendar_contact = item['お問い合わせ'];
      newEvent.event_calendar_start_day = moment(dateSpan.start).format('YYYYMMDD');
      newEvent.event_calendar_end_day = moment(dateSpan.end).format('YYYYMMDD');
      newEvent.event_calendar_info = item['雨天'];
      newEvent.event_calendar_price = item['料金'];

      if (dateSpan.diff('days') === 1) {
        Object.keys(dateSpan).forEach((k) => {
          const subEvent = new EventContent(); // 新規イベント項目テンプレートを初期化
          subEvent.title = item['タイトル'];
          subEvent.keywords = item['エリア'];
          subEvent.text = item['詳細/コメント'];
          subEvent.excerpt = item['詳細/コメント'];
          subEvent.event_calendar_area = item['エリア'];
          subEvent.tags = item['エリア'];
          subEvent.event_calendar_spot = item['場所'];
          subEvent.event_calendar_image = item['画像'];
          subEvent.event_calendar_date = item['日付'];
          subEvent.event_calendar_address = item['住所'];
          subEvent.event_calendar_time = item['開催時間'];
          subEvent.event_calendar_parking = item['駐車場'];
          subEvent.event_calendar_contact = item['お問い合わせ'];
          subEvent.event_calendar_info = item['雨天'];
          subEvent.event_calendar_price = item['料金'];
          subEvent.event_calendar_start_day = moment(dateSpan[k]).format('YYYYMMDD');
          subEvent.event_calendar_end_day = moment(dateSpan[k]).format('YYYYMMDD');
          eventCollection.push(subEvent);
        });
      } else {
        eventCollection.push(newEvent);
      }
    });
    return eventCollection.flat();
  });
}
