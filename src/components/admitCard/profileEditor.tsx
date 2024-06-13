import React from 'react'
import { TextInput } from '~/components/base/textInput'


export const ProfileEditor: React.FC = () => {
    return (
        <>
            <div>
                <TextInput
                    id="name"
                    label="Name" />
            </div>
            <div className="mt-3">
                <TextInput
                    id="guardian"
                    label="Guardian Name" />
            </div>
            <div className="mt-3">
                <TextInput
                    id="ci"
                    label="CI Name" />
            </div>
            <div className="mt-3">
                <TextInput
                    id="class"
                    label="Class" />
            </div>
            <div className="flex justify-end mt-3">
                <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2
                    text-sm font-semibold rounded-lg border
                    border-transparent bg-blue-600 text-white
                    hover:bg-blue-700 disabled:opacity-50
                    disabled:pointer-events-none">
                    Save
                </button>
            </div>
        </>
    )
}

