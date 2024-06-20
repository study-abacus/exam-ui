import React, { useCallback } from "react";
import { TextInput } from "~/components/base/textInput";
import { getAdmitCardToken } from "~/api/endpoints/admitCard";
import { ActionButton } from "~/components/base/actionButton";
import { useAuth } from "~/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AdmitCardLogin: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = React.useState({
    roll_number: "",
    password: "",
  })

  const { mutateAsync: getTokenMutation, isLoading, isError } = getAdmitCardToken()
  const handleLogin = useCallback(async () => {
    const result: any = await getTokenMutation(loginForm)
    login(result.jwt)
    navigate("/admit_card")
  }, [loginForm, getTokenMutation])

  return (
    <div className="lg:mt-0 lg:flex-shrink-0">
      <div className="rounded-md shadow">
        <div className="mx-5 relative flex flex-col mt-6  basis-1/2">
          <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
            <div>
              <TextInput
                id="roll_number"
                label="Roll Number"
                value={loginForm.roll_number}
                onChange={(e) =>
                  setLoginForm((_) => ({ ..._, roll_number: e.target.value }))
                }
              />
            </div>
            <div className="mt-4">
              <TextInput
                id="password"
                label="Password"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((_) => ({ ..._, password: e.target.value }))
                }
              />
            </div>
            <div className="inline-flex justify-center mt-4">
              <ActionButton onClick={handleLogin} isLoading={isLoading}>
                Login
              </ActionButton>

              
            </div>
           
            {isError && <div className="text-red-500 mt-3 text-sm">
              
                Incorrect Roll Number or Password
            </div>
}

          </div>
        </div>
      </div>
    </div>
  );
};
