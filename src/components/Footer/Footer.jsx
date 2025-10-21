
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Column 1: Brand & Contact */}
                    <div className="space-y-4">
                        <a href="/" className="text-3xl font-extrabold text-white">
                            Tripora
                        </a>
                        <p className="text-gray-400">
                            Your next adventure awaits. Book your dream vacation with ease.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FiPhone className="w-5 h-5 text-blue-400" />
                                <span>+1 (234) 567-890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FiMail className="w-5 h-5 text-blue-400" />
                                <span>support@tripora.com</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <FiMapPin className="w-5 h-5 text-blue-400 mt-1" />
                                <span>123 Travel St, Wanderlust City, World</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/packages" className="hover:text-white transition-colors">Packages</a></li>
                            <li><a href="/destinations" className="hover:text-white transition-colors">Destinations</a></li>
                            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Support */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="/support" className="hover:text-white transition-colors">Support Center</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (Mini) */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">Get our latest deals and travel tips.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex">
                            <label htmlFor="footer-email" className="sr-only">Email</label>
                            <input 
                                type="email" 
                                id="footer-email"
                                placeholder="Your email"
                                className="w-full bg-gray-800 text-white px-4 py-2.5 rounded-l-lg
                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2.5 rounded-r-lg
                                           hover:bg-blue-700 transition-colors"
                            >
                                Go
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Socials */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
                    <pre className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Tripora. All rights reserved.
                    </pre>
                    <div className="flex space-x-5">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiFacebook className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiTwitter className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiInstagram className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><FiLinkedin className="w-6 h-6" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;