// utils/helpers/articleContentGenerator.ts

/**
 * Generates generic article content based on the article title and category
 * This function returns HTML content that can be used with dangerouslySetInnerHTML
 */
export const generateArticleContent = (
  articleTitle: string,
  categoryId: string,
  categoryName: string
): string => {
  // Create paragraph content specific to the category
  const categorySpecificContent = getCategorySpecificContent(
    categoryId,
    articleTitle
  );

  // Generate appropriate steps based on the category
  const steps = getStepsByCategory(categoryId, articleTitle);

  // Generate appropriate tips based on the category
  const tips = getTipsByCategory(categoryId, articleTitle);

  // Generate FAQ content
  const faqContent = getFaqContent(categoryId, articleTitle);

  return `
      <h2>How to ${articleTitle}</h2>
      <p>
        Welcome to our guide on "${articleTitle}". Below, you'll find everything you need to know about this topic
        in the ${categoryName.toLowerCase()} category.
      </p>
      
      ${categorySpecificContent}
      
      <h3>Getting Started</h3>
      <p>
        Follow these steps to ${articleTitle.toLowerCase()}:
      </p>
      <ol>
        ${steps}
      </ol>
      
      <div class="bg-blue-50 p-4 rounded-lg my-6">
        <h4 class="font-medium text-blue-800">Pro Tip</h4>
        <p class="text-blue-700 mb-0">
          ${tips}
        </p>
      </div>
      
      <h3>Common Questions</h3>
      ${faqContent}
      
      <h3>Additional Information</h3>
      <p>
        When using ${articleTitle.toLowerCase()} features, keep these important points in mind:
      </p>
      <ul>
        <li>All actions are secured with end-to-end encryption for your safety</li>
        <li>You'll receive email confirmation for important changes</li>
        <li>Our customer support team is available 24/7 if you need assistance</li>
        <li>Most processes complete instantly, but some may take up to 24 hours</li>
      </ul>
    `;
};

/**
 * Returns category-specific introductory content
 */
const getCategorySpecificContent = (
  categoryId: string,
  articleTitle: string
): string => {
  switch (categoryId) {
    case "shipping":
      return `
          <p>
            Shipping and delivery are essential parts of your shopping experience. This guide will help you
            understand how to ${articleTitle.toLowerCase()} and make the most of our shipping services.
          </p>
          <p>
            FlarePoT partners with top carriers to ensure your packages arrive safely and on time.
            We offer various shipping speeds and have detailed tracking capabilities so you're always informed.
          </p>
        `;

    case "returns":
      return `
          <p>
            We want you to be completely satisfied with your purchase. Our return process is designed
            to be simple and hassle-free.
          </p>
          <p>
            FlarePoT offers a 30-day return window for most items. This guide will walk you through
            how to ${articleTitle.toLowerCase()} properly and what to expect during the process.
          </p>
        `;

    case "account":
      return `
          <p>
            Managing your account settings ensures your FlarePoT experience is personalized and secure.
            Learning how to ${articleTitle.toLowerCase()} is an important part of account management.
          </p>
          <p>
            Your account security is our priority. We use advanced encryption and offer various tools
            to help you keep your information safe while enjoying a seamless shopping experience.
          </p>
        `;

    case "payment":
      return `
          <p>
            Understanding payment options and processes is crucial for a smooth checkout experience.
            This guide explains how to ${articleTitle.toLowerCase()} when shopping with FlarePoT.
          </p>
          <p>
            We offer multiple secure payment methods and ensure all transactions are protected with
            industry-leading security measures.
          </p>
        `;

    case "security":
      return `
          <p>
            Your security and privacy are our top priorities at FlarePoT. This guide will help you
            understand how to ${articleTitle.toLowerCase()} to enhance your account protection.
          </p>
          <p>
            We invest in advanced security technologies and follow best practices to safeguard your
            personal information and provide you with tools to manage your privacy preferences.
          </p>
        `;

    case "products":
      return `
          <p>
            Finding the right product information helps you make informed purchasing decisions.
            This guide explains how to ${articleTitle.toLowerCase()} when shopping on FlarePoT.
          </p>
          <p>
            All products in our catalog undergo thorough verification to ensure accurate descriptions,
            specifications, and compatibility information.
          </p>
        `;

    default:
      return `
          <p>
            This guide provides detailed information about how to ${articleTitle.toLowerCase()},
            which is an important aspect of your FlarePoT experience.
          </p>
          <p>
            We strive to make all our processes intuitive and user-friendly while providing
            comprehensive support resources.
          </p>
        `;
  }
};

/**
 * Returns appropriate steps based on the category and article title
 */
const getStepsByCategory = (
  categoryId: string,
  articleTitle: string
): string => {
  switch (categoryId) {
    case "shipping":
      return `
          <li>Log into your FlarePoT account</li>
          <li>Navigate to "Your Orders" in your account dashboard</li>
          <li>Find the order you're interested in</li>
          <li>Click on "Track Package" or "Shipping Details"</li>
          <li>Review the shipping information and tracking updates</li>
        `;

    case "returns":
      return `
          <li>Log into your FlarePoT account</li>
          <li>Go to "Your Orders"</li>
          <li>Find the item you want to return</li>
          <li>Click "Return or Replace Items"</li>
          <li>Select your reason for return and preferred return method</li>
          <li>Print the return label (if applicable)</li>
          <li>Package the item securely with all original materials</li>
        `;

    case "account":
      return `
          <li>Log into your FlarePoT account</li>
          <li>Click on "Account Settings" or "Your Account"</li>
          <li>Select the appropriate section for what you want to update</li>
          <li>Make your desired changes</li>
          <li>Save your new settings</li>
          <li>Verify the changes have been applied correctly</li>
        `;

    case "payment":
      return `
          <li>Log into your FlarePoT account</li>
          <li>Navigate to "Payment Methods" under "Your Account"</li>
          <li>Select the option to add, edit, or manage payment information</li>
          <li>Follow the secure form instructions</li>
          <li>Confirm your changes with any required verification</li>
        `;

    case "security":
      return `
          <li>Log into your FlarePoT account</li>
          <li>Go to "Account Settings" then "Security & Privacy"</li>
          <li>Select the security feature you want to configure</li>
          <li>Follow the step-by-step instructions on screen</li>
          <li>Complete any verification steps required</li>
          <li>Confirm your new security settings are active</li>
        `;

    case "products":
      return `
          <li>Browse to the product you're interested in</li>
          <li>Scroll down to the detailed product information section</li>
          <li>Review specifications, compatibility, and other details</li>
          <li>Check the Q&A section for additional information</li>
          <li>Read customer reviews for real-world experiences</li>
        `;

    default:
      return `
          <li>Log into your FlarePoT account</li>
          <li>Navigate to the relevant section in your dashboard</li>
          <li>Look for the option related to ${articleTitle.toLowerCase()}</li>
          <li>Follow the on-screen instructions</li>
          <li>Confirm your actions when prompted</li>
        `;
  }
};

/**
 * Returns appropriate tips based on the category and article title
 */
const getTipsByCategory = (
  categoryId: string,
  articleTitle: string
): string => {
  switch (categoryId) {
    case "shipping":
      return `
          Enable shipping notifications in your account settings to receive real-time updates via text or email. 
          You can also add delivery instructions for the carrier in your address settings.
        `;

    case "returns":
      return `
          Take photos of items before returning them as proof of condition. If you're returning multiple orders,
          use separate return labels for each order to avoid processing delays.
        `;

    case "account":
      return `
          Review your account settings every few months to ensure all information is current. 
          Consider using a password manager to maintain strong, unique passwords for your account.
        `;

    case "payment":
      return `
          Set up at least two payment methods for backup in case one method fails during checkout.
          Check for special financing options or rewards when using our store credit card.
        `;

    case "security":
      return `
          Enable two-factor authentication for an extra layer of security. Regularly check your order history
          to ensure there's no unauthorized activity on your account.
        `;

    case "products":
      return `
          Use the comparison feature when shopping for similar products to easily see differences in specifications.
          Check the "Frequently bought together" section for recommended accessories.
        `;

    default:
      return `
          You can access most features directly from your account dashboard for quicker navigation.
          Our mobile app offers additional features and notifications not available on the website.
        `;
  }
};

/**
 * Returns FAQ content based on the category and article title
 */
const getFaqContent = (categoryId: string, articleTitle: string): string => {
  return `
      <div class="mb-4">
        <h4 class="font-medium">What if I encounter an error?</h4>
        <p>
          If you encounter an error while trying to ${articleTitle.toLowerCase()}, try these troubleshooting steps:
        </p>
        <ul>
          <li>Refresh your browser or app</li>
          <li>Make sure you're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
          <li>Clear your browser cache and cookies</li>
          <li>Try again in a few minutes, as the issue might be temporary</li>
        </ul>
        <p>
          If the problem persists, please contact our customer support team and provide them with 
          the error message or screenshot of the issue.
        </p>
      </div>
  
      <div class="mb-4">
        <h4 class="font-medium">Is there a time limit for ${articleTitle.toLowerCase()}?</h4>
        <p>
          Most processes on FlarePoT do not have a time limit, but certain actions like checkout 
          may time out after 30 minutes of inactivity for security reasons. For ${articleTitle.toLowerCase()}, 
          there is typically no strict time limit, but we recommend completing the process in one session 
          for the best experience.
        </p>
      </div>
  
      <div class="mb-4">
        <h4 class="font-medium">Can I ${articleTitle.toLowerCase()} on mobile?</h4>
        <p>
          Yes, all features including ${articleTitle.toLowerCase()} are available on our mobile app 
          and responsive website. The interface may look slightly different on mobile devices, 
          but the functionality remains the same. For the best mobile experience, we recommend 
          downloading our official FlarePoT app from the App Store or Google Play Store.
        </p>
      </div>
  
      ${getCategorySpecificFaq(categoryId, articleTitle)}
    `;
};

/**
 * Returns category-specific FAQ content
 */
const getCategorySpecificFaq = (
  categoryId: string,
  articleTitle: string
): string => {
  switch (categoryId) {
    case "shipping":
      return `
          <div class="mb-4">
            <h4 class="font-medium">What shipping methods do you offer?</h4>
            <p>
              We offer several shipping methods including Standard (3-5 business days), Expedited (2-3 business days), 
              and Express (1 business day). Available shipping methods may vary based on your location and the items 
              in your order.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Do you ship internationally?</h4>
            <p>
              Yes, we ship to over 100 countries worldwide. International shipping times and costs vary by location. 
              You can see available shipping options during checkout after entering your address.
            </p>
          </div>
        `;

    case "returns":
      return `
          <div class="mb-4">
            <h4 class="font-medium">How long do refunds take to process?</h4>
            <p>
              After we receive your return, refunds typically take 3-5 business days to process. The time it takes 
              for the refund to appear in your account depends on your payment method and financial institution, 
              usually 5-10 business days.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Can I exchange instead of return?</h4>
            <p>
              Yes, you can exchange eligible items for a different size, color, or model. Start the return process 
              and select "Exchange" instead of "Return" when prompted for your preference.
            </p>
          </div>
        `;

    case "account":
      return `
          <div class="mb-4">
            <h4 class="font-medium">How do I reset my password?</h4>
            <p>
              To reset your password, click on "Forgot Password" on the login page. Enter the email associated with 
              your account, and we'll send you a password reset link. For security, this link expires after 24 hours.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Can I have multiple addresses saved?</h4>
            <p>
              Yes, you can save multiple shipping and billing addresses in your account. This makes checkout faster 
              for different delivery locations like home, work, or sending gifts.
            </p>
          </div>
        `;

    case "payment":
      return `
          <div class="mb-4">
            <h4 class="font-medium">What payment methods do you accept?</h4>
            <p>
              We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), 
              PayPal, Apple Pay, Google Pay, and our store-branded credit card. Some regions also support 
              buy-now-pay-later options.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Is my payment information secure?</h4>
            <p>
              Yes, all payment information is encrypted using industry-standard SSL/TLS encryption. We are 
              PCI-DSS compliant and never store complete credit card numbers on our servers.
            </p>
          </div>
        `;

    case "security":
      return `
          <div class="mb-4">
            <h4 class="font-medium">What is two-factor authentication?</h4>
            <p>
              Two-factor authentication (2FA) adds an extra layer of security by requiring both your password 
              and a temporary code sent to your mobile device when logging in. This prevents unauthorized access 
              even if your password is compromised.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">How do I report suspicious activity?</h4>
            <p>
              If you notice unauthorized orders or suspicious emails claiming to be from FlarePoT, 
              immediately contact our security team at security@flarepot.com or through the "Report Suspicious Activity" 
              form in your account settings.
            </p>
          </div>
        `;

    case "products":
      return `
          <div class="mb-4">
            <h4 class="font-medium">How do I check product compatibility?</h4>
            <p>
              Many product pages include a compatibility checker tool. Enter your device or model information 
              to verify compatibility. You can also check the "Technical Specifications" tab for detailed 
              compatibility information.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Are user reviews verified?</h4>
            <p>
              Yes, reviews marked "Verified Purchase" are from customers who bought the product from our store. 
              We have a review verification system to ensure authentic feedback, though we don't edit or remove 
              reviews based on rating.
            </p>
          </div>
        `;

    default:
      return `
          <div class="mb-4">
            <h4 class="font-medium">Where can I get more help?</h4>
            <p>
              If you need additional assistance, our customer support team is available 24/7 via chat, 
              email, or phone. You can also check our community forums where other customers may have 
              encountered and solved similar issues.
            </p>
          </div>
          <div class="mb-4">
            <h4 class="font-medium">Are there video tutorials available?</h4>
            <p>
              Yes, we offer video tutorials for most common processes on our YouTube channel and in the 
              Help Center. These visual guides can make it easier to follow complex procedures.
            </p>
          </div>
        `;
  }
};
