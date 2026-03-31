import {
  ClipboardCheck,
  Globe,
  Settings,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: ClipboardCheck,
    value: "2450",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: "1085",
    label: "Satisfied Clients",
  },
  {
    icon: Settings,
    value: "07",
    label: "Team Members",
  },
  {
    icon: Globe,
    value: "2790",
    label: "Global Customers",
  },
];

const PreContactSection = () => {
  return (
    <section className="py-14 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto space-y-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-border/60 rounded-sm overflow-hidden bg-card">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="border-b sm:border-b-0 sm:border-r border-border/60 last:border-r-0 p-7 md:p-8 min-h-[170px] flex flex-col justify-between"
              >
                <Icon className="h-7 w-7 text-foreground/80" strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-5xl font-semibold tracking-tight text-foreground leading-none">
                    {item.value}
                  </p>
                  <p className="text-base text-muted-foreground">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-5">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-foreground">
            <span className="text-muted-foreground">Say Hi!</span>{" "}
            <span>and tell me about your idea</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
            Have a nice work? Reach out and let&apos;s chat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreContactSection;