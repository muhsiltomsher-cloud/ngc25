import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const sitemap1 = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT US", href: "/contact" },
  { label: "STORE LOCATOR", href: "/store-locator" },
  { label: "FAQ", href: "/faq" },
  { label: "TERMS AND CONDITIONS", href: "/terms" },
];

const sitemap2 = [
  { label: "WALLS", href: "/walls" },
  { label: "QUICKSHIP", href: "/quickship" },
  { label: "KIDS", href: "/kids" },
  { label: "DESIGNER", href: "/designer" },
  { label: "COMMERCIAL", href: "/commercial" },
  { label: "CUSTOM WALL", href: "/custom-wall" },
];

const sitemap3 = [
  { label: "FLOORS", href: "/floors" },
  { label: "CARPET TILE", href: "/carpet-tile" },
  { label: "WALL TO WALL", href: "/wall-to-wall" },
  { label: "CUSTOM CARPETS", href: "/custom-carpets" },
];

const sitemap4 = [
  { label: "FABRICS", href: "/fabrics" },
  { label: "RESIDENTIAL", href: "/residential" },
  { label: "CONTRACT", href: "/contract" },
];

const social = [
  { icon: <FacebookIcon fontSize="inherit" />, url: "https://facebook.com" },
  { icon: <TwitterIcon fontSize="inherit" />, url: "https://twitter.com" },
  { icon: <LinkedInIcon fontSize="inherit" />, url: "https://linkedin.com" },
  { icon: <InstagramIcon fontSize="inherit" />, url: "https://instagram.com" },
  { icon: <PinterestIcon fontSize="inherit" />, url: "https://pinterest.com" }
];

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff", padding: 0 }}>
      {/* Top section */}
      <div style={{
        maxWidth: 1400,
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        borderBottom: "1px solid #222",
        padding: "3rem 2% 0 2%"
      }}>
        {/* Sitemap columns and logo */}
        <div style={{ flex: 2.6, minWidth: 320 }}>
          <div style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap' }}>
            <div>
              <b style={{ fontSize: "1rem", letterSpacing: 0.2 }}>Sitemap</b>
              <ul style={{ listStyle: "none", margin: "1.3rem 0 0 0", padding: 0, lineHeight: 1.9 }}>
                {sitemap1.map(item => (
                  <li key={item.label}>
                    <a href={item.href} style={{ color: "#ccc", textDecoration: "none", fontSize: 15 }}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <ul style={{ listStyle: "none", margin: "2.8rem 0 0 0", padding: 0, lineHeight: 1.9 }}>
              {sitemap2.map(item => (
                <li key={item.label}>
                  <a href={item.href} style={{ color: "#ccc", textDecoration: "none", fontSize: 15 }}>{item.label}</a>
                </li>
              ))}
            </ul>
            <ul style={{ listStyle: "none", margin: "2.8rem 0 0 0", padding: 0, lineHeight: 1.9 }}>
              {sitemap3.map(item => (
                <li key={item.label}>
                  <a href={item.href} style={{ color: "#ccc", textDecoration: "none", fontSize: 15 }}>{item.label}</a>
                </li>
              ))}
            </ul>
            <ul style={{ listStyle: "none", margin: "2.8rem 0 0 0", padding: 0, lineHeight: 1.9 }}>
              {sitemap4.map(item => (
                <li key={item.label}>
                  <a href={item.href} style={{ color: "#ccc", textDecoration: "none", fontSize: 15 }}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: "3.2rem" }}>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 17, marginBottom: "1.2rem" }}>
              {social.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  color: "#fff",
                  fontSize: 21,
                  background: "#191919",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none"
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
            {/* NGC Logo */}

<div className='mb-8 mt-8'>

  {/* Logo image */}
  <img
    src="/images/logo.png"
    alt="NGC Logo"
    style={{ width: 130, height: "auto", display: "block", marginBottom: 6 }}
  />
</div>






          </div>
        </div>
        {/* Contact section */}
        <div style={{
          flex: 2,
          minWidth: 320,
          borderLeft: "2px solid #333",
          paddingLeft: "3.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <span style={{
            // fontFamily: "cursive, serif",
            fontSize: "2.3rem",
            fontWeight: 400,
            display: "block",
            marginBottom: "1.2rem",
            letterSpacing: 0.6,
            whiteSpace: "nowrap",
            color: "#fff"
          }}>
            Get in touch with us
          </span>
          <div style={{ display: "flex", gap: 62 }}>
            <div>
              <span style={{ opacity: 0.7, letterSpacing: 0.4 }}>HOTLINE</span>
              <div style={{ margin: ".2rem 0 1rem 0", letterSpacing: 0.3, color: "#fff" }}>TEL: 055-2000794</div>
            </div>
            <div>
              <span style={{ opacity: 0.7, letterSpacing: 0.4 }}>Email</span>
              <div style={{ margin: ".2rem 0 1rem 0" }}>
                EMAIL: <a href="mailto:connect@ngcmiddleeast.com" style={{ color: "#aaa", textDecoration: "none" }}>connect@ngcmiddleeast.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom copyright bar */}
      <div style={{
        maxWidth: 1400,
        margin: "auto",
        padding: "0.5rem 2% 2rem 2%",
        fontSize: 14,
        color: "#888",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <div style={{ width: "100%", textAlign: "right" }}>
          © 2025 by NGC. Designed by <a style={{ color: "#aaa" }} href="https://tomsher.com" target="_blank" rel="noopener noreferrer">tomsher</a>
        </div>
      </div>
    </footer>
  );
}

