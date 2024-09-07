import React from 'react'



const Customization = ( { setFontColor , setFontStyle , fontStyle , fontColor } ) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white  ">  Customize Your Todo List :</h2>
            <div className="flex flex-col space-y-4 ">
              {/* Font Style */}
              <div className='flex gap-3'>
                <label className="block text-gray-800 dark:text-gray-200 mb-2">
                  Font Style:
                </label>
                <select
                  className="rounded-md p-2"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                >
                  <option value="sans-serif">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                </select>
              </div>

              {/* Font Color */}
              <div>
                <label className="block text-blue-800 py-1 dark:text-gray-200 mb-2">
                  Font Color:
                </label>
                <input
                  type="color"
                  className="rounded-md p-1"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
            </div>
          </div>
  )
}

export default Customization