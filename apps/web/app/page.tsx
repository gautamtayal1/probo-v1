import { ArrowRight, Sparkles, Zap, BarChart3, Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Navbar />
      {/* Hero Section */}
      <div className="hero-gradient">
        <header className="container mx-auto px-4 py-32">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1">
              <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-400">The Future of Predictions</span>
            </div>
            <h1 className="mb-6 text-7xl font-bold tracking-tight glow-text">
              Bet on What&apos;s
              <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent"> Next</span>
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-[hsl(var(--muted))]">
              Join the next generation of predictors. Use data-driven insights to forecast outcomes and earn rewards.
            </p>
            <div className="flex gap-4">
              <Link href="/events">
              <button className="glow rounded-xl bg-[hsl(var(--primary))] px-8 py-4 text-lg font-semibold transition-all hover:bg-[hsl(var(--primary-hover))] hover:scale-105">
                Start Predicting
              </button>
              </Link>
            </div>

            {/* Market Preview */}
              <Link href="/events/btc-halving-2024" className="mt-20 w-full max-w-4xl">
              <div className="gradient-border card-shine rounded-2xl bg-black/40 p-8 backdrop-blur">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Featured Market</h3>
                  <span className="rounded-full bg-purple-500/20 px-4 py-1 text-sm text-purple-400">Live</span>
                </div>
                <p className="mb-6 text-xl font-medium">Bitcoin Halving Event 2024</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/20 to-green-500/10 p-6 text-left transition-all hover:scale-[1.02]">
                    <div className="mb-2 text-2xl font-bold text-green-400">YES</div>
                    <div className="text-sm text-[hsl(var(--muted))]">Current Odds</div>
                    <div className="text-3xl font-bold text-green-400">64%</div>
                  </button>
                  <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500/20 to-red-500/10 p-6 text-left transition-all hover:scale-[1.02]">
                    <div className="mb-2 text-2xl font-bold text-red-400">NO</div>
                    <div className="text-sm text-[hsl(var(--muted))]">Current Odds</div>
                    <div className="text-3xl font-bold text-red-400">36%</div>
                  </button>
                </div>
              </div>
            
            </Link>
          </div>
        </header>
      </div>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Why Choose Probably</h2>
            <p className="text-[hsl(var(--muted))]">Built for the future of prediction markets</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: 'Advanced Analytics',
                description: 'Real-time data and market insights to inform your predictions',
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Secure Platform',
                description: 'Enterprise-grade security protecting your assets and data',
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'Instant Execution',
                description: 'Lightning-fast trades and immediate settlement',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-shine gradient-border group rounded-xl bg-black/40 p-8 transition-all hover:scale-[1.02]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-purple-500/20 p-3 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-[hsl(var(--muted))]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="card-shine gradient-border rounded-2xl bg-black/40 p-16 text-center">
            <h2 className="mb-6 text-5xl font-bold">
              Ready to Start
              <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent"> Predicting?</span>
            </h2>
            <p className="mb-8 text-xl text-[hsl(var(--muted))]">
              Join thousands of predictors already earning rewards
            </p>
            <Link href="/events">
            <button className="glow group rounded-xl bg-[hsl(var(--primary))] px-8 py-4 text-lg font-semibold transition-all hover:bg-[hsl(var(--primary-hover))] hover:scale-105">
              Get Started Now
              <ArrowRight className="ml-2 inline h-5 w-5 transition-all group-hover:translate-x-1" />
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[hsl(var(--muted))]">
            <div className="flex justify-end gap-6">
              <a href="https://github.com/gautamtayal1" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}