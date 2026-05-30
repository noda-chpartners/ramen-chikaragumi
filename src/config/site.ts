export const siteConfig = {
  /** サイト・店舗名（OGP・構造化データなどで使用） */
  name: "初代組系ラーメン麵魂力組",
  /** トップページの title タグ */
  title: "初代組系ラーメン麵魂力組 | 飯田橋のラーメン店",
  /** meta description（120〜160文字程度を目安） */
  description:
    "東京都千代田区飯田橋の初代組系ラーメン麵魂力組。伝説の店主が腕を振る正油・塩・味噌ラーメン。飯田橋駅・九段下駅徒歩7分。ランチ・ディナーでご利用ください。",
  /** 本番URL（デプロイ前に実際のドメインへ変更してください） */
  url: "https://example.com",
  /** OGP 画像（public 配下のパス） */
  ogImage: "/ogp.png",
  lang: "ja",
  locale: "ja_JP",
  /** meta keywords（参考程度。主要検索エンジンでは权重は低い） */
  keywords: [
    "ラーメン",
    "飯田橋",
    "千代田区",
    "正油ラーメン",
    "塩ラーメン",
    "味噌ラーメン",
    "麵魂力組",
    "東京 ラーメン",
  ],
  sns: {
    x: "",
    instagram: "",
  },
  /** 店舗情報（構造化データ・フッター等で参照） */
  business: {
    telephone: "090-7162-4273",
    address: {
      postalCode: "102-0072",
      addressRegion: "東京都",
      addressLocality: "千代田区",
      streetAddress: "飯田橋1-8-7 有田ビル1階",
    },
    geo: {
      latitude: 35.7021,
      longitude: 139.7454,
    },
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "11:30",
        closes: "21:00",
      },
      {
        dayOfWeek: ["Saturday"],
        opens: "11:30",
        closes: "15:00",
      },
    ],
    /** 定休日（schema.org 用） */
    closedDays: ["Sunday"],
    priceRange: "¥",
    servesCuisine: "Japanese",
  },
} as const;
