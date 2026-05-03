import {
  ClipboardCheck,
  Globe,
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
    icon: Globe,
    value: "2790",
    label: "Global Customers",
  },
];

const PreContactSection = () => {
  return (
    <section className="pt-4 pb-14 px-8 md:px-12 bg-card font-rajdhani">
      <div className="max-w-[84rem] mx-auto">
        <div className="grid sm:grid-cols-3 border border-border/60 rounded-none overflow-hidden bg-card">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="border-b sm:border-b-0 sm:border-r border-border/60 last:border-r-0 p-7 md:p-8 min-h-[210px] flex flex-col items-center justify-center gap-6 text-center"
              >
                <Icon className="h-7 w-7 text-foreground/80" strokeWidth={1.6} />
                <div className="space-y-1">
                  <p className="text-4xl font-semibold tracking-tight text-foreground leading-none">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreContactSection;