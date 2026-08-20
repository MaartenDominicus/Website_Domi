"use client";

import { FormEvent, useState } from "react";

const navItems = [
  ["Diensten", "/service.html"],
  ["Projecten", "/project.html"],
  ["Over ons", "/about.html"],
  ["Kennis", "/blog.html"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Troos Bouw home">
        <img src="/images/troos-logo.png" alt="" />
        <span>
          <strong>TROOS</strong>
          <small>Bouw &amp; techniek</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Hoofdnavigatie">
        {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>

      <a className="header-cta" href="/contact.html">Plan een kennismaking</a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      {open && (
        <nav className="mobile-nav" aria-label="Mobiele navigatie">
          {navItems.map(([label, href], index) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
          <a href="/contact.html" onClick={() => setOpen(false)}><span>05</span>Contact</a>
        </nav>
      )}
    </header>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const project = String(form.get("project") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Projectaanvraag via troos.com — ${project || "algemeen"}`);
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\nTelefoon: ${phone}\nType project: ${project}\n\n${message}`,
    );
    setStatus("Uw e-mailprogramma wordt geopend met een ingevuld bericht.");
    window.location.href = `mailto:troosbouw@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className={`contact-form${compact ? " contact-form-compact" : ""}`} onSubmit={submit}>
      <div className="form-grid">
        <label>
          <span>Naam</span>
          <input name="name" autoComplete="name" required placeholder="Uw naam" />
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" autoComplete="email" required placeholder="naam@voorbeeld.nl" />
        </label>
        <label>
          <span>Telefoon</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="06 —" />
        </label>
        <label>
          <span>Type project</span>
          <select name="project" defaultValue="">
            <option value="" disabled>Kies een richting</option>
            <option>Nieuwbouw / recreatiewoning</option>
            <option>Renovatie / verbouwing</option>
            <option>Installatietechniek</option>
            <option>Maatwerk / interieur</option>
            <option>Anders</option>
          </select>
        </label>
      </div>
      <label>
        <span>Uw plan</span>
        <textarea name="message" required rows={compact ? 4 : 6} placeholder="Vertel kort over de locatie, wensen en gewenste planning." />
      </label>
      <div className="form-submit">
        <button className="button button-primary" type="submit">Open in e-mail <span>↗</span></button>
        <p>Of mail rechtstreeks naar <a href="mailto:troosbouw@gmail.com">troosbouw@gmail.com</a>.</p>
      </div>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
