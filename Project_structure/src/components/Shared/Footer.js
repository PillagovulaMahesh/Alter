import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Social Media App. All rights reserved.</p>
      <div className="mt-2">
        <a
          href="/terms"
          className="text-blue-400 hover:underline mx-2"
        >
          Terms of Service
        </a>
        <a
          href="/privacy"
          className="text-blue-400 hover:underline mx-2"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
