"use client";

import React, { useState, useMemo } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { moodboardTemplates, templateCategories, templateStyles, MoodboardTemplate } from '@/data/templatesData';

export default function TemplateSelectionPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<MoodboardTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    return moodboardTemplates.filter((template) => {
      const categoryMatch = !selectedCategory || template.category === selectedCategory;
      const styleMatch = !selectedStyle || template.style === selectedStyle;
      return categoryMatch && styleMatch;
    });
  }, [selectedCategory, selectedStyle]);

  const handleSelectTemplate = (template: MoodboardTemplate) => {
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    router.push('/moodboard/editor');
  };

  const handleStartBlank = () => {
    sessionStorage.removeItem('selectedTemplate');
    router.push('/moodboard/editor');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Choose Your Template</h1>
              <p className="mt-1 text-sm text-gray-600">Select a pre-designed template or start with a blank canvas</p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleStartBlank}
            className="group relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 hover:border-gray-400 hover:bg-gray-50 transition-all hover:shadow-md"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold text-gray-900">Start with Blank Canvas</h3>
                <p className="mt-0.5 text-xs text-gray-600">Create your mood board from scratch</p>
              </div>
            </div>
          </button>

          <div className="group relative overflow-hidden rounded-lg border-2 border-gray-300 bg-white p-6 hover:border-gray-400 hover:bg-gray-50 transition-all hover:shadow-md">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-base font-semibold text-gray-900">Upload Room Image</h3>
                <p className="mt-0.5 text-xs text-gray-600">Start with your own room photo</p>
              </div>
              <label className="cursor-pointer px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-black transition-colors">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        sessionStorage.setItem('uploadedRoomImage', reader.result as string);
                        sessionStorage.removeItem('selectedTemplate');
                        router.push('/moodboard/editor');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3 items-center bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
            >
              <option value="">All Categories</option>
              {templateCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-700">Style:</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
            >
              <option value="">All Styles</option>
              {templateStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-xs text-gray-600">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
          </div>

          {(selectedCategory || selectedStyle) && (
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedStyle('');
              }}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <NextImage
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                    {template.zones.length} zones
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {template.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                      {template.style}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleSelectTemplate(template)}
                    className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No templates found</h3>
                <p className="text-sm text-gray-600">Try adjusting your filters to see more results</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedStyle('');
                }}
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewTemplate(null)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{previewTemplate.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{previewTemplate.description}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="relative aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden mb-6">
                <NextImage
                  src={previewTemplate.thumbnail}
                  alt={previewTemplate.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Template Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-xs text-gray-600">Category</dt>
                      <dd className="text-sm font-medium text-gray-900">{previewTemplate.category}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-gray-600">Style</dt>
                      <dd className="text-sm font-medium text-gray-900">{previewTemplate.style}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-gray-600">Product Zones</dt>
                      <dd className="text-sm font-medium text-gray-900">{previewTemplate.zones.length} areas</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Included Zones</h3>
                  <ul className="space-y-1">
                    {previewTemplate.zones.map((zone) => (
                      <li key={zone.id} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {zone.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex-1 px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
