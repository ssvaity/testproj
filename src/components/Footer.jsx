import './Footer.css'

const socials = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3h2v9h3v-9h2.5l.5-3H12V6.5a.5.5 0 0 1 .5-.5H15V3z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4.5-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M17.5 4h2.9l-6.34 7.25L21.5 20h-5.6l-4.38-5.73L6.5 20H3.6l6.78-7.75L3 4h5.74l3.96 5.24L17.5 4zm-1.02 14.2h1.6L7.6 5.7H5.9l10.58 12.5z',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h2>Contact Us</h2>

          <p className="footer-strong">Shri Mahavir Jain Aradhana Kendra, Koba</p>
          <p className="footer-muted">
            Gandhinagar &ndash; Ahmedabad Highway,<br />
            Near Koba Circle, Koba, Pin -382426<br />
            Dist.-Gandhinagar, Gujarat, India
          </p>

          <p className="footer-strong">Main Office Phone</p>
          <p className="footer-line">&#9742; +91 75750 01083</p>
          <p className="footer-line">&#9993; kendra@kobatirth.org</p>

          <p className="footer-strong">Gyanmandir</p>
          <p className="footer-line">&#9742; +91 75750 01084</p>
          <p className="footer-line">&#9993; gyanmandir@kobatirth.org</p>
        </div>

        <div className="footer-brand">
          <img src="/logo.png" alt="Shrutsanjeevan" className="footer-logo" />
          <div className="footer-socials">
            {socials.map(({ label, href, path }) => (
              <a key={label} href={href} aria-label={label} className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="currentColor" d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col footer-col-right">
          <h2>Location</h2>
          <a
            className="footer-map"
            href="https://maps.google.com/?q=Shri+Mahavir+Jain+Aradhana+Kendra+Koba"
            target="_blank"
            rel="noreferrer"
          >
            <span>Open in Maps &#8599;</span>
          </a>
        </div>
      </div>

      <div className="footer-reg">
        Charity Registration Number-A/2659/AHMEDABAD | 80G Number- AADTS7140QF2021401 |
        12A Number- AADTS7140QE2021401 | FCRA Number- 041920001 | CSR Number- CSR00007108 |
        Darpan Unique ID : GJ/2018/0207019
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Shrutsanjeevan, All Rights Reserved.</span>
        <span className="footer-legal">
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
