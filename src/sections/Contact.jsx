import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { offices } from "../data/company";

const FIELD =
  "border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 focus:border-green";
const FIELD_LABEL = "type-small font-medium";
const FIELD_ERROR = "type-small text-red-600";

export default function Contact() {
  const headOffice = offices.find((o) => o.country === "Vietnam");

  const [values, setValues] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please tell us how we can help.";
    return next;
  };

  // No mail service connected yet — hands off to the user's mail client.
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\n\n${values.message}`
    );
    window.location.href = `mailto:${headOffice?.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="surface-tint py-16 md:py-20">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal as="right">
          <SectionHeading kicker="Contact us" title="Let's talk about your next collection" />

          <div className="type-body mt-7 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-green" strokeWidth={2} />
              <span>{headOffice?.address}</span>
            </div>
            {headOffice?.phone && (
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-green" strokeWidth={2} />
                <span>{headOffice.phone}</span>
              </div>
            )}
            {headOffice?.email && (
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-green" strokeWidth={2} />
                <a href={`mailto:${headOffice.email}`} className="transition-colors duration-300 hover:text-blue">
                  {headOffice.email}
                </a>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal as="up" delay={0.1}>
          <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={FIELD_LABEL}>
                Full name <span className="text-green">*</span>
              </label>
              <input id="name" name="name" type="text" value={values.name} onChange={update}
                aria-invalid={Boolean(errors.name)} className={FIELD} />
              {errors.name && <p className={FIELD_ERROR}>{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className={FIELD_LABEL}>Company</label>
              <input id="company" name="company" type="text" value={values.company} onChange={update} className={FIELD} />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="email" className={FIELD_LABEL}>
                Email <span className="text-green">*</span>
              </label>
              <input id="email" name="email" type="email" value={values.email} onChange={update}
                aria-invalid={Boolean(errors.email)} className={FIELD} />
              {errors.email && <p className={FIELD_ERROR}>{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="message" className={FIELD_LABEL}>
                Message <span className="text-green">*</span>
              </label>
              <textarea id="message" name="message" rows={5} value={values.message} onChange={update}
                aria-invalid={Boolean(errors.message)} className={`${FIELD} resize-none`} />
              {errors.message && <p className={FIELD_ERROR}>{errors.message}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
              <Button as="button" type="submit" variant="green">
                Send message
                <Send size={14} strokeWidth={2} />
              </Button>
              {sent && <p role="status" className="type-small">Opening your email application…</p>}
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}