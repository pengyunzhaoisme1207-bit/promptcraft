interface AdSlotProps {
  slot: 'ad-slot-top' | 'ad-slot-middle' | 'ad-slot-result' | 'ad-slot-bottom';
}

export default function AdSlot({ slot }: AdSlotProps) {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-4xl rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-sm text-gray-400">
          Advertisement — {slot}
        </p>
        <p className="mt-1 text-xs text-gray-300">
          {/* AdSense placeholder — replace with actual ad code */}
          {slot === 'ad-slot-top' && '728×90 leaderboard'}
          {slot === 'ad-slot-middle' && '300×250 medium rectangle'}
          {slot === 'ad-slot-result' && '336×280 large rectangle'}
          {slot === 'ad-slot-bottom' && '728×90 leaderboard'}
        </p>
      </div>
    </div>
  );
}
