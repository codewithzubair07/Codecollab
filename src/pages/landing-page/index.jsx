import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeatureShowcase from './components/FeatureShowcase';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Vibe Coding - Collaborative Coding Platform</title>
        <meta name="description" content="Join thousands of developers in real-time collaborative coding. Private and public rooms, integrated development tools, and seamless team collaboration." />
        <meta name="keywords" content="collaborative coding, real-time development, code editor, team collaboration, programming platform" />
        <meta property="og:title" content="Vibe Coding - Collaborative Coding Platform" />
        <meta property="og:description" content="The ultimate platform for collaborative coding with real-time features and team integration." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Showcase */}
          <FeatureShowcase />

          {/* Testimonials */}
          <TestimonialSection />

          {/* Final CTA */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/90 pointer-events-none" />
      </div>
    </>
  );
};

export default LandingPage;