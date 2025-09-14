import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
          {/* Custom contact link: renamed to avoid 'Contact' wording */}
          <li><a href="mailto:info@example.com">Get in Touch</a></li>
        </ul>
      </nav>
    </header>
  );
}
