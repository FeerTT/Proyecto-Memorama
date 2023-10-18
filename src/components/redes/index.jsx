import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, } from 'react-icons/fa';
import { useRouter } from 'next/router';

import {BiDotsVerticalRounded} from 'react-icons/bi'

const SocialMediaBox = () => {
  
 
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  const redirectToLinkedIn = () => {
    router.push('https://www.linkedin.com/in/fernando-trillo-573a371b3/');
  };

  const redirectToGitHub = () => {
    router.push('https://github.com/FeerTT');
  };

  const redirectToEmail = () => {
    router.push("mailto:fernandotrillobaron25@hotmail.com");
  };

  const redirectToInstagram = () => {
    router.push('https://www.instagram.com/feertrillo/');
  };

  return (
    <main className={`social-media-container space-x-4 p-4   ${expanded ? 'expanded' : ''}`}>
      
        <div className='logo-redes '>
          <BiDotsVerticalRounded size={55} onClick={handleButtonClick}></BiDotsVerticalRounded>
          {expanded && (
            <>
              <div className="social-media-icon text-blue-500" onClick={redirectToLinkedIn}>
                <FaLinkedin size={30} alt="LinkedIn" />
              </div>
              <div className="social-media-icon text-black" onClick={redirectToGitHub}>
                <FaGithub size={30} alt="GitHub" />
              </div>
              <div className="social-media-icon text-red-500" onClick={redirectToEmail}>
                <FaEnvelope size={30} alt="Email" />
              </div>
              <div className="social-media-icon text-pink-500" onClick={redirectToInstagram}>
                <FaInstagram size={30} alt="Instagram" />
              </div>
            </>
          )}
        </div>
    </main>
  );
};

export default SocialMediaBox;
