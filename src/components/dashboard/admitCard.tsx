import React from 'react'


type Props = {
  admitCard: any
}

export const AdmitCard: React.FC<Props> = ({ admitCard }) => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4">
        ADMIT CARD
      </div>
      <div className="text-center mb-4">
        Please take a screenshot of your roll number and password.
      </div>
      <div className="text-center mb-4">
        <table className="table-auto w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold">Roll Number</td>
              <td className="px-4 py-2">{admitCard?.id}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Password</td>
              <td className="px-4 py-2">{admitCard?.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
