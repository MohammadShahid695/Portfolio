import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const profileData = {
    name: "Mohammad Shahid",
    title: "Full-Stack Software & Web Developer",
    location: "Nagpur, Maharashtra",
    phone: "+91 75695 52213",
    email: "mohammadshahid5213@gmail.com",
    portfolio: "https://github.com/MohammadShahid695"
  };

  const skills = [
    "JavaScript", "React.js", "React Native", "TypeScript", "Node.js",
    "Redux", "Firebase", "Python", "MySQL", "Figma", "Java", "Bootstrap"
  ];

  const interests = [
    "Critical Thinking & Problem Solving",
    "Professional Communication",
    "Team Collaboration",
    "Time Management",
    "Adaptability & Quick Learning",
    "UI/UX Design"
  ];

  const languages = [
    "English (Professional Working)",
    "Hindi (Native)",
    "Urdu (Native)"
  ];

  const education = [
    {
      degree: "B.E. Electronics and Telecommunication",
      status: "Final Year (2022 - 2026)",
      institution: "Anjuman College of Engineering and Technology, Nagpur",
      description: "Actively building real-world web and mobile applications alongside academics."
    },
    {
      degree: "Diploma in Electronics and Telecommunication",
      percentage: "71%",
      institution: "Anjuman Polytechnic, Sadar Nagpur",
      description: "Built strong foundation in electronics, communication and programming."
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  // Gentle & Smooth 3D Tilt
  useEffect(() => {
    const resume = resumeRef.current;
    if (!resume) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = resume.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const rotateX = (50 - y) / 10;
      const rotateY = (x - 50) / 10;

      resume.style.transform = `perspective(1450px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      resume.style.transform = `perspective(1450px) rotateX(0deg) rotateY(0deg)`;
    };

    resume.addEventListener('mousemove', handleMouseMove);
    resume.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      resume.removeEventListener('mousemove', handleMouseMove);
      resume.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="resume-3d-wrapper">
      <div className="resume" ref={resumeRef}>
        {/* ==================== SIDEBAR ==================== */}
        <aside className="sidebar">
          <div className="name-section">
            <h1 className="name">{profileData.name}</h1>
            <p className="title">{profileData.title}</p>
            <div className="creative-line"></div>
          </div>

          <ul className="contact-list">
            <li><i className="fas fa-map-marker-alt"></i> {profileData.location}</li>
            
            <li onClick={() => copyToClipboard(profileData.phone, 'phone')} className="clickable">
              <i className="fas fa-phone-alt"></i> {profileData.phone}
              {copied === 'phone' && <span className="copied">✓ Copied</span>}
            </li>

            <li onClick={() => copyToClipboard(profileData.email, 'email')} className="clickable">
              <i className="fas fa-envelope"></i> {profileData.email}
              {copied === 'email' && <span className="copied">✓ Copied</span>}
            </li>

            <li>
              <i className="fas fa-globe"></i>
              <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </li>
          </ul>

          <section>
            <h3 className="section-title">TECHNICAL SKILLS</h3>
            <div className="skills-cloud">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>

          <section className="interests-section">
            <h3 className="section-title">INTERESTS & SOFT SKILLS</h3>
            <div className="interests-grid">
              {interests.map((item, idx) => (
                <div key={idx} className="interest-card">{item}</div>
              ))}
            </div>
          </section>

          <section className="languages-section">
            <h3 className="section-title">LANGUAGES</h3>
            <div className="languages-grid">
              {languages.map((lang, idx) => (
                <div key={idx} className="language-item">
                  <span className="language-name">{lang}</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: idx === 0 ? '90%' : '95%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* ==================== MAIN CONTENT ==================== */}
        <main className="content">
          <section className="about-section">
            <h2>ABOUT ME</h2>
            <p>
              Final-year B.E. Electronics & Telecommunication student with hands-on experience as a 
              Full-Stack Developer at <strong>QASWA Technology</strong>. Passionate JavaScript and React Native 
              Developer focused on building responsive web applications, mobile solutions, and user-centric 
              digital experiences. Skilled in modern frontend and backend technologies, API integration, 
              and creating scalable, performance-driven applications.
            </p>
          </section>

          <section>
            <h2>PROFESSIONAL EXPERIENCE</h2>
            <div className="card">
              <h4>Full-Stack Developer</h4>
              <span className="period">QASWA Technology • 2025 - Present</span>
              <p>
                Building modern web and desktop applications using React.js, React Native, Node.js with 
                focus on creativity, clean code, and exceptional user experience.
              </p>
            </div>
          </section>

          <section>
            <h2>EDUCATION</h2>
            {education.map((edu, idx) => (
              <div className="card" key={idx}>
                <h4>{edu.degree}</h4>
                <span className="period">{edu.status}</span>
                <p className="institution">{edu.institution}</p>
                {edu.percentage && <p><strong>Percentage:</strong> {edu.percentage}</p>}
                <p>{edu.description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;