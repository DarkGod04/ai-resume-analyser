import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="size-3.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.8)] group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                    RESU<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">MIND</span>
                </span>
            </Link>
            <Link to="/upload" className="primary-button w-fit px-5 py-2 text-sm">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar;
