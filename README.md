# イベントCSVからMT用CSVへの変換ツール
> PapaparseでイベントカレンダーのCSVデータをMT用のデータへ変換する

| 必須アプリ          | 確認仕方      | 導入方法
| ---------------   | ------------ | -------------                                 |
| Node.js >= 10 LTS | `node -v`    | [nodejs.org](https://nodejs.org/ja/download/) |
| yarn >= ^1.15.2   | `yarn -v`    | `npm install -g yarn` or [yarnpkg.com](https://yarnpkg.com/ja/docs/install#windows-stable) |

## DEMOページ
https://saltymouse.github.io/event-calendar-csv-tool/

## プロジェクト使い方
1. `yarn` or `npm i` でインストール
2. `yarn start` or `npm run start` でウェブサーバーを起動
3. http://localhost:1234 でサイトを見る

## CSV結果を確かめるユーニットテスト
`test` フォルダー内それぞれのJestユーニットテストが設置されている。  
`yarn test` で実行する。  
`test/test-results.html` を開き結果を確認する。
