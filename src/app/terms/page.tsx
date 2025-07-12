
"use client";

import { FileText } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { useState, useEffect } from 'react';

export default function TermsOfServicePage() {
  const [formattedDate, setFormattedDate] = useState('');
  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted) {
      setFormattedDate(new Date().toLocaleDateString());
    }
  }, [isMounted]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                <FileText className="w-12 h-12" />
            </div>
          <h1 className="text-4xl font-bold font-headline">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: {isMounted ? formattedDate : '...'}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground/80">
          <p>
            Welcome to Fix My City! These terms and conditions outline the rules and regulations for the use of our application. By accessing this app, we assume you accept these terms and conditions. Do not continue to use Fix My City if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-headline font-semibold pt-4 border-t">1. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
          </p>

          <h2 className="text-2xl font-headline font-semibold pt-4 border-t">2. User Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
          </p>
          <p>
            By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
          </p>

          <h2 className="text-2xl font-headline font-semibold pt-4 border-t">3. Prohibited Uses</h2>
          <p>
            You may use the Service only for lawful purposes and in accordance with the Terms. You agree not to use the Service in any way that violates any applicable national or international law or regulation.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
          </ul>

          <h2 className="text-2xl font-headline font-semibold pt-4 border-t">4. Changes to Service</h2>
          <p>
            We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
          </p>

          <h2 className="text-2xl font-headline font-semibold pt-4 border-t">5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@fixmycity.example.
          </p>
        </div>
      </div>
    </div>
  );
}
