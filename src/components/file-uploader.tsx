"use client";

import { useState, useCallback } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FileUploaderProps {
  onFileUpload: (file: { dataUri: string; name: string }) => void;
  accept: Accept;
}

export function FileUploader({ onFileUpload, accept }: FileUploaderProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "File upload error",
        description: rejectedFiles[0].errors[0].message,
      });
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setIsUploading(true);

      const reader = new FileReader();
      reader.onload = () => {
        const dataUri = reader.result as string;
        onFileUpload({ dataUri, name: selectedFile.name });
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File read error",
          description: "Could not read the selected file.",
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: false,
  });

  if (file && !isUploading) {
    return (
      <div className="relative mt-4 flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <FileIcon className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium">{file.name}</span>
        </div>
        <button
          onClick={() => setFile(null)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors",
        isDragActive ? "border-primary bg-primary/10" : "border-input hover:border-primary/50"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">
        {isDragActive ? "Drop the file here..." : "Drag & drop a file or click to select"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {Object.keys(accept).join(', ').toUpperCase()} up to {MAX_FILE_SIZE_MB}MB
      </p>
    </div>
  );
}
