"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const faqs = [
    {
      question: "What is Project Nebula?",
      answer:
        "Project Nebula is the flagship open-source initiative of the Society for Astrophysics and Space Technology (SAST). It's a collaborative platform that blends innovation, learning, and real-world development.",
    },
    {
      question: "How can I contribute to Project Nebula?",
      answer:
        "You can contribute by visiting our GitHub repositories, picking up open issues, submitting pull requests, or suggesting new features. We welcome contributors of all skill levels!",
    },
    {
      question: "Do I need prior experience to join?",
      answer:
        "No! Project Nebula is designed to be accessible to beginners. We provide workshops, technical lectures, and mentorship to help you get started with open-source contribution.",
    },
    {
      question: "What technologies does Project Nebula use?",
      answer:
        "We primarily use web technologies like HTML, CSS, JavaScript, React, Next.js, and Node.js. We also work with databases and other tools depending on the specific module.",
    },
    {
      question: "Is there a roadmap for Project Nebula?",
      answer:
        "Yes! Project Nebula begins with the development of the SAST website and gradually evolves into an ecosystem of interconnected modules including backend systems, interactive robotics dashboards, and project-specific tools.",
    },
    {
      question: "Are there learning resources available?",
      answer:
        "Absolutely! We provide workshops, technical lectures, and guided learning sessions focused on open-source development, Git/GitHub best practices, and web technologies.",
    },
    {
      question: "How can I join SAST?",
      answer:
        "To join SAST, please reach out to us through any of our contact channels. We're always looking for passionate individuals interested in astrophysics and space technology!",
    },
    {
      question: "Can I suggest new features or projects?",
      answer:
        "Yes! We encourage community input. You can suggest new features or projects through our GitHub repositories or by contacting us directly.",
    },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "4rem 1rem",
          color: "white",
        }}
      >
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "3.2rem",
            fontWeight: "900",
            marginBottom: "2.5rem",
            letterSpacing: "0.05em",
            background: "linear-gradient(90deg, #00aaff, #66ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            color: "#cccccc",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Everything you need to know about Project Nebula and how to get
          involved.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                onClick={() => toggleFaq(index)}
                style={{
                  padding: "1.2rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    transition: "transform 0.3s ease",
                    transform:
                      openFaqIndex === index ? "rotate(45deg)" : "rotate(0)",
                    fontSize: "1.5rem",
                    color: "#00aaff",
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  padding:
                    openFaqIndex === index
                      ? "0 1.5rem 1.2rem 1.5rem"
                      : "0 1.5rem",
                  height: openFaqIndex === index ? "auto" : "0",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  opacity: openFaqIndex === index ? 1 : 0,
                  color: "#ccc",
                }}
              >
                <p style={{ margin: 0, textAlign: "left" }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;
