import React, { useState } from "react";
import { BasicCard } from "@/components/dashboard/Cards";
import { FormInput, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup, ToggleSwitch } from "@/components/dashboard/FormComponents";
import { AlertBanner, ToastNotification } from "@/components/dashboard/UIComponents";

const FormsPage: React.FC = () => {
  const [checkboxes, setCheckboxes] = useState({ terms: false, newsletter: true, notifications: false });
  const [radio, setRadio] = useState("email");
  const [toggles, setToggles] = useState({ emails: true, push: false, sms: false });
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Forms</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete form components with validation states</p>
      </div>

      <AlertBanner type="info" title="Form Components" description="All form components support validation states, labels, and hints." />

      {showToast && (
        <div className="fixed top-20 right-6 z-[70]">
          <ToastNotification type="success" message="Form submitted successfully!" onClose={() => setShowToast(false)} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Text Inputs */}
        <BasicCard title="Text Inputs">
          <div className="space-y-4">
            <FormInput label="Full Name" placeholder="Enter your name" />
            <FormInput label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email" />
            <FormInput label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters" />
            <FormInput label="Website" placeholder="https://example.com" success="Valid URL format" />
            <FormTextarea label="Bio" placeholder="Tell us about yourself..." />
          </div>
        </BasicCard>

        {/* Select & Controls */}
        <BasicCard title="Selection Controls">
          <div className="space-y-6">
            <FormSelect
              label="Role"
              options={[
                { label: "Select a role...", value: "" },
                { label: "Administrator", value: "admin" },
                { label: "Editor", value: "editor" },
                { label: "Viewer", value: "viewer" },
              ]}
            />

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Checkboxes</p>
              <FormCheckbox label="I agree to the terms" checked={checkboxes.terms} onChange={v => setCheckboxes(p => ({ ...p, terms: v }))} />
              <FormCheckbox label="Subscribe to newsletter" checked={checkboxes.newsletter} onChange={v => setCheckboxes(p => ({ ...p, newsletter: v }))} />
              <FormCheckbox label="Enable notifications" checked={checkboxes.notifications} onChange={v => setCheckboxes(p => ({ ...p, notifications: v }))} />
            </div>

            <FormRadioGroup
              label="Preferred Contact"
              value={radio}
              onChange={setRadio}
              options={[
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
                { label: "SMS", value: "sms" },
              ]}
            />

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Toggle Switches</p>
              <ToggleSwitch label="Email notifications" description="Receive updates via email" checked={toggles.emails} onChange={v => setToggles(p => ({ ...p, emails: v }))} />
              <ToggleSwitch label="Push notifications" description="Get push alerts" checked={toggles.push} onChange={v => setToggles(p => ({ ...p, push: v }))} />
              <ToggleSwitch label="SMS alerts" description="Important alerts via SMS" checked={toggles.sms} onChange={v => setToggles(p => ({ ...p, sms: v }))} />
            </div>
          </div>
        </BasicCard>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowToast(true)}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default FormsPage;
