import React, { ChangeEvent } from 'react'
import { FaCheck } from 'react-icons/fa'
import { TextInput } from '~/components/base/textInput'


type Props = {
    value: {
        name: string,
        email: string,
        phone: string,
        country_code: string
    }
    onChange: (func: (value: any) => any ) => void
}

export const OrderProfileEditor: React.FC<Props> = ({ value, onChange }) => {
    const [focusedField, setFocusedField] = React.useState<string | null>(null);

    const handleFocus = (field: string) => {
        setFocusedField(field);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        onChange(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Fill Details</h2>
            <div className="mb-4 relative">
                <TextInput
                    id="name"
                    label="Name"
                    value={value.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
                    onFocus={() => handleFocus('name')}
                />
                {focusedField === 'name' && value.name && (
                    <FaCheck className="absolute right-2 top-2 text-green-500" />
                )}
            </div>

            <div className="mb-4 relative">
                <TextInput
                    id="phone"
                    label="Phone"
                    value={value.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'phone')}
                    onFocus={() => handleFocus('phone')}
                />
                {focusedField === 'phone' && value.phone && (
                    <FaCheck className="absolute right-2 top-2 text-green-500" />
                )}
            </div>

            <div className="mb-6 relative">
                <TextInput
                    id="email"
                    label="Email"
                    value={value.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
                    onFocus={() => handleFocus('email')}
                />
                {focusedField === 'email' && value.email && (
                    <FaCheck className="absolute right-2 top-2 text-green-500" />
                )}
            </div>
        </div>
    )
}
