'use client';

import { useRef, useState, ChangeEvent, useActionState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type Props = {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    github: string | null;
    demo: string | null;
  };
  updateProject: (prevState: any, formData: FormData) => Promise<any>;
};
const EditProjectForm = ({ project, updateProject }: Props) => {
  const [preview, setPreview] = useState(project.image);
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(updateProject, null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (preview && preview !== project.image) {
        URL.revokeObjectURL(preview);
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center">
          {state.error}
        </div>
      )}
      <form
        action={formAction}
        className="bg-gray-800 border border-white/10 rounded-2xl p-6 flex flex-col gap-5"
      >
        <input type="hidden" name="id" value={project.id} />
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={project.title}
            required
            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={project.description}
            rows={5}
            required
            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Project Image
          </label>
          <div
            onClick={() => !isPending && fileRef.current?.click()} // រារាំងមិនឱ្យចុចដូររូបពេលកំពុង Upload
            className="w-40 h-40 rounded-xl overflow-hidden bg-gray-700 border border-white/10 cursor-pointer relative group"
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                  Change Image
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                No Image
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">GitHub URL</label>
          <input
            type="text"
            name="github"
            defaultValue={project.github || ''}
            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Demo URL</label>
          <input
            type="text"
            name="demo"
            defaultValue={project.demo || ''}
            className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/40 transition-colors text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Updating Project...</span>
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
