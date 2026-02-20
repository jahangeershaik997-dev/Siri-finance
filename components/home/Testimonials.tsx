"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "I had a CIBIL score of 620 and thought no bank would give me a loan. Siri Financial Services got my personal loan approved from Bajaj Finance within 3 days!",
    name: "Rajesh K.",
    role: "Salaried Employee",
    location: "Hyderabad",
  },
  {
    text: "Got my home loan at 8.5% interest rate. Mallesh sir compared 5 banks and found the best deal. Excellent service!",
    name: "Priya M.",
    role: "IT Professional",
    location: "Gachibowli",
  },
  {
    text: "Needed a business loan urgently for my shop. Despite no IT returns, they arranged ₹10 lakh loan. Highly recommended!",
    name: "Suresh B.",
    role: "Business Owner",
    location: "Ameerpet",
  },
  {
    text: "Applied for car loan and credit card together. Both got approved in a week. Very smooth process.",
    name: "Kavitha R.",
    role: "Teacher",
    location: "Kukatpally",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-sfs-bg-light py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-poppins text-center text-2xl font-bold text-sfs-text-primary sm:text-3xl">
          What Our Customers Say
        </h2>
        <span className="mx-auto mt-2 block h-1 w-16 rounded-full bg-primary-green" />
        <div className="relative mt-12 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-card bg-white p-8 shadow-soft"
            >
              <p className="text-lg text-sfs-text-primary">&ldquo;{testimonials[index].text}&rdquo;</p>
              <p className="mt-4 font-semibold text-sfs-text-primary">
                — {testimonials[index].name}, {testimonials[index].role}, {testimonials[index].location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${i === index ? "bg-primary-red w-6" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
