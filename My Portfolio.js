import { useState, useEffect, useRef } from 'react';

export default function Portfolio() {
  const [section, setSection] = useState('about');
  const sectionRefs = useRef([]);

  useEffect(() => {
    document.title = `John Doe | ${section.charAt(0).toUpperCase() + section.slice(1)}`;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [section]);

  const sections = {
    about: (
      <section ref={el => sectionRefs.current[0] = el} className="section about-section">
        <div className="container">
          <h1 className="section-title">About Me</h1>
          <p>Hi! I'm <span className="highlight">John Doe</span>, a passionate web developer and robotics enthusiast based in Bangkok, Thailand.</p>
          <p>Currently studying <span className="highlight">Robotics & AI at KMITL</span>, with a focus on automation, AI, and web development.</p>
          <p>I love building things that blend hardware and software beautifully.</p>
        </div>
      </section>
    ),
    projects: (
      <section ref={el => sectionRefs.current[1] = el} className="section projects-section">
        <div className="container">
          <h1 className="section-title">Projects</h1>
          <div className="projects-grid">
            <div className="card">
              <h2>AI Hand Gesture Control</h2>
              <p>Real-time gesture recognition to control a robotic arm using OpenCV and Mediapipe.</p>
            </div>
            <div className="card">
              <h2>GPS Guided Robot</h2>
              <p>Autonomous navigation robot using ESP32, GPS, and IMU sensors.</p>
            </div>
            <div className="card">
              <h2>Smart Fan Controller</h2>
              <p>A Modbus-based fan controller with a custom UI for speed tuning and monitoring.</p>
            </div>
          </div>
        </div>
      </section>
    ),
    skills: (
      <section ref={el => sectionRefs.current[2] = el} className="section skills-section">
        <div className="container">
          <h1 className="section-title">Skills</h1>
          <div className="skills-grid">
            <div>
              <h2>Web Development</h2>
              <ul>
                <li>React, Next.js</li>
                <li>CSS, JavaScript</li>
                <li>HTML, Python</li>
              </ul>
            </div>
            <div>
              <h2>Robotics & AI</h2>
              <ul>
                <li>ESP32, Arduino, STM32</li>
                <li>OpenCV, Mediapipe</li>
                <li>GPS, IMU, PID Control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    ),
    contact: (
      <section ref={el => sectionRefs.current[3] = el} className="section contact-section">
        <div className="container">
          <h1 className="section-title">Contact</h1>
          <p>I'd love to connect and collaborate on exciting projects. Feel free to reach out!</p>
          <p>Email: <a href="mailto:john.doe@example.com">john.doe@example.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/johndoe">linkedin.com/in/johndoe</a></p>
          <p>GitHub: <a href="https://github.com/johndoe">github.com/johndoe</a></p>
        </div>
      </section>
    )
  };

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="container">
          <h1 className="site-title">John Doe</h1>
          <nav className="site-nav">
            {['about', 'projects', 'skills', 'contact'].map((key) => (
              <button key={key} className={`nav-link ${section === key ? 'active' : ''}`} onClick={() => setSection(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main>
        {sections[section]}
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
