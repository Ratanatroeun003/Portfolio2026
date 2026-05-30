'use client';

import { useState, useRef, useActionState, ChangeEvent } from 'react';
import { ImagePlus, Loader2, ArrowLeft, Globe, Code } from 'lucide-react';
import Link from 'next/link';
import { createProjects } from '@/app/(admin)/admin/projects/_action';

export default function CreateProjectPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 🚀 ហៅប្រើ useActionState ធម្មតា ដោយមិនបាច់មាន fetch() ឬ useEffect អ្វីទាំងអស់
  const [state, formAction, isPending] = useActionState(createProjects, null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </Link>

      <div className="bg-gray-800 p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Create New Project</h2>
          <p className="text-xs text-gray-400 mt-1">
            Add a new project to your portfolio website. All processes run
            purely on Server Action.
          </p>
        </div>

        {state?.error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
            {state.error}
          </div>
        )}

        {/* 🔑 ទិន្នន័យទាំងអស់ក្នុង Form នេះនឹងត្រូវបាញ់ទៅកាន់ Server ក្នុងពេលតែមួយ */}
        <form action={formAction} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., HEANG STORE"
              className="w-full bg-gray-900 border border-white/10 focus:border-blue-500 outline-none rounded-xl p-3 text-white transition"
            />
          </div>
          {/* Tech Stack / Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">
              Tech Stack (Description) *
            </label>
            <input
              type="text"
              name="description"
              required
              placeholder="e.g., React Native, Node.js, MongoDB, Tailwind CSS"
              className="w-full bg-gray-900 border border-white/10 focus:border-blue-500 outline-none rounded-xl p-3 text-white transition"
            />
          </div>

          {/* Git & Demo Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex block text-sm text-gray-400 mb-1.5 font-medium items-center gap-1.5">
                <Code size={14} /> <span>GitHub Link (Optional)</span>
              </label>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/..."
                className="w-full bg-gray-900 border border-white/10 focus:border-blue-500 outline-none rounded-xl p-3 text-white transition"
              />
            </div>
            <div>
              <label className="flex block text-sm text-gray-400 mb-1.5 font-medium items-center gap-1.5">
                <Globe size={14} /> <span>Live Demo Link (Optional)</span>
              </label>
              <input
                type="url"
                name="demo"
                placeholder="https://..."
                className="w-full bg-gray-900 border border-white/10 focus:border-blue-500 outline-none rounded-xl p-3 text-white transition"
              />
            </div>
          </div>

          {/* 🔑 ផ្នែកកូដ Project Thumbnail ដែលបានកែសម្រួលរួចរាល់ */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">
              Project Thumbnail *
            </label>
            <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-4 bg-gray-900/30 hover:bg-gray-900/60 transition relative overflow-hidden min-h-48">
              {/* 🌟 គន្លឹះ៖ ដាក់ <input> នៅទីនេះ ដើម្បីឱ្យវាឈរជើងក្នុង Form ជានិច្ច ទោះបីជាលាក់ Preview ក៏ដោយ */}
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {previewUrl ? (
                <div className="relative w-full h-full min-h-40 flex flex-col gap-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-h-56 object-contain rounded-xl border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm transition"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                /* 👆 ពេលនេះប៊ូតុង Click ខាងក្រោមនឹងទៅកេះ trigger input file ដែលនៅខាងលើដោយស្វ័យប្រវត្ត */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 py-8 w-full text-gray-400"
                >
                  <div className="p-3 bg-gray-800 rounded-xl border border-white/5 text-blue-400">
                    <ImagePlus size={26} />
                  </div>
                  <span className="text-sm font-medium text-white mt-1">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-500">
                    Supports PNG, JPG, JPEG up to 5MB
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/40 text-white font-semibold p-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/10 mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Processing Upload & Saving...</span>
              </>
            ) : (
              'Save Project'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
