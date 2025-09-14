import './Landing.css';

export default function Landing() {
  return (
    <main>
      <section className="hero">
        <h1>Stop Losing Deals to Dead Leads</h1>
        <p>
          Our AI Sales Agent re-engages old prospects through SMS and
          books real sales calls so your team can close more revenue.
        </p>
        <div className="cta">
          <a className="btn primary" href="#demo">See How Many Deals You're Leaving Behind</a>
          <a className="btn secondary" href="#signup">Try Ava Free</a>
        </div>
      </section>
      <section className="features">
        <h2>How It Works</h2>
        <ul>
          <li>
            <strong>Upload your leads</strong>
            Re-engage two years of cold prospects in minutes.
          </li>
          <li>
            <strong>AI handles outreach</strong>
            Proven SMS sequences start conversations automatically.
          </li>
          <li>
            <strong>Book calls on autopilot</strong>
            Warm opportunities land on your calendar ready to close.
          </li>
        </ul>
      </section>
    </main>
  );
}

