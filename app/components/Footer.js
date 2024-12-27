import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black py-10 text-center">
            <div className="container mx-auto px-4 cursor-default">
                {/* Footer Main Text */}
                <p className="text-sm md:text-base text-gray-300 mb-6">
                    Designed and Developed by ©{' '}
                    <span className="text-blue-500 font-semibold hover:text-blue-400 transition-colors duration-200">
                        Goonj&apos;24 Digital Operations
                    </span>
                </p>

                {/* Follow Us Section */}
                <div className="flex items-center justify-center gap-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        aria-label="Facebook"
                    >
                        <FaFacebookF size={20} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        aria-label="Twitter"
                    >
                        <FaTwitter size={20} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn size={20} />
                    </a>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mt-6 pt-4">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Goonj&apos;24. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
