import { Link, NavLink } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Home() {
  const features = [
    { title: "Magical Notebook", description: "A notebook enchanted with wonder, where every spark is preserved like a spell", color: "bg-pink-500" },
    { title: "Interactive Collaboration", description: "Not just working together, but conjuring together, turning scattered sparks into shining constellations.", color: "bg-green-500" },
    { title: "Autosave Idea", description: "No spark ever fades, every thought is captured the moment it’s born.", color: "bg-red-500" },
    { title: "Mind-Maps", description: "Trace the threads of inspiration, and uncover the hidden design of your ideas.", color: "bg-purple-600" },
    { title: "Voice to Text Input", description: "Whisper an idea, and watch it etch itself in glowing ink.", color: "bg-cyan-500" },
    { title: "AI Assistance", description: "A hidden guide at every step, illuminating paths you never saw.", color: "bg-blue-500" },
  ];

  const whatotherssay = [
    { quote: "Collaboration feels natural, almost like we're in the same room.", name: "Sara Johnson", profile: "images/woman.png" },
    { quote: "Autosave is a lifesaver — no more lost ideas.", name: "Mark Davis", profile: "images/man.jpg" },
    { quote: "AI assistance gives my thoughts direction when I'm stuck.", name: "James Carter", profile: "images/user.png" },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/bg.png')" }}>
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" className="w-10 h-10" />
          <div className="text-2xl font-bold">Lumino</div>
        </div>
        <ul className="hidden md:flex gap-8 text-lg">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/features" className={({ isActive }) => (isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300")}>
              Features
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? "text-indigo-400 font-semibold" : "hover:text-indigo-300")}>
              FAQ
            </NavLink>
          </li>
        </ul>
        <Link to="/profile">
          <img src="/images/user.png" className="w-8 h-8 rounded-full" />
        </Link>
      </div>

      <div className="text-center py-24 px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Preserving and showcasing creative works & performance
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          Mystical is your creative space where ideas come alive. With magical notebooks, interactive mind maps, AI assistance, and seamless collaboration, it captures every spark and turns it into something extraordinary.
        </p>
        <button className="mt-8 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-semibold shadow-lg">
          Get Started
        </button>
      </div>

      <div className="py-16 px-6">
        <h2 className="text-center text-3xl font-bold mb-12">Our Competitive Advantage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((f, idx) => (
            <div key={idx} className={`${f.color} rounded-2xl p-6 text-center shadow-xl flex flex-col`}>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-200">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 px-6">
        <h2 className="text-center text-3xl font-bold mb-10">What Others Say About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {whatotherssay.map((t, idx) => (
            <div key={idx} className="bg-purple-800 rounded-2xl p-6 shadow-lg">
              <img src={t.profile} className="w-16 h-16 rounded-full border-2 border-indigo-400 mb-4" />
              <p className="italic">"{t.quote}"</p>
              <p className="mt-4 font-semibold">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12 px-8 text-white" style={{ backgroundImage: "url('/images/bg2.png')" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" className="w-8 h-8" />
              <h3 className="text-2xl font-bold text-indigo-400">Lumino</h3>
            </div>
            <p className="mt-2 text-gray-300">From Spark to Structure</p>
            <div className="flex gap-4 mt-4">
              <FaTwitter className="text-xl hover:text-indigo-300" />
              <FaInstagram className="text-xl hover:text-indigo-300" />
              <FaLinkedin className="text-xl hover:text-indigo-300" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/overview" className="hover:text-indigo-300">Overview</Link></li>
              <li><Link to="/notebook" className="hover:text-indigo-300">Notebook</Link></li>
              <li><Link to="/collaboration" className="hover:text-indigo-300">Collaboration</Link></li>
              <li><Link to="/mindmaps" className="hover:text-indigo-300">Mind Maps</Link></li>
              <li><Link to="/ai-assistance" className="hover:text-indigo-300">AI Assistance</Link></li>
              <li><Link to="/chat" className="hover:text-indigo-300">Real-time Chat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/contact" className="hover:text-indigo-300">Contact</Link></li>
              <li><Link to="/docs" className="hover:text-indigo-300">Documentation</Link></li>
              <li><Link to="/chat-support" className="hover:text-indigo-300">Chat</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-300">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/terms" className="hover:text-indigo-300">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-300">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-indigo-300">Cookie Settings</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
