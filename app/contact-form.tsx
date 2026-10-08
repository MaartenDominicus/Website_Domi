"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Static hosting uses full document navigation. */
import { useState } from "react";

type ContactText = {
  formTitle: string; name: string; email: string; phone: string; location: string;
  type: string; typePrompt: string; typeOptions: readonly string[];
  message: string; messagePlaceholder: string; consent: string; submit: string; demo: string;
};

export default function ContactForm({ text: t, language }: { text: ContactText; language: "nl" | "en" }) {
  const [errors, setErrors] = useState<Record<string, "required" | "email" | "invalid">>({});
  const nl = language === "nl";
  const required = nl ? "verplicht" : "required";
  const labels: Record<string, string> = {
    name: t.name, email: t.email, phone: t.phone, location: t.location,
    projectType: t.type, message: t.message, privacyConsent: nl ? "Toestemming" : "Consent",
  };
  function errorText(name: string) {
    if (errors[name] === "email") return nl ? "Vul een e-mailadres in, bijvoorbeeld naam@voorbeeld.nl." : "Enter an email address, for example name@example.com.";
    if (errors[name] === "invalid") return nl ? "Controleer uw invoer." : "Check your entry.";
    if (name === "privacyConsent") return nl ? "Geef toestemming om uw aanvraag te kunnen versturen." : "Give consent to send your enquiry.";
    if (name === "projectType") return nl ? "Kies een type project." : "Choose a project type.";
    return nl ? `Vul ${labels[name].toLowerCase()} in.` : `Enter ${labels[name].toLowerCase()}.`;
  }
  function feedback(name: string, hint?: string) {
    return {
      id: `contact-${name}`,
      "aria-invalid": errors[name] ? true as const : undefined,
      "aria-describedby": [hint, errors[name] ? `contact-${name}-error` : undefined].filter(Boolean).join(" ") || undefined,
    };
  }
  function fieldError(name: string) {
    return errors[name] ? <span className="form-error" id={`contact-${name}-error`}>{errorText(name)}</span> : null;
  }

  return (
    <form className="contact-form" action="https://formsubmit.co/e2a3109e56f2b784903eb6ae24352c31" method="POST"
      aria-labelledby="contact-form-title" aria-describedby="contact-form-instructions"
      onInvalid={(event) => {
        const field = event.target as HTMLInputElement;
        if (!labels[field.name]) return;
        const kind = field.validity.valueMissing ? "required" : field.validity.typeMismatch ? "email" : "invalid";
        setErrors((previous) => ({ ...previous, [field.name]: kind }));
      }}
      onInput={(event) => {
        const field = event.target as HTMLInputElement;
        if (!labels[field.name] || !field.validity.valid) return;
        setErrors((previous) => {
          if (!previous[field.name]) return previous;
          const next = { ...previous };
          delete next[field.name];
          return next;
        });
      }}>
      <input type="hidden" name="_subject" value="Nieuwe aanvraag via Domi Installatie" />
      <input type="hidden" name="_template" value="table" />
      <input className="contact-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" />
      <div className="form-heading"><span>01</span><h3 id="contact-form-title">{t.formTitle}</h3></div>
      <p className="form-instructions" id="contact-form-instructions">{nl ? "Alle velden zijn verplicht, behalve het telefoonnummer." : "All fields are required except the phone number."}</p>
      {Object.keys(errors).length > 0 && <div className="form-error-summary" role="alert">
        <p>{nl ? "Controleer uw aanvraag:" : "Check your enquiry:"}</p>
        <ul>{Object.keys(errors).map((name) => <li key={name}><a href={`#contact-${name}`} onClick={() => document.getElementById(`contact-${name}`)?.focus()}>{labels[name]}: {errorText(name)}</a></li>)}</ul>
      </div>}
      <div className="form-grid">
        <label className="form-field" htmlFor="contact-name"><span>{t.name} ({required})</span><input {...feedback("name")} name="name" autoComplete="name" required maxLength={200} />{fieldError("name")}</label>
        <label className="form-field" htmlFor="contact-email"><span>{t.email} ({required})</span><input {...feedback("email")} name="email" type="email" autoComplete="email" required maxLength={254} />{fieldError("email")}</label>
        <label className="form-field" htmlFor="contact-phone"><span>{t.phone}</span><input {...feedback("phone")} name="phone" type="tel" autoComplete="tel" maxLength={50} />{fieldError("phone")}</label>
        <label className="form-field" htmlFor="contact-location"><span>{t.location} ({required})</span><input {...feedback("location", "contact-location-hint")} name="location" required maxLength={200} /><span className="form-hint" id="contact-location-hint">{nl ? "Bijvoorbeeld: 1011 AB Amsterdam. Een plaatsnaam is ook voldoende." : "For example: 1011 AB Amsterdam. A city or town name is also sufficient."}</span>{fieldError("location")}</label>
        <label className="form-field" htmlFor="contact-projectType"><span>{t.type} ({required})</span><select {...feedback("projectType")} name="projectType" required defaultValue=""><option value="" disabled>{t.typePrompt}</option>{t.typeOptions.map((option) => <option key={option}>{option}</option>)}</select>{fieldError("projectType")}</label>
      </div>
      <label className="form-field" htmlFor="contact-message"><span>{t.message} ({required})</span><textarea {...feedback("message", "contact-message-hint")} name="message" rows={4} required maxLength={5000} placeholder={t.messagePlaceholder} /><span className="form-hint" id="contact-message-hint">{nl ? "Maximaal 5.000 tekens. Vermeld geen gevoelige persoonsgegevens." : "Maximum 5,000 characters. Do not include sensitive personal information."}</span>{fieldError("message")}</label>
      <label className="consent" htmlFor="contact-privacyConsent"><input {...feedback("privacyConsent")} type="checkbox" name="privacyConsent" value="Akkoord" required /><span>{t.consent} ({required}) <a href="/privacy">{nl ? "Lees de privacyverklaring." : "Read the privacy notice."}</a></span></label>
      {fieldError("privacyConsent")}
      <div className="form-submit"><button className="button button-primary" type="submit">{t.submit}<span aria-hidden="true">↗</span></button><p>{t.demo}</p></div>
    </form>
  );
}
