import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import StringPhysicsGrid from './components/StringPhysicsGrid';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MomentumCardStream from './components/MomentumCardStream';
import VisualArchitecture from './components/VisualArchitecture';
import TheMachineVerticals from './components/TheMachineVerticals';
import ColumnCurtainManifesto from './components/ColumnCurtainManifesto';
import SelfSelectionMatrix from './components/SelfSelectionMatrix';
import CultureAndFounders from './components/CultureAndFounders';
import MatterPhysicsFloor from './components/MatterPhysicsFloor';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';

export default function App() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const handleOpenApply = () => setApplyModalOpen(true);
  const handleCloseApply = () => setApplyModalOpen(false);

  const handleOpenSelfTest = () => {
    const el = document.getElementById('self-selection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-ink selection:bg-accent selection:text-white">
      {/* Film Grain Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Intro Preloader */}
      <Preloader />

      {/* Cursor */}
      <CustomCursor />

      {/* Tactile String Physics Grid */}
      <StringPhysicsGrid />

      {/* Top Fixed Nav */}
      <Navbar onOpenApply={handleOpenApply} />

      {/* Main Flow */}
      <main className="relative z-10">
        <Hero
          onOpenApply={handleOpenApply}
          onOpenSelfTest={handleOpenSelfTest}
        />

        <MomentumCardStream
          onSelectCard={() => handleOpenApply()}
        />

        <VisualArchitecture />

        <TheMachineVerticals />

        <ColumnCurtainManifesto />

        <SelfSelectionMatrix
          onOpenApply={handleOpenApply}
        />

        <CultureAndFounders
          onOpenApply={handleOpenApply}
        />

        {/* Fully Interactive Kinetic Physics Sandbox */}
        <MatterPhysicsFloor />
      </main>

      {/* Elevated Footer */}
      <Footer onOpenApply={handleOpenApply} />

      {/* Evidence-First Apply Intake Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={handleCloseApply}
      />
    </div>
  );
}
