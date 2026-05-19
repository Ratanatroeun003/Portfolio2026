import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
