import { getGlobalCryptoData } from '@/lib/getGlobalData'
import TodaInfoMore from './today-info-more'

export async function TodayInfo() {
  const globalData = await getGlobalCryptoData()
  return (
    <div className="w-full lg:px-0">
      <h2 className="text-lg font-semibold lg:text-2xl">
        Today&apos;s Cryptocurrency Prices by Market Cap
      </h2>
      <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">
        The global crypto market cap is $
        <span className="font-semibold">
          {globalData.total_market_cap.usd.toFixed(0)}
        </span>
        , a{' '}
        <span
          className={
            globalData.market_cap_change_percentage_24h_usd > 0
              ? 'font-semibold text-green-500'
              : 'font-semibold text-red-500'
          }
        >
          {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </span>{' '}
        <span>
          {globalData.market_cap_change_percentage_24h_usd > 0
            ? 'increase'
            : 'decrease'}
        </span>{' '}
        over the last day.
      </p>
      <TodaInfoMore globalData={globalData} />
    </div>
  )
}
