export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0030] to-[#120040] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-300">
          At ShowcaseHQ, we respect your privacy. This Privacy Policy explains how
          we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4 text-gray-300">
          When you join our waitlist, we collect your email address to keep you
          updated about early access and product announcements.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>To notify you when ShowcaseHQ becomes available</li>
          <li>To share product updates and marketing communications</li>
          <li>To improve our services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Sharing of Information</h2>
        <p className="mb-4 text-gray-300">
          We do not sell or rent your personal data. We may share it with
          service providers who help us operate our website and emails.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
        <p className="mb-4 text-gray-300">
          You can unsubscribe from our emails at any time by clicking the link
          at the bottom of our messages.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p className="text-gray-300">
          If you have questions about this Privacy Policy, contact us at:{" "}
          <a href="mailto:hello@showcasehq.co.uk" className="text-pink-400">
            hello@showcasehq.com
          </a>
        </p>
      </div>
    </main>
  );

}


