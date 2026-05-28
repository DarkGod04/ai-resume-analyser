import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize, cn } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;



    return (
        <div className="w-full">
            <div {...getRootProps()} className={cn(
                "uplader-drag-area",
                isDragActive ? "border-violet-500 bg-slate-900/40" : ""
            )}>
                <input {...getInputProps()} />

                <div className="w-full cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file bg-slate-900/80 border border-slate-800" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3.5">
                                <img src="/images/pdf.png" alt="pdf" className="size-9 filter brightness-110" />
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-200 truncate max-w-[200px] md:max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer rounded-lg bg-slate-950/60 border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/10 transition-colors" onClick={(e) => {
                                e.stopPropagation();
                                onFileSelect?.(null)
                            }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-3.5 h-3.5 filter invert opacity-60 hover:opacity-100" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="w-12 h-12 flex items-center justify-center mb-3 rounded-xl bg-slate-900/60 border border-slate-800 text-violet-400">
                                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-sm text-slate-300 font-medium">
                                <span className="font-bold text-violet-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1 font-semibold">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
