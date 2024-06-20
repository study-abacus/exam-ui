import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { TextInput } from '~/components/base/textInput';
import { Loading } from '../loading';
import { updateProfile } from '~/api/endpoints/profile';
import { ActionButton } from '~/components/base/actionButton';
import { FaCheck } from 'react-icons/fa';

type Props = {
    profile: any,
    isLoading: boolean
};

export const ProfileEditor: React.FC<Props> = ({ isLoading, profile }) => {
    const [updatedProfile, setUpdatedProfile] = useState(profile || {
        name: "",
        guardian_name: "",
        ci: "",
        sa_class : "",
        city : "",
        country: "",
        age : "",
        phone: "",
        email: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        setUpdatedProfile(profile);
    }, [profile]);

    const { mutate: profileMutation, isLoading: profileUpdating } = updateProfile();

    const sendRequest = useCallback(() => {
        profileMutation({ ...updatedProfile }, { onSuccess: () =>{ 
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 5000); 
        } });
        
    }, [updatedProfile, profileMutation]);
    
    const handleFocus = (field: string) => {
        setFocusedField(field);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setUpdatedProfile({ ...updatedProfile, [field]: e.target.value });
    };

    return (
        <>
            {isLoading || !updatedProfile ? (
                <Loading />
            ) : (
                <>
                    <div className="relative">
                        <TextInput
                            id="name"
                            label="Name"
                            value={updatedProfile.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
                            onFocus={() => handleFocus('name')}
                        />
                        {focusedField === 'name' && updatedProfile.name && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="guardian"
                            label="Guardian Name"
                            value={updatedProfile.guardian_name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'guardian_name')}
                            onFocus={() => handleFocus('guardian')}
                        />
                        {focusedField === 'guardian' && updatedProfile.guardian_name && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="ci"
                            label="CI Name"
                            value={updatedProfile.ci}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'ci')}
                            onFocus={() => handleFocus('ci')}
                        />
                        {focusedField === 'ci' && updatedProfile.ci && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="sa_class"
                            label="Class"
                            value={updatedProfile.sa_class}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'sa_class')}
                            onFocus={() => handleFocus('sa_class')}
                        />
                        {focusedField === 'sa_class' && updatedProfile.sa_class && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="city"
                            label="City"
                            value={updatedProfile.city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'city')}
                            onFocus={() => handleFocus('city')}
                        />
                        {focusedField === 'city' && updatedProfile.city && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="country"
                            label="Country"
                            value={updatedProfile.country}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'country')}
                            onFocus={() => handleFocus('country')}
                        />
                        {focusedField === 'country' && updatedProfile.country && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="age"
                            label="Age"
                            value={updatedProfile.age}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'age')}
                            onFocus={() => handleFocus('agge')}
                        />
                        {focusedField === 'age' && updatedProfile.age && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="phone"
                            label="Phone"
                            type="number"
                            value={updatedProfile.phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'phone')}
                            onFocus={() => handleFocus('phone')}
                        />
                        {focusedField === 'phone' && updatedProfile.phone && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="relative mt-3">
                        <TextInput
                            id="email"
                            label="Email"
                            value={updatedProfile.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
                            onFocus={() => handleFocus('email')}
                        />
                        {focusedField === 'email' && updatedProfile.email && (
                            <FaCheck className="absolute right-2 top-2 text-green-500" />
                        )}
                    </div>
                    <div className="flex justify-end mt-3">
                        <div>
                        <ActionButton
                            onClick={sendRequest}
                            isLoading={profileUpdating}
                        >
                            Save
                        </ActionButton>
                        </div>
                    </div>
                    {showSuccess && (
                        <div className="absolute bottom-2 left-2 text-green-500 mb-5 ml-5">
                            Profile successfully saved
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ProfileEditor;
