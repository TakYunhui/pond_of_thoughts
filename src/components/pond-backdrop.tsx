export function PondBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(217,228,239,0.14),transparent_30%),linear-gradient(180deg,rgba(7,17,26,0.12),rgba(7,17,26,0.5))]" />
      <div className="absolute inset-x-[10%] top-[18%] h-[42rem] rounded-[50%] border border-[rgba(194,204,216,0.08)] opacity-50" />
      <div className="absolute inset-x-[18%] top-[26%] h-[32rem] rounded-[50%] border border-[rgba(194,204,216,0.06)] opacity-40" />
      <div className="absolute left-[20%] top-[24%] h-80 w-80 rounded-full border border-[rgba(194,204,216,0.08)] opacity-50 blur-[1px]" />
      <div className="absolute right-[16%] top-[54%] h-96 w-96 rounded-full border border-[rgba(244,195,119,0.08)] opacity-45 blur-[1px]" />
      <div className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(244,195,119,0.22),_transparent_58%)] blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1440 980"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M258 638C301 456 374 360 445 306C520 250 645 463 807 415C919 381 915 257 1034 272C1134 285 1207 423 1345 553"
          stroke="rgba(210, 196, 179, 0.18)"
          strokeWidth="1.25"
        />
        <path
          d="M460 812C600 846 766 861 923 841C1038 827 1151 791 1308 724"
          stroke="rgba(210, 196, 179, 0.12)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
