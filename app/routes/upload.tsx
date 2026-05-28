import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);
        try {
            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if(!uploadedFile) return setStatusText('Error: Failed to upload file');

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if(!uploadedImage) return setStatusText('Error: Failed to upload image');

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText('Analyzing...');

            const feedback = await ai.feedback(
                uploadedImage.path,
                prepareInstructions({ jobTitle, jobDescription })
            )
            if (!feedback) return setStatusText('Error: Failed to analyze resume');

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            // Claude sometimes wraps JSON in ```json ... ``` despite being told not to — strip it
            const cleanedFeedback = feedbackText
                .replace(/^```(?:json)?\s*\n?/, '')
                .replace(/\n?```\s*$/, '')
                .trim();

            data.feedback = JSON.parse(cleanedFeedback);
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete, redirecting...');
            console.log(data);
            navigate(`/resume/${uuid}`);
        } catch (error: any) {
            console.error("Analysis error:", error);
            setStatusText(`Error: ${error.message || 'An error occurred during analysis'}`);
            setIsProcessing(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="relative min-h-screen">
            {/* Glowing backdrop elements */}
            <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none"></div>

            <Navbar />

            <section className="main-section relative z-10">
                <div className="page-heading py-10 max-w-2xl">
                    <h1 className="animate-fade-in text-4xl md:text-5xl">Smart feedback for your dream job</h1>
                    {!isProcessing && (
                        <h2 className="text-slate-400 mt-2 text-sm md:text-base animate-fade-in">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                </div>

                {isProcessing ? (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 max-w-md w-full flex flex-col items-center justify-center text-center shadow-2xl animate-fade-in">
                        <img src="/images/resume-scan.gif" className="w-[180px] filter brightness-110 mb-4" />
                        <h2 className="text-slate-200 font-extrabold text-base tracking-wide uppercase animate-pulse">{statusText}</h2>
                        <p className="text-xs text-slate-500 mt-2">This may take a moment. Puter is analyzing your content...</p>
                    </div>
                ) : (
                    <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 rounded-3xl max-w-xl w-full shadow-2xl animate-fade-in">
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Google, Stripe, etc." id="company-name" required />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Frontend Developer, Product Manager, etc." id="job-title" required />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={4} name="job-description" placeholder="Paste the target job description here..." id="job-description" required />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button mt-4" type="submit">
                                Start Evaluation
                            </button>
                        </form>
                    </div>
                )}
            </section>
        </main>
    )
}
export default Upload
