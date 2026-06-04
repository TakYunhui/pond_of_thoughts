type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="ambient-grid absolute inset-0" />
        <div className="absolute left-[12%] top-14 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(194,204,216,0.14),_transparent_66%)] blur-3xl" />
        <div className="absolute bottom-[-8%] right-[6%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(244,195,119,0.12),_transparent_58%)] blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-[8%] top-20 h-[72vh] rounded-[50%] border border-white/[0.03]" />
      <div className="pointer-events-none absolute left-1/2 top-[12%] h-[56vh] w-[70vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,_rgba(217,228,239,0.08),_transparent_62%)] blur-[110px]" />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
