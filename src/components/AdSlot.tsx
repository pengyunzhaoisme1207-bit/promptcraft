interface AdSlotProps {
  slot?: 'ad-slot-top' | 'ad-slot-middle' | 'ad-slot-result' | 'ad-slot-bottom';
}

export default function AdSlot(props: AdSlotProps) {
  void props;
  // AdSense Auto Ads is loaded globally in layout.tsx. Do not render fake
  // display-ad units without real numeric data-ad-slot IDs.
  return null;
}
