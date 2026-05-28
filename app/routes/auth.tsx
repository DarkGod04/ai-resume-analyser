import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="relative min-h-screen flex items-center justify-center">
            {/* Glowing backdrop elements */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 p-8 md:p-12 rounded-3xl max-w-md w-full mx-4 shadow-2xl animate-fade-in z-10">
                <section className="flex flex-col gap-8 items-center">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="size-12 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center font-black text-white text-xl tracking-tighter">
                            RM
                        </div>
                        <h1 className="text-3xl md:text-4xl text-slate-100 mt-2">Welcome Back</h1>
                        <h2 className="text-slate-400 text-sm leading-relaxed max-w-[280px]">Log in with your Puter account to continue your job search journey.</h2>
                    </div>
                    <div className="w-full flex justify-center">
                        {isLoading ? (
                            <button className="auth-button animate-pulse flex items-center justify-center gap-3" disabled>
                                <span className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                <p className="text-base font-bold">Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button text-base font-bold" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button text-base font-bold" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
