import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain flex-start"/>
        <div className="justify-end">
          <button type="button" className="black_btn" onClick={() => {window.open("https://github.com/JIB2017")}}>GitHub</button>
        </div>
      </nav>
      <div className="flex flex-col items-center">
        <h1 className="head_text">Summarize Articles with <br className="max-md:hidden"/><span className="orange_gradient">AI Technology</span></h1>
        <p className="desc">Simplify your reading with Summize, an open-source article summarizer <br />that transforms lengthy articles into clear and concise summaries</p>
      </div>
    </header>
  )
}

export default Hero