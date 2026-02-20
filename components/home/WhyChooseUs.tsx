import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/SectionTitle";

const features = [
  { title: "10+ Banking Partners", desc: "We compare offers from multiple banks to get you the best deal", icon: "bank" },
  { title: "Lowest Interest Rates", desc: "Our banking relationships help us negotiate the best rates for you", icon: "rate" },
  { title: "CIBIL Issue Solutions", desc: "Low CIBIL score? We have specialized solutions to get your loan approved", icon: "check" },
  { title: "No Income Proof Options", desc: "Self-employed or freelancer? We handle cases without traditional income proof", icon: "doc" },
  { title: "Quick Processing", desc: "Get your loan sanctioned within 48-72 hours with our fast-track processing", icon: "fast" },
  { title: "100% Free Service", desc: "Our consultation and loan processing service is completely free for you", icon: "gift" },
];

const iconMap: Record<string, string> = {
  bank: "🏦",
  rate: "📉",
  check: "✅",
  doc: "📄",
  fast: "⚡",
  gift: "🎁",
};

export function WhyChooseUs() {
  return (
    <section className="bg-gradient-trust py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Why Choose Siri Financial Services" subtitle="Your trust is our priority" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-card border border-white/20 bg-white/10 p-6 backdrop-blur"
            >
              <span className="text-3xl">{iconMap[item.icon]}</span>
              <h3 className="mt-3 font-poppins text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/90">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
