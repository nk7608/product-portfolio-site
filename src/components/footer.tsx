"use client";
import { HashLink } from "./hash-link";
import { usePrefs } from "./prefs";
import { contact } from "./command-menu";
import { CopyEmail } from "./copy-email";
import { TrackedLink } from "./analytics";

/** One footer for every page: who, how to reach, where to go, and the visitor's controls. */
export function Footer() {
  const { open } = usePrefs();
  return <footer className="site-footer">
    <div className="footer-top">
      <p className="footer-name"><b>Nayana Kumari</b><span>Product manager · Bangalore</span></p>
      <p className="footer-status"><i aria-hidden="true" />Open to PM roles · remote or hybrid</p>
    </div>
    <div className="footer-cols">
      <nav aria-label="Contact"><h2>Contact</h2><ul>
        <li><CopyEmail item="footer-copy-email" label="Copy email" /></li>
        <li><TrackedLink className="link" href={contact.linkedin} event="contact_open" item="footer-linkedin">LinkedIn</TrackedLink></li>
        <li><TrackedLink className="link" href={contact.github} item="footer-github">GitHub</TrackedLink></li>
        <li><TrackedLink className="link" href="https://x.com/uncommonnayana" item="footer-x">X</TrackedLink></li>
        <li><TrackedLink className="link" href={contact.resume} download="Nayana-Kumari-AI-Product-Manager-Resume.pdf" event="resume_link" item="footer-resume">Résumé (PDF)</TrackedLink></li>
      </ul></nav>
      <nav aria-label="Pages"><h2>Pages</h2><ul>
        <li><HashLink className="link" id="work">Experience</HashLink></li>
        <li><HashLink className="link" id="experiments">Experiments</HashLink></li>
        <li><HashLink className="link" id="writing">Writing</HashLink></li>
        <li><HashLink className="link" id="evidence">Recommendations</HashLink></li>
        <li><HashLink className="link" id="about">Off the clock</HashLink></li>
      </ul></nav>
      <nav aria-label="Your view"><h2>Your view</h2><ul>
        <li><button type="button" className="link" onClick={() => open("intro")}>Personalise this page</button></li>
        <li><button type="button" className="link" onClick={() => open("controls")}>Theme & reading settings</button></li>
        <li><button type="button" className="link" onClick={() => open("command")}>Command menu <kbd>⌘K</kbd></button></li>
        <li><a className="link" href="#main">Back to top ↑</a></li>
      </ul></nav>
    </div>
    <p className="footer-legal"><span>© {new Date().getFullYear()} Nayana Kumari</span><span>Your settings stay in this browser.</span></p>
  </footer>;
}
