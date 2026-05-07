import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";

import LoggedInBanner  from "../components/home/LoggedInBanner";
import HeroSection     from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import RolesSection    from "../components/home/RolesSection";
import PricingSection  from "../components/home/PricingSection";
import CtaSection      from "../components/home/CtaSection";

const HomePage = () => {
  const { isAuthenticated, user, logout, isCustomer } = useAuth();

  if (isAuthenticated && isCustomer) {
    return <Navigate to="/my-orders" replace />;
  }

  return (
    <div className="overflow-x-hidden">
      {isAuthenticated && (
        <LoggedInBanner user={user} logout={logout} />
      )}

      <HeroSection
        isAuthenticated={isAuthenticated}
        user={user}
        isCustomer={isCustomer}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <RolesSection />
      <PricingSection />
      <CtaSection isAuthenticated={isAuthenticated} isCustomer={isCustomer} />
      <Footer />
    </div>
  );
};

export default HomePage;
