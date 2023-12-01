import { getReport } from '@/data-layer/wakatime/getReport';

import { UserTable } from '../[locale]/wakatime/+components/UserTable';
import { Winner } from '../[locale]/wakatime/+components/Winner';
import Logo from './Logo.svg';

export default async function WakatimeDay() {
  const { day, year, usages, winners } = await getReport(7);

  return (
    <body className="flex min-h-screen flex-col items-center overflow-x-hidden bg-bg-0 font-rajdhani text-base text-fg-0">
      <div className="flex w-[1000px] flex-col items-center gap-20 p-20">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <p className="w-[384px] text-center text-4xl font-bold leading-tight">
            FullstacksJS Wakatime Leaderboard
          </p>
          <p className="text-2xl font-bold text-accent-0">
            Day {day} of the year {year}
          </p>
        </div>
        <div className="hidden w-full items-center justify-center gap-12 rounded-3xl bg-bg-darker py-20 desktop:flex">
          <Winner className="rank-1 order-2" usage={winners[0]!} rank={1} />
          <Winner className="rank-2 order-1" usage={winners[1]!} rank={2} />
          <Winner className="rank-3 order-3" usage={winners[2]!} rank={3} />
        </div>

        <div className="w-full rounded-3xl bg-bg-darker px-2 pt-8">
          <UserTable winners={[]} usages={usages} />
        </div>

        <div id="social-media" className="text-xsm font-bold text-accent-0">
          FullstacksJS.com
        </div>
      </div>
    </body>
  );
}
