'use client'

import React from 'react'

interface Step {
  label: string
  badge?: string  // Optional badge, e.g. "see research"
}

interface FeaturesStepperSectionProps {
  title?: string
  steps: Step[]
  className?: string
}

const FeaturesStepperSection: React.FC<FeaturesStepperSectionProps> = ({
  title,
  steps,
  className = ''
}) => {
  return (
    <section className={`w-full py-10 md:py-16 bg-white ${className}`}>
      <div className="max-w-3xl mx-auto px-5">
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">{title}</h2>
        )}
        <div className="relative pl-12 md:pl-16 space-y-12">
          {steps.map((step, i) => (
            <div key={step.label + i} className="flex items-center space-x-4 relative">
              {/* The vertical line and dot on the left */}
              <div className="absolute left-0 flex flex-col items-center h-full">
                <span
                  className={`block w-5 h-5 rounded-full border-2 border-[#ab6b6b] mb-1`}
                  style={{
                    backgroundColor: `rgba(171,107,107,${1 - i * 0.18})`
                  }}
                />
                {i !== steps.length - 1 &&
                  <span
                    className="block w-[2px] flex-1 mt-1"
                    style={{
                      background: 'linear-gradient(to bottom, #cfb8b8 70%, transparent 100%)',
                      minHeight: '35px'
                    }}
                  />
                }
              </div>
              <div className="ml-7 flex-1 flex items-center text-lg md:text-xl font-medium text-gray-800">
                {step.label}
                {step.badge &&
                  <span className="ml-4 bg-purple-600 rounded-lg text-xs px-3 py-1 text-white font-semibold uppercase tracking-wide">
                    {step.badge}
                  </span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesStepperSection
