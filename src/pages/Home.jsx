import { useCoffeeData } from "../hooks/useCoffeeData";
import "./Home.css";

/**
 * Home page component - Landing page describing the Coffee R Us store
 */
export function Home() {
  const { storeInfo } = useCoffeeData();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">{storeInfo.name}</h1>
        <p className="hero-subtitle">{storeInfo.description}</p>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h2>About Us</h2>
          <p>
            Welcome to Coffee R Us, your premier destination for exceptional
            coffee from around the world. We are passionate about bringing you
            the finest quality beans sourced directly from coffee-producing
            regions.
          </p>
        </div>

        <div className="info-card">
          <h2>Our Mission</h2>
          <p>
            To provide coffee enthusiasts with premium, freshly roasted coffee
            that celebrates the unique flavors and stories of coffee-growing
            regions worldwide.
          </p>
        </div>

        <div className="info-card">
          <h2>Contact Us</h2>
          <p>
            <strong>Phone:</strong> {storeInfo.phone_number}
          </p>
          <p>
            Browse our shop to discover your new favorite coffee, or visit our
            admin portal to manage products.
          </p>
        </div>
      </div>
    </div>
  );
}
