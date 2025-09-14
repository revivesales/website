import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          {/* Custom contact link: renamed to avoid 'Contact' wording */}
          <li><a href="mailto:info@example.com">Get in Touch</a></li>
        </ul>
      </nav>
    </footer>
  );
}
