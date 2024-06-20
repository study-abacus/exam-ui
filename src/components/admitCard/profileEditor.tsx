import React, { useCallback, useEffect, useState } from 'react'
import { TextInput } from '~/components/base/textInput'
import { Loading } from '../loading';
import { updateProfile } from '~/api/endpoints/profile';
import { ActionButton } from "~/components/base/actionButton";

type Props = {
    profile: any,
    isLoading : boolean
}

export const ProfileEditor: React.FC<Props> = ({
    isLoading, profile
}) => {

    const [updatedProfile, setUpdatedProfile] = useState(profile || {
        name : "",
        guardian_name : "",
        ci :"",
        phone : "",
        email : ""
     });

     useEffect(
        () => {
            setUpdatedProfile(profile)
        },
        [profile]
     )
    const {mutate:profileMutation, isLoading:profileUpdating} = updateProfile()
    const sendRequest = useCallback(
        () => profileMutation({
                ...updatedProfile
            }),[updatedProfile, profileMutation]
            
    )
    return (
        <>{

            isLoading || !updatedProfile ? (
                <Loading />
            ) : (
                <>
                    <div>
                        <TextInput
                            id="name"
                            label="Name" 
                            value={updatedProfile.name}
                            onChange={(e) =>
                                setUpdatedProfile((_) => ({ ..._, name: e.target.value }))
                              }
                            />
                    </div>
                    <div className="mt-3">
                        <TextInput
                            id="guardian"
                            label="Guardian Name" 
                            value={updatedProfile.guardian_name}
                            onChange={(e) =>
                                setUpdatedProfile((_) => ({ ..._, guardian: e.target.value }))
                              }
                            />
                    </div>
                    <div className="mt-3">
                        <TextInput
                            id="ci"
                            label="CI Name" 
                            value={updatedProfile.ci}
                            onChange={(e) =>
                                setUpdatedProfile((_) => ({ ..._, ci: e.target.value }))
                              }
                            />
                    </div>
                    <div className="mt-3">
                        <TextInput
                            id="phone"
                            label="Phone"
                            type='number'
                            value={updatedProfile.phone} 
                            onChange={(e) =>
                                setUpdatedProfile((_) => ({ ..._, phone: e.target.value }))
                              }
                            />
                    </div>
                    <div className="mt-3">
                        <TextInput
                            id="email"
                            label="email" 
                            value={updatedProfile.email}
                            onChange={(e) =>
                                setUpdatedProfile((_) => ({ ..._, email: e.target.value }))
                              }
                            />
                    </div>
                    <div className="flex justify-end mt-3">
                        <ActionButton
                            onClick={sendRequest}
                            isLoading={profileUpdating}>
                            Save
                        </ActionButton>
                    </div>
                </>

            )

        }

        </>
    )
}

