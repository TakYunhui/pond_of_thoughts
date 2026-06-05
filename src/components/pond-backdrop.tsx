export function PondBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(217,228,239,0.12),transparent_24%),linear-gradient(180deg,rgba(7,17,26,0.06),rgba(7,17,26,0.48))]" />
      <div className="absolute left-1/2 top-[28%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.08),_transparent_62%)] blur-[90px]" />
      <div className="absolute bottom-[8%] right-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(244,195,119,0.12),_transparent_60%)] blur-3xl" />
      <div className="absolute left-[18%] top-[26%] h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(194,204,216,0.08),_transparent_72%)] blur-2xl" />
      <div className="absolute right-[16%] top-[52%] h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.07),_transparent_72%)] blur-2xl" />
    </div>
  );
}
