import React, { useState } from "react";
import { BasicCard } from "@/components/dashboard/Cards";
import { FormInput, ToggleSwitch } from "@/components/dashboard/FormComponents";
import { Tabs } from "@/components/dashboard/Overlays";
import { Accordion } from "@/components/dashboard/Overlays";
import { UserProfileCard, AlertBanner } from "@/components/dashboard/UIComponents";
import { Modal } from "@/components/dashboard/Overlays";

const SettingsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true, marketing: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs tabs={[
            {
              label: "Profile",
              content: (
                <BasicCard>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormInput label="First Name" defaultValue="John" />
                      <FormInput label="Last Name" defaultValue="Doe" />
                    </div>
                    <FormInput label="Email" type="email" defaultValue="john@example.com" />
                    <FormInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                    <div className="flex justify-end gap-3 pt-2">
                      <button className="rounded-xl border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
                      <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Save Changes</button>
                    </div>
                  </div>
                </BasicCard>
              )
            },
            {
              label: "Notifications",
              content: (
                <BasicCard>
                  <div className="space-y-4">
                    <ToggleSwitch label="Email notifications" description="Receive email updates" checked={notifications.email} onChange={v => setNotifications(p => ({ ...p, email: v }))} />
                    <ToggleSwitch label="Push notifications" description="Browser push alerts" checked={notifications.push} onChange={v => setNotifications(p => ({ ...p, push: v }))} />
                    <ToggleSwitch label="Weekly digest" description="Summary every Monday" checked={notifications.weekly} onChange={v => setNotifications(p => ({ ...p, weekly: v }))} />
                    <ToggleSwitch label="Marketing emails" description="Product updates & offers" checked={notifications.marketing} onChange={v => setNotifications(p => ({ ...p, marketing: v }))} />
                  </div>
                </BasicCard>
              )
            },
            {
              label: "Security",
              content: (
                <BasicCard>
                  <div className="space-y-4">
                    <FormInput label="Current Password" type="password" placeholder="••••••••" />
                    <FormInput label="New Password" type="password" placeholder="••••••••" />
                    <FormInput label="Confirm Password" type="password" placeholder="••••••••" />
                    <div className="flex justify-between items-center pt-2">
                      <button onClick={() => setConfirmModal(true)} className="text-sm text-destructive hover:underline">Delete Account</button>
                      <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Update Password</button>
                    </div>
                  </div>
                </BasicCard>
              )
            },
          ]} />

          {/* FAQ Accordion */}
          <BasicCard title="Frequently Asked Questions">
            <Accordion items={[
              { title: "How do I change my email?", content: "Go to Profile settings and update your email address. You'll receive a confirmation email." },
              { title: "Can I export my data?", content: "Yes, you can export all your data from the Privacy section in Settings." },
              { title: "How do I enable two-factor authentication?", content: "Navigate to Security settings and click 'Enable 2FA'. You'll need an authenticator app." },
              { title: "What happens when I delete my account?", content: "All your data will be permanently removed within 30 days. This action cannot be undone." },
            ]} />
          </BasicCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <UserProfileCard
            name="John Doe"
            email="john@example.com"
            role="Administrator"
            stats={[
              { label: "Projects", value: "12" },
              { label: "Tasks", value: "64" },
              { label: "Reports", value: "8" },
            ]}
          />

          <BasicCard title="Quick Actions">
            <div className="space-y-2">
              <button onClick={() => setModalOpen(true)} className="w-full rounded-xl border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors text-left">
                Edit Profile Photo
              </button>
              <button className="w-full rounded-xl border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors text-left">
                Download Data
              </button>
              <button className="w-full rounded-xl border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors text-left">
                API Keys
              </button>
            </div>
          </BasicCard>

          <AlertBanner type="warning" title="Plan expiring soon" description="Your Pro plan expires in 7 days. Renew to keep access." />
        </div>
      </div>

      {/* Basic Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit Profile Photo" footer={
        <>
          <button onClick={() => setModalOpen(false)} className="rounded-xl border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={() => setModalOpen(false)} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Upload</button>
        </>
      }>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">JD</div>
          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)} title="Delete Account" size="sm" footer={
        <>
          <button onClick={() => setConfirmModal(false)} className="rounded-xl border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={() => setConfirmModal(false)} className="rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors">Delete</button>
        </>
      }>
        <p className="text-sm text-muted-foreground">Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data will be lost.</p>
      </Modal>
    </div>
  );
};

export default SettingsPage;
