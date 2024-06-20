import React from 'react'
import { ProfileEditor } from '~/components/admitCard/profileEditor'
import { getProfile } from '~/api/endpoints/profile';
import { useAuth } from '~/hooks/useAuth';
import { ExaminationRow } from '~/components/admitCard/examinationRow';

export const Component: React.FC = () => {

    const { data: profile, isLoading } = getProfile()
    const {data} = useAuth()


    return (
        <div className="container mx-auto py-4">
            <div className="flex flex-col md:flex-row">
                <div className="mx-5 relative flex flex-col mt-6  basis-1/2">
                    <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                        <div className="text-3xl text-center">
                            Profile
                        </div>
                        <div className="mt-3">
                            <ProfileEditor profile={profile} isLoading={isLoading}/>
                        </div>
                    </div>
                </div>
                <div className="mx-5 relative flex flex-col mt-6  basis-1/2">
                    <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                        <div className="text-3xl text-center">
                            Examinations
                        </div>                        
                        { data?.token_data?.examination_ids.map((examination_id) => (
                            <ExaminationRow examination_id={examination_id}/>
                        ) )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

