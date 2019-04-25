import moment from 'moment';

class EventContent {
  constructor() {
    return {
      class: 'entry',
      id: '',
      status: 1,
      author: 'himeji_portal_user',
      authored_on: moment().format('YYYY/M/DD HH:mm:ss'),
      modified_on: moment().format('YYYY/M/DD HH:mm:ss'),
      unpublished_on: '',
      convert_breaks: 'richtext',
      title: '',
      text: '',
      text_more: '',
      excerpt: '',
      keywords: '',
      categories: 'イベントカレンダー記事',
      tags: '',
      allow_comments: 1,
      allow_pings: 0,
      assets: '',
      basename: '',
      event_calendar_image: '',
      event_calendar_date: '',
      event_calendar_info: '',
      event_calendar_area: '',
      event_calendar_spot: '',
      event_calendar_address: '',
      event_calendar_time: '',
      event_calendar_parking: '',
      event_calendar_contact: '',
      event_calendar_tel: '',
      event_calendar_start_day: '',
      event_calendar_end_day: '',
      event_calendar_price: '',
    };
  }
}

export { EventContent as default };
