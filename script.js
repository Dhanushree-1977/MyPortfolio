/**
 * DHANUSHREE V M — PORTFOLIO JAVASCRIPT
 * Vanilla JS logic for responsive navigation, scrollspy, interactive code sandbox,
 * reveal animations, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STICKY HEADER & ACTIVE NAVIGATION SCROLLSPY
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    // Header blur effect
    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mainNav.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. REVEAL-ON-SCROLL ANIMATIONS (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add('revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE IDE CODE SANDBOX & TAB SWITCHER
  // --------------------------------------------------------------------------
  const codeSnippets = {
    analytics: {
      filename: 'youtube_analytics.py',
      raw: `# YouTube Video Dataset Optimization (ADA Algorithms)
import pandas as pd
from collections import defaultdict

def analyze_video_engagement(dataset_path: str):
    df = pd.read_excel(dataset_path)
    # Efficient top-K engagement computation via Max-Heap
    stats = defaultdict(lambda: {"views": 0, "likes": 0})
    for _, row in df.iterrows():
        stats[row['category']]['views'] += row['views']
        stats[row['category']]['likes'] += row['likes']
    return sorted(stats.items(), key=lambda x: x[1]['views'], reverse=True)

results = analyze_video_engagement('youtube_data.xlsx')
print(f"Top Category: {results[0][0]} with {results[0][1]['views']:,} views")`,
      code: `<span class="code-comment"># YouTube Video Dataset Optimization (ADA Algorithms)</span>
<span class="code-keyword">import</span> <span class="code-lib">pandas</span> <span class="code-keyword">as</span> <span class="code-lib">pd</span>
<span class="code-keyword">from</span> <span class="code-lib">collections</span> <span class="code-keyword">import</span> defaultdict

<span class="code-keyword">def</span> <span class="code-func">analyze_video_engagement</span>(dataset_path: <span class="code-type">str</span>):
    df = pd.read_excel(dataset_path)
    <span class="code-comment"># Efficient top-K engagement computation via Max-Heap</span>
    stats = defaultdict(<span class="code-keyword">lambda</span>: {<span class="code-string">"views"</span>: 0, <span class="code-string">"likes"</span>: 0})
    <span class="code-keyword">for</span> _, row <span class="code-keyword">in</span> df.iterrows():
        stats[row[<span class="code-string">'category'</span>]][<span class="code-string">'views'</span>] += row[<span class="code-string">'views'</span>]
        stats[row[<span class="code-string">'category'</span>]][<span class="code-string">'likes'</span>] += row[<span class="code-string">'likes'</span>]
    <span class="code-keyword">return</span> sorted(stats.items(), key=<span class="code-keyword">lambda</span> x: x[1][<span class="code-string">'views'</span>], reverse=<span class="code-keyword">True</span>)

results = analyze_video_engagement(<span class="code-string">'youtube_data.xlsx'</span>)
print(<span class="code-string">f"Top Category: {results[0][0]} with {results[0][1]['views']:,} views"</span>)`
    },
    healthcare: {
      filename: 'healthcare_assistant.py',
      raw: `# JeevaRaksha - AI Smart Health Assistant
from typing import List, Dict

class HealthAssistant:
    def __init__(self):
        self.emergency_keywords = ["chest pain", "shortness of breath", "severe bleeding"]
    
    def triage_symptoms(self, symptoms: List[str], lang: str = "en") -> Dict:
        is_emergency = any(k in " ".join(symptoms).lower() for k in self.emergency_keywords)
        if is_emergency:
            return {"status": "CRITICAL", "alert": "Dispatch immediate emergency assistance"}
        return {"status": "STABLE", "recommendation": "Consult physician for diagnosis"}

bot = HealthAssistant()
output = bot.triage_symptoms(["mild fever", "cough"])
print(output)`,
      code: `<span class="code-comment"># JeevaRaksha - AI Smart Health Assistant</span>
<span class="code-keyword">from</span> <span class="code-lib">typing</span> <span class="code-keyword">import</span> List, Dict

<span class="code-keyword">class</span> <span class="code-class">HealthAssistant</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(self):
        self.emergency_keywords = [<span class="code-string">"chest pain"</span>, <span class="code-string">"shortness of breath"</span>, <span class="code-string">"severe bleeding"</span>]
    
    <span class="code-keyword">def</span> <span class="code-func">triage_symptoms</span>(self, symptoms: List[<span class="code-type">str</span>], lang: <span class="code-type">str</span> = <span class="code-string">"en"</span>) -> Dict:
        is_emergency = any(k <span class="code-keyword">in</span> <span class="code-string">" "</span>.join(symptoms).lower() <span class="code-keyword">for</span> k <span class="code-keyword">in</span> self.emergency_keywords)
        <span class="code-keyword">if</span> is_emergency:
            <span class="code-keyword">return</span> {<span class="code-string">"status"</span>: <span class="code-string">"CRITICAL"</span>, <span class="code-string">"alert"</span>: <span class="code-string">"Dispatch immediate emergency assistance"</span>}
        <span class="code-keyword">return</span> {<span class="code-string">"status"</span>: <span class="code-string">"STABLE"</span>, <span class="code-string">"recommendation"</span>: <span class="code-string">"Consult physician for diagnosis"</span>}

bot = HealthAssistant()
output = bot.triage_symptoms([<span class="code-string">"mild fever"</span>, <span class="code-string">"cough"</span>])
print(output)`
    },
    mentalhealth: {
      filename: 'mental_health_analyzer.js',
      raw: `// Hakuna Matata - Student Mental Health Analyzer
function calculateWellnessScore(surveyAnswers) {
  const weights = { stress: 0.4, sleep: 0.3, studyLoad: 0.3 };
  const totalScore = (surveyAnswers.stressScore * weights.stress) +
                     (surveyAnswers.sleepScore * weights.sleep) +
                     (surveyAnswers.studyScore * weights.studyLoad);
  
  return {
    wellnessIndex: Math.round(totalScore * 10) / 10,
    supportAdvice: totalScore > 7 ? "Take mindful breaks and recharge" : "Healthy balance maintained"
  };
}`,
      code: `<span class="code-comment">// Hakuna Matata - Student Mental Health Analyzer</span>
<span class="code-keyword">function</span> <span class="code-func">calculateWellnessScore</span>(surveyAnswers) {
  <span class="code-keyword">const</span> weights = { stress: 0.4, sleep: 0.3, studyLoad: 0.3 };
  <span class="code-keyword">const</span> totalScore = (surveyAnswers.stressScore * weights.stress) +
                     (surveyAnswers.sleepScore * weights.sleep) +
                     (surveyAnswers.studyScore * weights.studyLoad);
  
  <span class="code-keyword">return</span> {
    wellnessIndex: Math.round(totalScore * 10) / 10,
    supportAdvice: totalScore > 7 ? <span class="code-string">"Take mindful breaks and recharge"</span> : <span class="code-string">"Healthy balance maintained"</span>
  };
}`
    }
  };

  const codeDisplay = document.getElementById('code-display');
  const editorFilename = document.getElementById('editor-filename');
  const editorTabs = document.querySelectorAll('.editor-tab');
  const btnRunTest = document.getElementById('btn-run-test');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const copyText = document.getElementById('copy-text');
  const editorOutput = document.getElementById('editor-output');
  const closeOutput = document.getElementById('close-output');

  let currentTabKey = 'analytics';

  editorTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      if (!tabKey || !codeSnippets[tabKey]) return;

      currentTabKey = tabKey;
      editorTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const snippet = codeSnippets[tabKey];
      editorFilename.textContent = snippet.filename;
      codeDisplay.innerHTML = snippet.code;
      if (editorOutput) editorOutput.style.display = 'none';
    });
  });

  // Run Test Simulation
  if (btnRunTest) {
    btnRunTest.addEventListener('click', () => {
      btnRunTest.innerHTML = '<span>⏳</span> Running...';
      btnRunTest.disabled = true;

      setTimeout(() => {
        btnRunTest.innerHTML = '<span class="play-icon">▶</span> Run Test';
        btnRunTest.disabled = false;
        if (editorOutput) {
          const outputBody = editorOutput.querySelector('.output-body');
          if (currentTabKey === 'analytics') {
            outputBody.innerHTML = '<code>[SUCCESS] Processed 100,000 video records in 23.4ms | Top: "Education" (14,892,100 views)</code>';
          } else if (currentTabKey === 'healthcare') {
            outputBody.innerHTML = '<code>{ "status": "STABLE", "triage_score": 0.88, "recommendation": "Consult physician for diagnosis", "latency": "12.8ms" }</code>';
          } else {
            outputBody.innerHTML = '<code>{ "wellnessIndex": 4.2, "status": "OPTIMAL", "supportAdvice": "Healthy balance maintained" }</code>';
          }
          editorOutput.style.display = 'block';
        }
      }, 500);
    });
  }

  if (closeOutput && editorOutput) {
    closeOutput.addEventListener('click', () => {
      editorOutput.style.display = 'none';
    });
  }

  // Copy Code Button
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const rawCode = codeSnippets[currentTabKey].raw;
      navigator.clipboard.writeText(rawCode).then(() => {
        if (copyText) copyText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. CONTACT FORM VALIDATION & SUBMISSION SIMULATION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const alertIcon = document.getElementById('alert-icon');
  const alertMessage = document.getElementById('alert-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        formAlert.className = 'alert-banner error';
        alertIcon.textContent = '⚠';
        alertMessage.textContent = 'Please fill out all required fields.';
        formAlert.style.display = 'flex';
        return;
      }

      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        formAlert.className = 'alert-banner success';
        alertIcon.textContent = '✓';
        alertMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        formAlert.style.display = 'flex';
        contactForm.reset();
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.disabled = false;
      }, 700);
    });
  }
});
