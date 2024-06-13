import React from 'react'


export const Tabs: React.FC = () => {
    return (
        <>


        <div className="border-b border-gray-200">
          <nav className="-mb-0.5 flex justify-center space-x-6" aria-label="Tabs" role="tablist">
            <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none active" id="horizontal-alignment-item-1" data-hs-tab="#horizontal-alignment-1" aria-controls="horizontal-alignment-1" role="tab">
              Inter-Center Competition 2024
            </button>
          </nav>
        </div>
        <div className="mt-3">
          <div id="horizontal-alignment-1" role="tabpanel" aria-labelledby="horizontal-alignment-item-1">
            <p className="text-gray-500">
              This is the <em className="font-semibold text-gray-800">first</em> item's tab body.
            </p>
          </div>
          <div id="horizontal-alignment-2" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-2">
            <p className="text-gray-500">
              This is the <em className="font-semibold text-gray-800">second</em> item's tab body.
            </p>
          </div>
          <div id="horizontal-alignment-3" className="hidden" role="tabpanel" aria-labelledby="horizontal-alignment-item-3">
            <p className="text-gray-500">
              This is the <em className="font-semibold text-gray-800">third</em> item's tab body.
            </p>
          </div>
        </div>
        </>
    )
}

