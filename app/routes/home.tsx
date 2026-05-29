import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
        const resumes = (await kv.list('resume:*', true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
            JSON.parse(resume.value) as Resume
        ));
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);
        setResumes([]);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);

  return <main className="relative min-h-screen">
    {/* Glowing backdrop elements */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>

    <Navbar />

    <section className="main-section relative z-10">
      <div className="page-heading py-12 md:py-16">
        <h1 className="animate-fade-in">Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="text-slate-400 mt-2 text-base md:text-lg animate-fade-in">No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2 className="text-slate-400 mt-2 text-base md:text-lg animate-fade-in">Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-10">
            <img src="/images/resume-scan-2.gif" className="w-[180px] filter brightness-95 opacity-80" />
            <p className="text-sm font-semibold text-slate-500 mt-4 animate-pulse">Loading saved evaluations...</p>
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section animate-fade-in">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6 gap-4 animate-fade-in">
            <Link to="/upload" className="primary-button w-fit text-base font-semibold px-8 py-3.5 shadow-lg">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
