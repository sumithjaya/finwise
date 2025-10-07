"use client";

import { useMemo, useState } from "react";
import styles from "./joinin.module.css";
import Image from "next/image";
import { HiPlay } from "react-icons/hi";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  goal: string;
  risk: "low" | "medium" | "high" | "";
  income: string;
  country: string;
  terms: boolean;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  goal: "",
  risk: "",
  income: "",
  country: "",
  terms: false,
};

const TOTAL_STEPS = 5;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
 

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function markTouched(keys: (keyof FormData)[]) {
    setTouched((t) => {
      const next = { ...t };
      keys.forEach((k) => (next[k as string] = true));
      return next;
    });
  }

  // --- Validation per step ---
  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormData, string>> = {};

    // Basic helpers
    const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

    if (step === 1) {
      if (!data.fullName.trim()) e.fullName = "Full name is required";
      if (!data.email.trim()) e.email = "Email is required";
      else if (!isEmail(data.email)) e.email = "Enter a valid email";
    }

    if (step === 2) {
      if (!data.phone.trim()) e.phone = "Phone is required";
      if (!data.goal.trim()) e.goal = "Please describe your goal";
    }

    if (step === 3) {
      if (!data.risk) e.risk = "Select a risk preference";
      if (!data.income.trim()) e.income = "Income is required";
    }

    if (step === 4) {
      if (!data.country.trim()) e.country = "Country is required";
    }

    if (step === 5) {
      if (!data.terms) e.terms = "You must accept terms to continue";
    }

    return e;
  }, [data, step]);

  function canNext() {
    return Object.keys(errors).length === 0;
  }

  function onNext() {
    // touch current step fields to show errors immediately
    if (step === 1) markTouched(["fullName", "email"]);
    if (step === 2) markTouched(["phone", "goal"]);
    if (step === 3) markTouched(["risk", "income"]);
    if (step === 4) markTouched(["country"]);
    if (step === 5) markTouched(["terms"]);

    if (!canNext()) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }

  function onBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function onSubmit() {
    markTouched([
      "fullName",
      "email",
      "phone",
      "goal",
      "risk",
      "income",
      "country",
      "terms",
    ]);
    if (!canNext()) return;

    // TODO: Replace with your API endpoint
    console.log("Submitting data", data);
    // await fetch("/api/join-in", { method: "POST", body: JSON.stringify(data) });

    alert("Submitted! (Check console for payload)");
  }

  return (
    <div className={`${styles.page} relative`}>
      <div className={styles.leftcard}>
        <div className={styles.leftcard_branding}>FinWise</div>
        <div className={styles.player_container}>
          <div className={styles.image_mask}>
            <Image
              src="/images/joinin.jpg"
              alt="Scale hand illustration"
              width={518}
              height={40}
              priority
            />
          </div>
          <div className={styles.play_btn}>
            <HiPlay />
          </div>
        </div>
        <div>
          <div className={styles.leftcard_text}>
            Let’s Find the{" "}
            <span className={styles.leftcard_text_bold}>Perfect Adviser</span>
          </div>
          <div className={styles.leftcard_text}> for You.</div>
          <div className={styles.leftcard_smltext}>
            Answer a few quick questions and we’ll match you.
          </div>
        </div>
      </div>
      <div className={styles.card}>
        {/* Progress */}
        {/* <div className={styles.progressWrap} aria-label="progress">
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressText}>
            Step {step} of {TOTAL_STEPS} · {progress}%
          </div>
        </div> */}

        {/* Steps */}
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            step === TOTAL_STEPS ? onSubmit() : onNext();
          }}
        >
          {step === 1 && (
            // <div className={styles.grid}>
            //   <FormField
            //     label="Full Name"
            //     error={touched.fullName ? errors.fullName : ""}
            //   >
            //     <input
            //       className={styles.input}
            //       type="text"
            //       value={data.fullName}
            //       onChange={(e) => update("fullName", e.target.value)}
            //       onBlur={() => markTouched(["fullName"])}
            //       placeholder="Jane Doe"
            //     />
            //   </FormField>

            //   <FormField
            //     label="Email"
            //     error={touched.email ? errors.email : ""}
            //   >
            //     <input
            //       className={styles.input}
            //       type="email"
            //       value={data.email}
            //       onChange={(e) => update("email", e.target.value)}
            //       onBlur={() => markTouched(["email"])}
            //       placeholder="jane@example.com"
            //     />
            //   </FormField>
            // </div>
            <div className={styles.form_conatiner}>
              <h2 className={styles.form_step_title}>What are you looking for help with?</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
                <li className={styles.item}>
                  <label className={styles.item}>
                    <input type="checkbox" name="help" className={styles.checkbox} value="retirement" />{" "}
                    Retirement Planning
                  </label>
                </li>
                <li>
                  <label className={styles.item}>
                    <input type="checkbox" name="help" value="tax" /> Tax
                    Strategy
                  </label>
                </li>
                <li>
                  <label className={styles.item}>
                    <input type="checkbox" name="help" value="estate" /> Estate
                    Planning
                  </label>
                </li>
                <li>
                  <label className={styles.item}>
                    <input type="checkbox" name="help" value="other" /> Other
                  </label>
                </li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className={styles.grid}>
              <FormField
                label="Phone"
                error={touched.phone ? errors.phone : ""}
              >
                <input
                  className={styles.input}
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => markTouched(["phone"])}
                  placeholder="+94 7X XXX XXXX"
                />
              </FormField>

              <FormField
                label="Your Primary Goal"
                error={touched.goal ? errors.goal : ""}
              >
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={data.goal}
                  onChange={(e) => update("goal", e.target.value)}
                  onBlur={() => markTouched(["goal"])}
                  placeholder="e.g., Retirement planning, tax optimization, etc."
                />
              </FormField>
            </div>
          )}

          {step === 3 && (
            <div className={styles.grid}>
              <FormField
                label="Risk Preference"
                error={touched.risk ? errors.risk : ""}
              >
                <div className={styles.segment}>
                  {(["low", "medium", "high"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`${styles.segmentBtn} ${
                        data.risk === r ? styles.segmentActive : ""
                      }`}
                      onClick={() => update("risk", r)}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField
                label="Annual Income (USD/LKR)"
                error={touched.income ? errors.income : ""}
              >
                <input
                  className={styles.input}
                  type="text"
                  value={data.income}
                  onChange={(e) => update("income", e.target.value)}
                  onBlur={() => markTouched(["income"])}
                  placeholder="e.g., $24,000"
                />
              </FormField>
            </div>
          )}

          {step === 4 && (
            <div className={styles.grid}>
              <FormField
                label="Country"
                error={touched.country ? errors.country : ""}
              >
                <input
                  className={styles.input}
                  type="text"
                  value={data.country}
                  onChange={(e) => update("country", e.target.value)}
                  onBlur={() => markTouched(["country"])}
                  placeholder="Sri Lanka"
                />
              </FormField>

              <div className={styles.reviewBox}>
                <h3 className={styles.reviewTitle}>Quick Review</h3>
                <ul className={styles.reviewList}>
                  <li>
                    <b>Name:</b> {data.fullName || "—"}
                  </li>
                  <li>
                    <b>Email:</b> {data.email || "—"}
                  </li>
                  <li>
                    <b>Phone:</b> {data.phone || "—"}
                  </li>
                  <li>
                    <b>Goal:</b> {data.goal || "—"}
                  </li>
                  <li>
                    <b>Risk:</b> {data.risk || "—"}
                  </li>
                  <li>
                    <b>Income:</b> {data.income || "—"}
                  </li>
                  <li>
                    <b>Country:</b> {data.country || "—"}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className={styles.gridSingle}>
              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={data.terms}
                  onChange={(e) => update("terms", e.target.checked)}
                  onBlur={() => markTouched(["terms"])}
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className={styles.link}>
                    Terms & Privacy
                  </a>
                  .
                </span>
              </label>
              {touched.terms && errors.terms && (
                <div className={styles.error}>{errors.terms}</div>
              )}
            </div>
          )}

          {/* Footer buttons */}
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={onBack}
              disabled={step === 1}
            >
              Back
            </button>

            {step < TOTAL_STEPS ? (
              <button type="button" className={styles.btn} onClick={onNext}>
                Next
              </button>
            ) : (
              <button type="submit" className={styles.btnPrimary}>
                Submit
              </button>
            )}
          </div>
          <div className={styles.step_indic_container}>
            <div className={styles.step_indictaor_on}></div>
            <div className={styles.step_indictaor_off}></div>
            <div className={styles.step_indictaor_off}></div>
            <div className={styles.step_indictaor_off}></div>
            <div className={styles.step_indictaor_off}></div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}
