export const metadata = {
  title: "Privacy Policy — Sesame3",
  description: "How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-['Satoshi'] text-4xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--text-muted)] mb-12">
            Last updated: December 28, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Our Commitment to Your Privacy
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Sesame3 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is built on a simple principle:
                <strong className="text-[var(--text-main)]"> your data belongs to you</strong>. We collect
                information to provide you with personalized college guidance, not to sell to advertisers
                or third parties. This policy explains what we collect, how we use it, and how we protect it.
              </p>
            </section>

            {/* What We Collect */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Information We Collect
              </h2>

              <h3 className="font-['Satoshi'] text-lg font-semibold mb-2 mt-6">
                Information You Provide
              </h3>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Account information:</strong> Email address, name, and password when you create an account.</li>
                <li><strong className="text-[var(--text-main)]">Profile information:</strong> Academic records (GPA, test scores, courses), extracurricular activities, achievements, and personal interests you share with us.</li>
                <li><strong className="text-[var(--text-main)]">Conversations:</strong> Messages you exchange with our AI advisor, including questions, essays, and personal reflections.</li>
                <li><strong className="text-[var(--text-main)]">College preferences:</strong> Schools you&apos;re interested in, application status, and decision outcomes you choose to share.</li>
              </ul>

              <h3 className="font-['Satoshi'] text-lg font-semibold mb-2 mt-6">
                Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Usage data:</strong> How you interact with our service, features you use, and time spent.</li>
                <li><strong className="text-[var(--text-main)]">Device information:</strong> Browser type, operating system, and device identifiers.</li>
                <li><strong className="text-[var(--text-main)]">Log data:</strong> IP address, access times, and referring URLs.</li>
              </ul>
            </section>

            {/* How We Use It */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Personalized guidance:</strong> To provide tailored college counseling, chance estimates, and recommendations based on your unique profile.</li>
                <li><strong className="text-[var(--text-main)]">AI conversations:</strong> To power our AI advisor with context about you so it can give relevant, personalized responses.</li>
                <li><strong className="text-[var(--text-main)]">Service improvement:</strong> To understand how users interact with our platform and improve the experience.</li>
                <li><strong className="text-[var(--text-main)]">Communications:</strong> To send important updates about your account or our service (you can opt out of marketing emails).</li>
              </ul>
            </section>

            {/* What We Don't Do */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                What We Never Do
              </h2>
              <div className="bg-[var(--accent-surface)] border border-[var(--accent-border)] rounded-xl p-6">
                <ul className="space-y-3 text-[var(--text-main)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent-primary)] font-bold">✗</span>
                    <span><strong>Sell your data.</strong> We do not sell, rent, or trade your personal information to any third party.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent-primary)] font-bold">✗</span>
                    <span><strong>Share with colleges.</strong> We never share your profile, essays, or conversations with colleges or admissions offices.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent-primary)] font-bold">✗</span>
                    <span><strong>Show targeted ads.</strong> We don&apos;t use your data for advertising or share it with ad networks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent-primary)] font-bold">✗</span>
                    <span><strong>Train public AI models.</strong> Your conversations and essays are not used to train general-purpose AI models.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                When We May Share Information
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                We share your information only in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">With your consent:</strong> When you explicitly choose to share access with parents, counselors, or others.</li>
                <li><strong className="text-[var(--text-main)]">Service providers:</strong> With trusted vendors who help us operate (e.g., hosting, analytics) under strict confidentiality agreements.</li>
                <li><strong className="text-[var(--text-main)]">Legal requirements:</strong> If required by law, court order, or to protect the safety of users or the public.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                How We Protect Your Data
              </h2>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li>All data is encrypted in transit (TLS) and at rest (AES-256).</li>
                <li>We use secure, reputable cloud infrastructure with industry-standard protections.</li>
                <li>Access to user data is strictly limited to authorized personnel.</li>
                <li>We regularly review and update our security practices.</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Your Rights and Choices
              </h2>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Access:</strong> You can view all data we have about you in your profile settings.</li>
                <li><strong className="text-[var(--text-main)]">Export:</strong> You can export your data at any time.</li>
                <li><strong className="text-[var(--text-main)]">Delete:</strong> You can delete your account and all associated data. This action is permanent.</li>
                <li><strong className="text-[var(--text-main)]">Correct:</strong> You can update any information in your profile at any time.</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Students Under 18
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Many of our users are high school students under 18. We take extra care to protect minors&apos;
                privacy. We encourage students under 18 to use Sesame3 with parental awareness. Parents or
                guardians may request access to their child&apos;s data or request deletion by contacting us
                at <a href="mailto:privacy@sesame3.com" className="text-[var(--accent-primary)] hover:underline">privacy@sesame3.com</a>.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Changes to This Policy
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                We may update this policy from time to time. We&apos;ll notify you of significant changes
                via email or a notice on our website. Your continued use of Sesame3 after changes means
                you accept the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Questions about this policy or your data? Contact us at{" "}
                <a href="mailto:privacy@sesame3.com" className="text-[var(--accent-primary)] hover:underline">
                  privacy@sesame3.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
