import { GiDominoTiles, GiRadarSweep } from 'react-icons/gi';
import '../icon.css'; // ↓③で定義


export const ScouterIcon = () => (
  <div className="relative w-10 h-10">
    {/* 麻雀の牌代わりにドミノ牌を使用 */}
    <GiDominoTiles className="text-green-700 w-full h-full drop-shadow-sm" />
    {/* 回転レーダーはそのまま */}
    <GiRadarSweep className="absolute inset-0 text-white/80 p-1 animate-spin-slow" />
  </div>
);
export default ScouterIcon;