
"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import type { CountryData } from "react-phone-input-2";
import Link from "next/link";
import { addForm, getVisitorAPIInfo, getCountryCode } from "../utils/utils";
import "../phone.css";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  note: string;
  formName: string;
};

type PhoneMetadata = {
  dialCode?: string;
  countryCode?: string;
  name?: string;
  format?: string;
};

type FormCompProps = {
  formName: string;
  setLoad: (loading: boolean) => void;
};

type LinkButtonProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};

export default function FormComp({ formName, setLoad }: FormCompProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    note: "",
    formName,
  });
  const [countryCodeISO, setCountryCodeISO] = useState("");
  const [inputCountry, setInputCountry] = useState("us");
  const [phoneData, setPhoneData] = useState<PhoneMetadata>();
  const [visitorInfo, setVisitorInfo] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    let active = true;

    getVisitorAPIInfo()
      .then((data) => {
        if (!active) return;

        const country = data?.countryCode?.toUpperCase() || "US";

        setInputCountry(country.toLowerCase());
        setCountryCodeISO(country);
        setVisitorInfo(data?.notes || "");
      })
      .catch(() => {
        if (active) setInputCountry("us");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const country = getCountryCode(countryCodeISO);

    if (!country || !country.code || !country.dial_code) return;

    setInputCountry(country.code.toLowerCase());
    setPhoneData((previous) => ({
      ...previous,
      dialCode: country.dial_code.replace("+", ""),
      countryCode: country.code.toLowerCase(),
    }));
  }, [countryCodeISO]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string, data: CountryData) => {
    setFormData((previous) => ({
      ...previous,
      phone: value,
    }));

    setPhoneData({
      dialCode: data.dialCode,
      countryCode: data.countryCode,
      name: data.name,
      format: data.format,
    });

    setCountryCodeISO(data.countryCode.toUpperCase());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = [formData.note.trim(), visitorInfo.trim()]
      .filter(Boolean)
      .join(" ");

    const payload = {
      note,
      name: formData.name,
      email: formData.email,
      mobile: formData.phone ? `+${formData.phone}` : "",
      phoneData,
      message: formData.message,
      countryCodeISO,
    };

    setLoad(true);
    setSuccessMsg(false);

    try {
      const result = await addForm(payload);

      if (result?.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          note: "",
          formName,
        });
        setSuccessMsg(true);
      }
    } catch (error) {
      console.error("Error while submitting form", error);
    } finally {
      setLoad(false);
    }
  };

  const fieldId = (field: string) => `${formName}-${field}`;

  return (
    <div className="wellness-form w-full min-w-0">
      {successMsg && (
        <div
          role="status"
          className="wellness-form-success mb-5 rounded-xl px-4 py-3 text-small"
        >
          Your message has been submitted successfully. We’ll be in touch soon.
        </div>
      )}

      <form
        id={formName}
        name={formName}
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-col items-stretch gap-4"
      >
        <div className="wellness-form-group">
          <label className="wellness-form-label" htmlFor={fieldId("name")}>
            Full name
          </label>
          <input
            id={fieldId("name")}
            className="wellness-form-field"
            placeholder="Enter your full name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            required
            value={formData.name}
          />
        </div>

        <div className="wellness-form-group">
          <label className="wellness-form-label" htmlFor={fieldId("email")}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            className="wellness-form-field"
            type="email"
            placeholder="Enter your email address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            required
            value={formData.email}
          />
        </div>

        <div className="wellness-form-group">
          <label className="wellness-form-label" htmlFor={fieldId("phone")}>
            Phone number
          </label>
          <div className="wellness-phone-field w-full min-w-0">
            <PhoneInput
              country={inputCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              countryCodeEditable
              autoFormat={false}
              enableSearch
              preferredCountries={["eg", "ae", "gb", "de", "us"]}
              containerClass="wellness-phone-container"
              inputClass="wellness-phone-input"
              buttonClass="wellness-phone-button"
              dropdownClass="wellness-phone-dropdown"
              inputProps={{
                id: fieldId("phone"),
                name: "phone",
                autoComplete: "tel",
                required: true,
                maxLength: 20,
              }}
              inputStyle={{
                width: "100%",
                height: "3.5rem",
                paddingLeft: "3.5rem",
                paddingRight: "0.875rem",
                borderRadius: "0.75rem",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              buttonStyle={{
                width: "2.75rem",
                borderRadius: "0.75rem 0 0 0.75rem",
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
              }}
              dropdownStyle={{
                background: "var(--surface-elevated)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>

        <div className="wellness-form-group">
          <label className="wellness-form-label" htmlFor={fieldId("message")}>
            Message
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            placeholder="Tell us how we can help"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="wellness-form-field wellness-form-message"
          />
        </div>

        <button
          id={`${formName}-submit`}
          type="submit"
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export function LinkButtonComp({
  href,
  className,
  children,
}: LinkButtonProps) {
  const searchParams = useSearchParams();
  const initialParams = new URLSearchParams(
    (href || "").replace(/^\/?\?/, ""),
  );

  searchParams.forEach((value, key) => {
    if (!initialParams.has(key)) {
      initialParams.append(key, value);
    }
  });

  const query = initialParams.toString();
  const destination = query ? `?${query}` : "?";

  return (
    <Link
      scroll={false}
      href={destination}
      className={className}
      style={{ textDecoration: "none" }}
    >
      {children}
    </Link>
  );
}