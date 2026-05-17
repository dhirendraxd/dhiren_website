import React from 'react';

type Member = {
  name: string;
  role?: string;
  img: string;
};

const MeetTheTeam: React.FC<{ members: Member[]; href?: string }> = ({ members, href = '/team' }) => {
  const m = members || [];
  return (
    <section className="mt-10 mb-8">
      <div className="mx-auto max-w-[88rem] px-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase text-[#6b6259]">Meet the team</h3>
          <a href={href} className="text-sm text-[#3f3932] hover:text-[#7A3A30]">See all members →</a>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative w-full aspect-square overflow-hidden rounded-none bg-[#f2efe9]">
              <img
                src={m[i]?.img}
                alt={m[i]?.name}
                className="h-full w-full object-cover object-center filter grayscale transition-all duration-200 hover:grayscale-0"
              />
              <div className="absolute left-3 bottom-3 text-white">
                <div className="text-sm font-semibold drop-shadow">{m[i]?.name}</div>
              </div>
              {i === 3 && (
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 bg-white/90 text-[#7a3a30] text-[0.7rem] font-semibold rounded-sm">in</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
