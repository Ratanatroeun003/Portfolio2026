import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ScrollAnimation from '@/components/ScrollAnimation';
export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <main className="bg-gray-900 text-white overflow-hidden">
      <Hero />
      <ScrollAnimation direction="left" delay={0}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation direction="up" delay={100}>
        <Projects />
      </ScrollAnimation>
      <ScrollAnimation direction="right" delay={100}>
        <Contact />
      </ScrollAnimation>
    </main>
  );
}
