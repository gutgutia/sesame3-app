export const metadata = {
  title: "Terms of Service — Sesame3",
  description: "Terms and conditions for using Sesame3.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-['Satoshi'] text-4xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-[var(--text-muted)] mb-12">
            Last updated: December 28, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Welcome to Sesame3
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                These Terms of Service (&quot;Terms&quot;) govern your use of Sesame3 (&quot;Service&quot;),
                an AI-powered college counseling platform operated by Sesame3 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                By using our Service, you agree to these Terms. If you don&apos;t agree, please don&apos;t use the Service.
              </p>
            </section>

            {/* Nature of Service */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Nature of Our Service
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Sesame3 is an AI-powered tool designed to help students navigate the college application process.
                Our Service provides:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2 mb-4">
                <li>AI-powered guidance and advice on college applications</li>
                <li>Estimated admission chances based on publicly available data</li>
                <li>School recommendations and list building tools</li>
                <li>Task management and timeline planning</li>
                <li>Essay feedback and review assistance</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                <p className="text-amber-900 font-medium mb-2">Important:</p>
                <p className="text-amber-800">
                  Sesame3 is an informational and organizational tool. We are <strong>not</strong> a licensed
                  educational consultant, college counselor, or admissions professional. Our AI advisor
                  provides guidance based on patterns and publicly available information — it is not a
                  substitute for professional advice.
                </p>
              </div>
            </section>

            {/* No Guarantees */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                No Guarantees of Admission Outcomes
              </h2>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
                <p className="text-[var(--text-main)] leading-relaxed mb-4">
                  <strong>Our chance estimates are directional guidance only.</strong> They are based on
                  historical data, publicly available admission statistics, and general patterns. They are
                  <strong> not predictions, guarantees, or promises</strong> of admission to any college or university.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  College admissions decisions are made by individual institutions based on their own criteria,
                  which may include factors we cannot assess (institutional priorities, holistic review,
                  demonstrated interest, etc.). Many qualified applicants are not admitted to highly
                  selective schools due to factors beyond grades and test scores.
                </p>
                <p className="text-[var(--text-main)] font-medium">
                  You acknowledge that: (a) our estimates may differ significantly from actual outcomes;
                  (b) we make no guarantee about admission to any school; and (c) you should not rely solely
                  on our estimates when making important educational decisions.
                </p>
              </div>
            </section>

            {/* AI Limitations */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                AI Advisor Limitations
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Our AI advisor is powered by large language models and is designed to be helpful, but it has limitations:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Not always accurate:</strong> AI can make mistakes, provide outdated information, or give advice that doesn&apos;t fit your specific situation.</li>
                <li><strong className="text-[var(--text-main)]">Not professional advice:</strong> Our AI is not a licensed counselor, therapist, lawyer, or financial advisor. For professional advice, consult a qualified professional.</li>
                <li><strong className="text-[var(--text-main)]">Verify important information:</strong> Always verify critical information (deadlines, requirements, policies) with official sources such as college websites and admissions offices.</li>
                <li><strong className="text-[var(--text-main)]">No emergency support:</strong> If you&apos;re experiencing a mental health crisis, please contact a crisis helpline or emergency services.</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Limitation of Liability
              </h2>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
                <p className="text-[var(--text-main)] leading-relaxed mb-4">
                  <strong>To the maximum extent permitted by law, Sesame3, its officers, directors, employees,
                  and affiliates shall not be liable for:</strong>
                </p>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2 mb-4">
                  <li>Any admission decisions or outcomes at any educational institution</li>
                  <li>Any reliance on advice, recommendations, or estimates provided by the AI advisor</li>
                  <li>Any actions you take or don&apos;t take based on information from our Service</li>
                  <li>Missed deadlines, incorrect information, or any errors in the Service</li>
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of data, opportunities, or any other losses related to your use of the Service</li>
                </ul>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Our total liability for any claims arising from your use of the Service is limited to
                  the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Your Responsibilities
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                When using Sesame3, you agree to:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li><strong className="text-[var(--text-main)]">Provide accurate information:</strong> Your profile and academic information should be truthful and accurate.</li>
                <li><strong className="text-[var(--text-main)]">Submit your own work:</strong> Essays and content you submit for review should be your own original work.</li>
                <li><strong className="text-[var(--text-main)]">Verify critical information:</strong> Double-check important dates, requirements, and policies with official sources.</li>
                <li><strong className="text-[var(--text-main)]">Use the Service lawfully:</strong> Don&apos;t use our Service for any illegal or unauthorized purpose.</li>
                <li><strong className="text-[var(--text-main)]">Keep your account secure:</strong> You&apos;re responsible for maintaining the security of your account credentials.</li>
              </ul>
            </section>

            {/* Account Terms */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Account Terms
              </h2>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li>You must be at least 13 years old to use Sesame3.</li>
                <li>If you&apos;re under 18, we encourage parental awareness of your use.</li>
                <li>You may only maintain one account per person.</li>
                <li>You&apos;re responsible for all activity that occurs under your account.</li>
                <li>We may suspend or terminate accounts that violate these Terms.</li>
              </ul>
            </section>

            {/* Payments */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Payments and Subscriptions
              </h2>
              <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                <li>Free features are available without payment. Premium features require a subscription.</li>
                <li>Subscriptions renew automatically unless canceled before the renewal date.</li>
                <li>You can cancel your subscription at any time; access continues until the end of the billing period.</li>
                <li>Refunds are provided at our discretion. Contact support for refund requests.</li>
                <li>Prices may change with notice; changes apply to future billing cycles only.</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Questions about these Terms? Contact us at{" "}
                <a href="mailto:legal@sesame3.com" className="text-[var(--accent-primary)] hover:underline">
                  legal@sesame3.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
