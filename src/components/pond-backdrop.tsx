export function PondBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[26%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.11),_transparent_62%)] blur-[110px]" />
      <div className="absolute left-[12%] top-[34%] h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(194,204,216,0.08),_transparent_72%)] blur-3xl" />
      <div className="absolute right-[12%] top-[58%] h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(217,228,239,0.06),_transparent_72%)] blur-3xl" />
      <div className="absolute bottom-[2%] right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(244,195,119,0.1),_transparent_60%)] blur-3xl" />
    </div>
  );
}
